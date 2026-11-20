# Read-only demo mode

Read-only demo mode lets you open a mugsun deployment to the public. Visitors can sign in and open every page, but they cannot change any data.

It restricts two layers: the backend only lets through queries and a few necessary write requests, and it connects to the database with low-privilege accounts.

::: warning PostgreSQL only for now
The mode cannot be turned on with Dameng, KingbaseES, openGauss or MySQL yet.
:::

There is no official public demo site yet. This page explains how to deploy your own. To try mugsun on your machine instead, see [Live demo](/en/demo).

## Prepare accounts and data first {#prepare}

Once the mode is on, nobody can create accounts, change passwords or write data, so do these things in normal mode first.

1. Start mugsun as described in [Getting started](/en/guide/getting-started), sign in as `admin` and change the initial password.
2. Create an account for visitors and give it view permissions only.
3. Sign in once with the visitor account and change its password to the one you are going to publish.
4. Enter the data you want to show.

A new account must change its password at first sign-in, and demo mode rejects that request. If you skip step 3, visitors cannot open any page after signing in.

Keep password expiry off, that is, leave the system parameter `security.password.expire-days` at its default of 0.

With an expiry set, the console asks visitors to change the password when it expires, and they cannot.

## Deploy with Docker {#docker}

The backend repository ships `docker-compose.demo.yml`, an overlay that is used on top of `docker-compose.full.yml`.

Both files share the same volumes, so the accounts and data from the previous section are kept.

<div class="ms-steps">

### Generate three database passwords

Demo mode uses three low-privilege database accounts. You generate and keep their passwords. A password may only contain letters and digits and needs at least 16 characters.

```bash
umask 077
for name in RO LOG TRACK; do
  echo "MUGSUN_DEMO_${name}_DB_PASSWORD=$(openssl rand -hex 16)"
done > ~/mugsun-demo.env
```

Keep the file outside the repository directory so that it cannot be committed.

### Set the public address

```bash
echo "MUGSUN_DEMO_FRONT_URL=https://demo.example.com" >> ~/mugsun-demo.env
```

File links are built from this address, and WebSocket handshakes are only accepted from it. The default is `http://localhost:8088`.

### Start

```bash
docker compose --env-file ~/mugsun-demo.env \
  -f docker-compose.full.yml -f docker-compose.demo.yml up -d --build
```

The command fails right away when one of the passwords is missing. Pass the same `--env-file` to every later `docker compose` command that uses these two files.

</div>

Startup does four things in this order:

| Order | Service | What it does |
| --- | --- | --- |
| 1 | `boot-migrate` | Runs the database migrations and the initialization with the owner account, then exits |
| 2 | `demo-accounts` | Creates the three low-privilege accounts and their grants as the superuser. Safe to run again |
| 3 | `boot` | The backend starts with `prod,demo` and the low-privilege accounts |
| 4 | `pc` | The admin console switches its content security policy to blocking and sends violation reports to `/api/csp-report` |

The port is bound to `127.0.0.1:8088` by default. To serve the public, put an HTTPS gateway in front, see [Real IP and reverse proxies](#real-ip).

## Deploy by hand {#manual}

Without Docker, do the same three steps in the same order.

<div class="ms-steps">

### Migrate with the owner account

Start once with the database owner account and without `demo`, only to migrate:

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar \
  --spring.profiles.active=prod --mugsun.demo.migrate-only=true
```

After the migrations and the startup initialization, the process exits by itself with exit code 0.

### Create the three low-privilege accounts

The script is `docs/demo/sql/demo-accounts.sql` in the backend repository. Replace its placeholders with real values, then run it as the superuser.

| Placeholder | Replace with |
| --- | --- |
| `{{RO_PASSWORD}}` `{{LOG_PASSWORD}}` `{{TRACK_PASSWORD}}` | The passwords of the three accounts |
| `{{BIZ_DB}}` `{{TRACK_DB}}` | The names of the business database and the tracking database |
| `{{OWNER}}` | The database owner account |

### Start with the low-privilege accounts

Hand the three accounts to the backend through environment variables, then start with `demo`:

| Environment variable | Value |
| --- | --- |
| `JDBC_USERNAME` `JDBC_PASSWORD` | The read-only business account `mugsun_demo_ro` and its password |
| `TRACK_JDBC_USERNAME` `TRACK_JDBC_PASSWORD` | The tracking account `mugsun_demo_track` and its password |
| `MUGSUN_DEMO_LOG_DB_PASSWORD` | The password of the log account `mugsun_demo_log` |

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar \
  --spring.profiles.active=prod,demo
```

</div>

Demo mode does not run database migrations itself. At startup the backend checks the migration version of both databases and refuses to start when it differs from the one the program ships.

## Which requests get through {#requests}

Demo mode denies write requests by default and only lets through the kinds in the table below.

| Request | Result |
| --- | --- |
| `GET` `HEAD` `OPTIONS` | Allowed |
| Sign-in, sign-out and captcha checks | Allowed. Sign-in is rate-limited per IP |
| Ask data queries `POST /system/track/ask` | Allowed, they only read data |
| Content security policy violation reports `POST /csp-report` | Allowed without signing in, rate-limited per IP. The content is sanitized and only written to a separate log file |
| Tracking collection `/track/collect` `/track/replay` `/track/api-body` | Denied by default, see [Tracking collection](#track-collect) |
| Any other `POST` `PUT` `DELETE` `PATCH` | Denied |
| `/open/**` `/oauth2/**` `/v1/**` `/system/crypto/**` `/auth/social/**` `/system/ai/**` | Denied for every method, with `GET /auth/social/sources` as the only exception |
| Requests with a header such as `X-HTTP-Method-Override` or with a `_method` parameter | Denied |
| Exports, downloads and SSE | Allowed, with a limit on how many run at once |
| WebSocket | Only used for server push. Apart from heartbeats, messages from the client are dropped |

New write endpoints are denied by default and need no registration. The complete allowlist is `docs/demo/readonly-endpoints.md` in the backend repository, generated by a test.

A write that slips through this layer fails at the database for lack of privilege, and the response is the same as for a denied request.

### What a denied request returns {#responses}

| Status | `errorCode` | When it appears |
| --- | --- | --- |
| 403 | `DEMO_READONLY` | A write request was denied. `msg` is a fixed Chinese sentence saying that the demo environment is read-only |
| 429 | `DEMO_RATE_LIMITED` | Sign-in, tracking collection or violation reports exceeded the rate allowed per IP |
| 429 | `DEMO_BUSY` | The number of export-like requests running at once reached the limit |
| 503 | `DEMO_CAPACITY` | The tracking database exceeded its size limit and collection is paused |

### Limits you can adjust {#request-limits}

| Environment variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_DEMO_LOGIN_PER_IP_PER_MINUTE` | `20` | Sign-ins per IP per minute |
| `MUGSUN_DEMO_CSP_PER_IP_PER_MINUTE` | `30` | Violation reports per IP per minute |
| `MUGSUN_DEMO_TRACK_PER_IP_PER_MINUTE` | `120` | Tracking requests per IP per minute |
| `MUGSUN_DEMO_HEAVY_CONCURRENCY` | `2` | Export, download and SSE requests running at once per instance |
| `MUGSUN_DEMO_WS_ALLOWED_ORIGINS` | The admin console address | Origins that may open a WebSocket handshake |

## Database accounts {#accounts}

| Account | Privileges | Used for |
| --- | --- | --- |
| `mugsun_demo_ro` | `SELECT` on all tables of the business database | All business queries |
| `mugsun_demo_log` | `INSERT` on the five tables `sys_login_log` `sys_api_log` `sys_error_log` `sys_oper_log` `sys_usual_log`, `SELECT` on the operation log and its chain-head table, `UPDATE` on the `update_time` column of the chain-head table | Writing logs |
| `mugsun_demo_track` | `SELECT` and `INSERT` on all tables of the tracking database | Tracking queries and collection |

The log account must connect to the primary database. Without `MUGSUN_DEMO_LOG_DB_URL` it uses the address of the business database, and the backend refuses to start when you point it at another database.

The operation log is written by the log account in its own transaction. It records that someone attempted the operation, whether or not the operation succeeded.

## Data that is still written {#writes}

| Data | Where it goes | Notes |
| --- | --- | --- |
| Sign-in, API, error and operation logs | The business database, with the log account | A failed write only logs one WARN and does not affect the request |
| Sign-in lock counters, session tokens and captchas | Redis | Demo mode uses a database of its own |
| Per-IP rate limit counters | Redis | The same database as the row above |
| Tracking events | The tracking database, with the tracking account | Only after collection is turned on. Rows are inserted and never updated |

Set the Redis address with `REDIS_HOST`, `REDIS_PORT` and `REDIS_PASSWORD`. The backend cannot start without Redis.

Demo mode uses database 4 by default, apart from database 3 that normal mode uses by default. Change it with `MUGSUN_DEMO_REDIS_DB`.

### Features that are turned off {#disabled}

- Startup jobs and scheduled jobs that write to the database, including log cleanup and notification retries, and the tracking rollups, partitioning and cleanup.
- Two-factor verification. The phone and mailbox of a public account should not get a code on every sign-in.
- Sending text messages, emails and in-app notifications.
- Social sign-in.
- AI model channels. Every endpoint under `/system/ai/**` is unavailable.

### Known limits {#limits}

- Tracking session statistics only count the first batch of each session, because the tracking account has no `UPDATE` privilege.
- Anonymously reported tracking content is shown on the dashboards. Until output escaping and word filtering exist, there is a risk of stored XSS.
- Captchas still write to Redis.
- Rate limiting depends on Redis. When Redis fails, requests are no longer limited and sign-in fails too.

## Real IP and reverse proxies {#real-ip}

Sign-in locking and rate limiting both work per source IP. When the password of the public account is entered wrong several times, only the IP that did it is locked, and other visitors are not affected.

So the backend must see the visitor's real IP. By default demo mode only trusts an `X-Forwarded-For` header that comes from the loopback address.

| Deployment | What to do |
| --- | --- |
| The Compose files above | Already set. The backend only trusts the admin console container at `172.30.88.10` |
| Your own reverse proxy | Set `MUGSUN_OPENAPI_TRUSTED_PROXIES` to the address or subnet of the proxy |
| An HTTPS gateway in front of the admin console | Also put the gateway address into `MUGSUN_GATEWAY_CIDRS`, see [Behind another gateway](/en/pc/deploy-docker#gateway) |

Do not mark a whole private network as trusted.

When no trusted proxy is set, the backend logs one WARN at startup. All visitors then share the proxy's IP, and one person entering a wrong password locks everyone out.

## Tracking collection {#track-collect}

A demo site does not accept tracking data by default, so the dashboards only show the data you entered beforehand.

To let visitors' actions reach the dashboards, set `MUGSUN_DEMO_TRACK_COLLECT=true`. The three collection endpoints are then allowed and rate-limited per IP.

::: warning Collection endpoints need no sign-in
Once collection is on, anyone can write content into the dashboards. Output escaping and word filtering do not exist yet, so keep it off for now.
:::

The backend checks the size of the tracking database every 5 minutes:

| Environment variable | Default | When exceeded |
| --- | --- | --- |
| `MUGSUN_DEMO_TRACK_WARN_MB` | `2048` | One WARN is logged |
| `MUGSUN_DEMO_TRACK_MAX_MB` | `4096` | The collection endpoints return 503, and recover by themselves once the database shrinks |

Only the size of the database counts here. The disk used by replay files is not included.

## Connections {#connections}

The upper limit of each of the three connection pools can be changed with an environment variable:

| Pool | Environment variable | Default limit |
| --- | --- | --- |
| Business database, read-only | `MUGSUN_DEMO_DB_POOL_MAX` | 5 |
| Logs | `MUGSUN_DEMO_LOG_POOL_MAX` | 4 |
| Tracking database | `MUGSUN_DEMO_TRACK_POOL_MAX` | 4 |

The numbers below assume PostgreSQL with `max_connections=30`. The superuser reserves 3 connections, which leaves 27 for ordinary accounts.

Demo mode uses 13 at most, and the other 14 are for migrations, backups and operations. One `psql` or `pg_dump` session takes 1.

When ordinary accounts cannot connect, the superuser can still use the 3 reserved connections.

Before you raise a pool limit, make sure that the three pools plus the connections a migration needs stay within 27. Beyond that, raise `max_connections` and restart PostgreSQL.

## Upgrading {#upgrade}

To upgrade, migrate once with the owner account first, with the same command as the first step of [Deploy by hand](#manual). With Compose, running the start command again migrates first.

The migration uses the pools of normal mode, 10 connections each for the business and tracking databases. That is up to 20 connections, more than the 14 left above. There are two ways around it:

- Stop the demo site first, then migrate.
- Shrink the pools for the migration, with the command below.

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar \
  --spring.profiles.active=prod --mugsun.demo.migrate-only=true \
  --mybatis-flex.datasource.primary.maximum-pool-size=4 \
  --mybatis-flex.datasource.track.maximum-pool-size=3
```

The migrations of both databases contain statements that run outside a transaction, and Flyway uses a session-level lock.

So connect to PostgreSQL directly for the migration, or use PgBouncer in session mode. Transaction mode does not work.

## Access logs {#access-log}

In demo mode the backend writes one access log line per request, to `mugsun-boot-access.log` in the log directory.

Article 21 of the Cybersecurity Law of China requires network logs to be kept for at least six months, so this log is only deleted by age, never by size.

| Item | Details |
| --- | --- |
| Recorded fields | Source IP, request method and path, status code and duration, user ID and traceId |
| Not recorded | The query string and the request body |
| How the path is written | The route template, such as `/share/{token}`, never the raw address. `(unmatched)` when no route matches |
| Rolling | One file per day, compressed with gzip |
| Retention | 200 days by default, 180 days at least, no cap on the total size |

| Environment variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_DEMO_ACCESS_LOG_PATH` | The log directory | The directory of the access log |
| `MUGSUN_DEMO_ACCESS_LOG_MAX_HISTORY` | `200` | Days to keep |
| `MUGSUN_DEMO_ACCESS_LOG_MIN_FREE_SPACE` | `10GB` | Alert when free disk space drops below this value |

When the retention is below 180 or cannot be parsed, the backend uses 180 days and logs one WARN at startup.

Requests that fail before they reach the backend are not in this log, for example requests that Nginx rejects or that time out. They are in the Nginx access log, which needs the same six months of retention.

The API log and the sign-in log in the database are kept for at least 180 days in demo mode.

### Where it is stored and who may read it {#access-log-storage}

- Mount the log directory on a persistent volume, or the logs are lost when the container is rebuilt. The Compose file already mounts the `boot-logs` volume.
- The directory belongs to the user of the backend process, uid 10001. The directory mode is 0750 and the file mode is 0640.
- IPs and user IDs are personal data. Only let operations and compliance staff read them.
- Back up a copy to another machine at least once a week. Delete logs when the retention period ends, and do not copy them to places nobody manages.

### How much disk it needs {#access-log-disk}

A line takes about 200 bytes, and about 20 bytes after compression.

| Requests per day | Added per day | Total for 200 days | The uncompressed file of the day |
| --- | --- | --- | --- |
| 1 million | About 20MB | About 4GB | About 200MB |
| 5 million | About 100MB | About 20GB | About 1GB |

Estimate with your peak traffic and double it. For a peak of 5 million requests a day, plan for 40GB.

The backend checks the free space of the log disk once an hour. It logs one WARN when the space drops below the threshold and one INFO when it recovers, without repeating in between.

It also logs just one WARN when the free space cannot be read. A good threshold is at least the peak requests per day × 200 bytes × 7, that is, one week of writes.

After an alert, enlarge the log volume or move old archives away, and do not delete files younger than 180 days. A full disk also breaks the service.

For stricter requirements, also collect the access log into an external log system and keep it off site.

::: details How to write the threshold and the retention
- Threshold units are case-insensitive and 1024-based. Use `K` `KB` `KiB` up to `T` `TB` `TiB`. No unit or `B` means bytes.
- Spaces between the number and the unit are fine, for example `10 GB`. Spaces inside the number are not.
- The threshold may have decimals. It is converted to bytes and rounded down. `1.5G` is 1610612736 bytes.
- A threshold of 0 or less after conversion turns the alert off, with one WARN at startup.
- A threshold that cannot be parsed counts as 10GB, with one WARN. Exponent notation such as `1e3G` and numbers out of range cannot be parsed.
- A retention with decimals is rounded down, so `200.5` means 200 days. Values above 2147483647 count as 2147483647.
:::

### How it is written {#access-log-async}

Access log lines go into a queue first and a background thread writes them to disk, so requests are not slowed down.

When the queue is full, a write waits 50 milliseconds at most. After that the line is dropped and counted. Under extreme traffic a few access log lines may be lost.

| Setting | Default | Purpose |
| --- | --- | --- |
| `mugsun.demo.access-log.offer-timeout-ms` | `50` | Milliseconds to wait at most when the queue is full |
| `mugsun.demo.access-log.drop-warn-interval-ms` | `60000` | Minimum milliseconds between two drop warnings |

The number of dropped lines is in the metric `mugsun.demo.access_log.dropped`, and the log has a rate-limited WARN as well.

## What does not exist yet {#todo}

The following are not built yet. Add your own before you open a demo site to the public:

- A daily reset of the sample data.
- Word filtering.
- Output escaping.
- A read-only hint in the admin console. Today, when a write request is denied, the page only shows the sentence the API returns.

## Next steps

<div class="ms-cards">

- [Live demo](/en/demo) Try mugsun on your machine, plus the live demo of the mobile components.
- [Security checklist](/en/boot/security-checklist) Security settings to go through before going live.
- [Docker deployment](/en/pc/deploy-docker) Environment variables of the admin console image, and what to set when a gateway is in front.
- [Content Security Policy (CSP)](/en/pc/csp) A demo site uses blocking mode. This page explains the policy.

</div>
