# Project generator

[mugsun-start](https://github.com/mugsun/mugsun-start) is the mugsun project generator, built on Spring Initializr. You pick a project type and optional modules, and it produces a project archive to download.

::: warning Still in development
`/starter.zip` currently returns a generic Spring Boot skeleton. The mugsun templates are not wired in yet.

`start.mugsun.com` is not deployed either, so you can only run it locally. To use mugsun today, see [Getting started](/en/guide/getting-started).
:::

![The wizard page](/readme/start-wizard-en.png)

The screenshot shows the wizard page running locally. Its content comes from mock data built into the frontend.

## Run it locally

<div class="ms-steps">

### Start the generator service

The backend is in `server/` and needs JDK 21.

```bash
git clone https://github.com/mugsun/mugsun-start.git && cd mugsun-start/server
./mvnw spring-boot:run
```

The service listens on port 8090. Change it with the `MUGSUN_START_PORT` environment variable.

### Download a project

```bash
curl -o demo.zip 'localhost:8090/starter.zip?type=mugsun-backend'
```

### Open the wizard page

The wizard page is in `web/` and needs Node.js 22 and pnpm 11.

```bash
cd mugsun-start/web
pnpm install
pnpm dev
```

Open <http://localhost:3093> in your browser. The page uses built-in mock data at this point, so the backend does not need to be running.

</div>

To connect the wizard page to your local backend, put `VITE_API_BASE=http://localhost:8090` in `web/.env.local` and run `pnpm dev` again.

## What you can choose

| Option | Values |
| --- | --- |
| Project type | Backend only `mugsun-backend`, or full stack `mugsun-fullstack` |
| Optional modules | GIS `gis`, analytics `track`, AI `ai` |
| Database | PostgreSQL only for now |

Permanent modules such as system administration, authentication and security cannot be removed. They are ignored if you pass them in a request.

## Endpoints

| Endpoint | Description |
| --- | --- |
| `GET /metadata/client` | Standard Initializr metadata that IDEs and curl can use directly |
| `GET /api/v1/metadata` | Metadata for the wizard page |
| `POST /api/v1/preview` | Returns the directory tree of the project for the current selection |
| `GET /starter.zip`, `POST /starter.zip` | Generates and downloads the project archive |

Send an `Accept` header when you read the standard metadata:

```bash
curl -s localhost:8090/metadata/client -H 'Accept: application/vnd.initializr.v2.2+json'
```

The number of concurrent generation tasks is capped. Beyond the cap, the service returns 429 with `Retry-After`.

## Build the wizard page

`pnpm build` requires one of the two variables below. Without one, the build fails.

| Variable | Description |
| --- | --- |
| `VITE_API_BASE` | Backend address. Use `/` for a same-origin deployment, or a full URL for cross-origin |
| `VITE_USE_MOCK` | Set to `1` to build the demo that uses mock data. Takes precedence over `VITE_API_BASE` |

Both variables are written into the build output. Changing them after the build has no effect, so you need to build again.

You can put them in `web/.env.production.local`. See `web/.env.example` for the format.

## Current limits

- The generated archive is still a generic Spring Boot skeleton with no mugsun code in it.
- There is no hosted site. `start.mugsun.com` is not deployed yet.
- PostgreSQL is the only database you can choose.

## Next steps

<div class="ms-cards">

- [Getting started](/en/guide/getting-started) Run the whole system with Docker. Start here to use mugsun today.
- [Backend overview](/en/boot/) Generated projects will use released versions of mugsun-boot as the template.

</div>
