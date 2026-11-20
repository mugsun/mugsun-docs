# Admin console overview

[mugsun-pc](https://github.com/mugsun/mugsun-pc) is the mugsun admin console. It is written with Vue 3 and Element Plus, and every API it calls comes from the [backend](/en/boot/).

The system administration pages are already built. GIS, the analytics dashboards and the AI pages are three optional modules that you can turn off at build time.

![The Overview page under Tracking](/readme/track-overview-en.png)

## Where to start

<div class="ms-cards">

- [Development](/en/pc/development) Start commands, common scripts and how to add a page.
- [Workbench](/en/pc/workbench) What each card on the workbench means, plus a few interface details.
- [GIS & maps](/en/pc/gis) The map, layers and scenes under the GIS menu.
- [Docker deployment](/en/pc/deploy-docker) Deploy with the bundled Nginx image and forward `/api` to the backend.

</div>

## Start it

You need Node.js 22.13+ and pnpm 11.11+. Start the [backend](/en/boot/) on port 8080 first.

```bash
git clone https://github.com/mugsun/mugsun-pc.git && cd mugsun-pc
pnpm install
pnpm dev
```

Your browser opens <http://localhost:3006>. Sign in as `admin` with the initial password you set when starting the backend.

In development, `/api` requests are forwarded to `http://localhost:8080`. To use another address, change `VITE_API_PROXY_URL` in `.env.development`.

If you only want to look around, you do not need Node.js. The Docker command in [Getting started](/en/guide/getting-started) starts the admin console too.

## What pages it has

| Menu | Pages |
| --- | --- |
| System settings | Users, roles and menus; dictionaries, parameters and regions; logs and server monitoring |
| [Workflow](/en/boot/features/workflow) | Flow designer, approval center and todo workbench |
| [Low-code](/en/boot/codegen/) | Code generator, dynamic tables and form designer |
| [Tenant operations](/en/boot/tenant/) | Tenants, packages and tenant datasources |
| [Open platform](/en/boot/open-api) | API keys, OAuth clients and call logs |
| [Tracking](/en/track/) (optional) | Overview, funnels and retention; performance, error monitoring and session replay |
| [GIS](/en/pc/gis) (optional) | Map, layers and scenes. 2D uses OpenLayers and 3D uses Cesium |
| [AI center](/en/pc/ai-center) (optional) | Models, knowledge bases and conversations |

The interface comes in Chinese and English, with a light and a dark theme. The screenshot below is the map page under GIS.

![The map page under GIS](/readme/gis-map.png)

## Turn off optional modules

The three switches are in `.env` and default to `true`:

```ini
VITE_ENABLE_GIS = true
VITE_ENABLE_TRACK = true
VITE_ENABLE_AI = true
```

Set one to `false` and rebuild. The routes and plugins of that module are no longer registered, and you can delete its directory under `modules/`.

The backend has matching switches. See [Architecture](/en/guide/architecture#two-layers-of-module-switches).

## Code layout

| Directory | Contents |
| --- | --- |
| `src/` | Sign-in, routing and the system administration pages |
| `modules/gis/` | Optional: map, layers and spatial analysis |
| `modules/track/` | Optional: tracking setup and analytics dashboards |
| `modules/ai/` | Optional: pages for models, knowledge bases and conversations |
| `e2e/` `e2e-ui/` | Playwright tests |
| `docker/` | Nginx configuration and Compose files |

The frontend stores no permission data. The sidebar menus and button permissions all come from the backend's `/auth/info` endpoint.

`pnpm gen:api` generates the API types from the backend's OpenAPI spec. The backend must be running when you run it.

## Current limits

- It only works with mugsun-boot. There is no standalone mock backend.
- There is no public demo.

## License

MIT. The interface is derived from [art-design-pro](https://github.com/Daymychen/art-design-pro) (MIT). Keep the `NOTICE` file from the repository when you redistribute it.

## Next steps

<div class="ms-cards">

- [Designers](/en/pc/designer) How to use the AI app designer and the process definition designer.
- [UI self-check](/en/pc/ui-check) Interface checks that need no backend. Run them locally before you commit.
- [Content Security Policy](/en/pc/csp) How to turn CSP on, with the current policy and known limits.
- [Your first event](/en/track/first-event) Add the analytics SDK and see the first record on the dashboard.

</div>
