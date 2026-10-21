# FAQ

## Product and licensing

### What kind of project is mugsun for?

Admin systems that must be deployed on-premises and also need product analytics. It is neither a drag-and-drop low-code tool nor a hosted analytics service. See the [Introduction](/en/guide/introduction).

### What are the licenses?

boot, core, pc, track and ms-ui are all MIT-licensed. The console's UI foundation is derived from art-design-pro (MIT), so keep the repository's `NOTICE` when you redistribute it. Each repository's `LICENSE` is authoritative.

### Is there a live demo?

ms-ui has a [live H5 demo](/en/demo). There is no public environment for the console and analytics yet; run them locally with [Getting started](/en/guide/getting-started).

### When will cloud and the ms-ui source be released?

cloud is still planned, so this site has no install guide for it. The ms-ui docs and H5 demo are open to everyone; its source repository is not yet public.

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

The console references the SDK as `file:../mugsun-track`, and the SDK repository doesn't commit `dist/`. Clone mugsun-track next to mugsun-pc and run `pnpm setup:sdk`. If you don't need analytics, set `VITE_ENABLE_TRACK=false` to skip the build, but the sibling directory must still exist for `pnpm install` to succeed.

## Analytics

### Does the SDK record what users type?

Autocaptured events such as clicks never include `input` / `textarea` values. From 0.3.0, session replays show input values and page text as-is by default; password fields, `maskSelectors` and `data-track-mask` areas, card fields and one-time-code fields are never recorded. To mask them, pass `maskAllInputs: true` and `maskTextSelector`; see [Privacy · Turning on masking and filtering](/en/track/privacy#turning-on-masking-and-filtering).

### Are tokens in URLs sent to the server?

Not as-is. In API monitoring URLs, `referrer`, link `href`s, resource error URLs and page addresses in replays, the values of sensitive parameters such as `token`, `access_token`, `code`, `ticket` and `otp` become `***`, including parameters in the hash. See [Privacy · URL redaction](/en/track/privacy#url-redaction) for the full list.

### What if my `appKey` leaks?

It's visible in the browser by design and isn't a secret. The server relies on existence checks, rate limiting, back-pressure and event validation.

## Deployment and operation

Each answer below follows the order symptom, cause, fix. If you have the exact error text, you can also check the [error reference](/en/guide/errors) first.

### After upgrading, the old frontend can't sign in and gets 40013

Sign-in, sign-up and sending verification codes all return `40013`, asking you to complete the security check first.

The backend removed the old numeric image captcha `GET /auth/captcha`. When the captcha is on, requests must carry a `captchaToken`.

Upgrade the frontend to the new behavioral captcha flow. See the [backend upgrade guide](/en/boot/upgrade).

### After a restart, encrypted APIs all fail with an invalid ciphertext error

During local development, pages that were already open fail on every encrypted API call after the backend restarts.

Without `MUGSUN_API_KEY`, the dev profile uses an ephemeral key that is valid only in the current process, so the key changes on restart.

Reload the page and sign in again. To keep the key stable, set `MUGSUN_API_KEY`.

### The Scheduled Tasks page says the task service cannot be reached

The Scheduled Tasks page says the task service cannot be reached, and the list is empty.

The PowerJob Server is not part of the default Docker setup, so the backend cannot reach the scheduler.

Deploy a PowerJob Server yourself and set `POWERJOB_ENABLED` and the related environment variables. See [Scheduled tasks](/en/boot/features/job). For simple single-process jobs, use Spring `@Scheduled` instead.

### With several instances, some users don't get message pushes

The message is in the database, but users connected to another instance don't get the real-time push.

`mugsun.websocket.sender-type` was changed to `local`, so pushes only reach connections on the same machine.

Keep the default `redis`, so pushes are relayed to every instance through Redis publish/subscribe.

### With several instances, attachment links work only sometimes

The same download link opens on one instance but not on another.

`MUGSUN_FILE_SIGN_SECRET` is not set, so each instance generated its own random signing key. Old links also break after a restart.

Set the same `MUGSUN_FILE_SIGN_SECRET` of at least 32 characters on every instance.

### After turning off GIS or AI, other machines still have it

After you turn a module off in the system parameters, other machines in a multi-server deployment keep it on for up to an hour.

The module switch parameters are cached locally on each machine for one hour. This is a known issue, see [mugsun-boot#90](https://github.com/mugsun/mugsun-boot/issues/90).

Until it is fixed, restart each instance after turning a module off. You can also turn modules off at startup with `MUGSUN_GIS_ENABLED=false` or `MUGSUN_AI_ENABLED=false`.

### Redis can't connect when the password has special characters

With the `prod` or `demo` profile, the backend can't connect to Redis, or connects to the wrong address.

In these profiles, the jetcache connection string puts the password straight into a URI, which breaks when the password contains `@`, `:`, `/`, `?`, `#` or `%`. This is a known issue, see [mugsun-boot#70](https://github.com/mugsun/mugsun-boot/issues/70).

Until it is fixed, use only letters and digits in the Redis password.

### Migrations don't run on openGauss

On openGauss, Flyway fails before running any migration.

Flyway runs `SET ROLE`, which openGauss rejects because it requires a password. openGauss-lite also has a syntax error in V8, see [mugsun-boot#102](https://github.com/mugsun/mugsun-boot/issues/102).

For the full openGauss, run the scripts in `db/migration-og` one by one with gsql. See the [backend upgrade guide](/en/boot/upgrade).

## Before you ask

Check the [error reference](/en/guide/errors) and this page first. If you are still stuck, open an [issue](https://github.com/mugsun) on the relevant repository with the steps to reproduce, the version and your system. The version can be a Maven or npm version or a commit SHA.

