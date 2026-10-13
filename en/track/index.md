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

![Performance: Web Vitals collected for real under throttling (Fast-3G-like network, 4x CPU slowdown). INP only records interactions of 40 ms or longer; the demo page's clicks are all light, so it has no samples and shows "-" (demo data)](/screenshots/track/track-perf.png)

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

## Next

[Install & setup](/en/track/install) → [Your first event](/en/track/first-event) → [Plugins](/en/track/plugins) → [Privacy](/en/track/privacy)
