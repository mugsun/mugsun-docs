# Boot overview

[mugsun-boot](https://github.com/mugsun/mugsun-boot) is mugsun's modular monolith backend: a single executable JAR backed by PostgreSQL and Redis, with optional capabilities packaged as Maven modules.

| Item | Details |
| --- | --- |
| Coordinates | `com.mugsun:mugsun-boot:0.1.0` |
| Runtime | JDK 21 · Maven 3.9+ |
| Frameworks | Spring Boot 3.5.13 · MyBatis-Flex · Sa-Token · JetCache · Warm-Flow · Flyway · Spring AI 1.1.2 (AI module) |
| Storage | PostgreSQL 16 (PostGIS + pgvector) · Redis 7 (database `3`) |
| Domestic databases | `kingbase` / `dameng` Maven profiles add drivers; writes go through `BizTables` with schema qualification |
| License | Apache-2.0 |

## Modules

```text
mugsun-boot/
  mugsun-boot-core/     # auth, system, workflow, tenants, files, open platform
  mugsun-boot-gis/      # optional: layers, spatial queries, vector tiles
  mugsun-boot-track/    # optional: ingestion, remote config, rollups, replay
  mugsun-boot-ai/       # optional: models, chat, knowledge base, MCP
  mugsun-boot-server/   # assembly; default profile = full
```

## Core capabilities

- **Auth and permissions**: users, roles, menus, departments, data permissions; Sa-Token permission annotations; login and operation audit
- **Multi-tenancy**: tenant context applies to every query; other tenants' data is treated as nonexistent
- **Workflow**: Warm-Flow
- **File storage**: attachments belong to their uploader and tenant; `sys:file:*` codes control management, public uploads and deletion (see [Permissions & attachments](/en/boot/permissions))
- **Open platform**: OAuth2 (with PKCE) and API keys; IP allowlists support CIDR (see [Open API](/en/boot/open-api))
- **SM-series cryptography**: SM2 transport encryption, SM3 digests, SM4 field and request encryption, all behind one `MUGSUN_GM_ENABLED` switch
- **Code generation, online forms, messaging**

## Build and run

```bash
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

The JAR lands in `mugsun-boot-server/target/mugsun-boot.jar`; run it from the repository root. For the core module only, package with `-Pbasic,'!full'`.

::: details Port 5432 is already in use?
If `docker compose up -d` reports a port conflict, a local PostgreSQL is usually running:

- Find it: `lsof -nP -iTCP:5432 -sTCP:LISTEN` on macOS / Linux, `netstat -ano | findstr :5432` on Windows.
- Option 1: stop the local PostgreSQL (e.g. `brew services stop postgresql@16`, `sudo systemctl stop postgresql`), then run `docker compose up -d` again.
- Option 2: change the host port. In `docker-compose.yml`, change the postgres mapping `"5432:5432"` to e.g. `"5433:5432"`, and override the connection URL in `config/application-local.yml`:

```yaml
mybatis-flex:
  datasource:
    primary:
      url: jdbc:postgresql://localhost:5433/mugsun
```
:::

## Next

[Configuration](/en/boot/configuration) · [Permissions & attachments](/en/boot/permissions) · [Open API](/en/boot/open-api) · [Security checklist](/en/boot/security-checklist)
