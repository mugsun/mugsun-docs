# Docker deployment (admin console)

mugsun-pc ships a production image. Stage one builds with Node 22 and pnpm 11.28.2; stage two serves the static files with `nginxinc/nginx-unprivileged` (non-root, uid 101) and proxies the backend. All base images are pinned by digest. The image is about 120 MB.

## Build the image

The analytics SDK `@mugsun/track-web` is a `file:../mugsun-track` dependency. The build passes it in as a named build context called `track`, so clone mugsun-track next to mugsun-pc:

```bash
cd mugsun-pc
docker build --build-context track=../mugsun-track -t mugsun/pc:latest .
```

The build needs a large Node heap. The Dockerfile defaults to `NODE_MAX_OLD_SPACE=6144` (MB). If Docker has less than 8 GB of memory, raise Docker's memory limit.

## Run

```bash
docker run -d -p 8088:8080 -e MUGSUN_API_UPSTREAM=http://<backend-host>:8080 mugsun/pc:latest
```

| Variable | When | Default | Notes |
| --- | --- | --- | --- |
| `MUGSUN_API_UPSTREAM` | runtime | `http://mugsun-boot:8080` | Backend address without `/api`. nginx forwards `/api/xxx` to `<upstream>/xxx`, WebSocket included |
| `MUGSUN_GATEWAY_CIDRS` | runtime | empty | CIDRs of the gateways in front (TLS termination, load balancer), comma-separated. `X-Forwarded-For` and `X-Forwarded-Proto` are trusted only from these addresses. See "Trusted proxies" below |
| `MUGSUN_CSP_TILE_HOSTS` | runtime | empty | Extra map-tile origins allowed by the CSP, space-separated, e.g. `https://tile.example.com` |
| `MUGSUN_CSP_TRACK_HOSTS` | runtime | empty | Extra analytics endpoints allowed by the CSP, space-separated |
| `VITE_API_URL` | build time (`--build-arg`) | `/` | Keep `/` for same-origin, so switching backends only needs the runtime variable. Set a full URL only when the backend is on another domain (the backend then needs CORS) |
| `VITE_BASE_URL` | build time (`--build-arg`) | `/` | Set e.g. `/admin/` to serve from a sub-path |

## nginx behaviour

- SPA fallback: unknown paths return `index.html`, so refreshing a deep link never 404s. Missing files under `/assets/` still return 404.
- Caching: `/assets/*` (hashed file names) is cached for a year and marked `immutable`; `index.html` is never cached, so releases take effect immediately.
- Compression: gzip, preferring the `.gz` files produced by the build.
- Security headers: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`. Turn on HSTS at the gateway that terminates HTTPS.
- Health check: `GET /healthz` returns `ok`, and the image has a built-in `HEALTHCHECK`.
- Runtime user: nginx runs as non-root and listens on `8080` inside the container (map any host port; compose uses 8088).
- Hidden files: paths starting with `/.` (such as `/.git/` or `/.env`) return 404, except `/.well-known/`.

## Trusted proxies

The backend rate-limits (SMS, captcha, login) and audits by client IP. When proxying, nginx **overwrites** `X-Forwarded-For` and `X-Real-IP` with `$remote_addr` instead of appending what the client sent, so forged headers never reach the backend.

- The compose network uses a fixed subnet, `MUGSUN_COMPOSE_SUBNET` (default `172.30.88.0/24`). The console container gets the fixed IP `MUGSUN_PC_IP` (default `172.30.88.10`), and other containers are assigned addresses only from `MUGSUN_COMPOSE_IP_RANGE` (default `172.30.88.128/25`). The backend's `MUGSUN_OPENAPI_TRUSTED_PROXIES` contains only the console container's IP, so the backend trusts the client IP that nginx passes on. Without it, every user looks like the nginx IP to the backend and per-IP limits become shared by the whole site. If the subnet clashes with your host network, change all three variables together.
- If a TLS gateway or load balancer sits in front of the console, put its CIDRs in `MUGSUN_GATEWAY_CIDRS`. Only for requests from those CIDRs does nginx restore the real client from `X-Forwarded-For` (the first untrusted address from the right) and pass on the gateway's `X-Forwarded-Proto`. Compose also appends them to the backend's `MUGSUN_OPENAPI_TRUSTED_PROXIES` (nothing is appended when empty). The gateway must overwrite `X-Forwarded-For` rather than append to it, or at least make sure the rightmost entry is the peer it saw.
- `MUGSUN_GATEWAY_CIDRS` is validated entry by entry at startup: **`0.0.0.0/0` and `::/0` are not allowed**, IPv4 prefixes must be `/8` or longer, IPv6 prefixes `/32` or longer, and addresses must be valid. If any entry fails, the container refuses to start. A range that is too wide lets anyone forge their IP, bypass rate limits and pollute audit logs.

::: warning Do not add untrusted containers to the mugsun network
Containers on the same network can reach the backend directly, bypassing nginx. The backend only trusts the console container's fixed IP, but the database and Redis on that network should not be exposed to untrusted sidecars either. Put other services on a separate network.
:::

```bash
MUGSUN_GATEWAY_CIDRS=10.0.0.0/16,192.168.10.5/32
```

## Content Security Policy (CSP)

The policy is sent as `Content-Security-Policy-Report-Only` for now: browsers report violations in the console without blocking. Once every page (especially maps, the form designer and analytics) is clean, rename the header in `security-headers.inc.template` to `Content-Security-Policy`.

```text
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: <MUGSUN_CSP_TILE_HOSTS>;
connect-src 'self' <MUGSUN_CSP_TILE_HOSTS> <MUGSUN_CSP_TRACK_HOSTS>;
font-src 'self' data:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'
```

- No `unsafe-eval`. `style-src 'unsafe-inline'` is needed for Element Plus runtime inline styles; `worker-src blob:` is needed for Cesium.
- Map tiles (Tianditu, AMap and others) all go through the same-origin `/api/system/gis/tile` proxy, which keeps the keys on the server, so `img-src` and `connect-src` allow no vendor tile origins. For external tiles the browser loads directly (such as custom XYZ) or a separate analytics domain, add them with `MUGSUN_CSP_TILE_HOSTS` and `MUGSUN_CSP_TRACK_HOSTS`. These variables accept only letters, digits, `.`, `*`, `:`, `/`, `-` and spaces; the container refuses to start if they contain `;`, quotes or other characters.

## Start the full stack with one command

`mugsun-pc/docker/compose.pc.yml` runs the admin console, the backend (mugsun-boot's Dockerfile), PostgreSQL (PostGIS + pgvector) and Redis. With mugsun-core, mugsun-boot, mugsun-track and mugsun-pc cloned side by side:

```bash
cd mugsun-pc
touch docker/.env   # fill in the variables below; the file is excluded by .gitignore / .dockerignore, never commit it
docker compose -f docker/compose.pc.yml --env-file docker/.env up -d --build
```

Compose ships no default passwords or keys. It refuses to start if any of these is missing:

| Variable | Notes |
| --- | --- |
| `MUGSUN_DB_PASSWORD` | Database password of the `mugsun` app account (main and analytics databases) |
| `MUGSUN_POSTGRES_SUPER_PASSWORD` | PostgreSQL superuser password |
| `MUGSUN_REDIS_PASSWORD` | Redis password; it is embedded in a connection URI, so use letters and digits only. At startup it is written to a config file readable only by the redis user, so it never appears in process arguments |
| `MUGSUN_INIT_PASSWORD` | Initial administrator password |
| `MUGSUN_SM4_KEY`, `MUGSUN_API_KEY` | 16-character SM4 keys |
| `MUGSUN_SM2_PRIVATE_KEY`, `MUGSUN_SM2_PUBLIC_KEY` | SM2 transport key pair (hex) |
| `MUGSUN_SIGN_PRIVATE_KEY`, `MUGSUN_SIGN_PUBLIC_KEY` | SM2 audit-signing key pair (hex) |

Generate passwords with `openssl rand -hex 16`. Keep the SM keys fixed: changing them makes existing ciphertext and signatures unreadable.

Open <http://localhost:8088>. Change the port with `MUGSUN_PC_PORT`. Backend variables follow [backend configuration](/en/boot/configuration). Mail and SMS default to empty placeholders; fill in real values for production.
