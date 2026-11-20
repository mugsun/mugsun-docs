# Your first event

This page goes from creating an application to seeing the first event you sent in the admin console. If it does not show up, the second half explains how to find out why.

## Before you start

- The backend is running with the tracking module on. It is on by default unless `MUGSUN_TRACK_ENABLED=false` is set.
- You can sign in to the admin console, see [Getting started](/en/guide/getting-started).

## Four steps to an event

<div class="ms-steps">

### Create an application

Open "Tracking → Integration" and click "Add application". After saving, the "Application created" dialog appears. Copy the AppKey from it.

### Initialize the SDK

```ts
import { createTracker } from '@mugsun/track-web'

const tracker = createTracker({
  endpoint: 'http://localhost:8080',
  appKey: '<your AppKey>',
  debug: true, // prints SDK logs to the console; turn it off when done
})
```

`endpoint` is the backend address as the browser reaches it. When the backend sits under a prefix such as `/api`, include the prefix.

### Send an event

Reloading the page produces a `$pageview` automatically. You can also send one by hand:

```ts
tracker.track('first_event', { source: 'docs' })
await tracker.flush() // send now instead of waiting for a full batch
```

### Check it in the console

In the browser's network panel, `POST /track/collect` returns 200.

Open "Tracking → Event Analysis" and select the application. The new event appears in the list and in the "Real-time event stream" below it.

</div>

![The Event Analysis page with the real-time event stream below the list](/screenshots/track-event.png)

## No events?

| Symptom | Cause and fix |
| --- | --- |
| No `/track/collect` request in the network panel | The browser has Do Not Track on, or the code sets `enabled: false` or called `optOut()`. With a sample rate below 100 the visitor may also be out of the sample |
| The request address is `…/track/collect/track/collect` | `endpoint` contains the path. Stop at the root address of the service |
| The request has no status code and the console shows a network or CORS error | The address is unreachable. The backend itself allows any origin, so check whether the Nginx or gateway in front forwards `/track/` |
| The request returns 400 | The AppKey does not exist, or the application is disabled. Check it under "Integration" |
| The request returns 429 | Too many reports from the same IP. Check whether `track` is called in a loop or a render function |
| The request returns 200 but the dashboard is empty | The dashboard has the wrong application or time range selected; the backend may also have dropped the event, see [Integration health](#integration-health) |

## Self-check

When you are not sure where the problem is, let the SDK check itself. Run this in the browser console:

```ts
const report = await tracker.selfCheck()
console.table(report.items)
```

Each entry in the report's `items` has `status`, `message` and `fix`, and the top-level `status` is that of the worst item.

| Item | What it checks |
| --- | --- |
| `config.endpoint` | Whether the address is valid, whether it has an extra `/track` path, and whether an HTTPS page reports to an HTTP address |
| `config.appKey` | The format of the AppKey |
| `config.conflict` | Options that contradict each other, such as API monitoring turned on without `apiMonitorPlugin` registered |
| `config.enabled` | Warns when the main switch is off |
| `ping` | Sends a real request to `/track/config` to tell apart an unreachable network, a missing application and a disabled one |
| `sampling` | The sample rate, and whether the current visitor is in the sample |
| `consent` | The state of Do Not Track, Global Privacy Control and `optOut()` |
| `privacy` | Response body capture is on without masking, or `respectDnt` was turned off |
| `queue` | The backlog of the local queue; warns above 80% of its capacity |
| `replay` | Replay is on without the replay plugin registered, or without any text masking |
| `filters` | Which filter hooks are configured |

The self-check sends no user data and writes nothing to the event queue. With the `@mugsun/track-web/core` entry alone, you have to inject `runSelfCheck` yourself.

## Integration health

The self-check looks at the browser side. Whether the backend received anything, and why it rejected something, is on the "Integration health" tab of "Integration".

| Column | Meaning |
| --- | --- |
| Last event received | When the last event arrived. It turns yellow after more than 24 hours without events and shows "Never" when none ever arrived |
| Fail (7d) / Warn (7d) | How many times something was rejected in the last 7 days, counted per severity |
| Rejections | Per reason code: the counts for today and for 7 days, the time and message of the last occurrence, and how to fix it |

Below are all the reason codes. On the page each one comes with a suggested fix.

| Code | Severity | Meaning |
| --- | --- | --- |
| `APP_DISABLED` | fail | Collection is switched off for the application, so the backend rejects every report |
| `BAD_PAYLOAD` | fail | The request body is empty, is not a JSON object, or the compressed content is damaged |
| `PAYLOAD_TOO_LARGE` | fail | The body of one report exceeds the limit; the response is 413 |
| `SCHEMA_ERROR` | fail | An event lacks required fields, a field is too long, or the event list is malformed |
| `BAD_EVENT_NAME` | fail | The event name breaks the naming rule, or uses the `$` prefix |
| `TS_ABSURD` | fail | The event time is before 2020, or more than 7 days ahead of the server time |
| `RATE_LIMITED` | fail | Reports from one IP to this application exceed the per-minute limit; the response is 429 |
| `EVENT_DISABLED` | warn | The event is disabled under "Event definitions", so the backend drops it |
| `CLOCK_SKEWED` | warn | The client clock is more than 24 hours off. The event is kept and its time is replaced with the receive time |
| `BATCH_TRUNCATED` | warn | One report has more events than the limit; the extra ones are cut off |
| `QUEUE_FULL` | warn | The backend's write queue is full and some events are dropped |
| `IDENTIFY_REJECTED` | warn | `identify` came without a login token, or the user in the token differs from the one passed in |
| `TENANT_MISMATCH` | warn | The tenant of the login token differs from the tenant of the application; the event goes to the token's tenant |
| `REPLAY_DISABLED` | warn | The SDK uploads replay data but session replay is off for the application |
| `REPLAY_TOO_LARGE` | warn | A replay chunk or the replay of a whole session exceeds the size limit; the rest is no longer accepted |
| `API_BODY_DISABLED` | warn | The SDK uploads response bodies but response body capture is off for the application |
| `API_BODY_TOO_LARGE` | warn | A response body exceeds the capture limit |
| `STORAGE_FULL` | warn | The storage quota for the day is used up, or free disk space is below the minimum, so replay and response bodies are rejected |
| `SERVER_BUSY` | warn | The backend is busy for the moment and returns 503. The SDK retries automatically |

::: warning Rejection counts can be inflated by others
The AppKey is public in the browser, so anyone can send a bad request with it and push the rejection counts up.

That only causes false alarms. It reads no data and does not affect events already stored. When in doubt, trust the SDK's `selfCheck()`.
:::

Two endpoints are behind the tab. Both need the `sys:track-app:list` permission and only show applications of your own tenant:

| Endpoint | Returns |
| --- | --- |
| `GET /system/track/app/health/summary` | One row per application, with the time of the last event, the fail and warn counts for 7 days, and the three most frequent reason codes |
| `GET /system/track/app/health?appKey=` | The details of one application, plus a `reasons` list where each entry has a description and a suggested fix |

Rejection counts are kept in Redis, counted per UTC day and kept for 8 days. A made-up AppKey leaves no record; only existing applications are recorded.

## Next

<div class="ms-cards">

- [Plugins](/en/track/plugins) What each plugin collects, and how to turn on replay and API monitoring.
- [Privacy](/en/track/privacy) What is not collected by default, and what gets masked.
- [Error issues](/en/track/error-issues) Group frontend errors by fingerprint and assign them to people.

</div>
