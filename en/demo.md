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
| Login, logout, two-factor, captcha check | Allowed |
| Tracking collection `/track/collect`, `/track/replay`, `/track/api-body` | Allowed (tracking stays on in demo; set `mugsun.demo.track-collect=false` to turn it off) |
| Every other POST / PUT / DELETE / PATCH (registration, password change/reset, uploads, imports, AI, codegen and low-code DDL, job admin, system settings, …) | HTTP 403 with `msg` "演示环境只读" (demo is read-only) and `errorCode` `DEMO_READONLY` |
| `/open/**`, `/oauth2/**`, `/v1/**`, `/system/crypto/**` | Rejected for every method |
| Requests carrying method-override headers such as `X-HTTP-Method-Override`, or a `_method` parameter | Rejected |
| Inbound WebSocket messages | Dropped (heartbeat only); the channel is push-only |

New write endpoints are rejected by default. `docs/demo/readonly-endpoints.md` in the boot repo is a generated list of every write endpoint, kept in sync with the code by a test.

::: tip Work in progress
A read-only database account (SELECT only on the business database; a separate INSERT/SELECT account for tracking), a daily sample-data reset at 04:00 Beijing time, sensitive-word filtering (word list loaded from an external path, empty by default), six-month access-log retention, and read-only hints in the admin console arrive in later releases. Until then, don't treat demo mode as your only line of defence.
:::

Next: [Getting started](/en/guide/getting-started) · [Security checklist](/en/boot/security-checklist) · [ms-ui](/en/uniappx/)

### Access log retention

In demo mode the backend writes one line per request to a separate file, `<log dir>/mugsun-boot-access.log`: IP, method, path, status, duration, user ID and traceId. **Query strings and request bodies are not logged.** Files roll daily and are gzipped; by default they are kept for 200 days, **with no total size cap: nothing is deleted for size**, independent of the log-table cleanup job. This follows Article 21 of China's Cybersecurity Law, which requires network logs to be kept for at least six months.

- **Volume**: mount the log directory on a persistent volume so it survives container rebuilds. Override the directory with `MUGSUN_DEMO_ACCESS_LOG_PATH`, and retention days with `MUGSUN_DEMO_ACCESS_LOG_MAX_HISTORY`; keep retention at 180 days or more.
- **Disk estimate**: about 200 bytes per line, roughly a tenth of that (about 20 bytes) after gzip. Disk needed ≈ average requests per day × 20 bytes × retention days, plus the current day's uncompressed file (requests per day × 200 bytes). For example, one million requests a day is about 20MB/day, about 4GB for 200 days, plus about 200MB for the current file. Size for peak traffic and at least double it: a peak of 5 million requests a day over 200 days needs about 20GB, so plan for 40GB.
- **Backup**: include the access log directory in regular backups (at least one off-site copy a week). In demo mode the API and login logs in the database are also kept for at least 180 days.
- **Requests outside the app**: the client IP is resolved the same way as for login lockout and rate limiting (X-Forwarded-For is trusted only from proxies in `MUGSUN_OPENAPI_TRUSTED_PROXIES`). Requests that fail before reaching the app (rejected by Nginx, 400s, timeouts and so on) are not in this file; they are covered by the Nginx access log (the admin console image or your front gateway), which should also be kept for at least six months.
- **Free-space alert**: 180-day retention is a hard requirement, so access logs are deleted only by age and request floods keep using disk. Every hour the backend checks free space on the disk holding the log directory and logs a WARN when it drops below `MUGSUN_DEMO_ACCESS_LOG_MIN_FREE_SPACE` (key `mugsun.demo.access-log.min-free-space`, default `10GB`; `10GB` and `10 GB` both work). Set it to at least peak requests per day × 200 bytes × 7, which gives you a week of peak writes to react. When you see the WARN, grow the log volume or move old archives elsewhere; don't delete files younger than 180 days. If the disk fills up, logs can't be written and the service starts failing. For a stronger guarantee, also ship the access log to an external log system (stdout/syslog forwarding) and keep an off-site copy.
- **Personal data and permissions**: IP addresses and user IDs are personal data. Mount the log directory on a persistent volume so it survives container rebuilds, owned by the backend user (uid 10001), with directory mode 0750 and file mode 0640, readable only by operations and compliance staff. Delete logs once they pass the retention period, and don't copy them to unmanaged places. Matrix parameters such as `;jsessionid=` are stripped from logged paths, and path segments that look like tokens or signatures are logged as `:redacted`.
