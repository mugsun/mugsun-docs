# Privacy

This page describes what `@mugsun/track-web` actually does. If the docs and the code disagree, please open an issue on [mugsun-track](https://github.com/mugsun/mugsun-track/issues).

::: warning From 0.3.0, original text is shown and everything is reported by default
From 0.3.0 (planned; see "Unreleased" in the repo CHANGELOG), the SDK **masks and filters nothing by default**: replays show the original page text, response bodies are uploaded as-is, and handled errors and `HttpError` are reported too. Integrators turn on masking or filtering themselves; see [Turning on masking and filtering](#turning-on-masking-and-filtering) below. In 0.2.0, replay text and sensitive response body fields were masked by default.
:::

## Defaults

| Item | Behavior |
| --- | --- |
| Do Not Track | Honored by default (`respectDnt: true`); browsers with DNT on are not tracked |
| User opt-out | `optOut()` stops collection and replay; `optIn()` resumes |
| Input values | `input` / `textarea` values are never captured |
| Passwords and sensitive areas | `input[type="password"]`, `maskSelectors` matches and `data-track-mask` elements are blocked entirely |
| Session replay | Off by default. When on, **page text is shown as-is by default** (`maskTextSelector` is not set); input values are still replaced with `***` |
| Response bodies | Not captured by default. When capture is on, **bodies are uploaded as-is by default** (`apiBodyMaskEnabled` defaults to `false`); credential endpoints are never captured |
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

## Turning on masking and filtering

Nothing is masked or filtered by default. Turn each one on as needed:

```ts
import { createTracker, defaultPlugins, apiMonitorPlugin } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // Response bodies: replace values of built-in sensitive keys (password, token, phone, email, ...) with ***
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

## Compliance tips

- Describe what you collect in your privacy policy and give users a way to opt out (call `optOut()`).
- Add `data-track-mask` or a `maskSelectors` entry to areas that show personal data.
- Capture response bodies only when you need them; set `apiBodyMaskEnabled: true` when bodies may contain personal data.
- When pages show personal data, mask those areas in replays with `maskTextSelector`.
- Data lives in your own PostgreSQL; set retention and access according to your policies.

Related: [Plugins](/en/track/plugins) · [Security checklist](/en/boot/security-checklist)
