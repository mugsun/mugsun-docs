# Admin console overview

[mugsun-pc](https://github.com/mugsun/mugsun-pc) is mugsun's admin console. System management works out of the box; GIS, analytics dashboards and AI management pages are optional modules.

| Item | Details |
| --- | --- |
| Stack | Vue 3.5 · Vite 7 · TypeScript · Element Plus 2.11 (on demand) · Pinia · Vue Router |
| Runtime | Node.js ≥ 22.13 · pnpm ≥ 11.11 (`packageManager` pins `pnpm@11.28.2`) |
| Backend | [mugsun-boot](/en/boot/); `/api` is proxied to `http://localhost:8080` in development |
| Version | 0.1.0 |
| License | MIT. The UI foundation is derived from [art-design-pro](https://github.com/Daymychen/art-design-pro) (MIT); keep `NOTICE` when redistributing |

![Workbench](/screenshots/pc-workbench.png)

The console UI is in Chinese.

## Design notes

- **Permissions come only from the backend.** Sidebar menus, button permission codes and user info come from boot's `/api/auth/info` and related endpoints; the front end has no permission model of its own.
- **Modules can be removed.** Turning a module off at build time skips its routes and plugins, and you can delete its directory to drop the source.
- **Types come from OpenAPI.** `pnpm gen:api` generates `src/types/api/openapi.d.ts` from boot's `/v3/api-docs`, so you write fewer types by hand.
- **A lighter first load.** Element Plus is no longer registered globally with its full CSS; components and styles load on demand.
- **Credentials don't touch disk.** Tokens live only in `sessionStorage` (per tab), never in `localStorage`.

## Layout

```text
mugsun-pc/
  src/                 # shell: routing, auth, system pages, API layer
  modules/
    gis/               # optional: layers, scenes, spatial analysis
    track/             # optional: integrations and dashboards (uses @mugsun/track-web)
    ai/                # optional: models, chat, knowledge base, MCP
```

## Module flags

| Variable | Default | Effect |
| --- | --- | --- |
| `VITE_ENABLE_GIS` | on | Registers GIS routes and aliases; when off, `modules/gis` can be deleted |
| `VITE_ENABLE_TRACK` | on | Registers analytics routes and the SDK plugin; when off, skip `setup:sdk` and delete `modules/track` |
| `VITE_ENABLE_AI` | on | Registers AI routes and plugins; when off, `modules/ai` can be deleted |

## Request flow

Views and hooks call `/api` through axios, and Vite proxies it to boot during development. When a request fails, the backend's business message is shown first. The console's own analytics events go to same-origin `/api/track/collect`, which also lands in boot's track module.

## Next

[GIS & maps](/en/pc/gis) · [Development](/en/pc/development) · [Getting started](/en/guide/getting-started)
