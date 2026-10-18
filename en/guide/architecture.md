# Architecture

## Data flow

```text
 Your web pages                     Admin's browser
 @mugsun/track-web                  mugsun-pc (Vue 3 · Element Plus)
      │ POST /track/collect             │ /api/** (Vite proxy in dev)
      │ POST /track/replay …            │
      ▼                                 ▼
 ┌─────────────────── mugsun-boot (single JAR) ───────────────────┐
 │ mugsun-boot-core   auth · system · tenants · workflow · files   │
 │ mugsun-boot-track  ingestion · remote config · rollups · replay │
 │ mugsun-boot-gis    layers · spatial queries · vector tiles      │
 │ mugsun-boot-ai     models · chat · knowledge base · MCP         │
 │ mugsun-boot-server assembly (default profile: full)             │
 └───────────────┬──────────────────────────────┬─────────────────┘
                 ▼                              ▼
     PostgreSQL 16 (PostGIS + pgvector)      Redis 7 (database 3)
```

Dependencies point one way: `mugsun-boot` → `mugsun-core` (Maven Central, `com.mugsun:mugsun-*:0.1.0`). The console does not depend on core.

<p align="center">
  <img src="/brand/arch/boot-iso-en.jpg" alt="mugsun-boot architecture" width="100%" />
</p>

## Repositories

| Repository | Responsibility | Interface |
| --- | --- | --- |
| [core](/en/core/) | BOM, the `R` response envelope, global exception handling, Sa-Token annotation checks, request encryption, MyBatis-Flex base entity | Maven coordinates |
| [boot](/en/boot/) | Business domains and optional modules; schema managed by Flyway | HTTP (`:8080`), OpenAPI |
| [pc](/en/pc/) | Admin UI; menus and permissions come from boot | Browser (`:3006` in dev) |
| [track](/en/track/) | Browser analytics SDK | npm `@mugsun/track-web` |
| [ms-ui](/en/uniappx/) | uni-app x components for mobile, mini programs and H5; independent of the console | uni_modules |

## Two layers of module switches

**Build time — Maven profiles** decide which modules go into the JAR.

| Profile | Contents |
| --- | --- |
| `full` (default) | core + gis + track + ai |
| `basic` | core only; disable full as well: `-Pbasic,'!full'` |
| `gis-only` / `track-only` / `ai-only` | core plus one optional module; disable full |
| `kingbase` / `dameng` | adds drivers for these domestic databases |

**Runtime — environment variables** switch capabilities off without repackaging (the classes stay on the classpath):

```bash
MUGSUN_GIS_ENABLED=false
MUGSUN_TRACK_ENABLED=false
MUGSUN_AI_ENABLED=false
```

When a module is off, its endpoints aren't registered (requests return 404), and its menus no longer appear in the user's menu, Menu Management or the role permission tree.

If you turn a module off only with the system parameter `gis.module.enabled` or `ai.module.enabled`, its endpoints return 404 as well. The console uses `gisEnabled` and `aiEnabled` from `/auth/info` to decide which entries to show.

The one exception is `/system/gis/status`. The switch doesn't block it, so with GIS off only by the parameter it still returns `{enabled:false}`.

Roles keep their existing grants for that module. While the module is off, admins can't see or revoke those grants in the role permission tree; the grants apply again once it's back on.

A few more points:

- On multi-server deployments, each server caches system parameters locally for up to 1 hour, so the other servers turn the module off only after their cache expires.
- To revoke a module's grants, turn the module back on first.
- Once AI is off, the MCP Server switch `MUGSUN_AI_MCP_SERVER` has no effect, and the MCP endpoints return 404 as well.
- The tracking module has no system-parameter switch; turn it off with `MUGSUN_TRACK_ENABLED`.

The console has build-time counterparts, `VITE_ENABLE_GIS`, `VITE_ENABLE_TRACK` and `VITE_ENABLE_AI`; turning one off skips its routes and plugins.

## Analytics pipeline

<p align="center">
  <img src="/brand/arch/track-iso-en.jpg" alt="Analytics data flow" width="100%" />
</p>

1. The SDK queues events in IndexedDB and sends them in batches by count or interval, falling back from `sendBeacon` to `fetch` keepalive to `XHR`.
2. boot's `/track/collect` checks that the `appKey` exists, applies rate limiting and back-pressure, and stores events idempotently by `event_id`.
3. On startup the SDK fetches `/track/config`; remote settings such as sample rate and replay take effect on the next start.
4. The console's Analytics section reads the rollups and renders dashboards and replays.

## Next

[Getting started](/en/guide/getting-started) · [Boot configuration](/en/boot/configuration) · [Track overview](/en/track/)
