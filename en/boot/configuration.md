# Configuration

boot follows standard Spring Boot conventions: `application.yml` holds defaults, `application-prod.yml` overrides them for production, and local overrides go in `config/application-local.yml` (git-ignored; the working directory must be the repository root). The tables below cover the most common environment variables; `mugsun-boot-core/src/main/resources/application*.yml` has the full set of keys.

## Local development

```bash
cp config/application-local.yml.example config/application-local.yml
```

`config/application-local.yml` is loaded last, so it can override any key from `application.yml` and from module configs such as `mugsun-module-track.yml`, for example the tracking database URL `mybatis-flex.datasource.track.url`. Before [mugsun-boot #29](https://github.com/mugsun/mugsun-boot/pull/29) it was loaded ahead of the module configs, so module keys set here were ignored and only environment variables (such as `TRACK_JDBC_URL`) worked. After upgrading, keys that used to be ignored take effect, so check the file for stale values.

The example ships local placeholder keys (`sm4-key`, `api-key`) and a mock social login. If you leave the SM2 key pair empty, a new pair is generated on every start and sign-in can break when it changes, so set a fixed local pair.

## Data sources and cache (prod)

| Variable | Purpose |
| --- | --- |
| `JDBC_URL` / `JDBC_USERNAME` / `JDBC_PASSWORD` | Primary database |
| `REDIS_HOST` / `REDIS_PORT` (default 6379) / `REDIS_PASSWORD` / `REDIS_DB` (prod default 0) | Redis |
| `FILE_STORAGE_PATH` (default `/var/lib/mugsun/files/`) / `FILE_DOMAIN` | Local file storage and its public domain |
| `MUGSUN_FRONT_URL` | Console origin, used for OAuth redirects and similar; defaults to `http://localhost:3006` in dev, required in prod |

## Security and keys

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_INIT_PASSWORD` | — | Initial admin password. prod refuses to start if it's missing or still the built-in default |
| `MUGSUN_GM_ENABLED` | `true` | Master switch for SM-series crypto (SM2 transport / SM3 digests) |
| `MUGSUN_SM4_KEY` | empty | SM4 key for field encryption |
| `MUGSUN_API_KEY` | empty | SM4 key for request/response encryption |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | empty | SM2 transport key pair (hex); generated with a warning if empty |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | empty | Audit-signing key pair, kept separate from transport keys |
| `MUGSUN_STRICT_KEYS` | `false` (`true` in prod) | When `true`, any missing key stops startup |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | empty | CIDR list of trusted reverse proxies; see [Open API](/en/boot/open-api#client-ip-and-trusted-proxies) |
| `MUGSUN_FILE_SIGN_SECRET` | empty | Signing key for local file download links (at least 32 characters); see "Local file access" below |

## Local file access

With the default (dev) settings, the app serves locally stored files directly under `/file/**`. So that nobody can download a private attachment just by knowing its address:

- Public files under `mugsun/public/` (such as avatars) can still be fetched without signing in.
- Every other file needs a short-lived signature. After signing in, `GET /system/file/download/{id}` returns an address with `e` (expiry) and `s` (signature) parameters, valid for 300 seconds by default. Requests with no signature, a wrong one or an expired one get a 404.

```yaml
mugsun:
  file:
    local-access:
      public-prefixes: [mugsun/public/]   # path prefixes anyone can fetch
      sign-secret: ${MUGSUN_FILE_SIGN_SECRET:}
      expire-seconds: 300
```

If `sign-secret` is empty, a random key is generated on every start, which only works for a single instance. With several instances, give them all the same value, or an address signed by one instance will 404 on another. The `prod` profile turns off direct `/file/**` serving by default and private attachments go through the authorized download endpoint, so this setting doesn't affect it. If you turn direct serving on under `prod`, `sign-secret` must be at least 32 characters; an empty or shorter value stops startup.

Every directly served file carries `X-Content-Type-Options: nosniff`. Types a browser might execute, such as HTML and SVG, and PDFs are always sent as attachments to download rather than opened in the browser. HTML, SVG and similar types also get `Content-Security-Policy: sandbox`.

## Operation log exclusions

Every controller write endpoint (POST/PUT/DELETE/PATCH) automatically gets an operation log entry (titled 「自动留痕」). Endpoints that browsers call constantly and that aren't admin actions can be excluded, so they write no log entry and stay out of the operation log hash chain. By default the analytics SDK's reporting endpoints are excluded:

```yaml
mugsun:
  oper-log:
    exclude-paths:          # Ant-style, matched against the path without the context path
      - /track/collect
      - /track/replay
      - /track/api-body
```

Setting this list replaces the default entirely, so include these three if you want to keep them; `exclude-paths: []` logs everything. Exclusions only affect automatic logging. Endpoints explicitly marked `@OperationLog` are still logged, and the admin endpoints under `/system/track/**` are unaffected.

## Optional modules

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS module |
| `MUGSUN_TRACK_ENABLED` | `true` | Analytics module |
| `MUGSUN_AI_ENABLED` | `true` | AI module |
| `POWERJOB_ENABLED` | `false` | PowerJob worker; requires a separate server and `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` / `MUGSUN_IP2REGION_XDB_PATH` | `false` / empty | IP-to-region lookup |

## AI outbound allowlist

Model calls (chat, streaming chat and embeddings), knowledge-base fetches, channel webhooks, remote MCP calls and the workflow HTTP node are checked for SSRF before any request goes out; private, loopback and cloud-metadata addresses are rejected by default. To reach an internal service, such as a local model server or an internal MCP endpoint, allow it explicitly:

```yaml
mugsun:
  ai:
    outbound:
      allow-hosts: [localhost, ollama.internal]
      # Ports allowed for hosts not on the list; 80/443 by default, [] means any port
      allowed-ports: [80, 443]
```

Entries are exact hostnames or `*.example.com` wildcards. A matching host may resolve to a private address.

Example: a local Ollama listens on `http://localhost:11434` by default. Add `localhost` to `allow-hosts` before that URL can be saved and called from model management, a knowledge base or a channel. `allow-hosts` can only be set in the platform configuration file, so tenants can't open internal addresses themselves. Models saved with an internal address before the upgrade fail when called until their host is added to the list.

- The check runs when the configuration is saved (including a model's API address) and again before every request, so an IP written directly into the address is caught too; only `http` and `https` are allowed.
- Hosts not on the list can only use ports 80 and 443 by default; open others with `allowed-ports`. Hosts on the list can use any port.
- When the connection is opened, the hostname is resolved again, every address is checked, and the connection goes to the address that was checked. A hostname that switches to an internal address after the check (DNS rebinding) still can't be reached. If any one of the resolved addresses is in a blocked range, the whole request is rejected.
- Blocked ranges cover private, loopback, link-local, CGNAT (which includes cloud metadata addresses), multicast, reserved and documentation addresses. The same applies to IPv6 (including `2001:db8::/32` and Teredo `2001::/32`), including IPv4-mapped, NAT64 and 6to4 addresses that embed one of those IPv4 addresses. The workflow HTTP node ignores `allow-hosts` and always blocks internal addresses.
- Redirects are not followed: when the other side answers with a 3xx, the request ends there and the `Location` address is never requested. If a webhook, MCP or model address redirects, enter the final address instead.
- The default is `allow-hosts: []`, so no private address is allowed. Public hosts not on the list are unaffected.
- Cloud metadata addresses are always refused, even when the host is on `allow-hosts`: the whole link-local range `169.254.0.0/16` (including `169.254.169.254`, the AWS ECS task credentials endpoint `169.254.170.2` and Tencent Cloud's `169.254.0.23`), plus `100.100.100.200` and `fd00:ec2::254`. IPv6 forms that embed an IPv4 address (`::ffff:` mapped, `::a.b.c.d` compatible, NAT64 `64:ff9b::/96` and 6to4 `2002::/16`) are decoded to the embedded IPv4 address before the check.
- `*.example.com` matches any subdomain but not `example.com` itself. Hosts ending in `.local` or `.internal` are rejected unless listed explicitly. List only the hosts you actually need.

## Human verification (slider captcha)

Login, registration, the forgot-password code and the SMS code request require a slider puzzle by default. The captcha is built into boot and uses no third-party service.

```yaml
mugsun:
  captcha:
    enabled: true          # global switch
    type: SLIDER           # SLIDER (default) | IMAGE (legacy digits, kept for one release)
    store: redis           # redis | memory; memory is single-node dev only and fails to start in prod
    slider:
      tolerance-px: 6      # drop tolerance in native background pixels (background is 320×180)
      expire-seconds: 120  # challenge lifetime
      token-expire-seconds: 120
      decoy-count: 2       # fake gaps (same outline as the real gap), 0–3
      keyboard-step-px: 4  # native pixels moved per key press in keyboard mode
      bind-ip: false       # enforce token binding to IP / UA (recorded either way)
      bind-ua: false       # true by default in prod
    background:
      dir: classpath:captcha/bg/   # or file:/opt/mugsun/captcha-bg/
      rotate: random               # random | round-robin
      reload-seconds: 600          # rescan interval, 0 = load at startup only
    rate-limit:
      challenge-per-minute: 30     # challenges per IP per minute
      verify-fail-max: 5           # failures in 10 minutes before a 10-minute lock (3 in keyboard mode)
      global-challenge-per-second: 200   # global per-second cap (shared across nodes with Redis)
      sms-phone-per-day: 10        # SMS codes per phone number per day
      sms-ip-per-hour: 20          # SMS codes per IP per hour
      sms-phone-per-minute: 5      # short window: per phone per minute (counts only after a token is consumed; recovers on its own)
      sms-ip-per-minute: 30        # short window: per IP per minute (every request counts, even without a token)
```

See `mugsun.captcha` in `application.yml` for every key and default.

**Backgrounds:** jpg or png, 640×360 (16:9) recommended, up to 200KB each, at least 20 images, avoiding large flat areas. A plain-colour placeholder is used while the folder is empty. Use only images you own or may use commercially, and list their sources in a `SOURCES.md` in the folder.

**Endpoints:**

| Endpoint | Purpose |
| --- | --- |
| `GET /auth/captcha/config?scene=&clientId=&tenantId=` | Whether verification is needed; a hint for the front end only |
| `POST /auth/captcha/challenge` | Background and puzzle piece, valid for `expireSeconds` |
| `POST /auth/captcha/verify` | Submit the drop position and track (or key presses in keyboard mode) for a one-time `captchaToken` |

`scene` is `login`, `register`, `sms` (sending the SMS code) or `forget`. The challenge request declares `inputMode` (`pointer` for mouse/touch or `keyboard`), and verify must use the same one; keyboard challenges return `keyboardStep`, and the number of key presses must match the drop position. Put the `captchaToken` in the body of `/auth/login`, `/auth/register`, `/auth/sms-code` or `/auth/forget-code`. It works once and must match the scene, client and tenant used for the challenge. The server decides on its own whether verification is needed; it does not rely on `config`.

**Challenge types:** besides the slider (`SLIDER`), there are rotate (`ROTATE`), word click (`WORD_CLICK`, click the characters of a common 3–4 character word or idiom in order), icon click (`ICON_CLICK`, click 3 icons in order) and jigsaw (`JIGSAW`, 2×2). For every challenge the server picks one at random from the types enabled for the tenant, and the front end renders whatever `type` comes back; a `type` in the request is ignored. In keyboard mode (`inputMode: keyboard`) the server picks only from the slider and rotate types the tenant has enabled; if neither is enabled, the challenge request returns `40015` (no accessible challenge type enabled) instead of issuing another type. Keyboard challenge requests first count against a stricter per-IP limit (`rate-limit.keyboard-challenge-per-minute`, including requests that end in `40015`), and only then is `40015` decided. The per-tenant keyboard challenge count is kept in Redis only and is not audited; only `40015` writes an audit log entry, at most one per tenant and IP every 10 minutes. The `type` from `config` is `RANDOM` when two or more types are enabled, otherwise the type name. Everything is checked on the server, the answer is kept only in the challenge record and is gone after one verify attempt, and error codes, failure counts and lockouts are the same for every type.

```yaml
mugsun:
  captcha:
    default-types: [SLIDER]   # types enabled for tenants without their own setting; any of SLIDER, ROTATE, WORD_CLICK, ICON_CLICK, JIGSAW
    slider: { expire-seconds: 120, decoy-count: 2 }   # challenge lifetime (s); slider decoy gaps (same outline as the real gap, 0–3)
    rotate: { dir: classpath:captcha/rotate/, piece-size: 160, tolerance-deg: 10, keyboard-step: 5, track-replay-window-seconds: 600 }  # a drag track can be used once per window; ≤0 disables
    click:  { count: 3, decoys: 2, min-radius-px: 22, min-duration-ms: 400, max-duration-ms: 30000, words-file: "" }  # count/decoys apply to icon click only; words-file is a private word list, empty = bundled list
    jigsaw: { rows: 2, cols: 2 }
    icon-dir: classpath:captcha/icons/   # icon directory; must contain manifest.json and <slug>.png
    render-max-concurrent: 16           # max concurrent image renders on this node, 40012 when exceeded; ≤0 means no limit
    render-acquire-timeout-ms: 200      # longest wait for a render permit, 40012 on timeout
    rate-limit:
      keyboard-challenge-per-minute: 10 # per-IP keyboard challenges per minute
```

Tolerances are set so an ordinary user passes in 1–2 seconds: ±10° for rotate (the applied angle is a whole multiple of `keyboard-step` between 30° and 330°), a hit radius of 0.75 × the character or icon size (at least 22 px) for clicks, and any two click items are at least the sum of their hit radii plus 6 px apart. Rotate is judged on the submitted angle. Besides showing that a person is operating it, the drag track's start-to-end travel converted to an angle, a_t (travel ÷ display width × 360°), must satisfy 0.5 × submitted angle − 10° ≤ a_t ≤ submitted angle + 10°. The front end may offer slow fine-tuning (travel counts at 0.5× when moving slowly); the track's x must record that accumulated logical position, not the raw pointer coordinate. The same track can be used only once in 10 minutes, so a replayed track fails. The rotate tolerance was deliberately not narrowed: a touch release is usually 3–8 px off and repeated failures lock the IP, so a tighter tolerance causes false lockouts. It is not varied by `pointerType` either, because the client reports that itself. Blind guessing is covered by lockouts, rate limits and per-challenge background randomisation. The 0.4–30 second limit for click and jigsaw counts from the first interaction; the time between opening the challenge and the first interaction is not counted and is bounded only by the challenge lifetime `slider.expire-seconds` (120 seconds by default), after which verify returns `40010`.

Word click words come from a bundled list by default (477 common words and idioms compiled by the project, using only level-1 characters of the Table of General Standard Chinese Characters). The list is public, so an attacker who recognises the characters can correct them against it; in production, point `click.words-file` at a private list (one 3–4 character word per line, `#` starts a comment). Every character must be in the bundled font subset, otherwise that word is skipped with a startup warning; if the private list cannot be read or has no usable words, the bundled list is used. The image also contains 1–2 decoy characters, preferably look-alikes or homophones; clicking a decoy or the wrong order fails. Characters are drawn on the server from a bundled Noto Sans SC subset (SIL OFL 1.1) with added noise, and icons that look alike never appear in the same challenge. If the icon manifest is missing or broken, a warning is logged at startup and icon click is disabled without affecting other types. If a tenant has enabled only icon click, the challenge request returns `40016` (challenge type temporarily unavailable) instead of quietly issuing a slider, and an audit log entry is written (at most one per tenant and IP every 10 minutes).

Every challenge randomly scales, crops, mirrors and recolours the background and rotate images, jigsaw tiles get extra noise and a slight colour shift (±4 per tile) with at least 3 tiles starting out of place, and the slider decoy gaps share the real gap's outline (2 by default). Icon-click icons no longer sit on a white disc; they get a shadow and thin outline that follow their shape, and the noise lines are drawn underneath them. In word click, characters with fewer than 3 strokes (such as 一, 十, 人) are rotated by at most ±15°. For an English UI (an English `Accept-Language` header), word click is not served; another type enabled for the tenant is picked instead (if word click is the only enabled type, it is still served), and icon-click prompts use English names. Click challenges are judged against the background size recorded when the challenge was issued, so changing the size settings does not affect challenges already issued.

**Asset sources and licence:** the background and rotate images are the project's own assets, generated by Grok Bot's built-in image generation feature, scaled and cropped by 体验设计官, with no third-party material; confirmed by the user on 2026-10-14 07:21 to be released under the same licence as the repository code (Apache License 2.0). The icons, word list and decoy character map were compiled by the project; the font subset is SIL OFL 1.1. See `captcha/SOURCES.md` in the boot repository.

**Rotate is an auxiliary challenge type:** it is off by default (the platform default `default-types` is `SLIDER` only) and only partly resistant to automated solving. The hole in the rotate background is filled with an opaque solid colour, and the piece gets its own colour shift, blur, noise and feathered edge, so solvers that compare the piece with the pixels inside the hole no longer work; matching the piece edge against the pattern just outside the hole still finds the angle within ±10° for about half of the challenges. Never use rotate as the only line of defence: combine it with failure lockout and rate limiting, and enable other challenge types as well. If a tenant enables only `ROTATE`, the save still succeeds but the response carries a `data.warning`.

**Production must use a private asset library:** the default backgrounds (12), rotate images (16) and icons (44) ship with the open-source repository, so an attacker can diff a challenge against the public original to find the gap, or build answer tables for rotate and icons in advance. In production, point `background.dir`, `rotate.dir` and `icon-dir` at your own directories (`file:` or `classpath:`) and rotate them regularly; the icon directory needs a `manifest.json` (`slug`, `name_zh`, `name_en`, `confusable`; without `name_en`, English UIs fall back to the Chinese name). With the `prod` profile, a warning is logged at startup while the bundled assets are still in use (detected by directory or file hash); not setting `click.words-file` also counts as using bundled assets.

Errors come back as HTTP 200 with `R.code`:

| code | Meaning |
| --- | --- |
| `40010` | Challenge expired; fetch a new one |
| `40011` | Failed; fetch a new one (no reason given) |
| `40012` | Too many attempts; retry after `data.retryAfter` seconds. The failure that triggers the lock (the 5th pointer or 3rd keyboard failure) already returns `40012`, as does any failed verify when the IP is already locked (including by a concurrent request or the other input mode). Challenge and verify also return `40012` while locked |
| `40013` | Missing or invalid `captchaToken` |
| `40014` | Verification is not needed right now |
| `40015` | Keyboard challenge requested, but the tenant has neither slider nor rotate enabled (no accessible challenge type) |
| `40016` | None of the tenant's enabled types is available right now (for example only icon click is enabled and the icon manifest is missing); contact the administrator and do not retry automatically |

The verify request body is capped at 32KB, chunked uploads included; an oversized body also gets HTTP 200 with `40011`.

**Forgotten password:** `/auth/forget-code` sends its email asynchronously, so response time does not depend on whether the account exists, and it returns the same success message ("如账号存在，验证码已发送至绑定邮箱"; the admin site shows it in English as "If the account exists, a verification code has been sent to its linked email.") whether the account is missing, has no email, the mail channel is not configured, or sending failed. The actual reason only goes to the server log, so the response reveals neither the account nor the channel state. Check the mail channel after deploying, or users will see "sent" and get nothing.

**Sending SMS:** `/auth/sms-code` runs these steps in order: (1) a per-IP short window of 30 per minute, which counts every request, including ones without a token, and recovers after 60 seconds; (2) a read-only check of the daily quotas (per phone per day, per IP per hour), so an over-quota request does not burn the token; (3) consume the `captchaToken`; (4) a per-phone short window of 5 per minute, counted only once the token has been consumed; (5) atomically count against the daily quotas only if they are not yet full; (6) send. Requests with no token or a bad token only count toward the per-IP window, never the per-phone window or the daily quota, so nobody can lock out a number or use up its quota for the day on its owner's behalf. A failed send still counts and is written to the audit log. Every limit returns `40012` with `retryAfter`. The phone number has spaces and `-` removed and any `+86`/`0086`/`86` prefix stripped, and the limits, sending and SMS login all use that form.

**Redis keys:** captcha state lives under the prefix `mugsun:captcha:v2:` (with `store: memory` the same keys live in-process):

| Key | Purpose | Expiry |
| --- | --- | --- |
| `challenge:<captchaId>` | Challenge (answer and bindings), taken and deleted on verify | `expire-seconds` |
| `token:<captchaToken>` | One-time token, taken and deleted by the business endpoint | `token-expire-seconds` |
| `rl:challenge:<ip>` | Challenges per IP per minute | 60 s |
| `rl:keyboard:<ip>` | Keyboard verifies per IP per minute | 60 s |
| `rl:global:<second>` | Global challenges per second | 2 s |
| `rl:sms-phone:<phone hash>` / `rl:sms-ip:<ip>` | SMS daily quotas (counted only after the token is consumed) | 1 day / 1 hour |
| `rl:sms-burst-phone:<phone hash>` / `rl:sms-burst-ip:<ip>` | SMS short-window limit | 60 s |
| `fail:<pointer\|keyboard>:<ip>` | Failure counter | `fail-window-seconds` |
| `lock:<ip>` | IP lock; its remaining TTL is `retryAfter` | `lock-seconds` |

`:` in IPv6 addresses is written as `_`. To unlock an IP by hand: `DEL mugsun:captcha:v2:lock:<ip>`.

**Tenant switch:** on by default for every tenant. The platform super admin can turn it off for one tenant with `POST /system/tenant/captcha` (`{"id": tenantId, "enabled": false}`); the change is audited and other tenants are unaffected. With several nodes, the others pick it up within 60 seconds. Sending SMS codes does not depend on the tenant: only the global switch applies, plus per-phone daily and per-IP hourly limits. In slider mode the client switch (`sys_client.captcha_enabled`) cannot turn verification off, because the caller chooses the clientId; it only applies to login in legacy IMAGE mode. New tenants always start with verification on. The platform super admin can also pass `types` on the same endpoint (for example `{"id": 1, "enabled": true, "types": ["SLIDER", "ROTATE"]}`) to choose the tenant's challenge types: at least one, from the five above. Leaving `types` out keeps the current setting, passing `null` or `[]` resets it to the platform default (`default-types`), and tenants that never set it use `default-types`. A setting without `SLIDER` and `ROTATE` is still saved, but `data.warning` in the response says keyboard users will get `40015`. The setting lives in `sys_tenant.captcha_types` (migration `V5__tenant_captcha_types.sql`).

## Production

The `prod` profile turns off the OpenAPI docs (springdoc / swagger-ui), forces `strict-keys: true` and disables mock social login. A minimal start looks like this:

```bash
export SPRING_PROFILES_ACTIVE=prod
export JDBC_URL=jdbc:postgresql://db:5432/mugsun
export JDBC_USERNAME=mugsun JDBC_PASSWORD=******
export REDIS_HOST=redis MUGSUN_FRONT_URL=https://admin.example.com
export MUGSUN_INIT_PASSWORD=****** MUGSUN_SM4_KEY=****** MUGSUN_API_KEY=******
export MUGSUN_SM2_PRIVATE_KEY=... MUGSUN_SM2_PUBLIC_KEY=...
export MUGSUN_SIGN_PRIVATE_KEY=... MUGSUN_SIGN_PUBLIC_KEY=...
java -jar mugsun-boot.jar
```

Work through the [Security checklist](/en/boot/security-checklist) before going live.
