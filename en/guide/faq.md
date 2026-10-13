# FAQ

## Product and licensing

### What kind of project is mugsun for?

Admin systems that must be deployed on-premises and also need product analytics. It is neither a drag-and-drop low-code tool nor a hosted analytics service. See the [Introduction](/en/guide/introduction).

### What are the licenses?

boot and core are Apache-2.0; pc and track are MIT. The console's UI foundation is derived from art-design-pro (MIT), so keep the repository's `NOTICE` when you redistribute it. Each repository's `LICENSE` is authoritative.

### Is there a live demo?

ms-ui has a [live H5 demo](/en/demo). There is no public environment for the console and analytics yet; run them locally with [Getting started](/en/guide/getting-started).

### When will cloud and the ms-ui source be released?

cloud is still planned, so this site has no install guide for it. The ms-ui docs and H5 demo are public; the source is part of the commercial edition and is not public.

## Startup and build

### Do I still need to `mvn install` mugsun-core?

No. `com.mugsun:mugsun-*:0.1.0` is on Maven Central. Clone core and run `mvn clean install -DskipTests` only in an offline environment.

### Does `docker compose up -d` start the application too?

No. Compose starts PostgreSQL (5432) and Redis (6379) only. Package the app and run it with `java -jar mugsun-boot-server/target/mugsun-boot.jar`.


### Ports 5432 / 6379 are already in use

Compose and the backend read the same environment variables, so one change covers both and no yml edit is needed:

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

The backend also reads `MUGSUN_DB_HOST`, `MUGSUN_DB_NAME`, `MUGSUN_DB_USERNAME`, `MUGSUN_DB_PASSWORD`, `MUGSUN_REDIS_HOST`, or a full `MUGSUN_DB_URL`. The track database `mugsun_track` resolves its URL in this order: `TRACK_JDBC_URL` → `MUGSUN_DB_URL` → `MUGSUN_DB_HOST`/`MUGSUN_DB_PORT`. When it uses `MUGSUN_DB_URL`, it keeps that URL's host, port and parameters and only swaps the database name for `mugsun_track`. Under `prod` the business database reads only `JDBC_URL`, but the track database follows the same order, so without `TRACK_JDBC_URL` it reads `MUGSUN_DB_*`; see [Configuration](/en/boot/configuration). The `MUGSUN_DB_URL` step requires [mugsun-boot #38](https://github.com/mugsun/mugsun-boot/pull/38); earlier versions only use the host and port.

### The first `docker compose up -d` is slow on Apple Silicon

The database image is built locally, and the official `postgis/postgis` base image is amd64 only, so Apple Silicon runs it under emulation: the first build takes several extra minutes and the database is slower. To run natively, use a multi-arch base image:

```bash
MUGSUN_PG_BASE_IMAGE=imresamu/postgis:16-3.4 MUGSUN_PG_PLATFORM=linux/arm64 docker compose up -d --build
```

### `spring-boot:run` fails with `Unable to find a suitable main class`

In older versions, running `mvn -pl mugsun-boot-server -am spring-boot:run` from the repository root also applied the plugin to the parent POM. [mugsun-boot #13](https://github.com/mugsun/mugsun-boot/pull/13) fixed this; pull the latest code and retry from the repository root. The recommended path is still `mvn -pl mugsun-boot-server -am package -DskipTests` followed by `java -jar mugsun-boot-server/target/mugsun-boot.jar` from the repository root.

### The local config file isn't picked up

The path is `optional:file:./config/application-local.yml`, so the working directory must be the boot repository root. Create it with `cp config/application-local.yml.example config/application-local.yml`.


### Startup fails with `Migration checksum mismatch for version 1`

The released 0.1.0 `V1__baseline_0_1.sql` is now identical on main (since [mugsun-boot #15](https://github.com/mugsun/mugsun-boot/pull/15); CI checks it against `db/RELEASED.sha256`, so it won't change again). This error means your dev database was created from main before 0.1.0 was released, or from main between #11 and #15, so it recorded an older V1 checksum.

- **Dev database, data not needed (recommended):** `docker compose down -v && docker compose up -d`, then start the backend to rebuild from the current migrations. This deletes the dev data volume only; never run it against a shared database.
- **Keep the data:** back up first, check the schema matches the current V1, then record the released V1 checksum (what `flyway repair` would do for V1): `docker exec mugsun-pg psql -U mugsun -d mugsun -c "UPDATE flyway_schema_history SET checksum = 1472764584 WHERE version = '1';"`. This only updates the history table; it doesn't add columns or menus the older V1 lacked, so rebuilding is safer when the schema differs.

Databases created from the 0.1.0 release are not affected and upgrade normally.

### The app exits immediately with the `prod` profile

`prod` refuses to start without an injected initial password (`MUGSUN_INIT_PASSWORD`). This is a deliberate safety default.

### I only want the core backend, without GIS or AI

Package with `-Pbasic,'!full'`, or keep `full` and set `MUGSUN_GIS_ENABLED=false` / `MUGSUN_AI_ENABLED=false` at runtime. See [Architecture](/en/guide/architecture#two-layers-of-module-switches).

## Console

### Why do I have to sign in again in a new tab?

Since 0.1.0, tokens live in `sessionStorage` (per tab) instead of `localStorage`, which limits what an XSS bug could steal. Non-sensitive data such as language and user info stays in `localStorage`.

### `pnpm install` can't find `@mugsun/track-web`

The console references the SDK as `file:../mugsun-track`, and the SDK repository doesn't commit `dist/`. Clone mugsun-track next to mugsun-pc and run `pnpm setup:sdk`, or set `VITE_ENABLE_TRACK=false` if you don't need analytics.

## Analytics

### Does the SDK record what users type?

No. Input and textarea values are never captured; password fields, `maskSelectors` matches and `data-track-mask` elements are blocked entirely; replays mask inputs and page text by default. See [Privacy](/en/track/privacy).

### Are tokens in URLs sent to the server?

API monitoring keeps query strings but replaces the values of `token`, `access_token`, `authorization`, `id_token`, `refresh_token`, `api_key`, `apikey`, `auth`, `secret` and `password` (case-insensitive) with `***`.

### What if my `appKey` leaks?

It's visible in the browser by design and isn't a secret. The server relies on existence checks, rate limiting, back-pressure and event validation.

Still stuck? Open an [issue](https://github.com/mugsun) on the relevant repository.
