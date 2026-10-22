# Privacy

This page describes what `@mugsun/track-web` actually does. If the docs and the code disagree, please open an issue on [mugsun-track](https://github.com/mugsun/mugsun-track/issues).

::: warning From 0.3.0, original text is shown and everything is reported by default
From 0.3.0, replays record page text and input values as-is, personal data in response bodies is uploaded as-is, and every error is reported; see [Defaults](#defaults).
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
| Global Privacy Control | Ignored by default (`respectGpc: false`), tracking continues; with `respectGpc: true`, browsers where `navigator.globalPrivacyControl` is `true` are not tracked. Some jurisdictions treat GPC as a valid opt-out request; decide whether to set `respectGpc: true` based on the compliance rules where you operate |
| User opt-out | `optOut()` stops collection and replay; `optIn()` resumes |
| Input values (autocapture) | Autocaptured events such as clicks never include `input` / `textarea` values; for replay see the next rows |
| Never recorded | `input[type="password"]`, `maskSelectors` matches, `data-track-mask` elements, card fields (`autocomplete` starting with `cc-`) and one-time-code fields (`autocomplete="one-time-code"`) are blocked entirely in replays; canvas is not recorded |
| Session replay | Off by default. When on, **page text and input values are shown as-is by default** (`maskTextSelector` is not set, `maskAllInputs` defaults to `false`) |
| Response bodies | Not captured by default. When capture is on, personal data is **uploaded as-is by default** (`apiBodyMaskEnabled` defaults to `false`); credential keys (`token`, `refresh_token`, `password`, `cookie`, …) are always replaced with `***`; credential endpoints are never captured |
| Errors | **Everything is reported by default**, including `HttpError` and errors flagged `handled` / `expected` (`skipHandledErrors` defaults to `false`) |
| Regular events | Sent as-is by default; `beforeSend` is not set |

## URL redaction

API monitoring URLs, the shared `referrer` property, autocaptured link `href`s, resource error `resource_url`s, JS error `filename`s, the page address in replay Meta events, and address attributes in the replay DOM all keep query strings, but values for these keys become `***`. Other parameters are kept.

Replay DOM attributes handled: `href`, `src`, `srcset`, `imagesrcset`, `action`, `xlink:href`, `formaction`, `poster` and `data`, in any letter case. `srcset` and `imagesrcset` are parsed per the HTML spec (URLs may contain commas) and redacted one candidate at a time, keeping descriptors such as `1x` and `480w`; `data:` candidates are skipped individually.

Addresses in these places in the replay are **not redacted**:

- CSS `url()` in inline styles and stylesheets
- `data-*` attributes
- `iframe` `srcdoc`
- `meta` `content`
- URLs that appear in page text
- Tokens embedded in paths, such as `/reset/<token>` (not handled anywhere)

If any of these may carry a token or signature, add `data-track-mask` to the element so the replay skips it entirely.

`data-track-mask` must be on the element when recording starts or when the element is inserted. Adding it later won't mask what's already recorded. Once it's on, later changes to the element aren't recorded.

Credential keys, shared by URLs and response bodies:

```text
token  access_token  refresh_token  id_token  authorization  auth  jwt
api_key  apikey  x-api-key  secret  client_secret  private_key  access_key  secret_key
password  passwd  pwd  cookie  set-cookie  session  session_id  jsessionid
x-amz-signature  x-amz-security-token  x-goog-signature
```

Keys replaced only in URLs and kept as-is in response bodies:

```text
code  sign  signature  ticket  otp
sig  q-signature  x-oss-signature  x-oss-security-token  x-cos-security-token
```

Matching ignores case, `_` and `-`, so `accessToken` and `Refresh-Token` count too; it is an exact match after that, so `tokenCount` and `sessionTimeout` do not. Parameters in the hash are handled the same way, which covers the OAuth implicit flow and hash routing:

```text
/api/order?id=42&token=abc123   →   /api/order?id=42&token=***
/cb#access_token=abc&state=x    →   /cb#access_token=***&state=x
/#/login?code=abc               →   /#/login?code=***
```

`url_path` holds the pathname only, without the query string or hash.

Only userinfo, sensitive path parameters, the query string and the hash are changed. The scheme, host and the rest of the path are kept verbatim.

- The `user:pass` in `https://user:pass@host/…` becomes `***`.
- Userinfo is split at the last `@`.
- `//` may be written with backslashes.
- In http(s) and similar schemes, a backslash ends the host, like `/`.
- Leading whitespace and control characters are stripped first.
- TAB, LF and CR are then removed, as browsers do.
- Extra leading `?` on query keys is ignored, before and after decoding.
- So `/a??token=` and `/a?%3Ftoken=` are both masked.
- Sensitive path parameters are masked: `;jsessionid=…` → `;jsessionid=***`.
- Known gaps:
  - In http, https, ws, wss, ftp, file and `//` URLs, userinfo (user name
    or password) containing a literal `\` is not masked: `https://u:p\w@h`.
  - Browsers end the host at `\`, so they don't parse it as credentials.
  - Forms without `//` aren't masked either: `https:u:p@h`, `mailto:u:p@h`.

Relative URLs (`img/a.jpg?token=…`) and protocol-relative URLs (`//cdn.x/a?token=…`) keep their form, with only parameter values replaced.

## Credential fields in response bodies

JSON response bodies only have the **credential keys** from [URL redaction](#url-redaction) replaced; matching values are **always** replaced with `***`, regardless of `apiBodyMaskEnabled`. Matching works as in URLs: case, `_` and `-` are ignored (`accessToken` and `sessionId` count), and it is an exact match after that (`tokenCount` and `sessionTimeout` do not).

`code`, `sign`, `signature`, `ticket` and `otp` are often business fields in response bodies, so they are kept as-is, which helps you see API errors and reproduce them:

```text
{"code":0,"msg":"ok","data":{"sign":true,"ticket":1}}   →   uploaded unchanged
```

One exception: `code` and `ticket` values that look like tokens are replaced too.

- JWT shape: three base64url parts starting with `eyJ`.
- Or 16+ characters that mix letters and digits.
- Using only letters, digits and `.` `_` `~` `+` `/` `=` `%` `-`.
- This covers base64, hex, `4/0Ab…` codes and URL-encoded `4%2F0Ab…`.

Upper-case snake codes such as `INVALID_PARAMETER_VALUE` are kept. Short codes such as `0`, `200` and `"E1001"` are kept too:

```text
{"code":"E1001"}                    →   uploaded unchanged
{"code":"SplxlOBeZQQYbYS6WxSbIA"}    →   {"code":"***"}
```

- **Depth**: objects and arrays are checked level by level, up to 8 levels; deeper subtrees are replaced with `***` as a whole rather than uploaded as-is.
- **Non-JSON**: only bodies with a JSON content type are captured; other types (HTML, text, binary, SSE) are never captured.
- **Declared JSON that fails to parse**: the body is not uploaded, and the `api_request` event is marked `body_skipped: 'unparsable'`.

`apiBodyMaskEnabled` only controls personal-data keys (`phone`, `mobile`, `email`, `idcard`, `bankcard`), which are uploaded as-is by default.

`session` is a session identifier rather than a business code, so it is a credential key and is replaced with `***` in bodies too.

Tokens under key names outside the credential list (such as `sessionKey` or `userToken`, or `code` and `ticket` values in bodies that are shorter than 16 characters, all digits or all letters) are not replaced. Turn body capture off with `apiBodyEnabled: false` if that matters.

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
