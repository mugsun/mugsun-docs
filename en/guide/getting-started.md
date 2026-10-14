# Getting started

This guide takes you from an empty machine to three verifiable results: **the backend health check passes → you can sign in to the console → your first analytics event shows up on a dashboard.** Each step ends with a way to check it worked.

## Docker only: the whole stack in one command

If the machine only has Docker (Compose v2.17+), one command in the `mugsun-boot` repo root brings up PostgreSQL (PostGIS + pgvector), Redis, the backend and the console:

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
docker compose -f docker-compose.full.yml logs init   # shows the generated admin password
```

Open <http://localhost:8088> and sign in as `admin` with the printed password. Change the port with `MUGSUN_HTTP_PORT`.

- **No weak passwords.** On first start the `init` service generates random database and Redis passwords, the admin password, SM4/SM2 keys, the audit-signing key pair and a file-signing secret of at least 32 characters, and stores them in the `secrets` volume. They survive restarts; `docker compose -f docker-compose.full.yml run --rm init show` prints the admin password again.
- The backend runs with the `prod` profile: it refuses to start if any key is missing, login requires a captcha, and the OpenAPI docs are off.
- Only the console port is published. The database and Redis aren't mapped to the host; the console's Nginx proxies `/api` to the backend.
- The compose network uses a fixed subnet (`MUGSUN_COMPOSE_SUBNET`, default `172.30.89.0/24`) and the console container a fixed IP (`MUGSUN_PC_IP`, default `172.30.89.10`); `MUGSUN_OPENAPI_TRUSTED_PROXIES` trusts only that one IP. If you put another proxy in front, add its address too.
- The PostgreSQL base image and the Redis image are pinned to digests. The Redis password lives in a generated `redis.conf`, never in process arguments.
- Self-check: `scripts/compose-full-smoke.sh` starts from scratch, signs in, sends one event and finds it in the console, prints the elapsed time, then runs `down -v`. It uses its own project name and leaves existing containers alone.
- Start over (deletes data and secrets): `docker compose -f docker-compose.full.yml down -v`.

This compose file is for trying things out and demos. For your own production deployment, these are all the required settings:

| Variable | Purpose |
| --- | --- |
| `SPRING_PROFILES_ACTIVE=prod` | Production profile |
| `JDBC_URL` / `JDBC_USERNAME` / `JDBC_PASSWORD` | Primary database |
| `TRACK_JDBC_URL` / `TRACK_JDBC_USERNAME` / `TRACK_JDBC_PASSWORD` | Analytics database `mugsun_track` |
| `REDIS_HOST` / `REDIS_PASSWORD` (optional `REDIS_PORT` / `REDIS_DB`) | Redis |
| `MUGSUN_FRONT_URL` / `FILE_DOMAIN` | Console origin and file domain |
| `MUGSUN_INIT_PASSWORD` | Initial admin password; can't be the built-in default |
| `MUGSUN_SM4_KEY` / `MUGSUN_API_KEY` | 16-character SM4 keys |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | SM2 transport key pair (hex) |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | Audit-signing key pair |
| `MUGSUN_FILE_SIGN_SECRET` | File download link signing secret, at least 32 characters |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | Trusted reverse-proxy CIDRs; required when a proxy sits in front |
| `SMTP_*` / `SMS_*` | Mail and SMS. The compose file uses placeholders; set real values to use password reset or SMS login |

Generate the keys with `scripts/gen-keys.sh --all >> .env` from the repo (two SM2 key pairs, two SM4 keys, the admin password and the file-signing secret, in `.env` format; needs OpenSSL 1.1.1+). The one-command stack's `init` uses the same script. See [Configuration](/en/boot/configuration) for details. The steps below are for local development repo by repo.

## Requirements

| Tool | Version | Used for |
| --- | --- | --- |
| JDK | 21 | Running boot |
| Maven | 3.9+ | Building boot (pulls `com.mugsun:mugsun-*:0.1.0` from Maven Central) |
| Docker / Docker Compose | Recent | PostgreSQL 16 (with PostGIS and pgvector) and Redis 7 |
| Node.js | ≥ 22.13 | Console and SDK (optional) |
| pnpm | ≥ 11.11 (the console pins `pnpm@11.28.2`) | Same as above |

Recommended layout. The console references the SDK as `file:../mugsun-track`, so the repositories must sit side by side:

```text
mugsun/
  mugsun-boot/    # backend, :8080
  mugsun-pc/      # console, :3006 (optional)
  mugsun-track/   # SDK, needed when the console's analytics module is on
```

::: tip No need to install core locally
`mugsun-core` 0.1.0 is on [Maven Central](https://central.sonatype.com/search?q=com.mugsun), so Maven resolves it while building boot. Clone core and run `mvn clean install -DskipTests` only if you are offline.
:::

## Step 1: Start the backend

```bash
git clone https://github.com/mugsun/mugsun-boot.git
cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

> **Always build from the repository root with `-am`** (or build the whole project with `mvn clean package -DskipTests`). If you build only the server module (`-pl mugsun-boot-server` without `-am`, `mvn package` inside `mugsun-boot-server`, or an IDE building just that module), `mugsun-boot-core` comes from the local Maven repository at `~/.m2/repository/com/mugsun/mugsun-boot-core/0.1.0/`. Every branch and worktree shares that one 0.1.0 version, which holds whichever branch ran `mvn install` last, so the jar can carry another branch's old code (such as an old captcha response shape) whether or not you add `clean`. When in doubt, run `mvn -B install -DskipTests` from the root first.

- `docker compose up -d` starts only PostgreSQL (5432) and Redis (6379). The first run builds a database image with PostGIS and pgvector. If those ports are taken, see the [FAQ](/en/guide/faq#ports-5432-6379-are-already-in-use).
- The package uses the default `full` profile (core + gis + track + ai).
- Run `java -jar` from the repository root, otherwise `config/application-local.yml` is not picked up. Make sure `java -version` reports 21.

::: details Port 5432 is already in use?
If `docker compose up -d` reports a port conflict, a local PostgreSQL is usually running:

- Find it: `lsof -nP -iTCP:5432 -sTCP:LISTEN` on macOS / Linux, `netstat -ano | findstr :5432` on Windows.
- Option 1: stop the local PostgreSQL (e.g. `brew services stop postgresql@16`, `sudo systemctl stop postgresql`), then run `docker compose up -d` again.
- Option 2: change the host port. In `docker-compose.yml`, change the postgres mapping `"5432:5432"` to e.g. `"5433:5432"`, and override the connection URL in `config/application-local.yml`:

```yaml
mybatis-flex:
  datasource:
    primary:
      url: jdbc:postgresql://localhost:5433/mugsun
```
:::

::: details Can I use `mvn -pl mugsun-boot-server -am spring-boot:run`?
Yes. For development you can run it from the repository root (since [mugsun-boot #13](https://github.com/mugsun/mugsun-boot/pull/13)). Packaging and running the JAR is still recommended for deployment and verification.
:::

**Check:**

- `curl http://localhost:8080/ping` returns a success response.
- The OpenAPI UI is at `http://localhost:8080/swagger-ui/index.html` (disabled in `prod`).

::: warning Initial password
The default account is `admin` / `123456`; override it with `MUGSUN_INIT_PASSWORD`. In `prod`, boot refuses to start without an injected initial password. Change the password right after you sign in, and never expose the demo password publicly.
:::

If startup fails, see the [FAQ](/en/guide/faq#startup-and-build).

## Step 2: Start the console (optional)

From the directory that contains `mugsun-boot`:

```bash
git clone https://github.com/mugsun/mugsun-track.git
git clone https://github.com/mugsun/mugsun-pc.git
cd mugsun-pc
pnpm setup:sdk
pnpm install
pnpm dev
```

- `pnpm setup:sdk` builds the sibling `mugsun-track`. Skip it if you set `VITE_ENABLE_TRACK=false`.
- `pnpm dev` serves the console at `http://localhost:3006` and opens a browser.

During development, Vite proxies `/api/**` to `VITE_API_PROXY_URL` in `.env.development` (default `http://localhost:8080`).

**Check:** sign in with the account from step 1, dragging the slider to pass the check. You should land on the workbench, with menus such as Analytics and System in the top bar.

![Sign-in page](/screenshots/pc-login.png)

![Workbench](/screenshots/pc-workbench.png)

::: info Sessions are per tab
Since 0.1.0, `accessToken` and `refreshToken` live in `sessionStorage` rather than `localStorage`. A new tab asks you to sign in again; that is intentional.
:::

## Step 3: Send your first event (optional)

1. In the console, open **Analytics → Integrations** (埋点分析 → 接入管理), create an app and copy its `appKey`.
2. Install and initialize the SDK in any web project:

::: code-group

```bash [pnpm]
pnpm add @mugsun/track-web
```

```bash [npm]
npm install @mugsun/track-web
```

```bash [yarn]
yarn add @mugsun/track-web
```

:::

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'http://localhost:8080', // events go to {endpoint}/track/collect
  appKey: '<your appKey>',
})

track.track('hello_mugsun', { from: 'getting-started' })
```

**Check:** in the browser's network panel, `/track/collect` returns 2xx. In **Analytics → Overview**, pick your app and the data appears.

![Analytics overview (demo data)](/screenshots/track-overview.png)

Troubleshooting steps are in [Your first event](/en/track/first-event).

## Next steps

- How the repositories fit together: [Architecture](/en/guide/architecture)
- Modules, data sources and security settings: [Boot configuration](/en/boot/configuration)
- Before going live: [Security checklist](/en/boot/security-checklist)
- Extending the console: [Console development](/en/pc/development)
