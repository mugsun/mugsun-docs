# Configuration

This page lists boot's common settings and environment variables by topic. boot follows standard Spring Boot conventions, and settings come from three files:

| File | Purpose |
| --- | --- |
| `application.yml` | Defaults; local development works out of the box |
| `application-prod.yml` | Production defaults, applied when the `prod` profile is active |
| `config/application-local.yml` | Overrides for your machine; git-ignored and loaded last |

For keys not listed here, `mugsun-boot-core/src/main/resources/application*.yml` is the reference.

## Find a setting by task

| Task | Section |
| --- | --- |
| Run it on your machine | [Local development](#local-development) |
| Connect the database, Redis and file storage | [Data sources and cache](#data-sources-and-cache) |
| Set the initial password and keys | [Security and keys](#security-and-keys) |
| Turn off modules you don't use | [Optional modules](#optional-modules) |
| Let AI reach a model server on the internal network | [AI outbound allowlist](#ai-outbound-allowlist) |
| Open user registration | [Self-registration](#self-registration) |
| Adjust human verification at sign-in | [Human verification](#human-verification-behavioral-captcha) |
| Add third-party sign-in | [Social login](#social-login) |
| Find out why startup was refused | [Startup guards and exemption switches](#startup-guards-and-exemption-switches) |
| Prepare to go live | [Production](#production) |

## Local development

Copy the example and edit it as needed:

```bash
cp config/application-local.yml.example config/application-local.yml
```

- The file is git-ignored. The working directory must be the repository root, or the file is not found.
- It is loaded last, so it can override any key from `application.yml` and from the module configs.
  - Module configs are files such as `mugsun-module-track.yml`.
  - For example, the tracking database URL `mybatis-flex.datasource.track.url` can go straight into this file.
- The example ships no key values. It also ships a mock social login.
- By default boot connects to PostgreSQL and Redis on your machine. Change that with environment variables:
  - database address: `MUGSUN_DB_HOST`, `MUGSUN_DB_PORT`, `MUGSUN_DB_NAME`;
  - database account: `MUGSUN_DB_USERNAME`, `MUGSUN_DB_PASSWORD`;
  - Redis: `MUGSUN_REDIS_HOST`, `MUGSUN_REDIS_PORT`.
- `mvn spring-boot:run` activates `dev` by default.
  - When you start with `java -jar`, add `--spring.profiles.active=dev` yourself.
- With `dev`, the API transport key and the field encryption key can stay empty. See [Keys and encryption](/en/boot/crypto-keys#local-development).
- If the SM2 key pair is empty, a new pair is generated on every start. Sign-in can break when the pair changes, so set a fixed local pair.

In early versions, module keys set in this file were ignored and only environment variables worked. After updating, those keys take effect, so check the file for stale values first.

## Data sources and cache

The `prod` profile reads these environment variables.

| Variable | Default | Purpose |
| --- | --- | --- |
| `JDBC_URL` | — | JDBC URL of the primary database |
| `JDBC_USERNAME` / `JDBC_PASSWORD` | — | Primary database account |
| `REDIS_HOST` | — | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `REDIS_PASSWORD` | empty | Redis password; empty means no password |
| `REDIS_DB` | `0` | Redis database index |
| `FILE_STORAGE_PATH` | `/var/lib/mugsun/files/` | Directory for locally stored files |
| `FILE_DOMAIN` | — | Public domain for files |
| `MUGSUN_FRONT_URL` | — | Address of the admin console, used for OAuth redirects and similar. Required in production; defaults to `http://localhost:3006` in development |

The Redis URL for the cache (JetCache) is built from the `REDIS_*` variables above:

- Special characters in the password are percent-encoded. Don't build the URL with the password yourself in yml.
- An explicit `jetcache.remote.default.uri` is not overwritten, but it is still parsed and checked at startup.
- When you override `jetcache.remote.default`, keep `type` at the same level.

## Security and keys

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_INIT_PASSWORD` | — | Initial password of the built-in admin account. Production refuses to start without it |
| `MUGSUN_GM_ENABLED` | `true` | Master switch for SM-series crypto: SM2 for transport, SM3 for digests |
| `MUGSUN_SM4_KEY` | empty | Field encryption key. Required outside `dev` |
| `MUGSUN_API_KEY` | empty | API transport key, optional. Generated into `~/.mugsun/api-transport.key` when missing |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | empty | SM2 transport key pair (hex). When empty, a pair is generated at startup with a warning |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | empty | Audit-signing key pair, optional. Generated into `~/.mugsun/audit-sign-sm2.key` when missing |
| `MUGSUN_HOME` | `~/.mugsun` | Directory for auto-generated key files; property `mugsun.home` |
| `MUGSUN_STRICT_KEYS` | `false`; `true` in `prod` | When `true`, a missing field encryption key or SM2 transport key stops startup. The API transport key and the audit-signing key are still generated |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | empty | CIDR list of trusted reverse proxies; see [Open API](/en/boot/open-api#client-ip-and-trusted-proxies) |
| `MUGSUN_FILE_SIGN_SECRET` | empty | Signing key for local file download links, at least 32 characters; see [Local file access](#local-file-access) |

Key formats, the auto-generation rules and migrating old data are covered in [Keys and encryption](/en/boot/crypto-keys).

About the initial password:

- Password resets, new tenant admins and imported users each get a random one-time password.
- The one-time password is returned once, in `initialPassword` of the response. An account that receives one must change it at first sign-in.

### When SM-series crypto is off

`MUGSUN_GM_ENABLED` maps to the property `mugsun.crypto.gm-enabled`. When it is off:

- Passwords for sign-in, password change and registration are no longer SM2-encrypted. They are sent in plain text and protected only by HTTPS.
- The admin console reads this switch at runtime and stops encrypting automatically, with no rebuild needed.
- General-purpose digests switch from SM3 to SHA-256. Currently only the encryption demo endpoint uses them.
- Audit signing uses its own SM2 key pair and is not affected.
- Password storage is not affected: the server always stores passwords with BCrypt, a salted slow hash.

Turning SM-series crypto off in production stops startup unless the exemption switch is also set; see [Startup guards and exemption switches](#startup-guards-and-exemption-switches). Keep it on for MLPS (Dengbao) or commercial cryptography assessments.

## Audit log

| Setting | Default | Purpose |
| --- | --- | --- |
| `mugsun.audit.anonymous-max-pending` | `64` | How many operation-log entries from unauthenticated requests may be queued at once |

- Entries over the limit are dropped, and the running count is logged as a warning: on the 1st, then on every 100th.
- Entries from signed-in requests are never limited or dropped.

Operation logs are written as a hash chain. Several instances need no extra setup:

- each instance locks the same chain-head row inside its transaction before writing;
- a unique index backs this up, so the chain can't fork.

## Local file access

In development, the app serves locally stored files directly under `/file/**`. So that nobody can download a private attachment just by knowing its address:

- Public files under `mugsun/public/`, such as avatars, can still be fetched without signing in.
- Every other file needs a short-lived signature.
  - After signing in, `GET /system/file/download/{id}` returns a signed address.
  - In the address, `e` is the expiry and `s` is the signature. It is valid for 300 seconds by default.
  - Requests with no signature, a wrong one or an expired one get a 404.

```yaml
mugsun:
  file:
    local-access:
      public-prefixes: [mugsun/public/]   # path prefixes anyone can fetch
      sign-secret: ${MUGSUN_FILE_SIGN_SECRET:}
      expire-seconds: 300
```

Rules for `sign-secret`:

- When empty, a random key is generated on every start, which only works for a single instance.
- With several instances, give them all the same value, or an address signed by one instance will 404 on another.
- `prod` turns off direct `/file/**` serving by default. Private attachments go through the authorized download endpoint, which this setting does not affect.
- If you turn direct serving on under `prod`, `sign-secret` must be at least 32 characters. An empty or shorter value stops startup.

Every directly served file carries `X-Content-Type-Options: nosniff`:

- Types a browser might execute, such as HTML and SVG, and PDFs are always sent as attachments to download, never opened in the browser.
- HTML, SVG and similar types also get `Content-Security-Policy: sandbox`.

## Operation log exclusions

Every controller write endpoint (POST, PUT, DELETE, PATCH) automatically gets an operation log entry. Its title is this fixed string:

```text
自动留痕
```

Endpoints that browsers call constantly and that aren't admin actions can be excluded. Excluded endpoints write no log entry and stay out of the operation log hash chain.

By default the analytics SDK's reporting endpoints are excluded:

```yaml
mugsun:
  oper-log:
    exclude-paths:          # Ant-style, matched against the path without the context path
      - /track/collect
      - /track/replay
      - /track/api-body
```

- Setting this list replaces the default entirely, so include these three if you want to keep them.
- `exclude-paths: []` logs everything.
- Exclusions only affect automatic logging. Endpoints explicitly marked `@OperationLog` are still logged.
- The admin endpoints under `/system/track/**` are unaffected.

## Optional modules

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS module |
| `MUGSUN_TRACK_ENABLED` | `true` | Analytics module |
| `MUGSUN_AI_ENABLED` | `true` | AI module |
| `POWERJOB_ENABLED` | `false` | PowerJob worker. It needs a separately deployed server and `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` | `false` | IP-to-region lookup; see [IP location](#ip-location) |

The three module switches are on when unset. Once set, they accept only `true` or `false`:

- Case-insensitive, with no surrounding spaces.
- An empty value, `1`, `0` or anything else stops the service from starting.

See [the two layers of module switches](/en/guide/architecture#two-layers-of-module-switches) on the architecture page for the full rules.

## Knowledge base upload limits

One file in a knowledge base is limited to 20MB and to 5,000 segments by default. Both limits can be changed in the platform configuration:

```yaml
mugsun:
  ai:
    kb:
      max-upload-bytes: 20971520     # bytes per file; ≤0 falls back to 20MB
      max-segments-per-asset: 5000   # most segments per file; ≤0 falls back to 5000
```

- The size limit applies to uploaded files, to text submitted directly and to files downloaded from a `fileUrl`.
- An upload that would exceed the segment limit is refused; raise the segment length and upload again.
- Documents must be `pdf`, `docx` or `pptx`; the MIME type and file header are checked too.
- Documents are parsed with Apache Tika, without OCR.

For supported files and segmentation rules, see [AI center](/en/pc/ai-center#files).

## AI outbound allowlist

These requests are checked for SSRF before they go out. Private, loopback and cloud-metadata addresses are rejected by default:

- model calls: chat, streaming chat and embeddings
- knowledge-base fetches
- channel webhooks
- remote MCP calls
- the workflow HTTP node

To reach an internal service, such as a local model server or an internal MCP endpoint, allow it explicitly:

```yaml
mugsun:
  ai:
    outbound:
      allow-hosts: [localhost, ollama.internal]
      # Ports allowed for hosts not on the list; 80/443 by default, [] means any port
      allowed-ports: [80, 443]
```

For example, a local Ollama listens on `http://localhost:11434` by default. Add `localhost` to `allow-hosts` before that URL can be saved and called from model management, a knowledge base or a channel.

### Writing the allowlist

- The default is `allow-hosts: []`, so no private address is allowed. Public hosts not on the list are unaffected.
- `allow-hosts` can only be set in the platform configuration file, so tenants can't open internal addresses themselves.
- Entries are exact hostnames or `*.example.com` wildcards. A matching host may resolve to a private address.
- `*.example.com` matches any subdomain but not `example.com` itself.
- Hosts ending in `.local` or `.internal` are rejected unless listed explicitly.
- Hosts not on the list can only use ports 80 and 443 by default; open others with `allowed-ports`.
- Hosts on the list can use any port.
- Models saved with an internal address before the upgrade fail when called until their host is added to the list.
- List only the hosts you actually need.

### How the check works

- Only `http` and `https` are allowed.
- The check runs when the configuration is saved, including a model's API address, and again before every request.
- An IP written directly into the address is caught too.
- When the connection is opened, the hostname is resolved again, every address is checked, and the connection goes to the address that was checked.
  - A hostname that switches to an internal address after the check (DNS rebinding) still can't be reached.
  - If any one of the resolved addresses is in a blocked range, the whole request is rejected.
- Redirects are not followed. When the other side answers with a 3xx, the request ends there and the `Location` address is never requested.
  - If a webhook, MCP or model address redirects, enter the final address instead.
- The workflow HTTP node ignores `allow-hosts` and always blocks internal addresses.

### Blocked ranges

- Private, loopback, link-local, CGNAT, multicast, reserved and documentation addresses.
- The same applies to IPv6, including `2001:db8::/32` and Teredo `2001::/32`.
- IPv6 forms that embed an IPv4 address are decoded to the embedded IPv4 address before the check:
  - `::ffff:` mapped and `::a.b.c.d` compatible;
  - NAT64 `64:ff9b::/96` and 6to4 `2002::/16`.

Cloud metadata addresses are always refused, even when the host is on `allow-hosts`:

- the whole link-local range `169.254.0.0/16`, including `169.254.169.254`;
- the AWS ECS task credentials endpoint `169.254.170.2` and Tencent Cloud's `169.254.0.23`;
- `100.100.100.200` and `fd00:ec2::254`.

## Self-registration

| Setting | Values | Default | Purpose |
| --- | --- | --- | --- |
| `mugsun.auth.register.mode` | `OFF` / `OPEN` / `APPROVAL` | `OFF` in production; `OPEN` with dev, test or local | The main setting. `APPROVAL` (review after registration) is not implemented yet, and setting it stops startup |
| `mugsun.auth.register.enabled` | `true` / `false` | unset | Shorthand: `true` equals `OPEN`, `false` equals `OFF`. Startup is refused when it conflicts with `mode` |
| `mugsun.auth.register.rate-limit.per-ip` | integer | `10` | Registration requests per IP per window |
| `mugsun.auth.register.rate-limit.per-account` | integer | `5` | Registration requests per account, and per phone number, per window |
| `mugsun.auth.register.rate-limit.window-seconds` | seconds | `3600` | Rate-limit window |

- Whether a deployment counts as production depends only on the explicit `spring.profiles.active`.
  - Non-empty, containing `dev`, `test` or `local`, and not containing `prod`: not production.
  - Only `spring.profiles.default=dev`, or no active profile at all: production.
- When registration is off, `POST /auth/register` returns 404. Exceeding the rate limit returns HTTP 429.
- **Behind a reverse proxy, you must set `MUGSUN_OPENAPI_TRUSTED_PROXIES`.**
  - The value is the proxy's IP or CIDR ranges, comma-separated.
  - Without it the whole site counts as one IP, and only 10 registrations per hour are possible in total.
- The public config endpoint `GET /auth/captcha/config` returns `data.registerMode`.
  - Its value is `OFF`, `OPEN` or `APPROVAL`, and the sign-in page hides the registration entry accordingly.
- The role given after registration comes from the system parameter `security.register.register-role-code`.
  - Migration V14 seeds it as `user`. When it is empty, no role is attached.
  - `security.register.default-role-code` is reserved for other default-assignment cases.
- The demo site (`prod,demo`) does not open registration; don't set the switches above there.

## Human verification (behavioral captcha)

Sign-in, registration, the forgot-password code and the SMS code request require a behavioral captcha by default. The captcha is built into boot and uses no third-party service.

The three settings used most:

| Setting | Default | Purpose |
| --- | --- | --- |
| `mugsun.captcha.enabled` | `true` | Global switch |
| `mugsun.captcha.store` | `redis` | Where challenges and tokens are kept. `memory` is for single-node development only and fails to start under `prod` |
| `mugsun.captcha.default-types` | all five | Challenge types for tenants without their own setting; one is picked at random each time |

Challenge types, endpoints, rate limits, error codes and the assets to replace before going live are covered in [Behavioral captcha](/en/boot/captcha).

## Social login

Social login is built on JustAuth and supports four sources. Source names are case-insensitive:

- `github`
- `gitee`
- `qq`
- `wechat_open`: WeChat Open Platform QR login

```yaml
mugsun:
  social:
    enabled: true            # master switch; when false, every source is rejected
    type:
      github:
        client-id: <app ID>
        client-secret: <app secret>
        redirect-uri: <callback URL registered with the provider>
        scopes: []
```

- A source appears in `GET /auth/social/sources` only when both `client-id` and `client-secret` are set.
- The sign-in page shows social login buttons according to that endpoint.
- With no source configured, the sign-in page hides the social login area. Startup is not affected.
- `redirect-uri` is set per source by whoever deploys; the backend does not build it. The admin console's callback page is `/auth/social-callback`.
- The admin console uses hash routing, so the callback URL contains `#`. Test on each provider whether it accepts such a URL.
- Sign-in flow: `GET /auth/social/render/{source}` returns the authorization URL, and the callback page then calls `POST /auth/social/login`.
- Signed-in users bind with `POST /auth/social/bind` and unbind with `DELETE /auth/social/unbind/{source}`.
- When a third-party account is not bound yet, the admin console does not register a new user. It asks the user to sign in and bind first.
- Only requests with `clientType=app` from mobile apps create and bind a new account, which joins the default tenant.
- Binding a third-party account that is already bound to another user fails. Sign-in is refused when the account is disabled or the tenant is no longer valid.
- Social sign-ins are written to the login log with type `social`.

The `mock` source is only for local development. It needs `mock-enabled: true` and a `type.mock` entry, which the example file already has. `prod` always turns it off.

## IP location

IP location for the login log is off by default. While it is off, the location column in the login log shows `-`.

| Setting | Environment variable | Default | Purpose |
| --- | --- | --- | --- |
| `mugsun.ip2region.enabled` | `MUGSUN_IP2REGION_ENABLED` | `false` | Whether to resolve IP locations |
| `mugsun.ip2region.xdb-path` | `MUGSUN_IP2REGION_XDB_PATH` | empty | Absolute path of the xdb data file on the server |

To turn it on:

1. Download `ip2region_v4.xdb` from the `data` directory of the lionsoul2014/ip2region repository on GitHub. The file is not shipped with mugsun.
2. Put it in a local directory on the server, point `xdb-path` at it, and set `enabled=true`.

Notes:

- Check the upstream repository's license before use.
- Only IPv4 is supported. Locations are shown as country, province and city, without the ISP.
- If it is turned on without a path, or the file fails to load, the backend logs an error and disables lookups. Startup is not blocked.

## Serial numbers

| Setting | Default | Purpose |
| --- | --- | --- |
| `mugsun.serial-number.provider` | `redis` | How serial numbers are generated: `redis` or `db` |

- `redis`: an atomic increment in Redis, warmed up from the last value in the database at startup so numbers never go backwards.
- `db`: a row lock inside a transaction. It needs no Redis but has lower throughput, and suits setups without Redis or with strict consistency needs.
- Any other value does not stop startup, but generating a serial number then fails. At most 1000 numbers are generated per call.
- With several nodes, every node must use the same provider.
- With `redis`, every node must connect to the same Redis, and persistence is recommended.

See [Serial numbers](/en/boot/features/serial-number) for how to define numbering rules.

## Database schema

| Setting | Default | Purpose |
| --- | --- | --- |
| `mugsun.db.default-schema` | empty | Schema that holds the business tables |

This setting is for PostgreSQL-protocol databases such as KingbaseES, so that business tables live in their own schema and do not clash with the system catalog.

- When it is set, business tables (except `track_*`) and table names in hand-written SQL get this schema prefix.
- Flyway uses the schema too, and creates it if needed.
- When it is empty, nothing changes and the connection's default schema is used, usually `public` on PostgreSQL.
- openGauss has not been tested.

## Startup guards and exemption switches

The settings below stop startup when they are misconfigured in production.

### What counts as production

Only explicitly active profiles count, that is `spring.profiles.active`. Profile names are trimmed and lowercased before comparison, so `DEV` equals `dev`.

- It is a development environment only when the active list is non-empty, includes `dev`, `test` or `local`, and includes no production name.
- The production names are `prod`, `production`, `prd` and `staging`.
  - If the active list contains any of them, it is production, even together with `dev`.
- No profile at all is treated as production.
  - For local testing, pass `--spring.profiles.active=dev` explicitly.
  - `mvn spring-boot:run` already activates `dev`.
- Any other name on its own, such as `demo` or `qa`, is also production.
- `spring.profiles.default` is ignored: `default=dev` with no active profile is production.

### Settings that stop startup

| Setting | Dangerous value in production | Exemption switch |
| --- | --- | --- |
| `mugsun.security.init-password` | not set | none |
| `mugsun.lab.seed-fronttest` | `true`; it creates test accounts with weak passwords | none |
| `mugsun.open-api.sign-required` | `false` | `mugsun.open-api.i-understand-unsigned-requests-are-insecure=true` |
| `mugsun.crypto.gm-enabled` | `false` | `mugsun.crypto.i-understand-plaintext-passwords-rely-on-tls=true` |

Use an exemption switch only when you truly cannot meet the requirement. Every start then logs a WARN.

### HTTPS is required once SM-series crypto is off

With SM-series crypto off, passwords rely entirely on TLS. Even with the exemption, these requests must be HTTPS in production or they are rejected: sign-in, registration, password change and password reset.

- The server decides whether a request is HTTPS with `request.isSecure()`.
- Behind a reverse proxy, have the proxy send `X-Forwarded-Proto`.
- Also set `server.forward-headers-strategy=native` on the backend.
- A forged header on its own is not trusted.

## Production

Activating `prod` does three things:

- turns off the API docs (springdoc and swagger-ui);
- sets `strict-keys` to `true`;
- disables mock social login.

A minimal start looks like this. Replace `******` and `...` with your own values:

```bash
export SPRING_PROFILES_ACTIVE=prod
export JDBC_URL=jdbc:postgresql://db:5432/mugsun
export JDBC_USERNAME=mugsun JDBC_PASSWORD=******
export REDIS_HOST=redis MUGSUN_FRONT_URL=https://admin.example.com
export MUGSUN_INIT_PASSWORD=****** MUGSUN_SM4_KEY=******
export MUGSUN_SM2_PRIVATE_KEY=... MUGSUN_SM2_PUBLIC_KEY=...
# Also needed for containers without a volume, or for several instances
export MUGSUN_API_KEY=******
export MUGSUN_SIGN_PRIVATE_KEY=... MUGSUN_SIGN_PUBLIC_KEY=...
java -jar mugsun-boot.jar
```

The boot repository's `scripts/gen-keys.sh` generates all the keys in one go; see [Generate keys](/en/boot/crypto-keys#generate-keys).

Work through the [Security checklist](/en/boot/security-checklist) before going live.

## Next steps

<div class="ms-cards">

- [Keys and encryption](/en/boot/crypto-keys) How to set the four kinds of keys and migrate old data.
- [Behavioral captcha](/en/boot/captcha) Challenge types, endpoints, rate limits and the assets to replace before going live.
- [Security checklist](/en/boot/security-checklist) Go through it item by item before going live; each item has a self-check.

</div>
