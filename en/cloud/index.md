# Microservice edition overview

[mugsun-cloud](https://github.com/mugsun/mugsun-cloud) is the microservice edition of the mugsun backend, made of one gateway and four services. Its business code is the same as in the monolith, [mugsun-boot](/en/boot/).

API paths and the response format are the same as in the monolith. The admin console and the analytics SDK need no changes: set the backend address to the address of the gateway.

::: warning A few features differ from the monolith
For example, the AI pre-check node in approval flows does not work, and there is no Docker image. Read [Current limits](#current-limits) before you deploy.
:::

## How it differs from the monolith

| Item | Monolith | Microservice edition |
| --- | --- | --- |
| Repository | [mugsun-boot](/en/boot/) | [mugsun-cloud](https://github.com/mugsun/mugsun-cloud) |
| Processes | One JAR | One gateway and four services, three of them optional |
| Runtime dependencies | PostgreSQL and Redis | PostgreSQL, Redis and Nacos |
| Public port | `8080` of the backend | `8080` of the gateway only |
| Turning a module off | Leave it out of the package, or switch it off at startup | Do not deploy its service |
| How to start | With Docker for the whole system, or from source | From source. There is no Docker image |

The two editions share the business code, the API and the database schema. The settings for the database, Redis and keys are the same too. See [Configuration](/en/boot/configuration).

## What it is made of

| Service | Port | What it does |
| --- | --- | --- |
| gateway | 8080 | The only public entry, built on Spring Cloud Gateway |
| system | 8101 | Core features such as accounts and permissions, tenants and workflow. It matches `mugsun-boot-core` in the monolith |
| gis | 8102 | Optional. GIS. It matches `mugsun-boot-gis` |
| track | 8103 | Optional. Analytics. It matches `mugsun-boot-track` |
| ai | 8104 | Optional. AI. It matches `mugsun-boot-ai` |

- The Maven module of the gateway is `mugsun-cloud-gateway`, and the modules of the four services are named `mugsun-cloud-` plus the service name.
- The four services share a common layer, `mugsun-cloud-common`, which does not run on its own.
- Service registration and discovery use Nacos. PostgreSQL and Redis are used the same way as in the monolith.
- A script copies the business code from one commit of mugsun-boot into the `src/boot/` directory of each module. To change business logic, change mugsun-boot first and then sync again.

## How requests are routed

The gateway forwards each request to a service by its path and does not rewrite the path.

| Path | Goes to |
| --- | --- |
| `/system/gis/**` | gis |
| `/track/**` | track |
| `/system/track/**` | track |
| `/system/ai/**` | ai |
| `/v1/**` | ai |
| Every other path | system |

Login checks and permission checks still happen in the services, with the same code as in the monolith. The gateway does not parse tokens.

Paths that start with `/inner` are reserved for calls between services. The gateway blocks these paths, so they are not open to the outside.

## Run it locally

You need JDK 21, Maven 3.9+ and Docker. Put the mugsun-core, mugsun-boot and mugsun-cloud repositories in the same directory.

<div class="ms-steps">

### Prepare the dependencies

Install mugsun-core into your local Maven repository first. Start the database and Redis with the compose file of the monolith.

```bash
git clone https://github.com/mugsun/mugsun-core.git
(cd mugsun-core && mvn -B clean install -DskipTests)

git clone https://github.com/mugsun/mugsun-boot.git
(cd mugsun-boot && docker compose up -d)    # PostgreSQL 5432, Redis 6379
```

### Start Nacos and build

```bash
git clone https://github.com/mugsun/mugsun-cloud.git && cd mugsun-cloud
deploy/dev/nacos.sh up
./mvnw -B package -DskipTests
```

### Start system

Start system first and wait until it is up. It creates the tables of the main database.

```bash
export MUGSUN_SERVICE_IP=127.0.0.1
export MUGSUN_INNER_SECRET='<a value generated with openssl rand -hex 32>'
export MUGSUN_INIT_PASSWORD='<initial password for admin>'
java -jar mugsun-cloud-service/mugsun-cloud-system/target/mugsun-cloud-system.jar --spring.profiles.active=dev
```

### Start the other services and the gateway

Start gis, track and ai in a terminal each. The command below is for gis. For the other two, replace `gis` in the path with `track` or `ai`.

```bash
export MUGSUN_SERVICE_IP=127.0.0.1
export MUGSUN_INNER_SECRET='<the same value as for system>'
java -jar mugsun-cloud-service/mugsun-cloud-gis/target/mugsun-cloud-gis.jar --spring.profiles.active=dev
```

Start the gateway last:

```bash
export MUGSUN_SERVICE_IP=127.0.0.1
java -jar mugsun-cloud-gateway/target/mugsun-cloud-gateway.jar
```

</div>

When `curl http://localhost:8080/ping` responds, the gateway and system are both working.

The gateway uses port 8080 by default, the same as the monolith. On one machine, the two cannot both use the default port.

For what each variable does and how to troubleshoot, see the [README](https://github.com/mugsun/mugsun-cloud#readme) of the repository (in Chinese).

## Services you can leave out

You can leave out the gis, track and ai services. system decides whether a module is present by whether the registry has an instance of its service.

| Service | When it is not deployed |
| --- | --- |
| gis | The admin console shows no GIS menu, and `/system/gis/**` returns 503 |
| track | No Tracking menu is shown, `/track/**` and `/system/track/**` return 503, and the SDK's reports get 503 as well |
| ai | No AI menu is shown, and `/system/ai/**` and `/v1/**` return 503 |

After a service starts, its menu appears within a few seconds. After a service stops, its menu disappears about a minute later.

When you do not need a module, do not deploy its service. These three services do not accept switches such as `MUGSUN_GIS_ENABLED=false` and refuse to start with them.

## Current limits

The list below was checked on 2026-11-21. The [README](https://github.com/mugsun/mugsun-cloud#readme) of the repository (in Chinese) is authoritative.

- The [AI pre-check node](/en/boot/features/workflow#ai-approval) in approval flows does not work. Remove it in the flow designer from any flow that has one.
- The PowerJob worker starts only on system, and the three PowerJob processors of the analytics module are unavailable.
- The system service is deployed as a single instance for now.
- After you change data permission rules, endpoint permissions or tenant data sources in system, the other services apply the change up to 30 seconds later.
- Read-only demo mode (the `demo` profile) has not been verified in the microservice edition.
- Settings live in each service's package and in environment variables. The Nacos config center is not used.
- There is no Docker image and no CI, and no version has been released.

## Before you go live

Read the [deployment notes](https://github.com/mugsun/mugsun-cloud/blob/main/docs/deployment.md) in the repository (in Chinese) before you go live. They cover what differs from the monolith, and a mistake in the first five sections causes a security problem.

The first five sections cover:

- Expose only the port of the gateway, and let only the gateway and the other services reach the service ports.
- When a reverse proxy sits in front of the gateway, give the proxy's address range to the gateway.
- Use the same set of keys and the same Redis for all services.
- For calls between services, give the four services the same `MUGSUN_INNER_SECRET`.
- Turn on authentication for Nacos in production, and open its ports only to the gateway and the services.

The [Configuration](/en/boot/configuration) and [Security checklist](/en/boot/security-checklist) pages of the monolith apply to the microservice edition as well.

## Next steps

<div class="ms-cards">

- [Backend overview](/en/boot/) What the monolith ships with, which is the same code in the microservice edition.
- [Configuration](/en/boot/configuration) Settings for the database, Redis and keys, the same in both editions.
- [Architecture](/en/guide/architecture) What each repository does and how the optional modules are switched.
- [Getting started](/en/guide/getting-started) Run the whole system of the monolith on your machine with Docker.

</div>
