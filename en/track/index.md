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

![Overview (demo data)](/screenshots/track-overview.png)

![Events and live stream (demo data)](/screenshots/track-event.png)

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

## Upgrading: backfill historical UV

Dashboard UV (unique visitors) counts one per device ID (`distinct_id`). After upgrading from 0.1.0, today's numbers and every daily summary built from then on use this rule, but days that were already summarized before the upgrade still use the old one, so past days on the trend chart won't match. Run the backfill once:

- **What changes**: only rows in `track_stats_day` whose `uv` differs from the recomputed value. No other column changes and no rows are added. Days whose raw events are already past retention (no events left for that day) keep their old value.
- **Backup first**: before a row changes, its old value goes into `track_stats_day_uv_backup` (created by the new `T2` migration). You can restore a whole run using the `run_id` from the log.
- **Safe to re-run**: a second run leaves rows that already match alone. Each SQL statement handles one app for one day, so tables aren't locked for long, and with several instances only one runs it at a time.
- **Range**: the last 90 complete days by default (UTC, not including today). Change it with `MUGSUN_TRACK_UV_BACKFILL_DAYS` (1–3660).

Run it one of two ways:

1. In PowerJob, create a job with processor `com.mugsun.boot.track.powerjob.TrackUvBackfillProcessor` and run it once by hand. Leave the parameters empty, or pass `{"days": 180}` or `{"days": 30, "appKey": "your-app"}`.
2. Without PowerJob, set `MUGSUN_TRACK_UV_BACKFILL_ON_STARTUP=true` and restart. When the log shows `UV 回填完成：run_id=...`, set it back to `false`.

To restore one run:

```sql
UPDATE track_stats_day d SET uv = b.old_uv, update_time = now()
FROM track_stats_day_uv_backup b
WHERE b.run_id = 'run_id from the log' AND d.id = b.stats_day_id;
```

## Next

[Install & setup](/en/track/install) → [Your first event](/en/track/first-event) → [Plugins](/en/track/plugins) → [Privacy](/en/track/privacy)
