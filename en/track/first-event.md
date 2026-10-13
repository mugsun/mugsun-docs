# Your first event

Goal: go from integration to **at least one** event on a console dashboard.

## Before you start

- boot is running with the track module enabled (the default `full` profile includes it, and `MUGSUN_TRACK_ENABLED` is not `false`)
- You can sign in to the console (see [Getting started](/en/guide/getting-started))

## Steps

1. **Create an app**: in the console, open **Analytics → Integrations** (埋点分析 → 接入管理), create an app and copy its `appKey`.
2. **Initialize the SDK**:

   ```ts
   import { createTracker } from '@mugsun/track-web'

   const track = createTracker({
     endpoint: 'http://localhost:8080',
     appKey: '<appKey>',
     debug: true, // log SDK activity; turn off when done
   })
   ```

3. **Fire an event**: reload the page to get a `pageview`, or send one yourself:

   ```ts
   track.track('first_event', { source: 'docs' })
   await track.flush() // send now instead of waiting for the batch
   ```

4. **Check**: in the network panel, `POST /track/collect` returns 2xx. Under **Analytics → Events**, pick your app; the new event shows up in the list and in the live stream below it.

   ![Events (demo data)](/screenshots/track-event.png)

## No events?

| Symptom | What to check |
| --- | --- |
| No `/track/collect` requests at all | The browser has Do Not Track on (`respectDnt` defaults to `true`), `optOut()` was called, or `enabled: false` / a sample rate of 0 is set |
| Requests go to `…/track/collect/track/collect` | Set `endpoint` to the base URL only; the SDK appends `/track/collect` |
| 4xx responses | The `appKey` doesn't exist or the app is disabled; check Integrations |
| Requests succeed but the dashboard is empty | Make sure the right app and time range are selected |

## Next

[Plugins](/en/track/plugins) · [Privacy](/en/track/privacy)
