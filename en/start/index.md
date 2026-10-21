# Project generator

mugsun-start is the mugsun project generator, built on Spring Initializr 0.23.0. You pick a project type and optional modules, and it produces a project archive to download.

::: warning
For now, `/starter.zip` still produces a generic Spring Boot skeleton and is not yet connected to the mugsun templates. This page will be updated once the mugsun templates are connected.
:::

## Options

There are two project types: backend only (`mugsun-backend`) and full stack (`mugsun-fullstack`).

The optional modules are GIS (`gis`), tracking (`track`) and AI (`ai`). Core modules such as system management and authentication cannot be removed, and are ignored if passed in a request.

## Run locally

The backend lives in `server/` and needs JDK 21:

```bash
git clone https://github.com/mugsun/mugsun-start.git && cd mugsun-start/server
./mvnw spring-boot:run
curl -o demo.zip 'localhost:8080/starter.zip?type=mugsun-backend'
```

The backend listens on port 8080 by default; change it with the `MUGSUN_START_PORT` environment variable.

The frontend wizard lives in `web/` and needs Node.js 22 and pnpm 11:

```bash
cd mugsun-start/web
pnpm install
pnpm dev
```

Open <http://localhost:3093>. In local development, the wizard uses built-in mock data when `VITE_API_BASE` is not set, and connects to a real backend when it is.

## Production build

Every build (`pnpm build`, including `--mode staging`) must set one of the two variables below, or the build fails.

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE` | Backend address. Use `/` when frontend and backend share an origin, or a full URL across origins |
| `VITE_USE_MOCK` | Set to `1` to build the demo version with built-in mock data. Takes precedence over `VITE_API_BASE` |

Both variables are baked into the build output, so changing them afterwards has no effect until you rebuild. They can go in `web/.env.production.local`; see `web/.env.example` for the format.
