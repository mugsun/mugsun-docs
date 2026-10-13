# Install & setup

## Install

::: code-group

```bash [pnpm]
pnpm add @mugsun/track-web
```

```bash [npm]
npm install @mugsun/track-web
```

```bash [yarn]
yarn add @mugsun/track-web
```

:::

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
| `maskSelectors` | `string[]` | `[]` | Selectors excluded from autocapture (merged with remote config) |
| `sessionTimeout` | `number` | 30min | Sliding session timeout (ms) |
| `storagePrefix` | `string` | `'mst'` | Prefix for local storage keys |
| `fetchRemoteConfig` | `boolean` | `true` | Fetch remote config on start |
| `headers` | `object \| () => object` | — | Extra request headers (such as `Authorization`); not sent with `sendBeacon` |
| `plugins` | `TrackPlugin[]` | default set | See [Plugins](/en/track/plugins) |
| `replayEnabled` / `replaySampleRate` | `boolean` / `number` | `false` / `10` | Replay switch and per-session sample rate |
| `apiMonitorEnabled` / `apiBodyEnabled` / `apiBodyMaskEnabled` / `apiBodyMaxBytes` | — | off / off / **on** / 1MB | API monitoring switches; see [Plugins](/en/track/plugins#api-monitoring) |
| `visualRules` | `VisualRule[]` | — | Visual-tagging rules |
| `geoEnabled` | `boolean` | `false` | Precise location |
| `debug` | `boolean` | `false` | Log SDK activity to the console |

For options that can be set remotely, an explicit local value wins; otherwise the value from `/track/config` applies **from the next start**.

## Next

[Your first event](/en/track/first-event) · [Plugins](/en/track/plugins) · [Privacy](/en/track/privacy)
