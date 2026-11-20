# Behavioral captcha

Sign-in, registration, the forgot-password code and the SMS code request all require a behavioral captcha first by default. The captcha is built into boot and uses no third-party service.

This page covers the backend: challenge types, endpoints, settings and what to do before going live. For the frontend interaction, see [Behavioral captcha in the admin console](/en/pc/captcha).

## Five challenge types

| Type | Identifier | What the user does |
| --- | --- | --- |
| Slider | `SLIDER` | Drags the puzzle piece into the gap; the image also contains fake gaps |
| Rotate | `ROTATE` | Drags a slider to turn the round image to the right angle |
| Word click | `WORD_CLICK` | Clicks the characters of a common 3–4 character word or idiom, in order |
| Icon click | `ICON_CLICK` | Clicks 3 icons in order |
| Jigsaw | `JIGSAW` | Puts a 2×2 jigsaw back together |

- All five are enabled by default. The server picks one at random from the types the tenant has enabled; the frontend can't choose.
- Every challenge is verified on the server. The answer lives only in the challenge record and is discarded after one verification.
- Error codes, failure counts and lockout rules are the same for all types.

## Integration flow

| Endpoint | Purpose |
| --- | --- |
| `GET /auth/captcha/config?scene=&clientId=&tenantId=` | Whether verification is needed; a hint for the frontend only |
| `POST /auth/captcha/challenge` | Returns the background image and the puzzle piece, valid for `expireSeconds` |
| `POST /auth/captcha/verify` | Submits the drop position and track (or the key-press count in keyboard mode) in exchange for a one-time `captchaToken` |

A full verification takes four steps:

1. The page calls `config` to see whether the current scene needs verification.
2. If it does, the page calls `challenge` and renders the challenge according to `type` in the response.
3. When the user is done, the page calls `verify` and gets a one-time `captchaToken` on success.
4. The page puts `captchaToken` into the body of the business request.

Rules for parameters and tokens:

- `scene` is one of `login`, `register`, `sms` (the SMS code request) and `forget`.
- `inputMode` declares the input method when a challenge is requested, and must be the same at verification:
  - `pointer`: mouse or touch;
  - `keyboard`: keyboard. A keyboard challenge returns `keyboardStep`, and the key-press count must match the drop position.
- `captchaToken` goes into the request body of four endpoints:
  - `/auth/login` and `/auth/register`;
  - `/auth/sms-code` and `/auth/forget-code`.
- A token can be used only once, and it must match the scene, client and tenant of the challenge.
- The server decides for itself whether verification is needed. It does not rely on the result of `config`.

## Challenge selection

- The frontend renders according to `type` in the response. A `type` in the request is ignored.
- `type` returned by `config` is `RANDOM` when two or more types are enabled, otherwise the name of the single type.
- The `Accept-Language` header decides only the language of the prompt, not which type is served.
  - In English, the icon names in the icon-click prompt are English.
- Click challenges are judged against the image size at the time the challenge was issued. Changing the size settings while a challenge is valid does not affect challenges already issued.

### Keyboard mode

- Keyboard mode (`inputMode: keyboard`) picks only from slider and rotate, whichever the tenant has enabled.
- When neither is enabled, a keyboard challenge request returns `40015` (no accessible verification method enabled). It does not fall back to another type.
- A keyboard challenge request is first counted against the per-IP rate limit (`rate-limit.keyboard-challenge-per-minute`), and only then checked for `40015`.
- Requests rejected with `40015` count against this limit too.
- The per-tenant count of keyboard challenge requests is kept only in Redis and is not audited.
- Only `40015` is written to the audit log, at most one entry per tenant and IP every 10 minutes.

## Settings

The full list of keys and defaults is under `mugsun.captcha` in `application.yml`.

### Switch, storage and rate limits

```yaml
mugsun:
  captcha:
    enabled: true          # global switch
    store: redis           # redis | memory; memory is for single-node development and fails to start under prod
    slider:
      tolerance-px: 6      # drop tolerance, in pixels of the original image (320×180)
      expire-seconds: 120  # how long a challenge is valid
      token-expire-seconds: 120
      decoy-count: 2       # fake gaps with the same outline as the real one, 0–3
      keyboard-step-px: 4  # original-image pixels moved per key press in keyboard mode
      bind-ip: false       # bind the token to IP / UA (when off, only recorded)
      bind-ua: false       # true by default under prod
    background:
      dir: classpath:captcha/bg/   # or file:/opt/mugsun/captcha-bg/
      rotate: random               # random | round-robin
      reload-seconds: 600          # directory rescan interval; 0 = load only at startup
    rate-limit:
      challenge-per-minute: 30     # challenges per IP per minute
      verify-fail-max: 5           # failures within 10 minutes; beyond that, locked for 10 minutes (3 in keyboard mode)
      global-challenge-per-second: 200   # global challenges per second (shared across nodes with Redis storage)
      sms-phone-per-day: 10        # SMS: per phone number per day
      sms-ip-per-hour: 20          # SMS: per IP per hour
      sms-phone-per-minute: 5      # SMS short window: per phone number per minute (counted only after the token is consumed; recovers by itself)
      sms-ip-per-minute: 30        # SMS short window: per IP per minute (every request counts, including those without a token)
```

### Challenge type parameters

```yaml
mugsun:
  captcha:
    # types used by tenants without their own setting; one is picked at random each time
    default-types: [SLIDER, WORD_CLICK, ROTATE, ICON_CLICK, JIGSAW]
    rotate:
      dir: classpath:captcha/rotate/
      piece-size: 160
      tolerance-deg: 10
      keyboard-step: 5
      track-replay-window-seconds: 600   # one drag track can be used only once within the window; ≤0 turns it off
    click:
      count: 3                    # count and decoys apply to icon click only
      decoys: 2
      min-radius-px: 22
      min-duration-ms: 400
      max-duration-ms: 30000
      words-file: ""              # private word list; empty uses the built-in one
      seed-warp-strength: 0.14    # per-challenge grid warp for icon click; 0 turns it off
    jigsaw:
      rows: 2
      cols: 2
    icon-dir: classpath:captcha/icons/   # icon directory; must contain manifest.json and <slug>.png
    render-max-concurrent: 16            # images rendered at once on this node; over the limit returns 40012; ≤0 means no limit
    render-acquire-timeout-ms: 200       # longest wait for a render permit, in ms; on timeout returns 40012
    rate-limit:
      keyboard-challenge-per-minute: 10  # keyboard-mode challenges per IP per minute
```

### Tenant switch {#tenant-switch}

The captcha is on for every tenant by default, new tenants included. A platform super admin can change one tenant's setting with `POST /system/tenant/captcha`:

```json
{ "id": 1, "enabled": true, "types": ["SLIDER", "ROTATE"] }
```

- `id` is the tenant's primary key. `enabled: false` turns the captcha off for that tenant only; other tenants are not affected.
- The operation is written to the audit log. With several nodes, the other nodes pick it up within 60 seconds.
- `types` sets the challenge types enabled for the tenant: at least one, and only the five above.
  - leave `types` out to keep the current setting;
  - pass `null` or `[]` to reset to the platform default (`default-types`);
  - tenants that never set it use `default-types`.
- A setting without `SLIDER` and `ROTATE` is still saved, but `data.warning` in the response says keyboard users will get `40015`.
- The setting is stored in `sys_tenant.captcha_types` (migration `V10__tenant_captcha_types.sql`).
- The SMS code request is not tied to a tenant. It follows only the global switch, and has per-phone daily and per-IP hourly limits.
- The client switch (`sys_client.captcha_enabled`) takes no part in the decision, because clientId is supplied by the caller.

::: warning Turning the captcha off removes brute-force protection
With `mugsun.captcha.enabled=false`, or with a tenant turned off, that tenant's sign-in, registration and forgot-password code no longer require human verification. Only the sign-in failure lockout and the rate limits remain. Turn it off only temporarily, while troubleshooting or before the frontend is upgraded.
:::

## Tolerance and timing

Tolerances are set so that an ordinary person passes in 1–2 seconds.

### Rotate {#rotate-tolerance}

- The tolerance is ±10°. The angle the server applies is a multiple of `keyboard-step`, between 30° and 330°.
- Rotate is judged by the submitted angle. The drag track is used to tell whether a person is operating, and it must also meet one condition:
  - the angle derived from the first-to-last displacement is a_t = displacement ÷ display width × 360°;
  - 0.5 × submitted angle − 10° ≤ a_t ≤ submitted angle + 10°.
- The frontend may offer low-speed fine tuning: at low speed, displacement accumulates at 0.5×.
  - The x of the track must record the accumulated logical position, not the raw pointer coordinate.
- One track can be used only once within 10 minutes; a replay fails verification.
- The rotate tolerance was not made narrower. Lifting a finger off a touch screen usually shifts 3–8 pixels, and repeated failures lock the IP, so a tighter tolerance would lock real users out.
- Tolerance does not vary by `pointerType` either, because the client reports it.
- The risk of blind guessing is covered by the failure lockout, the rate limits and per-challenge image randomization.

### Click and jigsaw

- The hit radius of a click target is 0.75× the font size or the icon's side, and at least 22 pixels.
- Any two click targets are at least the sum of their hit radii plus 6 pixels apart.
- Click and jigsaw operations are limited to 0.4–30 seconds, counted from the first action.
- The time between opening the challenge and the first action is not counted; only the challenge validity applies.
  - The validity is `slider.expire-seconds`, 120 seconds by default. After it expires, verification returns `40010`.

## Randomization per challenge

- Background and rotate images are randomly scaled, cropped, mirrored and color-shifted.
- Jigsaw pieces also get noise and a slight color shift (±4 per piece), and at least 3 pieces start out of place.
- The slider's fake gaps have the same outline as the real one; there are 2 by default.
- Icons in icon click sit on no white disc. They get a shadow and a thin stroke that follow the outline, and interference lines are drawn beneath the icons.
- By default icon click applies a per-challenge seed-warp grid deformation, with a slightly perturbed stroke, to the PNGs from the public library.
- The prompt bar and the canvas use the same seed for the same slug, which resists template matching against the public library.
- In word click, characters with fewer than 3 strokes are rotated only ±15°.

## Switch to private assets before going live

The default backgrounds (12), rotate images (16) and icons (44) are public in the open-source repository. An attacker can diff the public originals against a challenge image to locate the gap, or prepare answer tables for rotate and icon challenges in advance.

- In production, point `background.dir`, `rotate.dir` and `icon-dir` at your own directories, and change the assets regularly.
  - A directory takes a `file:` or `classpath:` prefix.
- For word click, switch to a private word list with `click.words-file`.
- Under `prod`, the startup log warns when the bundled assets are still in use.
  - This is decided by directory or file hash;
  - an unset `click.words-file` also counts as using the bundled assets.

### Background images

- Use jpg or png, ideally 640×360 (16:9), at most 200KB each, and at least 20 of them.
- Avoid large areas of solid color. When the directory is empty, a solid-color placeholder is used.
- Use only images you own or that allow commercial use, and record their sources in a `SOURCES.md` in the directory.

### Word list

- Words come from the built-in list by default: 477 common words and idioms compiled by the project, using only level-1 characters of the Table of General Standard Chinese Characters.
- The built-in list is public with the repository, so an attacker who recognizes the characters can correct mistakes with a dictionary.
- A private list has one 3–4 character word per line. Lines starting with `#` are comments.
- Every character of a word must be in the built-in font subset. Otherwise the word is ignored, with a warning in the startup log.
- When the private list can't be read or has no usable word, the built-in list is used.
- The image also has 1–2 decoy characters, preferably look-alike or same-sounding ones. Clicking a decoy, or clicking in the wrong order, fails.
- Characters are rendered on the server with a built-in subset of Source Han Sans (SIL OFL 1.1), with interference added.

### Icons

- The icon directory must carry a `manifest.json` with the fields `slug`, `name_zh`, `name_en` and `confusable`.
  - When `name_en` is missing, the English UI falls back to the Chinese name.
- Icons that look alike never appear in the same challenge.
- When the icon manifest is missing or broken, the startup log warns and icon click is disabled automatically. Other types are not affected.
- If a tenant has enabled only icon click at that point, a challenge request returns `40016` (verification method temporarily unavailable). It does not fall back to slider.
  - This writes an audit log entry, at most one per tenant and IP every 10 minutes.

## Limits of the auxiliary types

Rotate and icon click are auxiliary types. They resist automated solving only partly and must not be the only line of defense.

### Rotate {#rotate-limits}

- Rotate is part of the platform's default random set.
- The round hole is filled with an opaque solid color, and the round image is also color-shifted, blurred, given noise and feathered at the edge. Solvers that compare pixels inside the hole no longer work.
- Solving the angle from the continuity between the round image's edge and the pattern outside the hole still lands within ±10° for about half of the challenges.
- Combine it with the failure lockout and the rate limits, and enable other types as well.
- A tenant setting with only `ROTATE` is still saved, but `data.warning` in the response gives a hint.

### Icon click

- The icon library, including `manifest.json`, is public with the repository.
- Rendering applies a seed-warp grid deformation to every challenge by default. The public originals then no longer line up with the challenge image, which makes template matching harder.
- The setting for the warp strength is `mugsun.captcha.click.seed-warp-strength`, `0.14` by default.
  - `0` turns the deformation off. The effective strength in rendering is clamped to roughly `[0, 0.35]`.
- The regression test runs a template-matching solver over 200 challenges each time.
  - It gets all three icons right about 0–1 times in 200; CI fails above 20%.
  - This shows only that this class of solver is stopped.
- Combine it with the failure lockout and the rate limits, and enable slider or other types as well. In production, switch to a private icon library.
- A tenant setting with only `ICON_CLICK` is still saved, but `data.warning` in the response gives a hint.

### Random multi-type

When the five types are served at random, an attacker can refresh until the weakest type comes up and solve that one. Overall strength is close to that of the weakest type.

Tenants that mind this can keep only the types they need with `types` in the [tenant switch](#tenant-switch).

## Error codes

Error codes are returned as HTTP 200 plus `R.code`:

| code | Meaning |
| --- | --- |
| `40010` | The challenge has expired; request a new one |
| `40011` | Failed; request a new one (the specific reason is not given) |
| `40012` | Too many attempts; try again after `data.retryAfter` seconds |
| `40013` | A captcha is required, but the request has no `captchaToken`, or the token was already used, has expired, or doesn't belong to this scene or tenant |
| `40014` | No verification is needed right now |
| `40015` | A keyboard-mode challenge was requested, but the tenant has neither slider nor rotate enabled (no accessible verification method enabled) |
| `40016` | None of the tenant's enabled types is available right now, for example only icon click is enabled and the icon manifest is missing |

More on some of the codes:

- `40012`: the failure that triggers the lockout itself returns `40012`, such as the 5th by pointer or the 3rd by keyboard.
  - If the IP is already locked when a verification fails, `40012` is returned too. That includes concurrent requests and a lock just set by the other input method.
  - During the lockout, both challenge and verify requests return `40012`.
- `40013`: the HTTP status is 200, and the frontend shows the captcha again based on `code`.
- `40016`: tell the user to contact an administrator. The frontend must not retry automatically.
- The verify endpoint's request body is limited to 32KB, chunked transfer included. Over the limit it also returns HTTP 200 plus `40011`.

## Forgot password and SMS codes

### Forgot password

`/auth/forget-code` always answers with the same success message. It says that, if the account exists, a code has been sent to the bound email:

```text
如账号存在，验证码已发送至绑定邮箱
```

- The email is sent asynchronously, so the response time does not depend on whether the account exists.
- The same message is returned in all of these cases:
  - the account doesn't exist or has no bound email;
  - the email channel is not configured, or delivery failed.
- The real reason goes only to the server log, so nobody can use the response to tell whether an account exists or what state the channel is in.
- After deploying, check the email channel. Otherwise users receive no code and still see the "sent" message.

### SMS codes

`/auth/sms-code` runs in this order:

1. Check the per-IP short window: 30 a minute. Every request counts, including those without a token, and it recovers after 60 seconds.
2. Check the daily quotas read-only (per phone number per day, per IP per hour). When a quota is already exceeded, no token is consumed.
3. Consume `captchaToken`.
4. Check the per-phone short window: 5 a minute, counted only after the token has been consumed.
5. Count the daily quota atomically, only if it is not yet exceeded.
6. Send.

What this order gives you:

- A request without a token, or with an invalid one, counts only against the IP short window. It does not count against the phone short window and uses no daily quota.
- So nobody else can lock your number or use up its quota for the day.
- A failed send does not give the quota back, and it is written to the audit log.
- Exceeding any limit returns `40012` with `retryAfter`.
- The phone number is first stripped of spaces and `-`, then of a `+86`, `0086` or `86` prefix. Rate limits, sending and SMS sign-in all use the same number.

## Redis keys

All captcha state lives under the prefix `mugsun:captcha:v2:`. With `store: memory`, keys of the same names live in the process.

| Key | Purpose | Expiry |
| --- | --- | --- |
| `challenge:<captchaId>` | The challenge (answer and binding info); read and deleted at verification | `expire-seconds` |
| `token:<captchaToken>` | One-time token; read and deleted by the business endpoint | `token-expire-seconds` |
| `rl:challenge:<ip>` | Challenges per IP per minute | 60 seconds |
| `rl:keyboard:<ip>` | Keyboard verifications per IP per minute | 60 seconds |
| `rl:global:<second>` | Global challenges per second | 2 seconds |
| `rl:sms-phone:<phone hash>` / `rl:sms-ip:<ip>` | Daily SMS quotas (counted only after the token is consumed) | 1 day / 1 hour |
| `rl:sms-burst-phone:<phone hash>` / `rl:sms-burst-ip:<ip>` | SMS short-window rate limits | 60 seconds |
| `fail:<pointer\|keyboard>:<ip>` | Failure count | `fail-window-seconds` |
| `lock:<ip>` | IP lock; the remaining TTL is `retryAfter` | `lock-seconds` |

In IPv6 addresses, `:` is written as `_`. To unlock an IP by hand, delete its lock key:

```bash
redis-cli DEL 'mugsun:captcha:v2:lock:<ip>'
```

## Asset sources and licensing

- The background and rotate images are the project's own assets: generated with an AI image tool, then scaled and cropped. No third-party assets are used.
- The icons are drawn by a script in the boot repository. The word list and the decoy-character mapping were compiled by the project.
- All of them are licensed like the repository's code (MIT). The font subset is under SIL OFL 1.1.
- See `captcha/SOURCES.md` in the boot repository for details.

## Next steps

<div class="ms-cards">

- [Behavioral captcha in the admin console](/en/pc/captcha) How the frontend renders challenges and handles error codes.
- [Configuration](/en/boot/configuration) Look up other settings and environment variables by topic.
- [Security checklist](/en/boot/security-checklist) Check item by item before going live; it includes a self-check command for the captcha.

</div>
