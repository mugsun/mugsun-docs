# Install & setup

`@mugsun/track-web` is the tracking SDK for the browser. Install it, fill in two options, and page views, clicks, performance metrics and frontend errors start reporting.

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

The current version is 0.3.0. The package has four entry points, so import only what you use:

| Entry | Contents | Gzipped |
| --- | --- | --- |
| `@mugsun/track-web` | `createTracker`, every plugin except replay, and the self-check | about 20 KB |
| `@mugsun/track-web/vue` | The Vue 3 plugin and the `v-track` directive | about 15 KB |
| `@mugsun/track-web/replay` | The session replay plugin; rrweb loads only once replay is on | about 6 KB |
| `@mugsun/track-web/core` | Core logic only; you pick the plugins and the self-check | about 7 KB |

## Initialize

First add an application under "Tracking → Integration" in the admin console to get an AppKey. The dialog shown after creation has an integration snippet you can copy.

### Any framework

```ts
import { createTracker } from '@mugsun/track-web'

export const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  release: import.meta.env.VITE_APP_VERSION,
})

tracker.track('order_submit', { amount: 199, channel: 'web' })
```

| Option | Notes |
| --- | --- |
| `endpoint` | The root address of the backend. The SDK appends `/track/collect` itself, so leave the path out. Keep the prefix when the backend sits under one such as `/api` |
| `appKey` | Identifies the application. It is visible in the browser and is not a secret |
| `release` | The application version, optional. When set, every event carries it and error issues tell versions apart by it |

`createTracker` throws if either `endpoint` or `appKey` is missing.

A custom event name starts with a letter, uses only letters, digits and underscores, and is at most 64 characters. Names starting with `$` are reserved for the SDK's own events.

### Vue 3

```ts
import { createApp } from 'vue'
import MugsunTrack from '@mugsun/track-web/vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(MugsunTrack, {
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  router,
  release: import.meta.env.VITE_APP_VERSION,
})
app.mount('#app')
```

With `router` passed in, page views follow route changes. `route_path` records the route template (such as `/order/:id`), so pages of the same kind are grouped into one row.

Inside components, get the instance with `inject(TRACK_INJECT_KEY)` or `this.$track`. In templates you can track with the directive:

```vue
<template>
  <button v-track:click="'buy_click'">Buy</button>
  <div v-track:exposure="{ event: 'banner_view', props: { id: 3 } }">
    Campaign banner
  </div>
</template>
```

The Vue plugin also wraps `app.config.errorHandler` and reports component errors as `$error`. A handler you set earlier still runs.

## Identifying users

The SDK creates an anonymous ID for each browser, and activity before login is recorded under it. After login, call `identify` to link the anonymous visitor to your user.

```ts
const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // Send the same login token as your API calls; the backend decides the user from it
  headers: () => {
    const token = getAccessToken()
    return token ? { Authorization: token } : {}
  },
})

// After a successful login
tracker.identify(user.id)

// On logout
tracker.reset()
```

The backend decides which user an event belongs to from the mugsun-boot login token. A user ID reported by the client alone does not count.

Without a token, or when the user in the token differs from the one passed to `identify`, the link is rejected and the events are counted as an anonymous visitor.

The batch sent with `sendBeacon` when the page closes cannot carry headers, so it is also recorded as anonymous, still under the same anonymous ID.

`reset()` clears the user, switches to a new anonymous ID and ends the current session. Always call it on logout when several people share one computer.

## Methods

| Method | What it does |
| --- | --- |
| `track(event, props?)` | Reports a custom event and returns its `event_id`. Returns `null` when nothing was reported |
| `identify(userId)` / `reset()` | Links a user / clears the user and switches the anonymous ID |
| `registerSuperProperties(props)` | Sets shared properties that every later event carries |
| `unregisterSuperProperty(key)` | Removes one shared property |
| `timeEvent(name)` / `cancelTimeEvent(name)` | Starts a timer so the next event with that name carries `duration_ms` / cancels it |
| `trackExposure(el, { event, props })` | Reports one exposure after the element is half visible for 1 second |
| `trackApiError(payload)` | Reports an API failure by hand, see [Error filtering and API failures](#error-filtering-and-api-failures) |
| `flush()` | Sends the queued events now; the returned Promise tells whether sending succeeded |
| `optOut()` / `optIn()` / `isOptedOut()` | The user refuses collection / agrees again / reads the current state |
| `getDistinctId()` / `getUserId()` / `getSessionId()` | Read the anonymous ID, the user ID and the session ID |
| `selfCheck()` | Checks whether the integration works, see [Self-check](/en/track/first-event#self-check) |
| `destroy()` | Stops collection and removes the plugins |

## Options

Only `endpoint` and `appKey` are required. Everything else has a default.

### Basics

| Option | Default | Notes |
| --- | --- | --- |
| `endpoint` | required | The root address of the backend |
| `appKey` | required | Identifies the application |
| `release` | none | The application version, carried by every event |
| `plugins` | default plugins | Replaces the default plugins entirely when set, see [Plugins](/en/track/plugins) |
| `headers` | none | Extra request headers, as an object or a function that returns one |
| `enabled` | `true` | Set to `false` to turn the whole SDK off |
| `debug` | `false` | Prints SDK logs to the console |

### Sending and the queue

| Option | Default | Notes |
| --- | --- | --- |
| `batchSize` | `10` | Send once this many events are queued |
| `flushInterval` | `5000` | Interval of the timed send, in milliseconds |
| `maxBatchSize` | `100` | The most events one request carries |
| `queueCapacity` | `500` | Size limit of the local queue; the oldest events are dropped when it is full |
| `queueMaxAge` | 24 hours | Queued events older than this are dropped, in milliseconds |
| `retryBaseDelay` | `1000` | Wait before the first retry after a failed send, in milliseconds |
| `retryMaxDelay` | `30000` | Upper limit of the retry wait. The wait doubles after each failure |
| `sessionTimeout` | 30 minutes | Idle time after which the session ends, in milliseconds |
| `storagePrefix` | `'mst'` | Prefix of the local storage keys |
| `fetchRemoteConfig` | `true` | Whether to fetch the application's settings from the backend at startup |

### Sampling and privacy

| Option | Default | Notes |
| --- | --- | --- |
| `sampleRate` | `100` | Sample rate, 0 to 100. Sampling is per visitor, so a visitor is either fully collected or not at all |
| `respectDnt` | `true` | Nothing is collected when the browser has Do Not Track on |
| `respectGpc` | `false` | When `true`, nothing is collected if the browser has Global Privacy Control on |
| `maskSelectors` | `[]` | Areas matched by these selectors are not auto-captured and not recorded in replay |
| `beforeSend` | none | Rewrites the properties of an event or drops it before it is queued |
| `beforeSendOnError` | `'drop'` | Drops the event when `beforeSend` throws. Set to `'keep'` to send the original event |
| `ignoreErrors` | none | Errors that are not reported, as strings, regular expressions or a predicate |
| `skipHandledErrors` | `false` | When `true`, errors that were already handled are skipped |

### Feature switches

| Option | Default | Notes |
| --- | --- | --- |
| `replayEnabled` | `false` | Session replay; the replay plugin must be registered too |
| `replaySampleRate` | `10` | Session sample rate of replay, 0 to 100 |
| `apiMonitorEnabled` | `false` | API monitoring; `apiMonitorPlugin` must be registered too |
| `apiBodyEnabled` | `false` | Collects JSON response bodies |
| `apiBodyMaskEnabled` | `false` | Also masks personal data fields in response bodies |
| `apiBodyMaxBytes` | 1 MB | Response bodies larger than this are not collected |
| `visualRules` | none | Visual tagging rules, normally sent by the backend |
| `geoEnabled` | `false` | Precise location; `geoPlugin` must be registered too |

### How backend settings combine with code

At startup the SDK calls `GET {endpoint}/track/config` once, fetches the switches of this application from "Integration" and stores them locally.

Settings fetched this time take effect at the next startup. When both the backend and your code set the same option, the table below applies:

| Option | Result |
| --- | --- |
| `sampleRate` | The backend value |
| `replayEnabled` | The backend value |
| `replaySampleRate` | The backend value |
| `enabled` | Off if either side turns it off |
| `maskSelectors` | Both lists merged |
| The four API monitoring options | The value in code |
| `visualRules` | The value in code |
| `geoEnabled` | The value in code |

`fetchRemoteConfig: false` only stops fetching. Settings already stored locally still apply.

## Error filtering and API failures

```ts
const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  beforeSend: (e) => (e.event === 'debug_only' ? null : e),
  ignoreErrors: ['ResizeObserver loop', /^AbortError/],
  skipHandledErrors: true,
})
```

| Option | Behavior |
| --- | --- |
| `beforeSend(event)` | Called before each event is queued. Return `null` or `false` to drop it; when an object is returned only its `props` are used |
| `beforeSendOnError` | By default the event is dropped when the hook throws, so half-processed data is never sent. Set to `'keep'` to send the original event |
| `ignoreErrors` | Strings match as substrings of the error message, regular expressions test the message, and a function returns `true` to ignore |
| `skipHandledErrors` | By default every error is reported. When `true`, `HttpError` and errors flagged `handled` or `expected` are skipped |

`beforeSend` does not cover three kinds of data: session start and end events, replay data and API response bodies. The last two have their own masking options, see [Privacy](/en/track/privacy#turning-on-masking-and-filtering).

These filters apply to both the `error` plugin and the Vue `errorHandler`. After an error is filtered out, the original `errorHandler` still runs.

If you still want to count the API errors that were skipped, report them by hand in your request interceptor:

```ts
tracker.trackApiError({
  url: '/api/order',
  method: 'POST',
  status: 200,
  bizCode: 40001,
  message: 'Out of stock',
  durationMs: 132,
})
```

This `api_request` event carries `success: false` and `source: 'manual'`, and is counted together with the data from [API monitoring](/en/track/plugins#api-monitoring).

Sensitive parameters in the address are still masked; the rules are in [Privacy](/en/track/privacy#url-redaction).

## Next

<div class="ms-cards">

- [Your first event](/en/track/first-event) From creating an application to the first event on the dashboard.
- [Plugins](/en/track/plugins) What each plugin collects, and how to turn on replay and API monitoring.
- [Privacy](/en/track/privacy) What is not collected by default, and what gets masked.

</div>
