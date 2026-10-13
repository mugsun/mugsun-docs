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
| Still unsure | Run the [self-check](#self-check) and look at rejection reasons under [Integration health](#admin-integration-health) |

## Self-check

Run in the browser console:

```ts
const report = await tracker.selfCheck()
console.table(report.items)
```

The report is `{ status, at, sdkVersion, items }`, where `status` is the worst item. Each item is `{ id, status: 'ok' | 'warn' | 'fail', message, fix }`:

| `id` | What it checks |
| --- | --- |
| `config.endpoint` / `config.appKey` | Valid http(s) endpoint, no stray `/track` path, no HTTPS page posting to HTTP; appKey format |
| `config.conflict` / `config.enabled` | Conflicting options (e.g. `batchSize > maxBatchSize`, API monitoring on without the `api-monitor` plugin); master switch |
| `ping` | One real `GET /track/config?app_key=` (no cookies, 5 s timeout): network/CORS, unknown app, disabled app |
| `sampling` / `consent` | Sample rate and whether this device is sampled; DNT, `optOut()` |
| `privacy` | Privacy defaults turned off (e.g. body capture on with masking off) |
| `queue` | Local queue backlog (warns at ≥80%) |
| `replay` | Replay enabled but the replay plugin isn't loaded |
| `filters` | Whether `beforeSend` / `ignoreErrors` / `skipHandledErrors` are configured |

The self-check sends no user data and queues nothing. Messages are in Chinese. The implementation is injected by `createTracker` and isn't counted in the core entry; with `@mugsun/track-web/core` only, inject `deps.selfCheck = runSelfCheck` yourself.

## Admin: integration health

The **Integration health** tab on the Track apps page shows, per app:

- **Last event received** as relative time (hover for the exact time). A warning appears after 24 hours without events; apps that never received anything get a hint to run `selfCheck()`. Without a live record the time is estimated from event definitions and marked as such.
- **Rejections in the last 7 days**: fail / warn counts. Open "Rejections" for each reason code's today and 7-day counts, last occurrence and server message, and a fix suggestion.

The SDK collect URL carries `?app_key=` (`{endpoint}/track/collect?app_key=…`), so the server can attribute requests rejected for unparseable or oversized bodies. Rejections are recorded only for existing apps.

Endpoints (app-list permission, tenant-scoped):

| Endpoint | Returns |
| --- | --- |
| `GET /system/track/app/health/summary` | Per app in the tenant: `appKey`, `appName`, `enabled`, `lastReceivedAt`, `lastReceivedSource` (`redis` / `event_def` / `null`), `staleAfterMs`, `fail7d`, `warn7d`, `topCodes` |
| `GET /system/track/app/health?appKey=` | The same (without `topCodes`) plus `reasons[]`: `code`, `severity` (`fail` / `warn`), `description`, `suggestion`, `today`, `last7d`, `lastAt`, `lastMessage` |

Reason codes: `APP_DISABLED`, `BAD_PAYLOAD`, `PAYLOAD_TOO_LARGE`, `SCHEMA_ERROR`, `BAD_EVENT_NAME`, `EVENT_DISABLED`, `TS_ABSURD`, `CLOCK_SKEWED`, `RATE_LIMITED`, `BATCH_TRUNCATED`, `QUEUE_FULL`, `IDENTIFY_REJECTED`, `TENANT_MISMATCH`, `REPLAY_DISABLED`, `REPLAY_TOO_LARGE`, `API_BODY_DISABLED`, `API_BODY_TOO_LARGE`, `SERVER_BUSY`. The server doesn't check origin domains or signatures, so there are no codes for those. Counts live in Redis in daily buckets kept for 8 days. Descriptions and suggestions are in Chinese.

## Next

[Plugins](/en/track/plugins) · [Privacy](/en/track/privacy)
