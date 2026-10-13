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

**Retention**: a new-user retention grid. A visitor joins the cohort of the day they were first active (UTC day boundary). Rows are cohort dates with their size; columns D+0, D+1, … show the share of that cohort active again N days later, with darker cells meaning higher retention. Choose the last 7, 14 or 30 days; lookback is capped at 30 days so users active before that are not miscounted as new. Days are bucketed by server receive time, not client time, so D+1 and later only fill in after several consecutive days of real traffic. No screenshot here: the demo data covers a single day, so the grid only has D+0.

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
| `POST /track/collect` | Batched events (gzip or plain JSON) |
| `GET /track/config` | Remote SDK configuration |
| `POST /track/replay` | Replay chunks |
| `POST /track/api-body` | Response bodies (separate channel) |
| `POST /track/visual/draft` | Visual-tagging drafts |

`/track/*` endpoints are anonymous. The `appKey` is visible in the browser and isn't a secret; the server relies on existence checks, rate limiting, back-pressure and event validation.

## Dashboard trend

When you pick 3 days or more, the overview visit trend has one point per day, and the x-axis always shows every day in the range (UTC dates). A day with no data is drawn as 0 instead of being skipped (since [mugsun-boot #28](https://github.com/mugsun/mugsun-boot/pull/28)). For 1–2 days the chart uses 5-minute points and only shows periods that have data.

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

## Next

[Install & setup](/en/track/install) → [Your first event](/en/track/first-event) → [Plugins](/en/track/plugins) → [Privacy](/en/track/privacy)
