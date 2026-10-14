# Analytics overview

The browser SDK [`@mugsun/track-web`](https://www.npmjs.com/package/@mugsun/track-web) collects events. The boot track module receives and stores them, and the console's Analytics pages show the results.

Collection, storage and analysis all happen inside your own deployment.

## Install

```bash
pnpm add @mugsun/track-web
```

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'https://example.com', // sends to {endpoint}/track/collect
  appKey: 'your-app-key',          // create it under Analytics → Integrations
})

track.track('button_click', { name: 'buy' })
```

See [Install and initialize](/en/track/install) for the full steps.

## What it collects

The default plugins collect page views, time on page, autocaptured clicks, exposures, Web Vitals and JS errors.

Session replay, API monitoring, visual tagging and geolocation need their plugins registered by hand. See [Plugins](/en/track/plugins).

## Dashboards

Analytics includes overview, events, performance, errors, session replay, user lookup, funnels and retention.

![Overview (demo data)](/screenshots/track/track-overview.png)

## Reliability

- The event queue is stored in IndexedDB and resent after a network loss or page reload.
- Sending tries `sendBeacon`, then `fetch keepalive`, then `XHR`.
- Every event carries an `event_id`, and the server drops duplicates by it.

## Server endpoints

| Endpoint | Purpose |
| --- | --- |
| <span style="white-space:nowrap">`POST /track/collect`</span> | Receive event batches |
| <span style="white-space:nowrap">`GET /track/config`</span> | Serve remote SDK settings |
| <span style="white-space:nowrap">`POST /track/replay`</span> | Receive replay data |
| <span style="white-space:nowrap">`POST /track/api-body`</span> | Receive API response bodies |
| <span style="white-space:nowrap">`POST /track/visual/draft`</span> | Save visual tagging drafts |

`/track/*` needs no login. The `appKey` is visible in the browser. It only identifies the app and is not a secret.

## Next steps

- [Install and initialize](/en/track/install)
- [First event](/en/track/first-event)
- [Plugins](/en/track/plugins)
- [Privacy](/en/track/privacy)
