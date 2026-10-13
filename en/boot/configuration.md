# Configuration

boot follows standard Spring Boot conventions: `application.yml` holds defaults, `application-prod.yml` overrides them for production, and local overrides go in `config/application-local.yml` (git-ignored; the working directory must be the repository root). The tables below cover the most common environment variables; `mugsun-boot-core/src/main/resources/application*.yml` has the full set of keys.

## Local development

```bash
cp config/application-local.yml.example config/application-local.yml
```

The example ships local placeholder keys (`sm4-key`, `api-key`) and a mock social login. If you leave the SM2 key pair empty, a new pair is generated on every start and sign-in can break when it changes, so set a fixed local pair.

## Data sources and cache (prod)

| Variable | Purpose |
| --- | --- |
| `JDBC_URL` / `JDBC_USERNAME` / `JDBC_PASSWORD` | Primary database |
| `REDIS_HOST` / `REDIS_PORT` (default 6379) / `REDIS_PASSWORD` / `REDIS_DB` (prod default 0) | Redis |
| `FILE_STORAGE_PATH` (default `/var/lib/mugsun/files/`) / `FILE_DOMAIN` | Local file storage and its public domain |
| `MUGSUN_FRONT_URL` | Console origin, used for OAuth redirects and similar; defaults to `http://localhost:3006` in dev, required in prod |

## Security and keys

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_INIT_PASSWORD` | — | Initial admin password. prod refuses to start if it's missing or still the built-in default |
| `MUGSUN_GM_ENABLED` | `true` | Master switch for SM-series crypto (SM2 transport / SM3 digests) |
| `MUGSUN_SM4_KEY` | empty | SM4 key for field encryption |
| `MUGSUN_API_KEY` | empty | SM4 key for request/response encryption |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | empty | SM2 transport key pair (hex); generated with a warning if empty |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | empty | Audit-signing key pair, kept separate from transport keys |
| `MUGSUN_STRICT_KEYS` | `false` (`true` in prod) | When `true`, any missing key stops startup |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | empty | CIDR list of trusted reverse proxies; see [Open API](/en/boot/open-api#client-ip-and-trusted-proxies) |
| `MUGSUN_FILE_SIGN_SECRET` | empty | Signing key for local file download links (at least 32 characters); see "Local file access" below |

## Local file access

With the default (dev) settings, the app serves locally stored files directly under `/file/**`. So that nobody can download a private attachment just by knowing its address:

- Public files under `mugsun/public/` (such as avatars) can still be fetched without signing in.
- Every other file needs a short-lived signature. After signing in, `GET /system/file/download/{id}` returns an address with `e` (expiry) and `s` (signature) parameters, valid for 300 seconds by default. Requests with no signature, a wrong one or an expired one get a 404.

```yaml
mugsun:
  file:
    local-access:
      public-prefixes: [mugsun/public/]   # path prefixes anyone can fetch
      sign-secret: ${MUGSUN_FILE_SIGN_SECRET:}
      expire-seconds: 300
```

If `sign-secret` is empty, a random key is generated on every start, which only works for a single instance. With several instances, give them all the same value, or an address signed by one instance will 404 on another. The `prod` profile turns off direct `/file/**` serving by default and private attachments go through the authorized download endpoint, so this setting doesn't affect it.

## Optional modules

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS module |
| `MUGSUN_TRACK_ENABLED` | `true` | Analytics module |
| `MUGSUN_AI_ENABLED` | `true` | AI module |
| `POWERJOB_ENABLED` | `false` | PowerJob worker; requires a separate server and `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` / `MUGSUN_IP2REGION_XDB_PATH` | `false` / empty | IP-to-region lookup |

## AI outbound allowlist

Model calls (chat, streaming chat and embeddings), knowledge-base fetches, channel webhooks, remote MCP calls and the workflow HTTP node are checked for SSRF before any request goes out; private, loopback and cloud-metadata addresses are rejected by default. To reach an internal service, such as a local model server or an internal MCP endpoint, allow it explicitly:

```yaml
mugsun:
  ai:
    outbound:
      allow-hosts: [localhost, ollama.internal]
      # Ports allowed for hosts not on the list; 80/443 by default, [] means any port
      allowed-ports: [80, 443]
```

Entries are exact hostnames or `*.example.com` wildcards. A matching host may resolve to a private address.

Example: a local Ollama listens on `http://localhost:11434` by default. Add `localhost` to `allow-hosts` before that URL can be saved and called from model management, a knowledge base or a channel. `allow-hosts` can only be set in the platform configuration file, so tenants can't open internal addresses themselves. Models saved with an internal address before the upgrade fail when called until their host is added to the list.

- The check runs when the configuration is saved (including a model's API address) and again before every request, so an IP written directly into the address is caught too; only `http` and `https` are allowed.
- Hosts not on the list can only use ports 80 and 443 by default; open others with `allowed-ports`. Hosts on the list can use any port.
- When the connection is opened, the hostname is resolved again, every address is checked, and the connection goes to the address that was checked. A hostname that switches to an internal address after the check (DNS rebinding) still can't be reached. If any one of the resolved addresses is in a blocked range, the whole request is rejected.
- Blocked ranges cover private, loopback, link-local, CGNAT (which includes cloud metadata addresses), multicast, reserved and documentation addresses. The same applies to IPv6 (including `2001:db8::/32` and Teredo `2001::/32`), including IPv4-mapped, NAT64 and 6to4 addresses that embed one of those IPv4 addresses. The workflow HTTP node ignores `allow-hosts` and always blocks internal addresses.
- Redirects are not followed: when the other side answers with a 3xx, the request ends there and the `Location` address is never requested. If a webhook, MCP or model address redirects, enter the final address instead.
- The default is `allow-hosts: []`, so no private address is allowed. Public hosts not on the list are unaffected.
- `*.example.com` matches any subdomain but not `example.com` itself. Hosts ending in `.local` or `.internal` are rejected unless listed explicitly. List only the hosts you actually need.

## Production

The `prod` profile turns off the OpenAPI docs (springdoc / swagger-ui), forces `strict-keys: true` and disables mock social login. A minimal start looks like this:

```bash
export SPRING_PROFILES_ACTIVE=prod
export JDBC_URL=jdbc:postgresql://db:5432/mugsun
export JDBC_USERNAME=mugsun JDBC_PASSWORD=******
export REDIS_HOST=redis MUGSUN_FRONT_URL=https://admin.example.com
export MUGSUN_INIT_PASSWORD=****** MUGSUN_SM4_KEY=****** MUGSUN_API_KEY=******
export MUGSUN_SM2_PRIVATE_KEY=... MUGSUN_SM2_PUBLIC_KEY=...
export MUGSUN_SIGN_PRIVATE_KEY=... MUGSUN_SIGN_PUBLIC_KEY=...
java -jar mugsun-boot.jar
```

Work through the [Security checklist](/en/boot/security-checklist) before going live.
