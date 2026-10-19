# Install & setup

## Install

::: code-group

```bash [pnpm]
pnpm add @mugsun/track-web@^0.2.0
```

```bash [npm]
npm install @mugsun/track-web@^0.2.0
```

```bash [yarn]
yarn add @mugsun/track-web@^0.2.0
```

:::

The latest version on npm is `0.2.0`. If you are upgrading from 0.1.x, note the privacy default changes; see the [changelog](/en/guide/changelog) and [Plugins](/en/track/plugins#api-monitoring).

## Vanilla JS / any framework

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'https://your-host',
  appKey: 'your-app-key',
  release: '1.4.2',
})

track.track('button_click', { name: 'buy' })
```

- `endpoint` is the server's base URL. The SDK posts to `{endpoint}/track/collect`, so don't append the path yourself.
- Create the `appKey` under **Analytics → Integrations** in the console.
- `release` is optional; error events carry it.

## Vue 3

```ts
import { createApp } from 'vue'
import MugsunTrack from '@mugsun/track-web/vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(MugsunTrack, { endpoint, appKey, router })
```

Passing `router` groups page events by route template (for example `/order/:id`).

After installation, get the client with `inject(TRACK_INJECT_KEY)` or `$track` in templates, and use the directive:

```vue
<button v-track:click="'buy_click'">Buy</button>
<div v-track:exposure="{ event: 'banner_view', props: { id: 3 } }">Banner</div>
```

## Identifying users

```ts
// After sign-in: link the anonymous visitor to your user
track.identify(user.id)

// Super properties are attached to every later event
track.registerSuperProperties({ plan: 'pro' })

// On sign-out: clear the identity so the next person doesn't inherit it
track.reset()
```

## Methods

| Method | Description |
| --- | --- |
| `track(event, props?)` | Send a custom event; returns its `event_id` |
| `identify(userId)` / `reset()` | Link / clear the user identity |
| `registerSuperProperties(props)` / `unregisterSuperProperty(key)` | Super properties |
| `timeEvent(name)` / `cancelTimeEvent(name)` | Timed events: the next `track(name)` carries the duration |
| `flush()` | Send the queue now |
| `optOut()` / `optIn()` / `isOptedOut()` | Let users opt out of and back into collection |
| `getDistinctId()` / `getSessionId()` | Read the anonymous ID and session ID |
| `trackApiError({ url, method, status, bizCode, message, durationMs })` | Report an API failure manually; see [Error filtering and API failures](#error-filtering-and-api-failures) |
| `selfCheck()` | Integration self-check returning a structured report; see [Your first event · Self-check](/en/track/first-event#self-check) |
| `destroy()` | Tear the SDK down |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `appKey` | `string` | — | **Required.** App identifier (visible in the browser, not a secret) |
| `endpoint` | `string` | — | **Required.** Server base URL; events go to `{endpoint}/track/collect` |
| `release` | `string` | — | App version, attached to error events |
| `enabled` | `boolean` | `true` | Local master switch |
| `sampleRate` | `number` | `100` | Sample rate 0–100; remote config wins (on next start) |
| `batchSize` | `number` | `10` | Send once this many events are queued |
| `flushInterval` | `number` | `5000` | Send interval (ms) |
| `maxBatchSize` | `number` | `100` | Max events per request |
| `queueCapacity` | `number` | `500` | Queue limit; the oldest events are dropped beyond it |
| `queueMaxAge` | `number` | 24h | Drop queued events older than this (ms) |
| `retryBaseDelay` / `retryMaxDelay` | `number` | `1000` / `30000` | Retry backoff base / cap (ms) |
| `respectDnt` | `boolean` | `true` | Honor the browser's Do Not Track |
| `respectGpc` | `boolean` | `true` | Honor the browser's Global Privacy Control |
| `maskSelectors` | `string[]` | `[]` | Selectors excluded from autocapture (merged with remote config) |
| `sessionTimeout` | `number` | 30min | Sliding session timeout (ms) |
| `storagePrefix` | `string` | `'mst'` | Prefix for local storage keys |
| `fetchRemoteConfig` | `boolean` | `true` | Fetch remote config on start |
| `headers` | `object \| () => object` | — | Extra request headers (such as `Authorization`); not sent with `sendBeacon` |
| `plugins` | `TrackPlugin[]` | default set | See [Plugins](/en/track/plugins) |
| `replayEnabled` / `replaySampleRate` | `boolean` / `number` | `false` / `10` | Replay switch and per-session sample rate |
| `apiMonitorEnabled` / `apiBodyEnabled` / `apiBodyMaskEnabled` / `apiBodyMaxBytes` | — | off / off / off / 1MB | API monitoring switches (`apiBodyMaskEnabled` is off, so personal-data fields are uploaded as-is; credential keys are always masked); see [Plugins](/en/track/plugins#api-monitoring) |
| `visualRules` | `VisualRule[]` | — | Visual-tagging rules |
| `geoEnabled` | `boolean` | `false` | Precise location |
| `debug` | `boolean` | `false` | Log SDK activity to the console |
| `beforeSend` | `(event) => event \| null \| false` | — | Rewrite `props` or drop events before queueing (`null`/`false` drops) |
| `beforeSendOnError` | `'drop' \| 'keep'` | `'drop'` | When `beforeSend` throws, drop the event or send the original |
| `ignoreErrors` | `(string \| RegExp)[] \| (error, message) => boolean` | — | Errors not to report |
| `skipHandledErrors` | `boolean` | `false` | When `true`, skip `HttpError` and errors flagged `handled`/`expected`; by default everything is reported |

For options that can be set remotely, an explicit local value wins; otherwise the value from `/track/config` applies **from the next start**.

## Error filtering and API failures

::: tip Version
This section and the [self-check](/en/track/first-event#self-check) need `@mugsun/track-web` 0.3.0 or later (planned; see "Unreleased" in the repo CHANGELOG).
:::

```ts
const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  beforeSend: (e) => (e.event === 'debug_only' ? null : e),
  ignoreErrors: ['ResizeObserver loop', /^AbortError/],
  skipHandledErrors: true // default is false (report everything); turned on here
})
```

- **`beforeSend(event)`** runs before each business event (including `$identify`) is queued. Return `null` / `false` to drop it. When it returns an object, only its `props` are merged back; `event_id`, `distinct_id` and the event name can't be changed, and non-object return values mean "unchanged".
- **A throwing hook drops the event by default** (`beforeSendOnError: 'drop'`) so a broken masking hook can't leak unmasked data; `'keep'` sends the original event instead.
- **Not covered by `beforeSend`**: `$session_start` / `$session_end`, session replay chunks and API response body uploads. Mask replay with `maskTextSelector` / `maskAllInputs` / `maskSelectors` and bodies with `apiBodyMaskEnabled` (off by default; set it to `true`).
- **`ignoreErrors`**: strings match a substring of the error message, `RegExp`s test the message, or pass a predicate `(error, message) => boolean` that returns `true` to ignore (a throwing predicate means "don't ignore").
- **`skipHandledErrors`** (default `false`: **every error is reported** as `$error`, including `HttpError` and handled errors). Set it to `true` to skip errors with `name === 'HttpError'` or `handled === true` / `expected === true`, typically API errors your request interceptor already showed to the user.
- These filters apply to the `error` plugin (`window` error, `unhandledrejection`) and the Vue integration's `app.config.errorHandler`; your existing errorHandler is still called.

To still count skipped API errors, report them from the interceptor:

```ts
tracker.trackApiError({ url: '/api/order', method: 'POST', status: 200, bizCode: 40001, message: 'Out of stock' })
```

`trackApiError` emits an `api_request` event (`success=false`, `source=manual`, with `biz_code` and a truncated `error_message`), the same event name as the `api-monitor` plugin, so API analytics aggregate both. The `url` is redacted the same way as in `api-monitor`: values of sensitive query params such as `token` and `access_token` become `***`; other params are kept.

## Versions and releases

The SDK is published automatically from the [mugsun-track](https://github.com/mugsun/mugsun-track) repository by GitHub Actions (`.github/workflows/release.yml`) via npm Trusted Publishing; no local npm token is needed:

1. In a PR, bump `version` in `package.json` (and `SDK_VERSION` in `src/version.ts`) and describe the change in `CHANGELOG.md` (with migration notes for behavior changes).
2. Merge the PR into `main`.
3. A `package.json` change on `main` triggers the release workflow: if that version is not on npm yet, it runs `typecheck` / `test` / `build` and then `npm publish --provenance`; versions already on npm are skipped.

See the repository's [CONTRIBUTING.md](https://github.com/mugsun/mugsun-track/blob/main/CONTRIBUTING.md).

## Next

[Your first event](/en/track/first-event) · [Plugins](/en/track/plugins) · [Privacy](/en/track/privacy)
