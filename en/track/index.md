# Analytics overview

The browser SDK [`@mugsun/track-web`](https://www.npmjs.com/package/@mugsun/track-web) collects events and sends them to the mugsun backend. You read the results on the Tracking pages of the admin console.

The data is stored in the backend's tracking database and does not pass through any third-party service. The screenshot below is session replay in the admin console.

![The Session Replay page in the admin console](/readme/track-replay-en.png)

## Where to start

<div class="ms-cards">

- [Install & setup](/en/track/install) Install the SDK and see every method and option.
- [Your first event](/en/track/first-event) From setup to the first event on the dashboard.
- [Plugins](/en/track/plugins) What is collected by default, and how to register replay and API monitoring.
- [Privacy](/en/track/privacy) The SDK's default behavior and what to confirm before you add it.

</div>

## Add the SDK

```bash
pnpm add @mugsun/track-web
```

```ts
import { createTracker } from '@mugsun/track-web'

const tracker = createTracker({
  endpoint: 'https://your-host', // the backend address, without a path
  appKey: 'your-app-key',        // create it under Tracking → Integration
})

tracker.track('button_click', { name: 'buy' })
```

Once the tracker is created, page views, clicks and errors are collected automatically. Use `tracker.track()` to send your own events.

When the backend is the [microservice edition](/en/cloud/), set `endpoint` to the address of the gateway.

## How the data flows

<div class="ms-flow ms-flow--3">

1. The SDK collects events in the browser, writes them to IndexedDB and sends them in batches.
2. The backend's `/track/collect` receives the events, removes duplicates and writes them to the `mugsun_track` database.
3. The Tracking pages in the admin console query the backend and show dashboards and replays.

</div>

Analytics data lives in its own `mugsun_track` database, separate from the business database.

## What is collected

| Plugin | Default | What it collects |
| --- | --- | --- |
| `pageviewPlugin` | On | First load and route changes |
| `pageleavePlugin` | On | Time spent on a page |
| `autocapturePlugin` | On | Clicks and other interactions |
| `exposurePlugin` | On | Element exposure |
| `webVitalsPlugin` | On | Web Vitals performance metrics |
| `errorPlugin` | On | JS errors, resource load errors and unhandled promise rejections |
| `apiMonitorPlugin` | Off | Request method, URL, status code and duration |
| `replayPlugin` | Off | Session replay, built on rrweb |
| `visualTrack` | Off | Visual tagging: matches elements by rules sent from the admin console |
| `geoPlugin` | Off | Precise location. Triggers the browser's location prompt |

Plugins that are off by default must be registered by you. See [Plugins](/en/track/plugins).

You can change the sampling rate under [Integration](/en/track/apps) in the admin console. The SDK fetches these settings at startup, so the frontend needs no new release.

## Read the results in the admin console

The Tracking menu has these pages:

| Purpose | Pages |
| --- | --- |
| Traffic | [Overview, Event Analysis](/en/track/overview) |
| Conversion | [Funnel Analysis, Retention Analysis](/en/track/funnel-retention) |
| Performance and errors | [Performance Analysis, Error Monitoring](/en/track/perf-errors) and [Error Issues](/en/track/error-issues) |
| Replaying what a user did | [Session Replay, User Drilldown](/en/track/replay) |
| Asking in natural language | [Ask data](/en/track/ask) |
| Viewing by location | [Spatial behavior](/en/track/spatial) |
| Managing apps and collection settings | [Integration](/en/track/apps) |

The screenshot below is the Performance Analysis page.

![The Performance Analysis page](/readme/track-perf-en.png)

## How the dashboards count {#dashboard-trend}

- Each day starts at 00:00 in the local time zone. The default zone is `Asia/Shanghai`. Change it with `MUGSUN_TRACK_TIMEZONE`.
- A daily trend chart shows every day in the selected range. Days without data show 0.
- Daily UV is the number of distinct devices on that day.
- A source is the host name of the referring page. Direct visits and navigation within the same site have no source.

You can also set the time zone per tenant with `mugsun.track.timezone.tenants`.

## When the network drops or the page closes

- Events are written to IndexedDB first and sent again after a network failure or a reload.
- The SDK normally sends with `fetch` and falls back to XHR when the network fails. When the page is hidden or closing, it tries `sendBeacon` first.
- Every event carries an `event_id`. The server removes duplicates by it, so resending creates no duplicate data.

## Server endpoints

| Endpoint | Purpose |
| --- | --- |
| <span style="white-space:nowrap">`POST /track/collect`</span> | Receives events in batches |
| <span style="white-space:nowrap">`GET /track/config`</span> | Serves the SDK's remote settings |
| <span style="white-space:nowrap">`POST /track/replay`</span> | Receives replay data |
| <span style="white-space:nowrap">`POST /track/api-body`</span> | Receives API response bodies |
| <span style="white-space:nowrap">`POST /track/visual/draft`</span> | Saves visual tagging drafts |

`/track/*` needs no sign-in. The `appKey` is visible in the browser. It only identifies the app and must not be used as a secret.

::: details The admin console's own analytics
The admin console uses this SDK too, so the Overview page includes its own traffic.

By default it reports request errors that were already shown to the user, such as failed business validation and network failures. Requests that the user cancelled are not reported.

Set `VITE_TRACK_SKIP_HANDLED_ERRORS=true` at build time to stop reporting these errors.
:::

## Current limits

- Browsers only.
- It can only report to a mugsun backend. There is no hosted cloud service.
- Replay does not record canvas.

## Next steps

<div class="ms-cards">

- [Error issues](/en/track/error-issues) Errors grouped by fingerprint, which you can assign, resolve and reopen.
- [Ask analytics](/en/track/ask) Query your own analytics data in natural language. Read-only.
- [Spatial behavior](/en/track/spatial) View heat cells or individual points by precise coordinates.
- [Upgrade guide](/en/track/upgrade) Three things that may need your attention after you upgrade the backend's tracking module.

</div>
