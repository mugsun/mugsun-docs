# Plugins

The SDK core handles only the queue, sessions, identity and transport; every kind of collection comes from a plugin. Without a `plugins` option you get the default set. Passing `plugins` **replaces** that set entirely, so spread `defaultPlugins()` when you add more.

## Default plugins

| Plugin | Factory | Collects |
| --- | --- | --- |
| Page views | `pageviewPlugin()` | Initial load and SPA route changes |
| Time on page | `pageleavePlugin()` | Time spent when leaving a page |
| Autocapture | `autocapturePlugin()` | Clicks and similar interactions; skips `maskSelectors` and password fields |
| Impressions | `exposurePlugin()` | Viewable impressions (pairs with `v-track:exposure`) |
| Web Vitals | `webVitalsPlugin()` | Core performance metrics |
| Errors | `errorPlugin()` | JS errors, resource load errors and unhandled promise rejections; the `stack` keeps up to 4,096 characters, other string properties 1,024 |

## Adding optional plugins

```ts
import {
  createTracker,
  defaultPlugins,
  apiMonitorPlugin,
  visualTrack,
  geoPlugin,
} from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const track = createTracker({
  endpoint,
  appKey,
  plugins: [...defaultPlugins(), apiMonitorPlugin(), visualTrack(), replayPlugin()],
  apiMonitorEnabled: true,
  replayEnabled: true,
  replaySampleRate: 10,
})
```

## Session replay

- A separate entry, `@mugsun/track-web/replay`, built on rrweb and loaded lazily only when the plugin is active, so it never lands in your main bundle.
- Recording requires all three: `replayPlugin()` is registered, `replayEnabled` is `true` (locally or from remote config), and the session is sampled in and not opted out.
- `replaySampleRate` decides only **whether the session is uploaded**. Recording uses a ring buffer capped at 5 minutes / 10 MB by default.
- Leaving the page: when the page goes to the background (tab switch, screen lock, app switch on mobile), the remaining buffer is compressed and sent with `sendBeacon` / `fetch keepalive`. If the page closes before compression finishes, that part is sent uncompressed instead, never twice. On close (`pagehide`) the remaining tail goes out as plain-text chunks of at most 32 KB, and all final chunks together stay within **44 KB**; later events that don't fit are dropped. (Before mugsun-track [#14](https://github.com/mugsun/mugsun-track/pull/14) and [#15](https://github.com/mugsun/mugsun-track/pull/15), the whole buffer went out as one chunk at close and was lost whenever it exceeded 64 KB.)
- Why 44 KB: `sendBeacon` and `fetch keepalive` share an in-flight quota of about 64 KB per page, and on close the final send of normal events (also a beacon) and any replay chunk still in flight use the same quota, so the replay's final flush takes only 44 KB and leaves room for normal events.
- Replay block numbers may have gaps (the dropped chunks above are never uploaded). The console player sorts events by time and starts at the first full snapshot. If the first blocks are missing and there is no full snapshot, it says the replay has no full snapshot instead of showing a blank screen. ([mugsun-pc #45](https://github.com/mugsun/mugsun-pc/pull/45))
- Periodic full snapshots: a full snapshot is taken every 3 minutes by default (rrweb's built-in `checkoutEveryNms`). Change it with `replayPlugin({ checkoutEveryNms: 60000 })`, or pass `false` to turn it off. When a block in the middle is missing, the player drops the incremental events after the gap and continues from the next full snapshot, so one lost block skips at most about 3 minutes. The cost is one extra page snapshot upload every 3 minutes (usually a few dozen KB gzipped). (mugsun-track [#18](https://github.com/mugsun/mugsun-track/pull/18), mugsun-pc [#45](https://github.com/mugsun/mugsun-pc/pull/45))
- Missing-block notice: the player shows how many blocks are missing at the top, counting both blocks that failed to load and sequence numbers absent from the server's block list. If no full snapshot follows a missing block, it says the later recording is incomplete instead of silently ending early. (mugsun-pc [#53](https://github.com/mugsun/mugsun-pc/pull/53))
- **Page text and input values are shown as-is by default** (from 0.3.0, `maskTextSelector: '*'` is no longer passed by default and `maskAllInputs` defaults to `false`).
- Never recorded: `input[type="password"]`, elements with `data-track-mask`, card fields (`autocomplete` starting with `cc-`) and one-time-code fields (`autocomplete="one-time-code"`).
- To mask, pass `replayPlugin({ maskTextSelector: '*', maskAllInputs: true })` for all text and input values; for text you can also pass a narrower selector such as `'.user-info'`. See [Privacy](/en/track/privacy#turning-on-masking-and-filtering).
- Input values are recorded as plain text by default. Under China's Personal Information Protection Law (PIPL), collecting sensitive personal information requires the user's separate consent; without that consent, set `maskAllInputs: true`. See [Privacy](/en/track/privacy).

```html
<!-- never recorded -->
<div data-track-mask>ID number: …</div>
```

This is what it looks like in the console's Session replay player: a demo session recorded with text masking on (`maskTextSelector: '*'`). Navigation, headings, body text and button labels all render as `*`; only page structure and interaction are kept. The marker bar below shows clicks, page changes and errors.

![Session replay with text masking on (maskTextSelector: '*', demo data)](/screenshots/track/track-replay-masked.png)

## API monitoring

`apiMonitorPlugin()` records method, URL, status and duration as `api_request` events.

| Switch | Default | Description |
| --- | --- | --- |
| `apiMonitorEnabled` | off | Master switch |
| `apiBodyEnabled` | off | Capture response bodies, sent over a separate `/track/api-body` channel rather than the event queue |
| `apiBodyMaskEnabled` | off (from 0.3.0) | When `true`, replace personal-data field values in bodies with `***`; credential keys are always replaced regardless, see [Privacy](/en/track/privacy#credential-fields-in-response-bodies) |
| `apiBodyMaxBytes` | 1MB | Larger bodies are skipped and marked `body_skipped=size` |

Built-in protections that can't be turned off:

- The SDK's own endpoints (`/track/collect`, `/track/config`, `/track/replay`, `/track/api-body` and so on) are never captured, which prevents loops.
- Credential endpoints **never have their bodies captured**; the event is marked `body_skipped: 'credential'`. A path counts if, after lowercasing, it contains one of: login and tokens `/auth/login`, `/auth/refresh`, `/oauth/token`, `/auth/social`; sign-up `/register`, `/signup`, `/sign-up`; passwords `/password`, `/forgot`, `/reset-password`, `/change-password`; codes and MFA `/otp`, `/sms`, `/captcha`, `/mfa`, `/2fa`, `/totp`, `/verify-code`, `/verification-code`.
- Reported URLs have sensitive query values redacted; see [Privacy](/en/track/privacy#url-redaction).

::: warning Behavior change in 0.3.0
From 0.3.0 (planned), replays show page text and input values as-is, and `apiBodyMaskEnabled` defaults to `false` (0.2.0 masked by default). If you need masking, pass `replayPlugin({ maskTextSelector: '*', maskAllInputs: true })` and set `apiBodyMaskEnabled: true` explicitly.
:::

## Visual tagging and geolocation

- `visualTrack()` matches elements against the `visualRules` delivered from the console and reports hits. With no rules, it installs no listeners.
- `geoPlugin()` collects precise location when `geoEnabled` is `true`, which triggers the browser's location permission prompt.

Visual tagging flow: in Integration → Visual rules (接入管理 → 圈选规则), pick the app and click Start visual selection (进入圈选), then enter the page URL. The platform issues a 30-minute token and opens that page in a new window in inspect mode. Click an element, give it an event name and submit a draft:

![Selecting an element in inspect mode (demo page)](/screenshots/track/track-visual-inspect.png)

The draft shows up in the console's draft bar. Confirm turns it into a rule delivered through `/track/config`; discard drops it. The table below lists confirmed rules:

![Visual-tagging drafts and rules (demo data)](/screenshots/track/track-visual-drafts.png)

## Next

[Options](/en/track/install#options) · [Privacy](/en/track/privacy)
