# Admin console overview

[mugsun-pc](https://github.com/mugsun/mugsun-pc) is mugsun's admin console. System management works out of the box; GIS, analytics dashboards and AI management pages are optional modules.

| Item | Details |
| --- | --- |
| Stack | Vue 3.5 · Vite 7 · TypeScript · Element Plus 2.11 (on demand) · Pinia · Vue Router |
| Runtime | Node.js ≥ 20.19 · pnpm ≥ 8.8 (`packageManager` pins `pnpm@11.9.0`) |
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

## Modules at a glance

These screenshots come from boot + pc running locally against a demo database (all data is sample data), at a 1440×900 viewport.

### System management

Users, departments, roles and menus are managed in one place; menus and button permission codes come from the backend, and the sidebar renders from the grants.

![Users](/screenshots/pc/system-users.png)
![Departments](/screenshots/pc/system-departments.png)
![Roles](/screenshots/pc/system-roles.png)
![Menus](/screenshots/pc/system-menus.png)

### Low-code

The form designer list holds form definitions (name, key, status). Open the designer to drag in fields; once designed, the form can be filled in online.

![Form designer list](/screenshots/pc/lowcode-forms.png)

### Workflow

A published flow definition can be started right away. The approval center splits tasks into to-do, to-claim, started by me, done and CC'd; running instances can be suspended or terminated.

![Flow definitions](/screenshots/pc/workflow-definitions.png)
![Approval center](/screenshots/pc/workflow-approval-center.png)
![Running instances](/screenshots/pc/workflow-running.png)

### Monitoring

Server monitoring shows JVM memory, CPU, threads and request stats. Online sessions can be kicked out (tokens are masked). The login log records the method, client and result of every sign-in.

![Server monitoring](/screenshots/pc/monitor-server.png)
![Online sessions](/screenshots/pc/monitor-online-sessions.png)
![Login log](/screenshots/pc/monitor-login-log.png)

### Open platform

Generate API keys for third-party systems and limit the paths they may call. OAuth clients support authorization code and client credentials. Keys and client IDs in the screenshots are replaced with placeholders.

![API keys](/screenshots/pc/open-platform-api-keys.png)
![OAuth clients](/screenshots/pc/open-platform-oauth-clients.png)

### Tenants

Creating a tenant initializes its default department, post, role and admin in one step; the tenant package decides which menus the tenant can use.

![Tenants](/screenshots/pc/tenant-list.png)
![Tenant packages](/screenshots/pc/tenant-packages.png)

## Request flow

Views and hooks call `/api` through axios, and Vite proxies it to boot during development. When a request fails, the backend's business message is shown first. The console's own analytics events go to same-origin `/api/track/collect`, which also lands in boot's track module.

## Next

[Development](/en/pc/development) · [Getting started](/en/guide/getting-started)
