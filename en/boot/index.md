# Backend overview

[mugsun-boot](https://github.com/mugsun/mugsun-boot) is the mugsun backend. It is packaged as one executable JAR and needs PostgreSQL and Redis at runtime.

Common features such as accounts and permissions, multi-tenancy and workflow are already built. GIS, analytics and AI are three optional modules that you can leave out of the package.

To deploy these modules as separate services, see the [microservice edition](/en/cloud/), which runs the same business code.

![The menu management page under System Settings](/readme/system-menu.png)

## Where to start

<div class="ms-cards">

- [Getting started](/en/guide/getting-started) Run the whole system with Docker, or start the backend from source.
- [Your first API](/en/boot/tutorial/first-api) The first part of the tutorial: add a `GET /hello` endpoint.
- [Code generation](/en/boot/codegen/) Turn a table into backend code, admin console pages and menu SQL.
- [Feature overview](/en/boot/features/) How to use workflow, forms, scheduled tasks and the other features.

</div>

## Start it

You need JDK 21, Maven 3.9+ and Docker. Before the first start, install mugsun-core as described in [Getting started](/en/guide/getting-started#local-development).

```bash
docker compose up -d    # PostgreSQL 5432, Redis 6379
./mvnw -pl mugsun-boot-server -am package -DskipTests
export MUGSUN_INIT_PASSWORD='<initial password for admin>'
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

The backend is up when `curl http://localhost:8080/ping` gets a response. The API docs are at <http://localhost:8080/swagger-ui/index.html>.

Run the build and the JAR from the repository root, and build with `-am`.

## Built-in features

| Feature | Description |
| --- | --- |
| [Accounts and permissions](/en/boot/permissions) | Users, roles and departments. Menu and button permissions are configured in the admin console |
| [Data permissions](/en/boot/datascope/) | Limit which rows a role can see |
| [Multi-tenancy](/en/boot/tenant/) | One database and one set of tables serve many tenants. Business tables are isolated by `tenant_id` automatically |
| [Workflow](/en/boot/features/workflow) | Built on Warm-Flow. Draw processes in the admin console, with conditions, parallel branches and countersigning |
| [Code generation](/en/boot/codegen/) | Turn a table into backend code, admin console pages and menu SQL |
| [Open API](/en/boot/open-api) | Two ways to connect: OAuth2 (with PKCE) and API keys |
| [Object storage](/en/boot/features/storage) | Store attachments locally, in MinIO or in Alibaba Cloud OSS |
| [Scheduled tasks](/en/boot/features/job) | Built on PowerJob. You deploy the PowerJob Server separately |
| [SM cryptography](/en/boot/configuration#security-and-keys) | `MUGSUN_GM_ENABLED` switches SM2 and SM3. `MUGSUN_SM4_KEY` sets the SM4 key |

For the rest, see the [feature overview](/en/boot/features/).

## Optional modules

| Module | Contents | Variable that turns it off |
| --- | --- | --- |
| Analytics | Receives data from the SDK and provides dashboards, error monitoring and session replay | `MUGSUN_TRACK_ENABLED` |
| GIS | Layers, scenes and spatial queries, with vector tile output | `MUGSUN_GIS_ENABLED` |
| AI | Model access, chat and knowledge bases, with retrieval on pgvector | `MUGSUN_AI_ENABLED` |

All three modules go into the JAR by default. To package only the core features, pick a Maven profile:

```bash
./mvnw -pl mugsun-boot-server -am package -DskipTests -Pbasic,'!full'
```

For the other profiles and the switch rules, see [Architecture](/en/guide/architecture#two-layers-of-module-switches).

## Database and stack

The default database is PostgreSQL 16 with the PostGIS and pgvector extensions. Flyway manages the schema and upgrades it at startup.

To use a Kingbase or Dameng database, add `-Pkingbase` or `-Pdameng` when you package.

| Item | Description |
| --- | --- |
| Frameworks | Spring Boot 3, MyBatis-Flex and Sa-Token |
| Cache | JetCache, with Redis 7 as the remote cache |
| AI module | Implements model calls and vector retrieval itself, without Spring AI |
| License | MIT |

## Current limits

- The built-in MCP Server is offline for now and will return once it has authentication.
- Scheduled tasks need a separately deployed PowerJob Server and `POWERJOB_ENABLED=true`.

## Before you go live

<div class="ms-cards">

- [Configuration](/en/boot/configuration) Environment variables and settings for production.
- [Security checklist](/en/boot/security-checklist) What to verify before you go live.
- [Upgrade guide](/en/boot/upgrade) What to do when you move to a newer build of the main branch.
- [Error reference](/en/guide/errors) Look up the cause and the fix by error message.

</div>
