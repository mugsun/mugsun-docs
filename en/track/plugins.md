# Plugins

The SDK core only handles the queue, sessions, identity and sending. Collection is left to plugins. Six default plugins work as soon as the SDK is installed, and four more are registered when you need them.

## At a glance

| Plugin | Registered by default | Event | What it collects |
| --- | --- | --- | --- |
| `pageviewPlugin()` | Yes | `$pageview` | The first load and every route change |
| `pageleavePlugin()` | Yes | `$pageleave` | Time spent on a page when leaving it |
| `autocapturePlugin()` | Yes | `$click` `form_submit` | Clicks and form submissions, never what was typed |
| `exposurePlugin()` | Yes | `$exposure` | An element half visible for 1 second |
| `webVitalsPlugin()` | Yes | `$web_vitals` | Five core performance metrics |
| `errorPlugin()` | Yes | `$error` | Script errors, failed resource loads and unhandled Promise rejections |
| `apiMonitorPlugin()` | No | `api_request` | Status code and duration of every API request |
| `replayPlugin()` | No | Replay data | How the page changes, played back in the admin console |
| `visualTrack()` | No | The event name set in the rule | Clicks on elements picked in the admin console |
| `geoPlugin()` | No | No event of its own | Precise location, attached to every later event |

## Registering plugins

Once `plugins` is set it replaces the default set entirely. To add plugins on top of the defaults, spread `defaultPlugins()` first:

```ts
import {
  createTracker,
  defaultPlugins,
  apiMonitorPlugin,
  visualTrack,
  geoPlugin,
} from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  plugins: [
    ...defaultPlugins(),
    apiMonitorPlugin(),
    visualTrack(),
    geoPlugin(),
    replayPlugin(),
  ],
})
```

Registering only installs a plugin. Replay, API monitoring and precise location each have a switch as well, in the application form under "Integration". With the switch off, the plugin does nothing.

With the Vue plugin and `router` passed in, a custom `plugins` list has to use `pageviewPlugin({ manual: true })` so that the router drives page views.

## Default plugins

### Page views and time on page

The first load sends a `$pageview`. On every later page change, a `$pageleave` is sent for the previous page first, then the `$pageview` of the new page.

A page change means the path or the hash changed; changing only the query string does not count. A `$pageleave` is also sent when the page goes to the background or closes, and `duration_ms` counts only the time the page was visible.

### Clicks and forms

Clicking a link, a button or an element with `data-track-click` sends `$click`, and submitting a form sends `form_submit`.

| Event | Properties | Notes |
| --- | --- | --- |
| `$click` | `tag` `element_id` `element_class` `element_text` `href` | At most 64 characters of text; sensitive parameters in the link are masked |
| `form_submit` | `form_id` `form_name` `form_action` `form_method` | Only the path of the submit address is recorded |

What is typed into inputs and text areas is never collected. For password fields, elements with `data-track-mask` and areas matched by `maskSelectors`, not even clicks are recorded.

### Exposure

An element counts as exposed once more than half of it has been in the viewport for a full second. The same element is reported once per session, so scrolling a list back and forth does not count again.

In Vue use the `v-track:exposure` directive; elsewhere call `trackExposure()`. Without an event name, `$exposure` is used.

### Performance metrics

The collected metrics are sent when the page first goes to the background or closes. Each metric is one `$web_vitals` event with the properties `metric` and `value`.

| `metric` | Metric |
| --- | --- |
| `lcp` | Largest Contentful Paint |
| `inp` | Interaction to Next Paint, approximated by the slowest interaction |
| `cls` | Cumulative Layout Shift |
| `fcp` | First Contentful Paint |
| `ttfb` | Time to First Byte |

The count and total duration of long tasks ride on the first event, as `longtask_count` and `longtask_total_ms`.

### Errors

Every `$error` carries `error_type`, which says where the error came from:

| `error_type` | Source |
| --- | --- |
| `js` | An uncaught script error |
| `resource` | An image, script, stylesheet or other resource that failed to load |
| `promise` | An unhandled Promise rejection |
| `vue` | An error inside a Vue component, reported by the Vue plugin |

At most 4096 characters of the stack are kept. The query string and hash of script addresses in the stack are removed, because they often carry tokens or signatures.

The fingerprint `error_fingerprint` is computed from the error message and the script address of the first stack frame, without line and column numbers. [Error issues](/en/track/error-issues) are grouped by it.

After upgrading from 0.2.x, errors whose first frame address has a query string get a new fingerprint and go into a new group, which is not merged with the old one.

## Session replay

Replay is built on rrweb. It records how the page changes and plays it back under "Tracking → Session Replay". rrweb loads only once replay is on, so it stays out of the initial bundle.

Recording happens only when all three conditions hold:

- `replayPlugin()` is registered.
- "Session replay" is on for the application under "Integration".
- The visitor is in the sample and has not called `optOut()`.

::: warning Text is not masked by default
Since 0.3.0, replay shows page text and input values as they are. If your pages show personal data, turn on masking first as described in [Privacy](/en/track/privacy#turning-on-masking-and-filtering).
:::

### Recorded does not mean uploaded

Recording always goes into a ring buffer in memory, which by default keeps the last 5 minutes and at most 10 MB. Whether it is uploaded depends on the application's "Replay sample rate":

| Case | Result |
| --- | --- |
| The session is in the replay sample | A chunk is uploaded every 5 seconds or every 50 recorded events |
| Not in the sample, but an error occurs in the session | Upload starts at the moment of the error, including what the buffer holds from before it |
| Not in the sample and no error | Nothing is uploaded, and the buffer is discarded when the session ends |

With the replay sample rate set to 0, only sessions that had an error are uploaded.

### When the page closes

When the page goes to the background, what is left in the buffer is compressed and sent with `sendBeacon` or `fetch keepalive`. Switching tabs, locking the screen and switching apps on a phone all count.

When the page really closes there is no time to compress. The remaining tail is sent as plain chunks of at most 32 KB each and 44 KB in total, and whatever does not fit is dropped.

Browsers leave about 64 KB in total for requests made while a page closes, and the final flush of ordinary events needs part of it, so replay takes only 44 KB.

A replay with lost chunks still plays. Recording takes a full snapshot every 3 minutes by default, and the player skips to the next snapshot when a chunk is missing, losing about 3 minutes at most.

The top of the player says how many chunks are missing. When the first chunks are missing it reports that the replay has no full snapshot, and when no snapshot follows a gap it reports that the later recording is incomplete.

### Options and masking

| Option | Default | Notes |
| --- | --- | --- |
| `maskTextSelector` | none | Text of matched elements is shown as `*`. Pass `'*'` to mask all text |
| `maskAllInputs` | `false` | When `true`, every input value is masked |
| `checkoutEveryNms` | `180000` | Interval between full snapshots, in milliseconds. Pass `false` to turn them off |
| `chunkIntervalMs` | `5000` | Interval between chunk uploads, in milliseconds |
| `eventsPerChunk` | `50` | Upload a chunk once this many recorded events are collected |
| `bufferMaxAge` | 5 minutes | How long the buffer keeps data, in milliseconds |
| `bufferMaxBytes` | 10 MB | The largest size of the buffer, in bytes |
| `maxRetries` | `3` | How many times a failed chunk upload is retried |

The following is never recorded, and no switch changes that:

- Password fields.
- Elements with the `data-track-mask` attribute, and areas matched by `maskSelectors`.
- Bank card fields, meaning inputs whose `autocomplete` starts with `cc-`.
- One-time code fields, meaning inputs with `autocomplete="one-time-code"`.
- What is drawn on a canvas.

The screenshot below is a session recorded with text masking on. Text inside elements shows as asterisks, while the page structure and the trail of actions remain.

![Session replay recorded with text masking on: text shows as asterisks, the search box placeholder is still readable](/screenshots/track/track-replay-masked.png)

Text masking only covers the text inside elements. Text in attributes such as `placeholder` and `title` is recorded as is, which is why the search box placeholder in the screenshot is still readable.

When an attribute holds something that must not be recorded, add `data-track-mask` to the element, and the whole element is left out.

## API monitoring

`apiMonitorPlugin()` wraps `fetch` and XHR and sends one `api_request` event per request. The SDK's own `/track/` endpoints are not recorded, to avoid a loop.

| Property | Meaning |
| --- | --- |
| `url` | The full address. Values of sensitive parameters become `***`, see [Privacy](/en/track/privacy#url-redaction) for the rules |
| `method` | The request method |
| `status` | The status code. It is 0 on a network failure, with the reason in `error_message` |
| `duration_ms` | Duration in milliseconds |
| `success` | `true` when the status code is between 200 and 399 |
| `response_size` | Size of the response body |
| `body_ref` | Reference of the captured response body |
| `body_skipped` | Why the response body was not captured |

### Switches

| Switch | Default | Effect |
| --- | --- | --- |
| `apiMonitorEnabled` | off | The main switch. When off, the plugin does not wrap `fetch` and XHR |
| `apiBodyEnabled` | off | Captures JSON response bodies, uploaded separately through `/track/api-body` and never put in the event queue |
| `apiBodyMaskEnabled` | off | Replaces the values of personal data fields in response bodies with `***`. Credential fields are replaced whether it is on or not |
| `apiBodyMaxBytes` | 1 MB | Response bodies larger than this are not captured |

The first three switches are "API monitoring", "Response body capture" and "Response body masking" in the application form. A value written in code wins.

### Response bodies that are not captured

With response body capture on, the bodies below are still not captured. The event is sent as usual, with the reason in `body_skipped`:

| `body_skipped` | Case |
| --- | --- |
| `size` | The response body exceeds `apiBodyMaxBytes` |
| `credential` | It is a credential endpoint, such as login, token issuing or sending a verification code |
| `unparsable` | The body cannot be parsed as JSON, so it cannot be masked |

Responses whose type is not JSON are not captured either.

### How credential endpoints are detected

The path is URL-decoded and lower-cased first. It is a credential endpoint if any rule below matches. These rules are built into the SDK and cannot be turned off.

| Rule | Keywords | Matching examples |
| --- | --- | --- |
| The path contains one of these fragments | `/auth/login` `/auth/refresh` `/oauth/token` `/auth/social` `/register` `/signup` `/sign-up` `/password` `/forgot` `/reset-password` `/change-password` `/captcha` `/mfa` `/2fa` `/totp` `/verify-code` `/verification-code` | `/api/auth/login` |
| A whole path segment is one of these words | `login` `signin` `sign-in` `logout` `token` `sso` `cas` | `/api/login` `/login.do` |
| The path contains one of these strings | `captcha` `verifycode` `verificationcode` | `/getCaptcha` `/user/verifyCode` |
| Split on non-letters, one of the words is | `sms` `otp` `sendcode` `getcode` `checkcode` | `/api/sms/send` `/user/getCode` |
| A verb directly followed by a code word | Verbs `send` `get` `resend` `check` `verify` `validate`, followed by `sms` `otp` `smscode` `mobilecode` `phonecode` `emailcode` `msgcode` | `/sendSms` `/getSmsCode` |
| Getting or refreshing a token | `get` `refresh` `renew` `issue` `exchange` plus `token`, optionally with `access` `auth` `id` `session` `csrf` `user` in between; `token` followed by `exchange` or `refresh` also counts | `/getToken` `/refresh-token` `/tokenExchange` |

Paths such as `/monitor/loginLog/list`, `/tokens/stats` and `/smsTemplate/list` do not match.

The rules err on the side of blocking. Ordinary endpoints such as `/getTokenList` and `/passwordPolicy/list` are caught too, and the only cost is one response body not captured.

The other way round, when an endpoint returns a token or a verification code and its name is not recognized, the only option is to turn `apiBodyEnabled` off.

## Visual tagging

Visual tagging adds tracking without code changes. Pick an element on the page and give it an event name, and later clicks on that element are reported. The page has to register `visualTrack()` first.

<div class="ms-steps">

### Start visual selection

Under "Integration → Visual rules", select the application, click "Start visual selection" and enter the address of the page to tag.

The backend issues a token valid for 30 minutes and opens the page in a new window. Reloading the page invalidates the token, and you have to start again.

### Pick an element

The page enters selection mode and highlights whatever the mouse is over. Click an element, enter an event name and submit it as a draft. Press Esc to leave.

### Confirm the rule

The draft goes back to the draft bar in the admin console. Once confirmed it becomes a visual rule and is sent out with `/track/config`; a discarded draft has no effect.

</div>

![Picking an element on the page, with the selected button highlighted](/screenshots/track/track-visual-inspect.png)

Once a rule is active, matching clicks are reported under the event name set in the rule, with the two properties `vs_selector` and `element_text`.

Without rules the plugin installs no listener. Clicks inside masked areas do not trigger rules.

## Precise location

With "Precise location" on for the application, `geoPlugin()` asks the browser for the location at most once per session, and the browser shows its permission prompt.

After the user agrees, later events carry `geo_lon`, `geo_lat` and `geo_acc`. Longitude and latitude keep 4 decimal places, about 11 meters.

If the user refuses or locating fails, nothing happens and the SDK does not ask again in that session. The [Spatial behavior](/en/track/spatial) page uses these coordinates.

## Next

<div class="ms-cards">

- [Privacy](/en/track/privacy) What gets masked, and how to turn on stricter masking.
- [Options](/en/track/install#options) Every option and its default.
- [Error issues](/en/track/error-issues) Group errors by fingerprint and assign them to people.

</div>
