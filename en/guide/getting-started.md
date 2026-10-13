# Getting started

This guide takes you from an empty machine to three verifiable results: **the backend health check passes → you can sign in to the console → your first analytics event shows up on a dashboard.** Each step ends with a way to check it worked.

## Requirements

| Tool | Version | Used for |
| --- | --- | --- |
| JDK | 21 | Running boot |
| Maven | 3.9+ | Building boot (pulls `com.mugsun:mugsun-*:0.1.0` from Maven Central) |
| Docker / Docker Compose | Recent | PostgreSQL 16 (with PostGIS and pgvector) and Redis 7 |
| Node.js | ≥ 20.19 | Console and SDK (optional) |
| pnpm | ≥ 8.8 (the console pins `pnpm@11.9.0`) | Same as above |

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

- `docker compose up -d` starts only PostgreSQL (5432) and Redis (6379). The first run builds a database image with PostGIS and pgvector.
- The package uses the default `full` profile (core + gis + track + ai).
- Run `java -jar` from the repository root, otherwise `config/application-local.yml` is not picked up. Make sure `java -version` reports 21.

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

**Check:** sign in with the account from step 1. The local config echoes the captcha, so it is filled in for you. You should land on the workbench, with menus such as Analytics and System in the top bar.

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
