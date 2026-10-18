# Privacy

This page describes what `@mugsun/track-web` actually does. If the docs and the code disagree, please open an issue on [mugsun-track](https://github.com/mugsun/mugsun-track/issues).

::: warning From 0.3.0, original text is shown and everything is reported by default
From 0.3.0 (planned), replays record page text and input values as-is, personal data in response bodies is uploaded as-is, and every error is reported; see [Defaults](#defaults).
:::

::: danger Notice and separate consent (PIPL)
Before turning on replay or response body capture, you must **tell users** in your privacy policy what is collected, why and for how long; for sensitive personal information (ID numbers, bank card numbers, location history, health data and so on) you must get **separate consent**.
:::

Before users agree, call `tracker.optOut()` (the state is persisted in local storage), or delay `createTracker()`, don't register `replayPlugin()` and don't turn on `apiBodyEnabled`; once they agree, call `tracker.optIn()`. The SDK starts collecting as soon as it is created, and `optIn()` only undoes an earlier `optOut()`.

Tighten access and retention for replay and body data accordingly.

## Defaults

| Item | Behavior |
| --- | --- |
| Do Not Track | Honored by default (`respectDnt: true`); browsers with DNT on are not tracked |
| Global Privacy Control | Honored by default (`respectGpc: true`); browsers where `navigator.globalPrivacyControl` is `true` are not tracked |
| User opt-out | `optOut()` stops collection and replay; `optIn()` resumes |
| Input values (autocapture) | Autocaptured events such as clicks never include `input` / `textarea` values; for replay see the next rows |
| Never recorded | `input[type="password"]`, `maskSelectors` matches, `data-track-mask` elements, card fields (`autocomplete` starting with `cc-`) and one-time-code fields (`autocomplete="one-time-code"`) are blocked entirely in replays; canvas is not recorded |
| Session replay | Off by default. When on, **page text and input values are shown as-is by default** (`maskTextSelector` is not set, `maskAllInputs` defaults to `false`) |
| Response bodies | Not captured by default. When capture is on, personal data is **uploaded as-is by default** (`apiBodyMaskEnabled` defaults to `false`); credential keys (`token`, `refresh_token`, `password`, `cookie`, …) are always replaced with `***`; credential endpoints are never captured |
| Errors | **Everything is reported by default**, including `HttpError` and errors flagged `handled` / `expected` (`skipHandledErrors` defaults to `false`) |
| Regular events | Sent as-is by default; `beforeSend` is not set |

## URL redaction

API monitoring URLs, the shared `referrer` property, autocaptured link `href`s, resource error `resource_url`s and the page address in replay Meta events all keep query strings, but values for these keys become `***`. Other parameters are kept:

```text
token  access_token  authorization  id_token  refresh_token
api_key  apikey  auth  secret  password
code  sign  signature  ticket  session  otp
```

Matching ignores case, `_` and `-`, so `accessToken` and `Access-Token` count too. Parameters in the hash are handled the same way, which covers the OAuth implicit flow and hash routing:

```text
/api/order?id=42&token=abc123   →   /api/order?id=42&token=***
/cb#access_token=abc&state=x    →   /cb#access_token=***&state=x
/#/login?code=abc               →   /#/login?code=***
```

`url_path` holds the pathname only, without the query string or hash.

Invalid URLs are returned unchanged, and relative URLs stay relative.

## Credential fields in response bodies

The values of these keys in JSON response bodies are **always** replaced with `***`, regardless of `apiBodyMaskEnabled`. On top of the [URL redaction](#url-redaction) list it drops `code`, `sign`, `signature` and `ticket` (often business fields in bodies, such as error codes) and adds `x-api-key`, `client_secret`, `private_key`, `access_key`, `secret_key`, `jwt`, `passwd`, `pwd`, `cookie`, `set-cookie`, `session_id` and `jsessionid`, and matching ignores case, `_` and `-`, so `accessToken`, `Access-Token` and `sessionId` are all recognized:

```text
token  access_token  refresh_token  id_token  authorization
api_key  apikey  x-api-key  auth  secret  client_secret  private_key
access_key  secret_key  jwt  otp
password  passwd  pwd  cookie  set-cookie  session  session_id  jsessionid
```

- **Depth**: objects and arrays are checked level by level, up to 8 levels; deeper subtrees are replaced with `***` as a whole rather than uploaded as-is.
- **Non-JSON**: only bodies with a JSON content type are captured; other types (HTML, text, binary, SSE) are never captured.
- **Declared JSON that fails to parse**: the body is not uploaded, and the `api_request` event is marked `body_skipped: 'unparsable'`.

`apiBodyMaskEnabled` only controls personal-data keys (`phone`, `mobile`, `email`, `idcard`, `bankcard`), which are uploaded as-is by default.

Tokens under other key names (such as `sessionKey` or `code`) are not recognized. Turn body capture off with `apiBodyEnabled: false` if that matters.

## Turning on masking and filtering

Nothing is masked or filtered by default. Turn each one on as needed:

```ts
import { createTracker, defaultPlugins, apiMonitorPlugin } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // Response bodies: also replace personal-data keys (phone, email, idcard, ...) with *** (credential keys are replaced regardless)
  apiBodyMaskEnabled: true,
  // Errors: skip HttpError and errors flagged handled / expected
  skipHandledErrors: true,
  // Regular events: rewrite or drop props before they are queued
  beforeSend: (e) => {
    if (e.props?.phone) e.props.phone = '***'
    return e
  },
  replayEnabled: true,
  apiMonitorEnabled: true,
  apiBodyEnabled: true,
  plugins: [
    ...defaultPlugins(),
    // Replay: '*' masks all page text; you can also pass a narrower selector such as '.user-info, .order-detail';
    // maskAllInputs records every input value as ***
    replayPlugin({ maskTextSelector: '*', maskAllInputs: true }),
    apiMonitorPlugin()
  ]
})
```

- `maskTextSelector`: in the replay, text inside matching elements is replaced with `*`. When it is not set (the default), the original text is shown.
- `maskAllInputs`: when `true`, every input value in the replay is recorded as `***`. It defaults to `false` (values are recorded as-is); password fields are never recorded either way.
- `maskEnabled` is the api-body uploader's internal switch and is fed from `apiBodyMaskEnabled`, so set `apiBodyMaskEnabled`. Remote config can also turn it on with `apiBodyMaskEnabled: 1` (when not set locally; takes effect on the next start).
- After `skipHandledErrors: true`, if you still want to count the skipped API errors, call `trackApiError` in your interceptor; see [Error filtering and API failures](/en/track/install#error-filtering-and-api-failures).
- `beforeSend` does not see replay chunks or response body uploads. Handle those only with `maskTextSelector` / `maskSelectors` / `data-track-mask` and `apiBodyMaskEnabled`.
- For areas you don't want recorded at all (cards or tables with personal data), add a `data-track-mask` attribute or list them in `maskSelectors`; the replay skips them entirely.

## Upgrading from 0.2.0 and keeping the old masking

0.2.0 masked all page text and input values in replays and masked sensitive keys in response bodies by default. 0.2.0 had no `skipHandledErrors` and reported every error, so you don't need to set it. To keep 0.2.0's behavior after upgrading, add these options:

```ts
import { createTracker } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  apiBodyMaskEnabled: true, // 0.2.0 default: also replace phone, email, ID numbers etc. with ***
  plugins: [
    // ...your existing plugins
    // 0.2.0 defaults: mask all page text and every input value
    replayPlugin({ maskTextSelector: '*', maskAllInputs: true })
  ]
})
```

Check remote config too: mugsun-boot's "response body masking" switch is off by default, so `/track/config` sends `apiBodyMaskEnabled: false`, and the SDK uses that value when nothing is set locally on the next start.

To be sure bodies are masked, set `apiBodyMaskEnabled: true` locally (local settings win) or turn on "response body masking" in the admin UI.

A `skipHandledErrors` default of `true` was planned for 0.3.0 but never released. Add `skipHandledErrors: true` if you want to skip `HttpError` and handled errors.

## Compliance tips

- Describe what you collect in your privacy policy and give users a way to opt out (call `optOut()`).
- Add `data-track-mask` or a `maskSelectors` entry to areas that show personal data.
- Capture response bodies only when you need them; set `apiBodyMaskEnabled: true` when bodies may contain personal data.
- When pages show personal data, mask those areas in replays with `maskTextSelector`; when forms contain personal data, set `maskAllInputs: true`.
- Every error is reported by default, and `$error` messages may contain phone numbers, order numbers or backend exception text; rewrite them with `beforeSend` if needed.
- Data lives in your own PostgreSQL; set retention and access according to your policies.

Related: [Plugins](/en/track/plugins) · [Security checklist](/en/boot/security-checklist)
