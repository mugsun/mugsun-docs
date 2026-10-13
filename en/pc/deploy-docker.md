# Docker deployment (admin console)

mugsun-pc ships a production image. Stage one builds with Node 22 and pnpm 11.28.2; stage two serves the static files with `nginx:alpine` and proxies the backend. The image is about 120 MB.

## Build the image

The analytics SDK `@mugsun/track-web` is a `file:../mugsun-track` dependency. The build passes it in as a named build context called `track`, so clone mugsun-track next to mugsun-pc:

```bash
cd mugsun-pc
docker build --build-context track=../mugsun-track -t mugsun/pc:latest .
```

The build needs a large Node heap. The Dockerfile defaults to `NODE_MAX_OLD_SPACE=6144` (MB). If Docker has less than 8 GB of memory, raise Docker's memory limit.

## Run

```bash
docker run -d -p 8088:80 -e MUGSUN_API_UPSTREAM=http://<backend-host>:8080 mugsun/pc:latest
```

| Variable | When | Default | Notes |
| --- | --- | --- | --- |
| `MUGSUN_API_UPSTREAM` | runtime | `http://mugsun-boot:8080` | Backend address without `/api`. nginx forwards `/api/xxx` to `<upstream>/xxx`, WebSocket included |
| `VITE_API_URL` | build time (`--build-arg`) | `/` | Keep `/` for same-origin, so switching backends only needs the runtime variable. Set a full URL only when the backend is on another domain (the backend then needs CORS) |
| `VITE_BASE_URL` | build time (`--build-arg`) | `/` | Set e.g. `/admin/` to serve from a sub-path |

## nginx behaviour

- SPA fallback: unknown paths return `index.html`, so refreshing a deep link never 404s. Missing files under `/assets/` still return 404.
- Caching: `/assets/*` (hashed file names) is cached for a year and marked `immutable`; `index.html` is never cached, so releases take effect immediately.
- Compression: gzip, preferring the `.gz` files produced by the build.
- Security headers: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`. Turn on HSTS at the gateway that terminates HTTPS.
- Health check: `GET /healthz` returns `ok`, and the image has a built-in `HEALTHCHECK`.

## The whole stack in one command

`mugsun-pc/docker/compose.pc.yml` runs the admin console, the backend (mugsun-boot's Dockerfile), PostgreSQL (PostGIS + pgvector) and Redis. With mugsun-core, mugsun-boot, mugsun-track and mugsun-pc cloned side by side:

```bash
cd mugsun-pc
docker compose -f docker/compose.pc.yml up -d --build
```

Open <http://localhost:8088>. Change the port with `MUGSUN_PC_PORT`. Backend variables follow [backend configuration](/en/boot/configuration). Mail and SMS default to empty placeholders; fill in real values and change the database password for production.
