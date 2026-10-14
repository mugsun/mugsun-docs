# Getting started

## Try it with Docker only

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
docker compose -f docker-compose.full.yml run --rm init show
```

The last command prints the admin password. Open <http://localhost:8088> and sign in as `admin`.

![Admin console workbench](/screenshots/pc-workbench.png)

::: warning
You are not forced to change the password after signing in, so change it yourself in your profile. This compose file is for trying things out. For production settings, see [Boot configuration](/en/boot/configuration).
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

It works when `curl http://localhost:8080/ping` responds. The default account is `admin` / `123456`.

::: details Port 5432 or 6379 is already in use
Pick other host ports. Export them in the same terminal so the backend reads them too:

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
```

For other options, see the [FAQ](/en/guide/faq).
:::

### 2. Start the admin console

From the directory that contains `mugsun-boot`:

```bash
git clone https://github.com/mugsun/mugsun-track.git
git clone https://github.com/mugsun/mugsun-pc.git
cd mugsun-pc && pnpm setup:sdk && pnpm install && pnpm dev
```

Open <http://localhost:3006>. In local development the captcha is filled in for you.

### 3. Send your first event

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

Select the app under Analytics → Overview to see the data.

## Next steps

- [Architecture](/en/guide/architecture)
- [Boot configuration](/en/boot/configuration)
- [Pre-launch security checklist](/en/boot/security-checklist)
- [FAQ](/en/guide/faq)
