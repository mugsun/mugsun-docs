# Getting started

## Try it with Docker

All you need is Docker. The database, Redis, backend and admin console all run in containers.

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
docker compose -f docker-compose.full.yml run --rm init show
```

The last command prints the admin password. Open <http://localhost:8088> and sign in as `admin`.

By default the console port is bound to `127.0.0.1` only, so it can be reached only from the same machine. To try it on a server and open it from another machine, set `MUGSUN_HTTP_BIND=0.0.0.0` before starting. The port can be changed with `MUGSUN_HTTP_PORT`.

![Admin console workbench](/screenshots/pc-workbench.png)

If a server in mainland China can't pull images from Docker Hub, set `registry-mirrors` in Docker's `daemon.json` and restart Docker, or give Docker a proxy.

::: warning
You are not forced to change the password after signing in, so sign in and change it in your profile. This compose file is for trying things out. For production settings, see [Boot configuration](/en/boot/configuration).
:::

## Local development

You need JDK 21, Maven 3.9+ and Docker. The admin console also needs Node.js 22.13+ and pnpm 11.11+.

### 1. Start the backend

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

> **Always build from the repository root with `-am`** (or build the whole project with `mvn clean package -DskipTests`). If you build only the server module (`-pl mugsun-boot-server` without `-am`, `mvn package` inside `mugsun-boot-server`, or an IDE building just that module), `mugsun-boot-core` comes from the local Maven repository at `~/.m2/repository/com/mugsun/mugsun-boot-core/0.1.0/`. Every branch and worktree shares that one 0.1.0 version, which holds whichever branch ran `mvn install` last, so the jar can carry another branch's old code (such as an old captcha response shape) whether or not you add `clean`. When in doubt, run `mvn -B install -DskipTests` from the root first.

The backend is running when `curl http://localhost:8080/ping` returns a response. The default account is `admin` / `123456`. Run `java -jar` from the repository root so `config/application-local.yml` is picked up.

::: details Port 5432 or 6379 is already in use
Pick other host ports. Export them in the same terminal so the backend reads them too:

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
```

For other solutions, see the [FAQ](/en/guide/faq).
:::

### 2. Start the admin console

From the directory that contains `mugsun-boot`:

```bash
git clone https://github.com/mugsun/mugsun-track.git
git clone https://github.com/mugsun/mugsun-pc.git
cd mugsun-pc && pnpm setup:sdk && pnpm install && pnpm dev
```

Open <http://localhost:3006>. Local sign-in first asks you to pass a security check. The challenge type is picked at random from five types; see [Behavior captcha](/en/pc/captcha).

### 3. Report your first event

In the console, create an app under Analytics → Integrations and copy its `appKey`:

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

Select the app under Analytics → Overview to view the reported data.

## Next steps

- [Development tutorial: your first API](/en/boot/tutorial/first-api)
- [Architecture](/en/guide/architecture)
- [Boot configuration](/en/boot/configuration)
- [Pre-launch security checklist](/en/boot/security-checklist)
- [FAQ](/en/guide/faq)
