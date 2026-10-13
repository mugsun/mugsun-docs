# Privacy

Principle: **private by default**. This page describes what the SDK on `main` actually does. If the docs and the code ever disagree, the stricter behavior is the intended one; please open an issue on [mugsun-track](https://github.com/mugsun/mugsun-track/issues).

## Defaults

| Item | Behavior |
| --- | --- |
| Do Not Track | Honored by default (`respectDnt: true`); browsers with DNT on are not tracked |
| User opt-out | `optOut()` stops collection and replay; `optIn()` resumes |
| Input values | `input` / `textarea` values are never captured |
| Passwords and sensitive areas | `input[type="password"]`, `maskSelectors` matches and `data-track-mask` elements are blocked entirely |
| Session replay | Off by default; when on, inputs and page text are masked (since 0.2.0) |
| Response bodies | Not captured by default; when enabled, sensitive fields are masked as `***` (since 0.2.0); credential endpoints are never captured |

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

## Compliance tips

- Describe what you collect in your privacy policy and give users a way to opt out (call `optOut()`).
- Add `data-track-mask` or a `maskSelectors` entry to areas that show personal data.
- Capture response bodies only when you need them, and keep `apiBodyMaskEnabled` on; don't leave it off after debugging.
- Data lives in your own PostgreSQL; set retention and access according to your policies.

Related: [Plugins](/en/track/plugins) · [Security checklist](/en/boot/security-checklist)
