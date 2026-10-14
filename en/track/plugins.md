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
| Errors | `errorPlugin()` | JS errors, resource load errors and unhandled promise rejections; the `stack` keeps up to 4,096 characters, other string properties 1,024; anything after `?` or `#` in script URLs inside the stack (often tokens or signatures) is removed, keeping `:line:column`; when an event's properties exceed 16 KB in total, the stack is shortened first |

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
- Masked by default: every input value and **all page text** (rrweb `maskTextSelector: '*'`). `input[type="password"]` and elements with `data-track-mask` are not recorded at all.
- For debugging only, you can unmask text with `replayPlugin({ maskTextSelector: false })` or pass a narrower selector.

```html
<!-- never recorded -->
<div data-track-mask>ID number: …</div>
```

This is what it looks like in the console's Session replay player: a demo session recorded with 0.2.0 defaults. Navigation, headings, body text and button labels all render as `*`; only page structure and interaction are kept. The marker bar below shows clicks, page changes and errors.

![Session replay with default text masking (demo data)](/screenshots/track/track-replay-masked.png)

## API monitoring

`apiMonitorPlugin()` records method, URL, status and duration as `api_request` events.

| Switch | Default | Description |
| --- | --- | --- |
| `apiMonitorEnabled` | off | Master switch |
| `apiBodyEnabled` | off | Capture response bodies, sent over a separate `/track/api-body` channel rather than the event queue |
| `apiBodyMaskEnabled` | **on** (since 0.2.0) | Replace sensitive field values in bodies with `***` |
| `apiBodyMaxBytes` | 1MB | Larger bodies are skipped and marked `body_skipped=size` |

Built-in protections that can't be turned off:

- The SDK's own endpoints (`/track/collect`, `/track/config`, `/track/replay`, `/track/api-body` and so on) are never captured, which prevents loops.
- Credential endpoints (paths containing `/auth/login`, `/auth/refresh`, `/oauth/token` or `/auth/social`) **never have their bodies captured**.
- Reported URLs have sensitive query values redacted; see [Privacy](/en/track/privacy#url-redaction).

::: warning Behavior change in 0.2.0
From 0.2.0, replays mask page text and `apiBodyMaskEnabled` defaults to `true`. If you depend on raw response bodies, set `apiBodyMaskEnabled: false` explicitly; for readable replays (debugging only), pass `maskTextSelector: false`. 0.2.0 is available on npm.
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
