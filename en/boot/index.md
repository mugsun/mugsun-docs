# Boot overview

[mugsun-boot](https://github.com/mugsun/mugsun-boot) is the mugsun backend. It builds into one runnable JAR and needs PostgreSQL and Redis at runtime.

## Start

You need JDK 21 and Maven 3.9+. Run from the repo root:

```bash
docker compose up -d   # PostgreSQL 5432, Redis 6379
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

If a port is taken, change the mapping with `MUGSUN_DB_PORT` or `MUGSUN_REDIS_PORT`. See the [FAQ](/en/guide/faq).

## Modules

```text
mugsun-boot/
  mugsun-boot-core/     # auth, system pages, workflow, tenants, files, open API
  mugsun-boot-gis/      # optional: layers, spatial queries, vector tiles
  mugsun-boot-track/    # optional: event intake, remote config, stats, replay
  mugsun-boot-ai/       # optional: models, chat, knowledge base, MCP
  mugsun-boot-server/   # startup module, uses the full profile by default
```

To build only the core module:

```bash
mvn -pl mugsun-boot-server -am package -Pbasic,'!full'
```

For Kingbase or Dameng databases, add `-Pkingbase` or `-Pdameng`.

## Features

- Users, roles, menus, departments and data permissions. See [Permissions and files](/en/boot/permissions).
- Multi-tenancy. Other tenants' data is treated as nonexistent.
- Warm-Flow workflow
- Attachments isolated by uploader and tenant
- OAuth2 and API key access. See [Open API](/en/boot/open-api).
- SM2 transport encryption and SM3 digests, switched by `MUGSUN_GM_ENABLED`; the SM4 field-encryption key is set separately with `MUGSUN_SM4_KEY`
- Code generation, online forms and in-app messages

## Stack

| Item | Details |
| --- | --- |
| Frameworks | Spring Boot 3, MyBatis-Flex, Sa-Token, Flyway |
| Databases | PostgreSQL 16 (with PostGIS and pgvector), Redis 7 |
| AI module | The module's own model client and pgvector retrieval, without Spring AI; the built-in MCP Server has been removed |
| License | MIT |

## Next steps

- [Configuration](/en/boot/configuration)
- [Permissions and files](/en/boot/permissions)
- [Open API](/en/boot/open-api)
- [Security checklist](/en/boot/security-checklist)
