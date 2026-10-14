# Live demo

## Try the admin console and analytics locally

Run the full backend on your machine with these commands (requires Docker and JDK 21):

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

For the console (pc) and verification steps see [Getting started](/en/guide/getting-started). Credentials follow the [boot README](https://github.com/mugsun/mugsun-boot/blob/main/README_EN.md)—**change the password on first login**.

## uni-app x (ms-ui) component H5

Component pages show a phone frame (bottom-right) that embeds the hosted H5 preview (`/demo/index.html`). Example: [Button](/en/uniappx/components/button).

Full H5 entry: [Open ms-ui demo](/demo/index.html) (new tab).

## External showcases: read-only demo mode

For a public showcase, run boot with the `demo` profile and non-production secrets:

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=prod,demo
```

::: warning PostgreSQL only for now
Demo mode currently supports PostgreSQL deployments only. Dameng, KingbaseES, openGauss and MySQL are not supported for demo yet.
:::

With demo mode on (`mugsun.demo.enabled=true`), the backend denies by default:

| Category | Handling |
|---|---|
| GET / HEAD / OPTIONS queries | Allowed |
| Login, logout, two-factor, captcha check | Allowed; logins are rate-limited per IP (20 a minute by default, then 429 `DEMO_RATE_LIMITED`) |
| Tracking collection `/track/collect`, `/track/replay`, `/track/api-body` | Rejected by default; allowed with `MUGSUN_DEMO_TRACK_COLLECT=true`, rate-limited per IP (120 a minute by default), and answered with 503 `DEMO_CAPACITY` once the tracking database passes its size cap. Keep it off until output escaping and sensitive-word filtering are in place |
| Every other POST / PUT / DELETE / PATCH (registration, password change/reset, uploads, imports, AI, codegen and low-code DDL, job admin, system settings, …) | HTTP 403 with `msg` "演示环境只读" (demo is read-only) and `errorCode` `DEMO_READONLY` |
| `/open/**`, `/oauth2/**`, `/v1/**`, `/system/crypto/**`, `/auth/social/**`, `/system/ai/**` | Rejected for every method |
| Exports, downloads, SSE streams | Allowed, at most 2 at a time per instance (`MUGSUN_DEMO_HEAVY_CONCURRENCY`), then 429 `DEMO_BUSY` |
| Requests carrying method-override headers such as `X-HTTP-Method-Override`, or a `_method` parameter | Rejected |
| WebSocket | Inbound messages dropped (heartbeat only), push-only; handshakes accepted only from `MUGSUN_DEMO_WS_ALLOWED_ORIGINS` (defaults to the admin console URL `mugsun.web.front-url`) |

New write endpoints are rejected by default. `docs/demo/readonly-endpoints.md` in the boot repo is a generated list of every write endpoint, kept in sync with the code by a test.

### Database accounts and boundaries

Demo mode doesn't connect as the owner. It uses three low-privilege accounts (the setup script is `docs/demo/sql/demo-accounts.sql` in the boot repo):

| Account | Privileges | Used for |
|---|---|---|
| `mugsun_demo_ro` | SELECT on every business table | Business data source |
| `mugsun_demo_log` | INSERT on 5 log tables | Login, API, error, operation and usage logs |
| `mugsun_demo_track` | SELECT and INSERT on the tracking database | Tracking data source |

Flyway is off in demo mode. At startup the app checks the migration version of the business and tracking databases and refuses to start if either doesn't match. To upgrade, first run the migrations once as the owner, without the demo profile:

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=prod --mugsun.demo.migrate-only=true
```

The process exits with code 0 after the migrations and startup initialisation. Then start with the demo profile and the low-privilege accounts.

| Boundary | What it covers |
|---|---|
| Allowed | Queries; login, logout, captcha check; tracking collection when switched on; server push |
| Rejected | The write requests in the table above (403 `DEMO_READONLY`). A write that slips through fails on database permissions and also returns 403 `DEMO_READONLY` |
| Internal writes | Login, API, error and operation logs → the log account (a failed write only logs a WARN and never blocks login); login-lock counters, tokens and captchas → a separate Redis db (4 by default, `MUGSUN_DEMO_REDIS_DB`); per-IP rate-limit buckets → the same Redis db; tracking events → the tracking account (insert only) |
| Off in demo mode | Startup tasks and scheduled jobs that write to the database (log cleanup, notification retries, tracking rollups, partitions and cleanup, …); two-factor; SMS, email and in-app notifications; social login; the AI model channel |
| Not guaranteed | Tracking session stats only record the first batch of events and don't add up later batches (the tracking account has no UPDATE privilege), so session data on the demo site is inaccurate. With tracking collection on, anonymous writes still carry a stored-XSS risk until output escaping and sensitive-word filtering land. Captchas still write to Redis. Rate limiting depends on Redis: if Redis is down, requests are not rate-limited |

A wrong password on the public demo account locks that account only from that IP; other IPs can still log in.

Deployment notes:

- **Reverse proxy**: per-IP lockout and rate limiting need the visitor's real IP. By default demo mode trusts `X-Forwarded-For` from loopback and private ranges (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `::1`, `fc00::/7`). If a public CDN or cloud gateway sits in front, you must set `MUGSUN_OPENAPI_TRUSTED_PROXIES` to its egress ranges; otherwise every visitor shares the proxy's IP and one wrong password locks everyone out. Startup logs a WARN when no trusted proxy is configured.
- **Redis outage**: if Redis goes down while running, rate limiting lets requests through and login fails (sessions and captchas live in Redis). If Redis is unreachable at startup, demo mode won't start.
- **Tracking database size**: above `MUGSUN_DEMO_TRACK_WARN_MB` (default 2048) the app logs a WARN; above `MUGSUN_DEMO_TRACK_MAX_MB` (default 4096) tracking collection returns 503. Only the tracking database is measured, not replay data kept in file storage.

::: tip Work in progress
A daily sample-data reset at 04:00 Beijing time, sensitive-word filtering (word list loaded from an external path, empty by default), output escaping, six-month access-log retention, and read-only hints in the admin console arrive in later releases. Until then, don't treat demo mode as your only line of defence.
:::

Next: [Getting started](/en/guide/getting-started) · [Security checklist](/en/boot/security-checklist) · [ms-ui](/en/uniappx/)
