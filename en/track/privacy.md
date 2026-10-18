# Privacy

This page describes what `@mugsun/track-web` actually does. If the docs and the code disagree, please open an issue on [mugsun-track](https://github.com/mugsun/mugsun-track/issues).

::: warning From 0.3.0, original text is shown and everything is reported by default
- Applies from 0.3.0 (planned; see "Unreleased" in the repo CHANGELOG).
- Replays show the original page text by default. Input values are still masked as `***`.
- Personal-data fields in response bodies are uploaded as-is by default. Credential keys (`token`, `password`, `cookie`, …) are always replaced with `***`; see [Credential fields in response bodies](#credential-fields-in-response-bodies).
- Every error is reported by default, including `HttpError` and handled errors. This is the same as 0.2.0, which had no `skipHandledErrors`.
- 0.2.0 masked replay text and sensitive response body fields by default. To keep that behavior, see [Upgrading from 0.2.0 and keeping the old masking](#upgrading-from-0-2-0-and-keeping-the-old-masking).
- Integrators turn on any other masking or filtering themselves; see [Turning on masking and filtering](#turning-on-masking-and-filtering).
:::

::: danger Notice and separate consent (PIPL)
With the default config, replays record names, phone numbers, addresses and other text shown on the page as-is, and personal data in response bodies is uploaded as-is. Before turning on replay or response body capture, you must **tell users** in your privacy policy what is collected, why and for how long; for sensitive personal information (ID numbers, bank card numbers, location history, health data and so on) you must get **separate consent**. Until users agree, don't call `optIn()`, or don't register `replayPlugin()` / turn on `apiBodyEnabled`. Tighten access and retention for replay and body data accordingly.
:::

## Defaults

| Item | Behavior |
| --- | --- |
| Do Not Track | Honored by default (`respectDnt: true`); browsers with DNT on are not tracked |
| User opt-out | `optOut()` stops collection and replay; `optIn()` resumes |
| Input values | `input` / `textarea` values are never captured |
| Passwords and sensitive areas | `input[type="password"]`, `maskSelectors` matches and `data-track-mask` elements are blocked entirely |
| Session replay | Off by default. When on, **page text is shown as-is by default** (`maskTextSelector` is not set); input values are still replaced with `***` |
| Response bodies | Not captured by default. When capture is on, personal data is **uploaded as-is by default** (`apiBodyMaskEnabled` defaults to `false`); credential keys (`token`, `refresh_token`, `password`, `cookie`, …) are always replaced with `***`; credential endpoints are never captured |
| Errors | **Everything is reported by default**, including `HttpError` and errors flagged `handled` / `expected` (`skipHandledErrors` defaults to `false`) |
| Regular events | Sent as-is by default; `beforeSend` is not set |

## URL redaction

API monitoring keeps query strings, but values for these keys (**exact match after lowercasing**) become `***`. Other parameters are kept:

```text
token  access_token  authorization  id_token  refresh_token
api_key  apikey  auth  secret  password
```

```text
/api/order?id=42&token=abc123   →   /api/order?id=42&token=***
```

Invalid URLs are returned unchanged, and relative URLs stay relative.

## Credential fields in response bodies

The values of these keys in JSON response bodies (**exact match after lowercasing**, at any depth) are **always** replaced with `***`, regardless of `apiBodyMaskEnabled`, matching the URL redaction key list:

```text
token  access_token  refresh_token  id_token  authorization
api_key  apikey  auth  secret  password  pwd  cookie
```

`apiBodyMaskEnabled` only controls personal-data keys (`phone`, `mobile`, `email`, `idcard`, `bankcard`), which are uploaded as-is by default. Tokens under other key names (such as `jwt` or `sessionKey`) are not recognized, and non-JSON bodies are uploaded as-is; turn body capture off with `apiBodyEnabled: false` if that matters.

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
    // Replay: '*' masks all page text; you can also pass a narrower selector such as '.user-info, .order-detail'
    replayPlugin({ maskTextSelector: '*' }),
    apiMonitorPlugin()
  ]
})
```

- `maskTextSelector`: in the replay, text inside matching elements is replaced with `*`. When it is not set (the default), the original text is shown.
- `maskEnabled` is the api-body uploader's internal switch and is fed from `apiBodyMaskEnabled`, so set `apiBodyMaskEnabled`. Remote config can also turn it on with `apiBodyMaskEnabled: 1` (when not set locally; takes effect on the next start).
- After `skipHandledErrors: true`, if you still want to count the skipped API errors, call `trackApiError` in your interceptor; see [Error filtering and API failures](/en/track/install#error-filtering-and-api-failures).
- `beforeSend` does not see replay chunks or response body uploads. Handle those only with `maskTextSelector` / `maskSelectors` / `data-track-mask` and `apiBodyMaskEnabled`.
- For areas you don't want recorded at all (cards or tables with personal data), add a `data-track-mask` attribute or list them in `maskSelectors`; the replay skips them entirely.

## Upgrading from 0.2.0 and keeping the old masking

0.2.0 masked all page text in replays and masked sensitive keys in response bodies by default. 0.2.0 had no `skipHandledErrors` and reported every error, so you don't need to set it. To keep 0.2.0's behavior after upgrading, add two options:

```ts
import { createTracker } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  apiBodyMaskEnabled: true, // 0.2.0 default: also replace phone, email, ID numbers etc. with ***
  plugins: [
    // ...your existing plugins
    replayPlugin({ maskTextSelector: '*' }) // 0.2.0 default: mask all page text
  ]
})
```

Check remote config too: mugsun-boot's "response body masking" switch is off by default, so `/track/config` sends `apiBodyMaskEnabled: false`, and the SDK uses that value when nothing is set locally (on the next start). To be sure bodies are masked, set `apiBodyMaskEnabled: true` locally (local settings win) or turn on "response body masking" in the admin UI.

A `skipHandledErrors` default of `true` was planned for 0.3.0 but never released. Add `skipHandledErrors: true` if you want to skip `HttpError` and handled errors.

## Compliance tips

- Describe what you collect in your privacy policy and give users a way to opt out (call `optOut()`).
- Add `data-track-mask` or a `maskSelectors` entry to areas that show personal data.
- Capture response bodies only when you need them; set `apiBodyMaskEnabled: true` when bodies may contain personal data.
- When pages show personal data, mask those areas in replays with `maskTextSelector`.
- Every error is reported by default, and `$error` messages may contain phone numbers, order numbers or backend exception text; rewrite them with `beforeSend` if needed.
- Data lives in your own PostgreSQL; set retention and access according to your policies.

Related: [Plugins](/en/track/plugins) · [Security checklist](/en/boot/security-checklist)
