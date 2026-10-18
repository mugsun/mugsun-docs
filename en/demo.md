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

- **Reverse proxy**: per-IP lockout and rate limiting need the visitor's real IP. By default demo mode trusts `X-Forwarded-For` **from loopback only** (`127.0.0.0/8`, `::1`). If Nginx or your gateway isn't on the same host, you must set `MUGSUN_OPENAPI_TRUSTED_PROXIES` to its address or range (in the one-command stack and the demo overlay that's the pc container, `172.30.88.10/32`; for a public CDN or cloud gateway, its egress ranges). Otherwise every visitor shares the proxy's IP and one wrong password locks everyone out. Don't trust whole private ranges: any private host that can reach the backend directly could forge XFF, bypass rate limits and impersonate other IPs. Startup logs a WARN when it isn't configured (only the loopback default) or is set to empty.
- **Redis outage**: if Redis goes down while running, rate limiting lets requests through and login fails (sessions and captchas live in Redis). If Redis is unreachable at startup, demo mode won't start.
- **Redis address**: demo mode connects to Redis using `REDIS_HOST` (with `REDIS_PORT` and `REDIS_PASSWORD`), same as prod; only the db changes to `MUGSUN_DEMO_REDIS_DB` (4 by default).
- **Tracking database size**: above `MUGSUN_DEMO_TRACK_WARN_MB` (default 2048) the app logs a WARN; above `MUGSUN_DEMO_TRACK_MAX_MB` (default 4096) tracking collection returns 503. Only the tracking database is measured, not replay data kept in file storage.

::: tip Work in progress
A daily sample-data reset at 04:00 Beijing time, sensitive-word filtering (word list loaded from an external path, empty by default), output escaping, six-month access-log retention, and read-only hints in the admin console arrive in later releases. Until then, don't treat demo mode as your only line of defence.
:::

Next: [Getting started](/en/guide/getting-started) · [Security checklist](/en/boot/security-checklist) · [ms-ui](/en/uniappx/)

### Access log retention

In demo mode the backend writes one line per request to a separate file, `<log dir>/mugsun-boot-access.log`: IP, method, path, status, duration, user ID and traceId. **Query strings and request bodies are not logged.** Files roll daily and are gzipped; by default they are kept for 200 days, **with no total size cap: nothing is deleted for size**, independent of the log-table cleanup job. This follows Article 21 of China's Cybersecurity Law, which requires network logs to be kept for at least six months.

- **Volume**
  - Mount the log directory on a persistent volume so logs survive container rebuilds.
  - Change the directory with `MUGSUN_DEMO_ACCESS_LOG_PATH` and the retention days with `MUGSUN_DEMO_ACCESS_LOG_MAX_HISTORY`.
  - Retention is at least 180 days. A lower value (including 0 and negative numbers) or an unparseable value is replaced with 180 at startup, with a WARN.
  - A decimal of 180 or more is rounded down, so `200.5` keeps 200 days and is not replaced with 180. Values above 2147483647 are treated as 2147483647.
- **Disk estimate**: about 200 bytes per line, roughly a tenth of that (about 20 bytes) after gzip. Disk needed ≈ average requests per day × 20 bytes × retention days, plus the current day's uncompressed file (requests per day × 200 bytes). For example, one million requests a day is about 20MB/day, about 4GB for 200 days, plus about 200MB for the current file. Size for peak traffic and at least double it: a peak of 5 million requests a day over 200 days needs about 20GB, so plan for 40GB.
- **Backup**: include the access log directory in regular backups (at least one off-site copy a week). In demo mode the API and login logs in the database are also kept for at least 180 days.
- **Requests outside the app**: the client IP is resolved the same way as for login lockout and rate limiting (X-Forwarded-For is trusted only from proxies in `MUGSUN_OPENAPI_TRUSTED_PROXIES`). Requests that fail before reaching the app (rejected by Nginx, 400s, timeouts and so on) are not in this file; they are covered by the Nginx access log (the admin console image or your front gateway), which should also be kept for at least six months.
- **Free-space alert**
  - 180-day retention is a hard requirement, so access logs are deleted only by age. A request flood keeps using disk space.
  - Every hour the backend checks free space on the disk holding the log directory. The threshold is set with `MUGSUN_DEMO_ACCESS_LOG_MIN_FREE_SPACE` (key `mugsun.demo.access-log.min-free-space`) and defaults to `10GB`.
  - It only logs when the state changes. It logs one WARN when free space drops below the threshold and one INFO when it recovers, with nothing in between.
  - If free space can't be read (for example because of a permission error), it also logs a single WARN that includes the error.
  - Write the unit as GB or G, in powers of 1024. Decimals are allowed and are rounded down to whole bytes. See "Threshold format" below for the other forms.
  - Set the threshold to at least peak requests per day × 200 bytes × 7. That gives you a week of peak writes to react.
  - When you see the WARN, grow the log volume or move old archives elsewhere. Don't delete files younger than 180 days. If the disk fills up, logs can't be written and the service starts failing.
  - For a stronger guarantee, also ship the access log to an external log system (stdout or syslog forwarding) and keep an off-site copy.
- **Personal data and permissions**: IP addresses and user IDs are personal data. Mount the log directory on a persistent volume so it survives container rebuilds, owned by the backend user (uid 10001), with directory mode 0750 and file mode 0640, readable only by operations and compliance staff. Delete logs once they pass the retention period, and don't copy them to unmanaged places. Matrix parameters such as `;jsessionid=` are stripped from logged paths, and path segments that look like tokens or signatures are logged as `:redacted`.

::: details Threshold format (`MUGSUN_DEMO_ACCESS_LOG_MIN_FREE_SPACE`)
- Units are case-insensitive and use powers of 1024. No unit or `B` means bytes. The other units are `K`/`KB`/`KiB`, `M`/`MB`/`MiB`, `G`/`GB`/`GiB`, `T`/`TB`/`TiB`.
- Only leading and trailing whitespace is trimmed. A space between the number and the unit is allowed (`10 GB`), but not inside the number (`1 0GB` is invalid).
- Decimals are allowed and the result is rounded down to whole bytes. For example, `1.5G` is 1610612736 bytes and `0.5G` is 512MiB; anything under 1 byte (such as `0.5B`) becomes 0.
- A result of 0 or less (including `-0.5G`) turns the alert off, with a WARN at startup.
- An unparseable value (wrong format, exponent notation such as `1e3G`, or beyond the range of a long) doesn't stop startup. It falls back to 10GB with a WARN.
:::
