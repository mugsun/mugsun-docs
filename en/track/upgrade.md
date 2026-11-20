# Upgrade guide

After the backend is upgraded from 0.1.0, migrations update the tracking database schema at startup, and most deployments need no manual work. This page covers the three things outside the migrations that may need your attention.

| What to do | Who needs it |
| --- | --- |
| [Backfill historical UV](#backfilling-historical-uv) | Deployments whose dashboard time zone is UTC |
| [Confirm the timeline indexes are built](#user-timeline-indexes) | Every deployment; usually a quick look is enough |
| [Clean up old migration records](#cleaning-up-old-migration-records) | Databases that ran a preview build and now fail migration validation at startup |

Changes in the SDK from 0.2.0 to 0.3.0 are not on this page; see [Privacy](/en/track/privacy#upgrading-from-0-2-0-and-keeping-the-old-masking).

## Before you upgrade

The tracking database supports PostgreSQL only. Check how you connect to it before upgrading:

- The connection to the tracking database must go straight to PostgreSQL, or through PgBouncer in session mode.
- When several nodes start at the same time, the later ones wait for the first to finish migrating, for up to about 10 minutes.

::: warning PgBouncer transaction mode is not supported
The migration lock and the index-building lock of the tracking database are both session-level, which is unreliable in transaction mode.
:::

On the first start after the upgrade, the tracking database runs these migrations in order:

| Migration | What it does |
| --- | --- |
| T2 | Creates the backup table `track_stats_day_uv_backup`, which keeps the old values during the UV backfill |
| T3 | Creates two timeline indexes on the parent table `track_event`; no data scan, no write lock |
| T4 | Attaches the indexes on empty partitions. Partitions with data are skipped at startup and left to the background job |
| T5 | Creates the table `track_error_issue` for [error issues](/en/track/error-issues) |

Main-database migrations V18 to V20 add the permissions for error issues, Ask analytics and spatial behavior. Roles that already have the Error Monitoring or Overview permission receive them automatically.

Deployments that turned off `mugsun.track.flyway-enabled` must run the SQL of T2, T3 and T5 by hand. T4 does not run; the background job builds the partition indexes.

## Backfilling historical UV

UV is now de-duplicated by device, that is, by `distinct_id`. Days that were rolled up before the upgrade still use the old calculation, which merged devices by signed-in user.

The backfill recomputes the UV of those days from the detail rows, so that the trend chart is consistent before and after.

Only deployments whose dashboard time zone is UTC need it. The default `Asia/Shanghai` and every other time zone count from the detail rows and never read the rollup table, so they can skip this section.

| Setting | Purpose |
| --- | --- |
| `mugsun.track.timezone.default-zone` | The default dashboard time zone |
| `mugsun.track.timezone.tenants` | A time zone for individual tenants |

<div class="ms-steps">

### Try one day on a small application

Run it once at off-peak with the parameters below. Run it again with the same parameters, and the summary line in the log should report zero changed rows.

```json
{"days": 1, "appKey": "small-app-key"}
```

### Run the full range

When that looks right, run it without parameters; the default is the last 90 days. Pick one of the two ways, and do not use the second one at peak hours:

| Way | How | When it is done |
| --- | --- | --- |
| PowerJob | Create a job with the processor class below and schedule it daily at 02:05 | Disable the job once the log shows the completion line |
| At startup | Set `MUGSUN_TRACK_UV_BACKFILL_ON_STARTUP=true` and restart at off-peak | Set it back to `false` once the log shows the completion line |

```text
com.mugsun.boot.track.powerjob.TrackUvBackfillProcessor
```

### Check the result

Every run writes one summary line to the log, in Chinese. Everything is done only when the line starts as below, which reads "UV backfill complete", followed by the batch ID and the number of changed rows:

```text
UV 回填完成：run_id=uvbf-20261120T180500Z-1a2b，应用 3 个，重算 270 天（有日表行但明细已清理、保留原值 0 天），改动 1520 行（旧值已备份到 track_stats_day_uv_backup）
```

PowerJob shows success only when the whole backfill has finished. A run outside the window, a pause at the end of the window and a day that timed out all show as failed.

A failure here only means there is more to do; the next scheduled run continues from where it stopped.

</div>

PowerJob job parameters can be left empty, or name a number of days, or a single application:

```text
{"days": 180}
{"days": 30, "appKey": "your-app-key"}
```

### What it changes

| Item | Notes |
| --- | --- |
| Data changed | Only the `uv` column of `track_stats_day`, and only rows whose value differs from the recomputed one |
| Left alone | Other columns such as page views and session counts; no rows are added |
| Days whose detail rows are already purged | Keep their value; they are not set to 0 |
| Backup | Before a row changes, its old value goes into `track_stats_day_uv_backup` with the `run_id` of the batch |
| Running it again | Rows that already match are not changed and not backed up again |
| Range | The last 90 days by default, today excluded. Set with `MUGSUN_TRACK_UV_BACKFILL_DAYS`, 1 to 3660 |

### Impact on a live database

The backfill handles one "application × day" at a time; each is one transaction that scans that day's detail rows once.

| Limit | Default | How to change |
| --- | --- | --- |
| Run window | 02:00 to 07:00 Beijing time | `MUGSUN_TRACK_UV_BACKFILL_WINDOW_ENABLED=false` removes the limit |
| Timeout of one transaction | 120 seconds | The setting `mugsun.track.uv-backfill.statement-timeout-seconds` |
| Memory for sorting | 256MB | `MUGSUN_TRACK_UV_BACKFILL_WORK_MEM` |
| Pause between two units | 300 ms | `MUGSUN_TRACK_UV_BACKFILL_SLEEP_MILLIS` |

At the end of the window it pauses by itself and continues from there next time. Progress is kept in the `track_rollup_cursor` table.

Only one instance runs at a time, which a Redis lock guarantees. When Redis is unavailable, the backfill does not run.

When one day of one application times out or deadlocks, only that day is rolled back and a warning is logged. The remaining days of that application wait for the next run; other applications carry on.

If the same application keeps timing out, give it alone a longer timeout:

```yaml
mugsun:
  track:
    uv-backfill:
      app-statement-timeout:
        "[MyApp_1]": 600s
```

The key must be written in quoted square brackets; otherwise an AppKey with dots, underscores or capital letters may not match.

::: details Checks before running on a large database
1. On a replica, run `EXPLAIN (ANALYZE, BUFFERS)` for one day of a large application, after setting `work_mem` to 256MB.
2. Confirm that only the month partition of that day is scanned. A BRIN bitmap scan or a sequential scan of one partition is normal.
3. If the time is close to the timeout, or a lot of temporary files are read and written, raise `work-mem` first, or give this application a longer timeout.
4. If that is still not enough, build a temporary index on the month partitions to backfill with `CREATE INDEX CONCURRENTLY`, and drop it afterwards.
5. A failed concurrent build leaves an invalid index. When `indisvalid` is false, drop it and build again.

The query and the full steps are in [track-uv-backfill.md](https://github.com/mugsun/mugsun-boot/blob/main/docs/upgrade/track-uv-backfill.md) in the backend repository; that file is in Chinese.
:::

### Restore and clean up

```sql
-- Restore one batch by the run_id from the log
UPDATE track_stats_day d SET uv = b.old_uv, update_time = now()
FROM track_stats_day_uv_backup b
WHERE b.run_id = 'run_id from the log' AND d.id = b.stats_day_id;

-- Clean up the backup once everything looks right
DELETE FROM track_stats_day_uv_backup WHERE backup_time < now() - interval '30 days';
```

If you run the backfill again after a restore, the data goes back to the result of the new calculation.

## User timeline indexes

The timeline in User Drilldown needs two new indexes. They are built automatically after startup, so normally there is nothing to do by hand except confirming that they are complete:

```sql
SELECT c.relname AS parent_index, x.indisvalid
FROM pg_index x JOIN pg_class c ON c.oid = x.indexrelid
WHERE c.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline');
```

When `indisvalid` is `t` in both rows, the indexes are complete.

### How the indexes get built

`track_event` is partitioned by month, and creating an index directly on the parent table would block writes, so it happens in three steps:

<div class="ms-flow ms-flow--3">

1. T3 only registers the indexes on the parent table, without scanning data. At this point the parent indexes are still invalid.
2. T4 handles the empty partitions at startup and skips every partition with data, so startup is not slowed down.
3. The background job builds the partitions with data one by one at off-peak. When all are done, the parent indexes become valid automatically.

</div>

Queries keep working in the meantime: finished partitions use the new indexes, the others use the old ones. The old indexes are not dropped this time.

### Configuration

```yaml
mugsun:
  track:
    timeline-index:
      backfill-enabled: true   # MUGSUN_TRACK_TIMELINE_INDEX_BACKFILL_ENABLED
      pause-millis: 5000       # pause between two partitions
      window-enabled: true     # MUGSUN_TRACK_TIMELINE_INDEX_WINDOW_ENABLED
      window-start: "02:00"
      window-end: "06:00"
      window-zone: Asia/Shanghai
```

- To build the indexes yourself in a maintenance window, set `backfill-enabled` to `false`. New and empty partitions are still handled automatically.
- A new partition is only started inside the run window. One that has started runs to the end, possibly past `window-end`.
- Only one instance builds at a time.

### How long it takes

Each partition gets two indexes, and the time grows roughly with the size of the partition.

| Partition size | Approximate time |
| --- | --- |
| 3 million rows, 507 MB | 40 seconds, measured on an idle PostgreSQL 16 |
| 100 million rows | 20 to 30 minutes, extrapolated; slower with live writes |

For the real figures, look at the log: one line per finished partition, with the time in milliseconds:

```text
时间线索引后台补建：分区 track_event_2026_10 完成（41250 ms）
```

Stopping the application cancels the index that is being built. An invalid index left by an interruption is dropped and rebuilt on the next run; no manual work is needed.

The job turns off the statement timeout in its own session. If the database role or PgBouncer enforces a timeout, large partitions get interrupted again and again.

In that case, lift the timeout for the tracking database connection, or turn the background job off and build by hand.

::: details Progress of each partition
Partition indexes that are already attached:

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

Partitions that are not attached yet:

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

Partitions the background job has finished:

```sql
SELECT app_key AS partition, last_bucket AS done_at
FROM track_rollup_cursor WHERE job_key = 'timeline_index' ORDER BY 1;
```
:::

## Cleaning up old migration records

Upgrading from a published version does not need this step. Only databases that ran a preview build do; the sign is that startup reports a migration validation failure, or an ignored migration.

::: warning Do not use flyway repair
repair would rewrite the old record into the new T2, and the UV backup table would then never be created.
:::

::: details Deleting the old migration records
Run the SQL below in the tracking database, the one `mybatis-flex.datasource.track.url` points to.

The main database also has a `flyway_schema_history` table, with the same version numbers 2, 3 and 4. Connecting to the wrong database deletes the migration records of the main database.

```sql
-- 1) Confirm you are connected to the tracking database; track_event should be visible
SELECT current_database(), to_regclass('track_event') IS NOT NULL AS is_track_db;

-- 2) See which SQL migration records will be deleted; script starts with T
SELECT installed_rank, version, description, script, success
FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));

-- 3) Delete after checking
DELETE FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));
```

The statements above only cover SQL migrations. T4 is a Java migration whose `script` is a class name, so query and delete it separately:

```sql
SELECT installed_rank, version, script FROM flyway_schema_history
WHERE version = '4' AND script LIKE 'db.track.migration.T4%';

DELETE FROM flyway_schema_history
WHERE version = '4' AND script LIKE 'db.track.migration.T4%';
```

After a restart, T2, T3 and T4 run in order. All three are safe to run again.
:::

## Device limit of the user timeline

When the timeline is queried by user ID, at most the 1000 most recently active anonymous devices of that user are merged.

Beyond that, the API returns `devicesTruncated: true` and `deviceCount`, and the User Drilldown page shows a hint. Query by visitor ID instead.

## Next

<div class="ms-cards">

- [Error issues](/en/track/error-issues) A page added by the upgrade: assign errors to people and follow them to resolution.
- [Install & setup](/en/track/install) How to install SDK 0.3.0, with every option.
- [Backend upgrade guide](/en/boot/upgrade) Breaking changes in the backend, and main-database migrations that may abort.

</div>
