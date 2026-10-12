# Getting Started

Goal: bring up **Postgres + Redis + boot** from an empty machine, sign in to the admin console, and smoke-test once. Commands follow the [mugsun-boot README](https://github.com/mugsun/mugsun-boot/blob/main/README_EN.md); this page is the shortest honest path.

## Prerequisites

- JDK 21, Maven 3.9+, Docker / Docker Compose
- Clone [mugsun-core](https://github.com/mugsun/mugsun-core) as a **sibling** of `mugsun-boot` (not on Maven Central yet—local `mvn install` required)
- Optional: Node.js ≥ 20.19 and pnpm for [mugsun-pc](https://github.com/mugsun/mugsun-pc)

Suggested layout:

```text
mugsun/
  mugsun-core/
  mugsun-boot/
  mugsun-pc/      # optional
  mugsun-track/   # clone when wiring analytics
```

## 1. Install core

```bash
git clone https://github.com/mugsun/mugsun-core.git
cd mugsun-core
mvn clean install -DskipTests
```

## 2. Start infrastructure + boot

`docker compose` starts **PostgreSQL (5432) and Redis (6379) only**. The app runs as a JAR / `spring-boot:run`—not a single compose that brings up the full stack.

```bash
git clone https://github.com/mugsun/mugsun-boot.git
cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am spring-boot:run
```

Health check: `http://localhost:8080/ping`.

OpenAPI (dev): `http://localhost:8080/swagger-ui/index.html` (disabled under `prod`).

::: warning Credentials
Default initial account (per boot README): `admin` / `123456` (override with `MUGSUN_INIT_PASSWORD`). **Change the password immediately after login.** Never expose demo credentials on the public internet. The `prod` profile refuses to start without an injected initial password.
:::

Dev DB credentials default to the JDBC settings (`mugsun` / `mugsun`). Without Docker, see `scripts/init-db.sql` in the boot repo. Always trust the current [mugsun-boot](https://github.com/mugsun/mugsun-boot) README if anything drifts.

## 3. (Optional) Admin console

With boot healthy on `:8080`:

```bash
git clone https://github.com/mugsun/mugsun-pc.git
# If Track is enabled, keep mugsun-track as a sibling and run pnpm setup:sdk first (see pc README)
cd mugsun-pc
pnpm install
pnpm dev
```

Open `http://localhost:3006` (`VITE_PORT`). Dev `/api` proxies to boot `:8080`. Sign-in credentials match boot.

## 4. Smoke test

1. Sign in and open any system admin list page.
2. If Track is enabled, verify with [First event](/en/track/first-event).
3. Before production, walk through the [Security checklist](/en/boot/security-checklist).

## Links

- [mugsun-boot](https://github.com/mugsun/mugsun-boot) · [Configuration](/en/boot/configuration)
- [mugsun-pc](https://github.com/mugsun/mugsun-pc) · [Development](/en/pc/development)
- [mugsun-track](https://github.com/mugsun/mugsun-track) · [Install Track](/en/track/install)
- [Demo notes](/en/demo)
