# Architecture

The mugsun backend comes as a monolith and as a microservice edition, and this page covers the monolith. The admin console, the analytics SDK and third-party systems all reach it over HTTP.

<ArchDiagram />

## What each repository does

| Repository | What it does | What it exposes |
| --- | --- | --- |
| [boot](/en/boot/) | Business features and three optional modules. Flyway manages the schema | HTTP API, port `8080` by default |
| [cloud](/en/cloud/) | The microservice edition of the backend. The same business code as boot, split into one gateway and four services | HTTP API, port `8080` of the gateway by default |
| [pc](/en/pc/) | The admin console UI. Menus and button permissions come from boot | Browser pages, port `3006` in development |
| [track](/en/track/) | The browser analytics SDK | The npm package `@mugsun/track-web` |
| [core](/en/core/) | Shared backend libraries: the unified response body, global exception handling and API encryption | Maven coordinates |
| [ms-ui](/en/uniappx/) | A uni-app x component library. It does not depend on the backend or the admin console | A `uni_modules` directory |

boot and cloud depend on core. The admin console does not depend on core directly.

## Backend modules

The boot source is split into five Maven modules that are packaged into one JAR.

| Module | Contents |
| --- | --- |
| `mugsun-boot-core` | Core features such as accounts and permissions, tenants and workflow |
| `mugsun-boot-track` | Optional. Ingests, aggregates and replays analytics data |
| `mugsun-boot-gis` | Optional. Layers, spatial queries and vector tiles |
| `mugsun-boot-ai` | Optional. Models, chat and knowledge bases |
| `mugsun-boot-server` | Packaging only. It assembles the modules above into one executable JAR |

Data access uses MyBatis-Flex, authentication uses Sa-Token, and caching uses JetCache.

## Choose the modules you need {#two-layers-of-module-switches}

The three optional modules have two layers of switches. At build time you decide which modules go into the JAR. At startup you can still turn off a module that was built in.

### Choose at build time

```bash
./mvnw -pl mugsun-boot-server -am package -DskipTests -Pbasic,'!full'
```

| Profile | Modules in the JAR |
| --- | --- |
| `full` (default) | core, gis, track and ai |
| `basic` | core only |
| `gis-only` `track-only` `ai-only` | core plus one optional module |
| `kingbase` `dameng` | Adds the Kingbase or Dameng JDBC driver |

`basic` and the three `*-only` profiles must be combined with `'!full'`.

### Turn off at startup

You can turn a module off without rebuilding. Set its environment variable to `false` at startup:

```bash
MUGSUN_GIS_ENABLED=false
MUGSUN_TRACK_ENABLED=false
MUGSUN_AI_ENABLED=false
```

Once a module is off, its endpoints are no longer registered and return 404. Its menus also disappear from the current user's menu, from menu management and from the role permission tree.

Permissions that roles already hold are kept and take effect again when the module is turned back on. While the module is off, they are hidden from the permission tree, so turn the module back on before you revoke them.

### Turn off in system parameters

GIS and AI can also be turned off in the admin console's system parameters. The parameter names are `gis.module.enabled` and `ai.module.enabled`.

When a module is turned off this way, its endpoints return 404 as well. The admin console decides whether to show the entry from `gisEnabled` and `aiEnabled` in the `/auth/info` response.

The analytics module has no system parameter switch. It can only be turned off with `MUGSUN_TRACK_ENABLED`.

::: details Full rules for switch values

| Value | Environment variable and yml | System parameter |
| --- | --- | --- |
| Not set | On | On |
| Set but empty | Startup fails | On |
| `true` / `false` (case-insensitive) | On / off | On / off |
| Leading or trailing spaces, such as `" true"` | Startup fails | Judged after trimming |
| `1` / `0` | Startup fails | On / off, with a deprecation notice |
| Other values, such as `yes` or `on` | Startup fails | Rejected on save. Old values count as off |

- The yml keys `mugsun.gis.enabled`, `mugsun.track.enabled` and `mugsun.ai.enabled` follow the same rules as the environment variables.
- When startup fails, the error names the setting, the environment variable and the original value, and says how to fix it. To shut a module down in an emergency, write `false` explicitly.
- When a module is not in the package, its environment variable and yml switch are not read, so an invalid value does not fail startup.
- `1` and `0` in system parameters are deprecated. Both saving and the runtime log say so. Other old values left over from before an upgrade produce a warning in the log.
- Deleting a system parameter turns the module on by default, as long as the environment variable and yml have not turned it off.
- `/system/gis/status` is not blocked by the switch. When GIS is turned off only by the parameter, it still returns `{enabled:false}`, and it returns 401 when you are not signed in.
- Changing or deleting a system parameter is broadcast through Redis and clears the local cache on every machine, so all machines agree at once.
- The broadcast relies on `jetcache.remote.default.broadcastChannel`, which defaults to `mugsun`.
- If you override the JetCache settings, keep `type: redis.lettuce` and `broadcastChannel` at the same level.
- The built-in MCP Server is offline for now and will return once it has authentication. Until then `MUGSUN_AI_MCP_SERVER` has no effect.

:::

### Switches in the admin console

The admin console has matching build variables: `VITE_ENABLE_GIS`, `VITE_ENABLE_TRACK` and `VITE_ENABLE_AI`.

Set one to `false` and rebuild, and the routes and plugins of that module are no longer registered.

## How analytics data flows

<div class="ms-flow">

1. The SDK writes events to an IndexedDB queue in the browser and sends them in batches, by count or by time.
2. The backend's `/track/collect` checks the `appKey`, applies rate limits and stores events deduplicated by `event_id`.
3. The data lives in the `mugsun_track` database, where the backend aggregates it.
4. The Tracking pages in the admin console read the aggregates and show dashboards and replays.

</div>

The SDK normally sends with `fetch` and falls back to XHR when the network fails. When the page is hidden or closing, it tries `sendBeacon` first.

The SDK fetches `/track/config` when it starts. Remote settings such as the sampling rate and the replay switch take effect on the next start.

## Next steps

<div class="ms-cards">

- [Getting started](/en/guide/getting-started) Run the whole system on your machine with Docker.
- [Configuration](/en/boot/configuration) Environment variables and settings for the backend.
- [Analytics overview](/en/track/) How to add the SDK and what the analysis pages show.
- [Backend overview](/en/boot/) What the backend ships with and how to develop it locally.

</div>
