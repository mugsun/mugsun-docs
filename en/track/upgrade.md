# Upgrade guide

After upgrading the boot tracking module from 0.1.0, do two things on this page: backfill historical UV, and confirm the user timeline indexes are built.

## Backfill historical UV

Dashboard UV counts one per device ID (`distinct_id`). Days summarized before the upgrade still use the old rule, so past days on the trend chart won't match. Run the backfill once.

First, try one day on a small app off-peak:

```json
{"days": 1, "appKey": "small-app"}
```

Run it again with the same parameters; the log should report 0 rows changed. Then run the default last 90 days.

### Run it

Pick one. Don't turn on `on-startup` during peak hours.

1. In PowerJob, create a job with processor `com.mugsun.boot.track.powerjob.TrackUvBackfillProcessor` and schedule it daily at 02:05. Disable it once the log shows `UV 回填完成`. Leave the parameters empty, or pass `{"days": 180}` or `{"days": 30, "appKey": "your-app"}`.
2. Without PowerJob, set `MUGSUN_TRACK_UV_BACKFILL_ON_STARTUP=true` and restart off-peak. When the log shows `UV 回填完成：run_id=...`, set it back to `false`.

PowerJob reports success only when everything is done. Outside the time window, paused at the window's end, lock lost, or any day timed out all show as failed, and the next scheduled run resumes.

### What changes

- Only rows in `track_stats_day` whose `uv` differs from the recomputed value. No other column changes and no rows are added.
- Days whose raw events are past retention keep their old value.
- Before a row changes, its old value goes into `track_stats_day_uv_backup` (created by migration `T2`).
- A second run leaves rows that already match alone.
- The range is the last 90 complete days by default (UTC, not including today). Change it with `MUGSUN_TRACK_UV_BACKFILL_DAYS`, from 1 to 3660.

### Load on the production database

Each app-and-day is one transaction that scans that day's raw events once. Inside it, `statement_timeout` is 120 seconds and `work_mem` defaults to 256MB (`MUGSUN_TRACK_UV_BACKFILL_WORK_MEM`). It pauses 300 ms between days by default (`MUGSUN_TRACK_UV_BACKFILL_SLEEP_MILLIS`).

By default it only runs between 02:00 and 07:00 Beijing time, pauses when the window ends, and resumes next time. Progress is stored in `track_rollup_cursor` (`job_key = uv_backfill`). Set `MUGSUN_TRACK_UV_BACKFILL_WINDOW_ENABLED=false` to remove the time limit.

The backfill holds its own Redis lock, so with several instances only one runs at a time. If Redis is unavailable, it doesn't run.

If one app-and-day hits a database error such as a timeout or deadlock, only that day is rolled back and a WARN is logged; other apps carry on. If the same app keeps timing out, raise the limit for that app alone. The key needs brackets and quotes:

```yaml
mugsun:
  track:
    uv-backfill:
      app-statement-timeout:
        "[MyApp_1]": 600s
```

::: details Checks before running on a large database
1. On a replica, run `SET work_mem = '256MB'`, then `EXPLAIN (ANALYZE, BUFFERS)` for one day of a large app. Check that it reads a single monthly partition.
2. A default database has no `(app_key, received_at)` index covering all rows (`idx_event_geo` only covers rows with coordinates), so a BRIN bitmap scan or a sequential scan of one partition is normal. Use the run time and temp I/O to decide whether you need an index.
3. The migration doesn't create an index. If you need one, run `CREATE INDEX CONCURRENTLY` off-peak on each monthly partition you're backfilling, and drop it afterwards.
4. A failed concurrent build leaves an INVALID index. If `pg_index.indisvalid` is false, run `DROP INDEX CONCURRENTLY` and build it again.

The query and full steps are in `docs/upgrade/track-uv-backfill.md` in the boot repository.
:::

### Restore and clean up

```sql
-- Restore one run
UPDATE track_stats_day d SET uv = b.old_uv, update_time = now()
FROM track_stats_day_uv_backup b
WHERE b.run_id = 'run_id from the log' AND d.id = b.stats_day_id;

-- Once you're satisfied, clean up the backup
DELETE FROM track_stats_day_uv_backup WHERE backup_time < now() - interval '30 days';
```

## Build the user timeline indexes (T3 / T4)

The user timeline needs two new indexes: `idx_event_user_ts_timeline (app_key, user_id, ts, id)` and `idx_event_distinct_ts_timeline (app_key, distinct_id, ts, id)`. They are built automatically after startup, so you usually don't need to do anything.

First, check the tracking database connection: connect to PostgreSQL directly, or through PgBouncer in session mode.

::: warning PgBouncer transaction pooling is not supported
The tracking database's Flyway lock and the advisory lock used for index builds are session-level locks.
:::

Then check progress with this query. When both rows show `indisvalid = t`, the build is done:

```sql
SELECT c.relname AS parent_index, x.indisvalid
FROM pg_index x JOIN pg_class c ON c.oid = x.indexrelid
WHERE c.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline');
```

### How the indexes are built

`track_event` is partitioned by month, so it takes three steps:

- **T3** (SQL migration) only runs `CREATE INDEX … ON ONLY track_event` on the parent. It reads no data and doesn't block writes. The parent index stays invalid for now.
- **T4** (Java migration) handles only empty partitions at startup, such as next month's pre-created partition and the default partition. Partitions that hold data are skipped, so startup never builds a large index and never fails because of it.
- **Background backfill**: a background job builds the partitions that hold data, one at a time, off-peak. Once every partition is attached, the parent index becomes valid automatically.

Queries keep working throughout. Finished partitions use the new indexes; the rest use T1's old indexes `idx_event_user_timeline` and `idx_event_distinct_timeline`, which are kept for now.

### Configuration

```yaml
mugsun:
  track:
    timeline-index:
      backfill-enabled: true   # MUGSUN_TRACK_TIMELINE_INDEX_BACKFILL_ENABLED
      pause-millis: 5000       # pause between partitions
      window-enabled: true     # MUGSUN_TRACK_TIMELINE_INDEX_WINDOW_ENABLED
      window-start: "02:00"
      window-end: "06:00"
      window-zone: Asia/Shanghai
```

- To build the indexes yourself in a maintenance window, set `backfill-enabled=false`. New and empty partitions are still handled automatically.
- A new partition is only started inside the window. A partition already in progress finishes, even past `window-end`.
- Each finished partition writes a row to `track_rollup_cursor` (`job_key = timeline_index`, `app_key` = partition name).
- T4, the backfill and the partition-maintenance job share one advisory lock, so only one instance builds at a time.

### Duration and shutdown

Each partition gets two indexes, and time grows roughly with partition size. A 3M-row (507 MB) monthly partition took about 40 seconds in testing; a 100M-row month takes roughly 20 to 30 minutes, and longer under write load. Check the log line `时间线索引后台补建：分区 … 完成（… ms）` for real numbers.

Stopping the app cancels the index build in progress. The next run drops the invalid index left behind and rebuilds it, with no manual cleanup.

The job turns off `statement_timeout` in its own session. If a database role or PgBouncer enforces a statement timeout anyway, large partitions get killed again and again. In that case, lift the timeout for the tracking database connection, or turn off the backfill and build the indexes by hand.

::: details Check progress per partition
Child indexes already attached:

```sql
SELECT p.relname AS parent_index, t.relname AS partition, ci.relname AS child_index, x.indisvalid
FROM pg_inherits i
JOIN pg_class p  ON p.oid = i.inhparent
JOIN pg_class ci ON ci.oid = i.inhrelid
JOIN pg_index x  ON x.indexrelid = i.inhrelid
JOIN pg_class t  ON t.oid = x.indrelid
WHERE p.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline')
ORDER BY 1, 2;
```

Partitions not attached yet, which the background job still has to build:

```sql
SELECT p.relname AS parent_index, part.relname AS partition
FROM pg_class p
CROSS JOIN pg_inherits pi
JOIN pg_class part ON part.oid = pi.inhrelid
WHERE p.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline')
  AND pi.inhparent = 'track_event'::regclass
  AND NOT EXISTS (
    SELECT 1 FROM pg_inherits ii JOIN pg_index x ON x.indexrelid = ii.inhrelid
    WHERE ii.inhparent = p.oid AND x.indrelid = part.oid)
ORDER BY 1, 2;
```

Partitions the backfill has finished:

```sql
SELECT app_key AS partition, last_bucket AS done_at
FROM track_rollup_cursor WHERE job_key = 'timeline_index' ORDER BY 1;
```
:::

### Is flyway repair needed?

Not when upgrading from a released version. T3 and T4 are new migrations, and `T2` is the UV backfill backup table.

Only a database that ran a pre-merge preview build of boot#25 needs attention. Startup on such a database fails validation or reports an ignored migration.

::: warning Don't use flyway repair
It would rewrite the old row as the new T2, and the UV backup table would never be created.
:::

::: details Delete the old migration rows
Run this SQL against the tracking database, the one `mybatis-flex.datasource.track.url` points to. The main database also has a `flyway_schema_history` with versions 2, 3 and 4, and connecting to the wrong one deletes its migration history.

```sql
-- 1) Confirm you are on the tracking database (track_event exists)
SELECT current_database(), to_regclass('track_event') IS NOT NULL AS is_track_db;

-- 2) See which rows would be deleted (script should start with T)
SELECT installed_rank, version, description, script, success
FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));

-- 3) Delete once confirmed
DELETE FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));
```

T4 is a Java migration, so its `script` column is the class name `db.track.migration.T4__…`. If step 2 doesn't list T4, confirm it is on the tracking database, then delete it separately: `… WHERE version = '4' AND script LIKE 'db.track.migration.T4%'`.

On restart, T2, T3 and T4 run in order. All three are safe to re-run.
:::

## Device limit on the user timeline

When you look up a timeline by user ID, it merges at most the 1000 most recently active anonymous devices. Beyond that, the API returns `devicesTruncated: true` and `deviceCount`, and the admin "User lookup" page shows a hint. Look the user up by visitor ID instead.

## Next steps

- [Tracking overview](/en/track/)
- [Install and initialize](/en/track/install)
