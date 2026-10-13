# Configuration

boot follows standard Spring Boot conventions: `application.yml` holds defaults, `application-prod.yml` overrides them for production, and local overrides go in `config/application-local.yml` (git-ignored; the working directory must be the repository root). The tables below cover the most common environment variables; `mugsun-boot-core/src/main/resources/application*.yml` has the full set of keys.

## Local development

```bash
cp config/application-local.yml.example config/application-local.yml
```

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

## Optional modules

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS module |
| `MUGSUN_TRACK_ENABLED` | `true` | Analytics module |
| `MUGSUN_AI_ENABLED` | `true` | AI module |
| `POWERJOB_ENABLED` | `false` | PowerJob worker; requires a separate server and `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` / `MUGSUN_IP2REGION_XDB_PATH` | `false` / empty | IP-to-region lookup |

## AI outbound allowlist

Knowledge-base fetches, channel webhooks and remote MCP calls are checked for SSRF before any request goes out; private, loopback and cloud-metadata addresses are rejected by default. To reach an internal service, such as a local model server or an internal MCP endpoint, allow it explicitly:

```yaml
mugsun:
  ai:
    outbound:
      allow-hosts: [localhost, ollama.internal]
```

Entries are exact hostnames or `*.example.com` wildcards. A matching host may resolve to a private address.

Example: a local Ollama listens on `http://localhost:11434` by default. Add `localhost` to `allow-hosts` before that URL can be saved and called from a knowledge base or channel.

- The check runs both when the configuration is saved and right before each request; only `http` and `https` are allowed.
- The default is `allow-hosts: []`, so no private address is allowed. Public hosts not on the list are unaffected.
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
      decoy-count: 1       # fake gaps, 0–2
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

Errors come back as HTTP 200 with `R.code`:

| code | Meaning |
| --- | --- |
| `40010` | Challenge expired; fetch a new one |
| `40011` | Failed; fetch a new one (no reason given) |
| `40012` | Too many attempts; retry after `data.retryAfter` seconds |
| `40013` | Missing or invalid `captchaToken` |
| `40014` | Verification is not needed right now |

**Tenant switch:** on by default for every tenant. The platform super admin can turn it off for one tenant with `POST /system/tenant/captcha` (`{"id": tenantId, "enabled": false}`); the change is audited and other tenants are unaffected. With several nodes, the others pick it up within 60 seconds. Sending SMS codes does not depend on the tenant: only the global switch applies, plus per-phone daily and per-IP hourly limits. In slider mode the client switch (`sys_client.captcha_enabled`) cannot turn verification off, because the caller chooses the clientId; it only applies to login in legacy IMAGE mode. New tenants always start with verification on.

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
