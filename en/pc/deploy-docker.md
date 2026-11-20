# Docker deployment

Build the admin console into an image. Nginx serves the pages and forwards `/api` to the backend.

If you only want to try the whole system, the single command in [Getting started](/en/guide/getting-started) is less work.

## Build and run

<div class="ms-steps">

### Build the image

```bash
git clone https://github.com/mugsun/mugsun-pc.git && cd mugsun-pc
docker build -t mugsun/pc:local .
```

The build caps the Node heap at 6144 MB by default. If Docker has less than 8 GB of memory, raise its memory limit first.

### Start the container

```bash
docker run -d -p 8088:8080 \
  -e MUGSUN_API_UPSTREAM=http://<backend-host>:8080 \
  mugsun/pc:local
```

Set `MUGSUN_API_UPSTREAM` to the backend address, without `/api`.

### Check that it is up

```bash
curl http://localhost:8088/healthz
```

`ok` means Nginx is running. Then open <http://localhost:8088>; you should see the sign-in page.

</div>

## Environment variables

The container reads these variables at startup, so you can move between environments without rebuilding the image.

| Variable | Default | Notes |
| --- | --- | --- |
| `MUGSUN_API_UPSTREAM` | `http://mugsun-boot:8080` | Backend address, without `/api` |
| `MUGSUN_GATEWAY_CIDRS` | empty | Networks your front gateway lives in, see [Behind another gateway](#gateway) |
| `MUGSUN_CSP_MODE` | `report-only` | Whether the content security policy reports or blocks, see [CSP](/en/pc/csp) |
| `MUGSUN_CSP_REPORT_URI` | empty | Where violation reports are sent |
| `MUGSUN_CSP_TILE_HOSTS` | empty | Extra map tile hosts allowed by the CSP |
| `MUGSUN_CSP_TRACK_HOSTS` | empty | Extra analytics hosts allowed by the CSP |

The next three are build arguments. Pass them with `docker build --build-arg`.

| Argument | Default | Notes |
| --- | --- | --- |
| `VITE_API_URL` | `/` | API address. `/` means same origin as the pages, forwarded by Nginx |
| `VITE_BASE_URL` | `/` | Path prefix for pages and static assets |
| `NODE_MAX_OLD_SPACE` | `6144` | Node heap limit during the build, in MB |

- Change `VITE_API_URL` to the full backend address only when the admin console and the backend use different domains.
- Nginx in the image serves pages at the root path only. If you change `VITE_BASE_URL`, your front gateway must strip that prefix before forwarding.

## What Nginx does

| Item | Behavior |
| --- | --- |
| Runs as | A non-root user (uid 101), listening on `8080` inside the container |
| API forwarding | `/api/xxx` goes to `<backend>/xxx`; WebSocket supported; 300-second read timeout |
| Upload size | Request bodies up to 50 MB |
| Page routing | Unknown paths return `index.html` |
| Caching | `/assets/` for one year, `/cesiumStatic/` for one day, `index.html` never |
| Compression | gzip; the `.gz` files produced by the build are sent first |
| Health check | `GET /healthz` returns `ok`; the image ships a `HEALTHCHECK` |
| Hidden files | Paths starting with `/.` return 404, except `/.well-known/` |

Every page and static file response carries the security headers below, plus the [CSP](/en/pc/csp).

```http
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
Cross-Origin-Opener-Policy: same-origin
```

The image does not send an HSTS header. If you want HSTS, add it on the gateway that terminates HTTPS.

## Client IP

The backend rate-limits and writes audit logs by client IP, so the IP that reaches it has to be the real one.

- When forwarding, Nginx overwrites `X-Forwarded-For` with the peer address. A value sent by the browser never reaches the backend.
- The backend accepts this header only from trusted proxies. Add the IP of the admin console container to the backend's trusted proxy list.
- Without a trusted proxy, every user looks like the Nginx IP to the backend, and per-IP rate limits are shared by the whole site.

The backend variable is `MUGSUN_OPENAPI_TRUSTED_PROXIES`. For its format, see [Client IP and trusted proxies](/en/boot/open-api#client-ip-and-trusted-proxies).

### Behind another gateway {#gateway}

If a TLS gateway or a load balancer sits in front of the admin console, put the gateway's networks in `MUGSUN_GATEWAY_CIDRS`.

```bash
MUGSUN_GATEWAY_CIDRS=10.0.0.0/16,192.168.10.5/32
```

- Nginx restores the client IP from `X-Forwarded-For` only for requests that come from these networks.
- The gateway's `X-Forwarded-Proto` is kept only in that case too. For other requests Nginx fills in the scheme it received.
- The gateway must make sure the rightmost entry of `X-Forwarded-For` is the peer address it saw itself.
- Separate several networks with commas. Leave it empty to trust no front proxy.

The container checks every entry of this variable at startup and refuses to start if one of them fails.

| Rule | Accepted | Rejected |
| --- | --- | --- |
| IPv4 prefix no shorter than `/8` | `10.0.0.0/8` | `0.0.0.0/0` |
| IPv6 prefix no shorter than `/32` | `2001:db8::/32` | `::/0` |
| The address must be valid | `192.168.10.5` | `192.168.10.300` |

::: warning Keep the networks narrow
Any machine in these networks can forge a client IP, slip past rate limits and end up in the audit log. List only the gateway's own addresses.
:::

## Start it together with the backend {#compose}

`docker/compose.pc.yml` builds the admin console and the backend from source, and starts PostgreSQL and Redis.

<div class="ms-steps">

### Clone the three repositories

The three repositories must sit in the same directory.

```bash
git clone https://github.com/mugsun/mugsun-core.git
git clone https://github.com/mugsun/mugsun-boot.git
git clone https://github.com/mugsun/mugsun-pc.git
```

### Generate keys and passwords

```bash
cd mugsun-pc
../mugsun-boot/scripts/gen-keys.sh --all > docker/.env
for name in MUGSUN_DB_PASSWORD MUGSUN_POSTGRES_SUPER_PASSWORD MUGSUN_REDIS_PASSWORD; do
  echo "$name=$(openssl rand -hex 16)" >> docker/.env
done
```

`docker/.env` is already excluded by `.gitignore` and `.dockerignore`, so it stays out of the repository and the image.

### Start

```bash
docker compose -f docker/compose.pc.yml --env-file docker/.env up -d --build
```

### Sign in

Open <http://localhost:8088>. The account is `admin` and the password is `MUGSUN_INIT_PASSWORD` in `docker/.env`.

</div>

The Compose file has no default passwords or keys. If one of the variables below is missing, `up` exits with an error.

| Variable | Notes |
| --- | --- |
| `MUGSUN_DB_PASSWORD` | Database password of the application account `mugsun`, shared by the main and analytics databases |
| `MUGSUN_POSTGRES_SUPER_PASSWORD` | Password of the PostgreSQL superuser |
| `MUGSUN_REDIS_PASSWORD` | Redis password |
| `MUGSUN_INIT_PASSWORD` | Password of the initial administrator `admin` |
| `MUGSUN_SM4_KEY` | Field encryption key |
| `MUGSUN_API_KEY` | API transport key |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | SM2 transport key pair |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | Audit signing key pair |

[Keys and encryption](/en/boot/crypto-keys) explains what each of the four keys is for and how to write it. Keep the keys fixed: once you change them, existing ciphertext and signatures stop working.

### Variables you can adjust

| Variable | Default | Notes |
| --- | --- | --- |
| `MUGSUN_PC_PORT` | `8088` | Host port mapped to the admin console |
| `MUGSUN_FRONT_URL` | `http://localhost:8088` | Address users open the admin console at; change it together with the port or domain |
| `MUGSUN_COMPOSE_SUBNET` | `172.30.88.0/24` | Subnet of the container network |
| `MUGSUN_PC_IP` | `172.30.88.10` | Fixed IP of the admin console container |
| `MUGSUN_COMPOSE_IP_RANGE` | `172.30.88.128/25` | Range other containers get their IPs from |

- The admin console container has a fixed IP, and Compose writes it into the backend's trusted proxy list.
- If you set `MUGSUN_GATEWAY_CIDRS`, those networks are added to the list as well.
- If the subnet clashes with your host network, change the last three variables together.
- Mail and SMS are not configured by default. To use them, fill in the variables described in [SMS and mail](/en/boot/features/notify).

::: warning Keep untrusted containers off this network
Containers on the same network can bypass Nginx and reach the backend, the database and Redis directly. To connect other services, create a separate network.
:::

## Next steps

<div class="ms-cards">

- [Content Security Policy (CSP)](/en/pc/csp) Report first, then switch to blocking once there are no violations.
- [Configuration](/en/boot/configuration) What the backend needs injected in production.
- [Security checklist](/en/boot/security-checklist) Go through it before launch, including trusted proxies and keys.
- [Local development](/en/pc/development) Run the admin console on your machine without Docker.

</div>
