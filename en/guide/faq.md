# FAQ

The questions are grouped into five topics. When you have the exact error text at hand, [Error reference](/en/guide/errors) is the faster place to look.

## Product and licensing

### What kind of project is mugsun for?

Admin projects that need common features such as multi-tenancy and workflow. Product analytics, GIS and AI can be enabled as you need them.

It is neither a drag-and-drop low-code platform nor a hosted analytics service. For what each part is and whether it works on its own, see [Introduction](/en/guide/introduction).

### What is the license?

The backend, the admin console, the analytics SDK and ms-ui are all under the MIT license. The `LICENSE` file of each repository is authoritative.

The interface of the admin console is derived from art-design-pro (MIT). Keep the `NOTICE` file from the repository when you redistribute it.

### Is there a live demo?

ms-ui has one, see [Live demo](/en/demo#ms-ui).

The admin console and the tracking dashboards have no public demo site yet. Start them on your machine with [Getting started](/en/guide/getting-started).

### When will the microservice edition and the ms-ui source be released?

The microservice edition (cloud) is still being planned, and there is no version you can install.

The ms-ui documentation and H5 demo are open. Its source repository is not public yet.

## Startup and build

### Do I have to compile anything when I start with Docker?

No. `docker-compose.full.yml` from [Getting started](/en/guide/getting-started) builds and starts the whole system in containers.

The remaining questions in this group only come up when you start from source.

### Why do I have to install mugsun-core before starting from source?

The `main` branch depends on the snapshot version `0.2.0-SNAPSHOT` of mugsun-core, which is not on Maven Central.

Clone mugsun-core next to the backend repository and run `mvn -B clean install -DskipTests` to install it into your local repository.

`0.1.0` on Maven Central is the previous release and does not match the current `main` branch.

### Does `docker compose up -d` start the backend too?

That depends on the file you use:

| Command | What it starts |
| --- | --- |
| `docker compose up -d` | Only PostgreSQL (5432) and Redis (6379). You package and run the backend yourself |
| `docker compose -f docker-compose.full.yml up -d` | The whole system, including the backend and the admin console |

### What if port 5432 or 6379 is already in use on my machine?

Compose and the backend read the same environment variables. Change the ports once and both sides follow, without touching any yml:

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

When the database and Redis are not on your machine, point to them with these variables:

| Variable | Purpose |
| --- | --- |
| `MUGSUN_DB_HOST` `MUGSUN_DB_PORT` `MUGSUN_DB_NAME` | Host, port and database name of the business database |
| `MUGSUN_DB_USERNAME` `MUGSUN_DB_PASSWORD` | Account of the business database |
| `MUGSUN_DB_URL` | The whole JDBC URL. Once set, the three address variables above no longer apply |
| `MUGSUN_REDIS_HOST` `MUGSUN_REDIS_PORT` | Host and port of Redis |

The address of the tracking database `mugsun_track` is the first of these that has a value:

1. `TRACK_JDBC_URL`.
2. `MUGSUN_DB_URL`. Its host, port and parameters are kept, and only the database name is replaced with `mugsun_track`.
3. `MUGSUN_DB_HOST` and `MUGSUN_DB_PORT`.

Under `prod` the business database only reads `JDBC_URL`, but the tracking database still follows this order. Without `TRACK_JDBC_URL` it reads `MUGSUN_DB_*`.

### Why is the first `docker compose up -d` slow on Apple Silicon?

Most likely because the images are pulled for the first time.

The default PostgreSQL image `ghcr.io/mugsun/postgis-pgvector:16-3.4` includes arm64, so nothing has to be built on your machine.

You only need `docker compose build postgres` after you change `docker/postgres/Dockerfile`.

### Why does `spring-boot:run` fail with `Unable to find a suitable main class`?

Older versions fail this way when you run `mvn -pl mugsun-boot-server -am spring-boot:run` in the repository root. Pull the latest code.

Packaging first and then running the jar is the better way:

```bash
./mvnw -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

### Why is my local configuration not picked up at startup?

The local configuration file is `config/application-local.yml`, loaded by relative path. The working directory at startup must be the root of the backend repository.

You create the file yourself from the example:

```bash
cp config/application-local.yml.example config/application-local.yml
```

### Why does startup fail with `Migration checksum mismatch for migration version 1`? {#checksum}

The database was created from an earlier `main` branch. Until boot 0.2 is released, each database has a single baseline migration script, and schema changes are made by editing it. When the baseline changes, the checksum recorded in an old database no longer matches.

A database created before the migrations were merged into one baseline reports the same error, followed by several lines of `Detected applied migration not resolved locally`.

| Situation | What to do |
| --- | --- |
| Development database, data not needed | Run `docker compose down -v` and `docker compose up -d`, then start the backend to rebuild it |
| Data must be kept | There is no ready-made in-place upgrade. Back up first, export the data yourself, and import it after the rebuild |

`down -v` deletes the development data volume, so do not run it against a shared database.

Do not just change the checksum in the migration history. That only makes validation pass; tables, columns and menus added to the baseline do not appear by themselves.

See the [backend upgrade guide](/en/boot/upgrade#baseline) for details.

### Why does the process exit right after starting without `dev`?

Without a development profile such as `dev`, the backend treats the environment as production. For the rules, see [Configuration](/en/boot/configuration#what-counts-as-production).

In production it refuses to start when the initial password or the field encryption key is missing. For local testing add `--spring.profiles.active=dev`. For how to fix each error, see [Error reference](/en/guide/errors#startup).

### How do I get only the basic backend, without GIS and AI?

There are two ways:

- Package with `-Pbasic,'!full'`, and the artifact does not contain these two modules.
- Keep the full package and set `MUGSUN_GIS_ENABLED=false` and `MUGSUN_AI_ENABLED=false` at runtime.

For the difference between the two, see [Architecture](/en/guide/architecture#two-layers-of-module-switches).

## Admin console

### Why do I have to sign in again in a new tab?

The sign-in tokens are stored in `sessionStorage`, which only lives in the current tab and is cleared when the tab closes. This lowers the risk of a token being abused for a long time after an XSS attack.

Non-sensitive content such as the language and the user profile stays in `localStorage`, see [Where the session is stored](/en/pc/development#where-the-session-is-stored).

### Why does `pnpm install` say it cannot find `@mugsun/track-web`?

The admin console depends on `@mugsun/track-web` from npm. Normally `pnpm install` just works, and you do not need to clone mugsun-track.

When the package cannot be installed, check your network and npm mirror first.

To debug the SDK source, clone mugsun-track next to the console repository, add one line to `.npmrc`, then run `pnpm install`:

```ini
@mugsun/track-web=link:../mugsun-track
```

## Tracking

### Does tracking record what users type into inputs?

Automatically captured events such as clicks never carry the value of an input.

Session replay is off by default. Once it is on, page text and input values are shown as they are, and password inputs, bank card fields and one-time code fields are never recorded.

To mask what users type, pass `maskAllInputs: true` to the replay plugin, see [Turning on masking and filtering](/en/track/privacy#turning-on-masking-and-filtering).

### Are tokens in URLs sent to the server?

Not as they are. In the URLs the SDK reports, the values of sensitive parameters such as `token`, `access_token` and `code` are replaced with `***`.

Parameters in the hash are handled the same way. For the full list of parameters, see [URL redaction](/en/track/privacy#url-redaction).

### What if my `appKey` leaks?

The `appKey` is written in the page code where anyone can see it. It is not a secret.

The backend rate-limits per IP, caps the size of a single request and validates the format of every event. Rejected requests are listed under [Integration health](/en/track/first-event#integration-health).

## Deployment and operation

### After an upgrade, why can the old frontend no longer sign in and gets 40013?

Sign-in, registration and sending verification codes all return `40013` with a message that asks to complete the security check first.

The backend removed the legacy digit captcha. While the captcha is on, requests must carry a `captchaToken`.

Upgrade the frontend to the behavioral captcha flow, see the [backend upgrade guide](/en/boot/upgrade#legacy-digit-captcha-removed).

### After the backend restarts, why do encrypted APIs fail to decrypt? {#transport-key}

The backend changed its API transport key when it restarted. Pages that are already open still use the old key, so the backend cannot decrypt their requests.

Without `MUGSUN_API_KEY` the key is saved to `~/.mugsun/api-transport.key` and reused after a restart, so normally the problem does not occur.

When it does, the key file was usually deleted, `MUGSUN_HOME` changed, or Docker has no volume mounted for that directory.

Refresh the page to recover. The admin console then fetches the key again. With Docker or several instances, set `MUGSUN_API_KEY` or mount a shared volume.

### Why does the Scheduled Tasks page say the service cannot be reached?

The default Docker setup has no PowerJob Server, so the backend cannot reach the scheduling service and the list stays empty.

To use the page, deploy PowerJob Server yourself and set `POWERJOB_ENABLED` and the related environment variables, see [Scheduled tasks](/en/boot/features/job).

For simple single-node jobs you can use Spring's `@Scheduled` directly.

### With several instances, why do some users miss in-app message pushes?

The message is already in the database, but users connected to another instance do not get the real-time push.

The cause is that `mugsun.websocket.sender-type` was changed to `local`, so pushes only go to connections on the same instance.

Keep the default `redis`, and pushes are forwarded to every instance through Redis publish/subscribe.

### With several instances, why do attachment download links work only sometimes?

The same download link opens on one instance and fails on another.

The cause is that `MUGSUN_FILE_SIGN_SECRET` is not set, so every instance generated its own random signing key. Old links also stop working after a restart.

Give all instances the same `MUGSUN_FILE_SIGN_SECRET`, at least 32 characters long.

### After I turn off GIS or AI on one instance, how long until the others follow?

Right away. After a system parameter changes, a Redis broadcast tells every instance to clear its local cache.

The broadcast depends on `jetcache.remote.default.broadcastChannel`, which defaults to `mugsun`. Do not lose it when you override this block.

You can also turn the modules off at startup with the environment variables `MUGSUN_GIS_ENABLED=false` and `MUGSUN_AI_ENABLED=false`.

### What should I watch out for when overriding the JetCache settings?

Normally you do not need to touch them. Neither `prod` nor `demo` overrides `jetcache.remote.default`, and the Redis address is built from the `REDIS_*` variables.

If you must override it, mind three things:

- Keep `type: redis.lettuce` and `broadcastChannel` at the same level.
- Do not leave an empty `jetcache.remote.default:`, or startup fails with `StringIndexOutOfBoundsException`.
- Avoid writing `uri` by hand. A hand-written `uri` is not overridden, but it is checked against `spring.data.redis` at startup, and a mismatch makes the backend refuse to start.

### Do I have to encode special characters in the Redis password?

No. When the JetCache address is built, `@` `:` `/` `?` `#` `%` in the password are percent-encoded automatically.

The one-command Compose setup generates passwords with letters and digits only. Passwords you set yourself may contain special characters.

### Why do migrations not run on openGauss?

Flyway fails at startup before it runs any migration. The cause is that Flyway executes `SET ROLE`, and openGauss requires a password for that statement.

On openGauss, run the baseline `V1__baseline_0_2.sql` in `db/migration-og` with gsql, see the [backend upgrade guide](/en/boot/upgrade#baseline-opengauss).

openGauss-lite cannot be used for now, because the V8 script has a syntax error on it.

## Before you ask

Check [Error reference](/en/guide/errors) and this page first.

If that does not solve it, open an [Issue](https://github.com/mugsun) in the matching repository and describe the steps to reproduce, the version and the operating system.

For the version, give the Maven or npm version number or the commit SHA.
