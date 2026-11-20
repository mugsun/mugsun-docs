# Getting started

All you need is Docker (Compose v2.17+). The whole system starts in containers, including the database and Redis.

<div class="ms-steps">

### Start it

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
```

The first run builds the backend and admin console images on your machine, so it takes a while.

### Get the admin password

```bash
docker compose -f docker-compose.full.yml run --rm init show
```

The password is generated at random on the first run and stored in a Docker volume.

### Sign in

Open <http://127.0.0.1:8088> and sign in as `admin` with the password from the previous step. The first sign-in asks you to change it.

![The workbench you see after signing in](/screenshots/pc-workbench.png)

</div>

::: warning For evaluation only
This Compose file is for trying mugsun out. For production settings, see [Configuration](/en/boot/configuration) and the [Security checklist](/en/boot/security-checklist).
:::

## Change how it starts

Set the variables in this table before you run `up`.

| Need | What to do |
| --- | --- |
| Reach it from another machine | Set `MUGSUN_HTTP_BIND=0.0.0.0`. By default it only listens on this machine |
| Use another port | Set `MUGSUN_HTTP_PORT`. The default is `8088` |
| Use another time zone | Set `MUGSUN_TZ`. The default is `Asia/Shanghai` |
| See the sign-in hint again | `docker compose -f docker-compose.full.yml logs ready` |
| Wipe everything and start over | `docker compose -f docker-compose.full.yml down -v`. This deletes the data and the keys |

::: details Docker Hub images fail to pull
Add `registry-mirrors` to Docker's `daemon.json` and restart Docker, or give Docker a proxy.
:::

## Run from source {#local-development}

When you want to change the code, run the backend and the admin console from source.

You need JDK 21, Maven 3.9+ and Docker. The admin console also needs Node.js 22.13+ and pnpm 11.11+.

<div class="ms-steps">

### Start the backend

The `main` branch depends on a snapshot version of mugsun-core. That version is not on Maven Central, so install it locally first.

```bash
git clone https://github.com/mugsun/mugsun-core.git
cd mugsun-core && mvn -B clean install -DskipTests && cd ..

git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d    # PostgreSQL 5432, Redis 6379
./mvnw -pl mugsun-boot-server -am package -DskipTests
export MUGSUN_INIT_PASSWORD='<initial password for admin>'
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

The backend is up when `curl http://localhost:8080/ping` gets a response.

### Start the admin console {#2-start-the-admin-console}

Go back to the directory that contains `mugsun-boot` and run:

```bash
git clone https://github.com/mugsun/mugsun-pc.git && cd mugsun-pc
pnpm install
pnpm dev
```

Your browser opens <http://localhost:3006>. Sign in as `admin` with the initial password you set in the previous step.

### Send your first event

In the admin console, go to Tracking → Integration and create an app to get an `appKey`. Then install the SDK in your page:

::: code-group

```bash [pnpm]
pnpm add @mugsun/track-web
```

```bash [npm]
npm install @mugsun/track-web
```

:::

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'http://localhost:8080',
  appKey: '<your appKey>',
})
track.track('hello_mugsun')
```

Go to Tracking → Overview and select the app to see the event you just sent.

</div>

::: details Port 5432 or 6379 is already in use
Pick other host ports. Export them in the same terminal so the backend reads them too:

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
```

For other problems, see the [FAQ](/en/guide/faq) and the [Error reference](/en/guide/errors).
:::

## Next steps

<div class="ms-cards">

- [Write your first API](/en/boot/tutorial/first-api) Add a `GET /hello` endpoint to the backend.
- [Architecture](/en/guide/architecture) What each repository does and how to switch the optional modules.
- [Configuration](/en/boot/configuration) Environment variables and settings for production.
- [Security checklist](/en/boot/security-checklist) What to verify before you go live.

</div>
