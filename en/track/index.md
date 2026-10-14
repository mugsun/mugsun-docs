# Track overview

mugsun track is **embedded** product analytics: the browser SDK [`@mugsun/track-web`](https://www.npmjs.com/package/@mugsun/track-web) collects events, boot's track module ingests them, and the console's Analytics section shows the dashboards. Collection, storage and analysis all run in your deployment, with no hosted account involved.

<p align="center">
  <img src="/brand/arch/track-iso-en.jpg" alt="Analytics data flow" width="100%" />
</p>

## Capabilities

| Area | What you get | Default |
| --- | --- | --- |
| Pages | `pageview` and `pageleave`; route-template grouping with Vue Router | On |
| Interaction | `autocapture`, viewable `exposure`, the declarative `v-track` directive | On |
| Quality | Web Vitals and JS errors (with `release` and a fingerprint) | On |
| Session replay | rrweb-based, separate `@mugsun/track-web/replay` entry, uploads sampled per session | Register the plugin and set `replayEnabled` |
| API monitoring | Request metadata, with optional response-body capture and masking | Register the plugin and turn it on |
| Visual tagging | Rules defined in the console; matching elements are reported | Register the plugin |
| Geolocation | Precise location | Register the plugin and set `geoEnabled` |

## Dashboards

The console's Analytics section has Overview, Events, Performance, Errors, Integrations, Session replay, User lookup, Funnels and Retention.

The screenshots below come from a local boot + pc run. The data was reported for real by a demo shop page through `@mugsun/track-web` 0.2.0 (about 110 visitors, all on the same day). The console UI is shown in Chinese.

**Overview**: page views, visitors, sessions, events, average session duration and bounce rate, plus top pages and source, device and browser breakdowns. A session settles after 30 minutes of silence; duration and bounce rate count settled sessions only. The overview API returns `cards.settledSessionCount`, the number of settled sessions in the range; while it is 0 those two figures are not final yet, and the dashboard shows "—" instead of 0.

![Overview (demo data)](/screenshots/track/track-overview.png)

**Events**: counts, sessions and UV per event name. Names starting with `$` are built-in; the rest are custom events or events produced by visual-tagging rules.

![Events (demo data)](/screenshots/track/track-event.png)

**Funnels**: pick 2–5 ordered steps and a conversion window to see users per step, step-to-step and overall conversion.

![Funnels (demo data)](/screenshots/track/track-funnel.png)

**Performance**: P75 and percentile breakdown for each Web Vitals metric, rated good / needs improvement / poor against thresholds.

![Performance: Web Vitals collected for real under throttling (Fast-3G-like network, 4x CPU slowdown). INP only records interactions of 40 ms or longer; the demo page's clicks are all light, so it has no samples and shows "-". The metrics were measured by the browser under throttling; reporting was triggered by a script simulating the page becoming hidden (demo data)](/screenshots/track/track-perf.png)

**Errors**: JS errors grouped by fingerprint with counts, affected sessions and first/last seen; drill down to occurrences and linked replays.

![Errors (demo data)](/screenshots/track/track-error.png)

**Retention**: a new-user retention grid. A visitor joins the cohort of the day they were first active (days start at midnight in the tenant timezone, `Asia/Shanghai` by default). Rows are cohort dates with their size; columns D+0, D+1, … show the share of that cohort active again N days later, with darker cells meaning higher retention. Choose the last 7, 14 or 30 days; lookback is capped at 30 days so users active before that are not miscounted as new. Days are bucketed by server receive time, not client time, so D+1 and later only fill in after several consecutive days of real traffic. No screenshot here: the demo data covers a single day, so the grid only has D+0.

Session replay and visual tagging screenshots are in
**Session replay**: sessions listed with start time, duration, page count (SPA route changes included), event count, size and whether they contain errors. Filter to sessions with errors, and play one from the action column.

![Session replay list (demo data)](/screenshots/track/track-replay-list.png)
 [Plugins · Session replay](/en/track/plugins#session-replay) and [Plugins · Visual tagging and geolocation](/en/track/plugins#visual-tagging-and-geolocation).

## Reliability

- Events queue in IndexedDB and are retried with exponential backoff after a network loss or reload; the queue is capped by size and age.
- Transport falls back from `sendBeacon` to `fetch` keepalive to `XHR`, and the queue is flushed when the page is hidden or on `pagehide`.
- Every event has a stable `event_id`, so the server can deduplicate.
- A build gate keeps the gzipped `dist/core.js` under 8 KB.

## Server endpoints

| Endpoint | Purpose |
| --- | --- |
| `POST /track/collect` | Batched events (gzip or plain JSON); the SDK adds `app_key` to the query for rejection attribution |
| `GET /track/config` | Remote SDK configuration |
| `POST /track/replay` | Replay chunks |
| `POST /track/api-body` | Response bodies (separate channel) |
| `POST /track/visual/draft` | Visual-tagging drafts |

`/track/*` endpoints are anonymous. The `appKey` is visible in the browser and isn't a secret; the server relies on existence checks, rate limiting, back-pressure and event validation.

## Dashboard trend

When you pick 3 days or more, the overview visit trend has one point per day, and the x-axis always shows every day in the range. A day with no data is drawn as 0 instead of being skipped (since [mugsun-boot #28](https://github.com/mugsun/mugsun-boot/pull/28)). For 1–2 days the chart uses 5-minute points and only shows periods that have data.

The trend chart and the error monitoring list cut days in the tenant's timezone, so "today" starts at local midnight (since [mugsun-boot #31](https://github.com/mugsun/mugsun-boot/pull/31); before that days were cut in UTC, so at UTC+8 a new day only began at 8 a.m.). The default is `Asia/Shanghai`. You can change it globally or per tenant ID:

```yaml
mugsun:
  track:
    timezone:
      default-zone: Asia/Shanghai   # or env MUGSUN_TRACK_TIMEZONE
      tenants:
        "[000000]": Asia/Shanghai   # keys need brackets and quotes
```

Since [mugsun-boot #36](https://github.com/mugsun/mugsun-boot/pull/36), overview cards, pages, performance, funnels and retention cut days in the same timezone, and since [mugsun-boot #46](https://github.com/mugsun/mugsun-boot/pull/46) so do the event list under event analysis and the geo map. "Today" starts at local midnight on every dashboard.

What counts differently:

- **UV**: each day's UV in the daily trend is the number of distinct devices (`distinct_id`) in that local day. Days used to be UTC days, and a dimension trend (events, pages and so on) without a specific value used to add up the UV of each value, so a device that visited several pages was counted several times. It is now deduplicated per device. The UV on the overview cards was already deduplicated per device over the whole range and is unchanged.
- **Sessions**: the session count on the overview cards is the sum of each local day's active sessions.
- **Funnels**: the window used to be a rolling last N×24 hours. It now starts at local midnight of the first day, so "last 1 day" means midnight today until now, and numbers early in the local morning are smaller than before.
- **Retention**: first-visit and return days are local dates, so a first visit at 23:59 and a return at 00:01 the next day counts as day-2 retention. The retention response includes `zone` (the IANA timezone in effect) and `today` (the local date, `yyyy-MM-dd`).
- **Day limits**: retention always reads raw events (plus a 30-day look-back to tell new visitors apart), so `days` above 30 is clamped to 30 rather than rejected; the response then has `clamped: true` and `days` is the value actually used. Missing or below 1 means 7. Funnels accept `days` 1–30 and the trend and other analytics endpoints 1–90; values outside those ranges return an error.

When the timezone isn't UTC, the daily trend, overview cards and performance are counted straight from raw events (the daily summary tables use UTC days), which is slower on large data sets.

## Upgrading: backfill historical UV

Dashboard UV (unique visitors) counts one per device ID (`distinct_id`). After upgrading from 0.1.0, today's numbers and every daily summary built from then on use this rule, but days that were already summarized before the upgrade still use the old one, so past days on the trend chart won't match. Run the backfill once:

- **What changes**: only rows in `track_stats_day` whose `uv` differs from the recomputed value. No other column changes and no rows are added. Days whose raw events are already past retention (no events left for that day) keep their old value.
- **Backup first**: before a row changes, its old value goes into `track_stats_day_uv_backup` (created by the new `T2` migration). You can restore a whole run using the `run_id` from the log.
- **Safe to re-run**: a second run leaves rows that already match alone.
- **Range**: the last 90 complete days by default (UTC, not including today), newest first. Change it with `MUGSUN_TRACK_UV_BACKFILL_DAYS` (1–3660).

### Load on the production database

- Each app-and-day is one transaction that scans that day's raw events once, with `statement_timeout` set to 120 seconds and `work_mem` to 256MB by default (`MUGSUN_TRACK_UV_BACKFILL_WORK_MEM`). It pauses 300 ms between days by default (`MUGSUN_TRACK_UV_BACKFILL_SLEEP_MILLIS`).
- If one app-and-day hits a database error (a 57014 timeout, or an occasional deadlock, lock wait or dropped connection), only that day is rolled back and a WARN with the SQLState is logged. That app's progress isn't advanced and its remaining days wait for the next run, while other apps carry on. If the same app and day keeps timing out, raise the limit for that app alone. The key must be in brackets:

  ```yaml
  mugsun:
    track:
      uv-backfill:
        app-statement-timeout:
          "[MyApp_1]": 600s
  ```
- By default it only runs **between 02:00 and 07:00 Beijing time** and pauses when the window ends. Progress is stored in `track_rollup_cursor` (`job_key = uv_backfill`), so the next run picks up where it stopped. Set `MUGSUN_TRACK_UV_BACKFILL_WINDOW_ENABLED=false` to remove the time limit.
- It holds its own Redis lock and renews it after each day, so with several instances only one runs at a time. **If Redis is unavailable it doesn't run.**

### Trial run before production

1. On a replica, run `EXPLAIN (ANALYZE, BUFFERS)` for one day of a large app. Run `SET work_mem = '256MB'` first, then check that it reads a single monthly partition. A default database has no `app_key, received_at` index, so a BRIN bitmap scan or a sequential scan of that one partition is normal. Use the run time, temp I/O and shared reads to decide whether you need an index. The query is in `docs/upgrade/track-uv-backfill.md` in the boot repository.
2. Try one day on a small app: `{"days": 1, "appKey": "small-app"}`. Run it again with the same parameters; the log should report 0 rows changed.
3. Then run the default 90 days off-peak.

The migration doesn't create an index. If you need one, create it off-peak with `CREATE INDEX CONCURRENTLY` on each monthly partition you're backfilling. It's a temporary index for the backfill only: it isn't attached to the parent, new partitions won't have it, and you drop it afterwards. A failed concurrent build leaves an INVALID index, so check `pg_index.indisvalid`; if it's false, run `DROP INDEX CONCURRENTLY` and build it again. The full steps and SQL are in `docs/upgrade/track-uv-backfill.md` in the boot repository.

### Running it

**Don't turn on `on-startup` during peak hours.** Pick one:

1. In PowerJob, create a job with processor `com.mugsun.boot.track.powerjob.TrackUvBackfillProcessor` and **schedule it daily at 02:05 until the log shows `UV 回填完成`**, then disable it. PowerJob reports success only when everything is done; outside the window, paused at the window's end, lock lost, or any day timed out all show as not completed (failed), and the next scheduled run resumes. Leave the parameters empty, or pass `{"days": 180}` or `{"days": 30, "appKey": "your-app"}`.
2. Without PowerJob, set `MUGSUN_TRACK_UV_BACKFILL_ON_STARTUP=true` and restart off-peak. When the log shows `UV 回填完成：run_id=...`, set it back to `false`.

### Restore and clean up

```sql
-- Restore one run
UPDATE track_stats_day d SET uv = b.old_uv, update_time = now()
FROM track_stats_day_uv_backup b
WHERE b.run_id = 'run_id from the log' AND d.id = b.stats_day_id;

-- Once you're satisfied, clean up the backup
DELETE FROM track_stats_day_uv_backup WHERE backup_time < now() - interval '30 days';
```

## Upgrading: user timeline indexes (T3 / T4)

The user timeline pages by event time `(ts, id)`, newest first. It needs two new indexes: `idx_event_user_ts_timeline (app_key, user_id, ts, id)` and `idx_event_distinct_ts_timeline (app_key, distinct_id, ts, id)`. `track_event` is partitioned by month, so they are built in two steps:

- **T3** (SQL migration) only runs `CREATE INDEX … ON ONLY track_event` on the parent. It reads no data, does not block writes and finishes instantly. The parent index stays invalid for now.
- **T4** (Java migration, runs outside a transaction) handles only **empty partitions** at startup, such as next month's pre-created partition and the default partition. It runs `CREATE INDEX CONCURRENTLY` on each one and attaches it once `pg_index.indisvalid` is true. **Partitions that hold data are skipped, so startup never builds a large index.** T4 never fails startup: if it can't get the lock, hits an error, or leaves partitions pending, it logs a WARN listing the partitions.
- **Background backfill**: a background job fills in the existing partitions one at a time during off-peak hours. The hourly partition-maintenance tick triggers it, and it runs on its own thread so it doesn't block the scheduler. Once every partition is attached, the parent index becomes valid automatically. Queries keep working throughout: finished partitions use the new indexes and the rest use T1's old ones.
- **Old indexes**: T1's `idx_event_user_timeline` and `idx_event_distinct_timeline` are kept for now.

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

- With `backfill-enabled=false`, existing partitions are not backfilled. T4 and the partition job still handle new and empty partitions. Turn it off if you'd rather build the indexes yourself in a maintenance window.
- A new partition is only **started** inside the window. A partition already in progress finishes, even if that runs past `window-end`.
- Each finished partition writes a row to `track_rollup_cursor` (`job_key = timeline_index`, `app_key` = partition name). After an interruption, the job picks up from the current state in `pg_index`. Any invalid index left behind is dropped with `DROP INDEX CONCURRENTLY` and rebuilt.
- T4, the backfill and the partition job share one session-level PG advisory lock (`hashtext('track_timeline_index')`), so only one instance builds at a time.

### Expected duration

Each partition gets two indexes, and each index scans the partition twice, so time grows roughly with partition size. On a Mac mini with an idle PG 16, a 3M-row (507 MB) monthly partition took 27 s for the `user_id` index and 11 s for the `distinct_id` index, about 40 s in total. At that rate a 100M-row month takes roughly 20–30 minutes, and longer under production write load. Check the log line `时间线索引后台补建：分区 … 完成（… ms）` for real numbers. Each build temporarily needs extra disk and IO roughly the size of the index.

### Connection requirements

The tracking database's Flyway lock and the advisory lock above are **session-level** locks. Connect to PostgreSQL directly or through PgBouncer in **session** mode. **PgBouncer transaction pooling is not supported.** When several instances start together, late starters wait up to about 10 minutes for the migration lock (`lockRetryCount = 600`).

### Checking progress

Parent index status (`indisvalid = t` means every partition is attached):

```sql
SELECT c.relname AS parent_index, x.indisvalid
FROM pg_index x JOIN pg_class c ON c.oid = x.indexrelid
WHERE c.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline');
```

Child indexes attached to each parent, read from `pg_inherits` rather than guessed from names:

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

### Shutdown and timeouts

- **Stopping the app interrupts the backfill.** On shutdown the job stops, cancels any running `CREATE INDEX CONCURRENTLY`, and does not start another partition. The interrupted partition is left with an invalid index, which the next run drops and rebuilds. No manual cleanup is needed.
- **Precondition: no global `statement_timeout`.** The job runs `SET statement_timeout = 0` in its own session and `RESET`s it afterwards. If a role, database or PgBouncer setting enforces a statement timeout that overrides the session, large partitions get killed partway and retried forever. In that case lift the timeout for the tracking database connection, or turn the backfill off and build the indexes by hand in a maintenance window.
- When you look up the user timeline by user ID, it merges at most the 1000 most recently active anonymous devices. Beyond that, the API returns `devicesTruncated: true` and `deviceCount`; look the user up by visitor ID instead. The admin "User lookup" page shows the same hint above the timeline.

### Is flyway repair needed?

**No**, not when upgrading from a released version. T3 and T4 are new migrations, and `T2` is the UV backfill backup table.

Only a database that ran a pre-merge preview build of boot#25 needs attention. Its `flyway_schema_history` has a `2 | track event timeline index` row, or a 3/4 row recorded without the UV backup T2, so startup fails validation or reports an ignored migration. **Don't use `flyway repair`**: it would rewrite the old row as the new T2, and the UV backup table would never be created.

Instead, delete those history rows and restart. **Run the SQL below against the tracking database, the one `mybatis-flex.datasource.track.url` points to, not the main database.** The main database also has a `flyway_schema_history` with versions 2/3/4, and connecting to the wrong one deletes its migration history. Confirm with a SELECT first:

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

T4 is a Java migration, so its `script` column is the class name `db.track.migration.T4__…` and does not start with `T`. If step 2 doesn't list T4, confirm it really is on the tracking database, then delete it separately: `… WHERE version = '4' AND script LIKE 'db.track.migration.T4%'`.

On restart T2, T3 and T4 run in order. All three are safe to re-run: existing indexes and partitions that are already attached are skipped.

## Next

[Install & setup](/en/track/install) → [Your first event](/en/track/first-event) → [Plugins](/en/track/plugins) → [Privacy](/en/track/privacy)
