# Basemap tile proxy security

`/system/gis/tile/**` is a same-origin tile proxy, so vendor keys never reach the browser. The proxy enables the following protections by default.

## Rate limiting

Limits are tiles per minute, counted separately per logged-in user and per client IP.

- The window is a fixed calendar minute and resets at the top of each minute.
- Exceeding either limit rejects the request. A value of `0` means no limit for that dimension.
- Rejected requests get `429 Too Many Requests` with an empty body.
- The `Retry-After` header carries the number of seconds left in the current minute.
- Counters live in process memory, so with several instances each limit applies per instance.

```yaml
mugsun:
  gis:
    tile:
      rate-limit-per-user: ${MUGSUN_GIS_TILE_RATE_PER_USER:1200}  # 0 = unlimited
      rate-limit-per-ip: ${MUGSUN_GIS_TILE_RATE_PER_IP:2400}      # 0 = unlimited
```

A screenful of map usually needs a few dozen tiles, so the defaults are enough for normal browsing. If many users share one outbound IP, raise `rate-limit-per-ip`.

## Images only

Only png, jpeg, webp and gif responses are passed through, and the `Content-Type` must match the file's magic bytes. SVG, HTML and mismatched bodies get `502` (reason `bad-content-type`). Every tile response carries `X-Content-Type-Options: nosniff`.

## No redirects

The four vendor engines (Tianditu, AMap, Baidu, Google: tiles, search, reverse geocoding and the Google session request) and custom XYZ basemaps **do not follow 3xx redirects**. A redirect is treated as a failure (`502`, reason `upstream-status`).

## Blocked ranges (custom XYZ)

In addition to private, loopback and link-local addresses, three more ranges are blocked by default. Each one can be enabled separately:

| Range | Purpose | Switch (default false) |
| --- | --- | --- |
| `198.18.0.0/15` | Benchmark network, also used by fake-ip proxies | `mugsun.gis.xyz.allow-benchmark-net` |
| `64:ff9b::/96` | NAT64 | `mugsun.gis.xyz.allow-nat64` |
| `2002::/16` | 6to4 | `mugsun.gis.xyz.allow-6to4` |

When NAT64 or 6to4 is enabled, the embedded IPv4 address is still checked against the IPv4 rules.

::: tip fake-ip proxies
If a fake-ip proxy resolves public domains to `198.18.x.x`, every custom XYZ tile gets `403` (reason `blocked-address`) and the map shows a tile failure banner. For the fixes (turn off fake-ip, route tile hosts directly, or enable `allow-benchmark-net` and its risks) see [Basemaps · Troubleshooting](./gis-basemap#troubleshooting).
:::

## Failure responses and logs {#failure-responses}

When fetching a tile fails, the proxy no longer returns 200 with a transparent image. It returns an error status with an `X-Mugsun-Tile-Error` reason header, an empty body and `Cache-Control: no-store`:

| Reason code | Status | WARN logged |
| --- | --- | --- |
| `upstream-status`, `bad-content-type`, `too-large`, `upstream-unreachable`, `bad-template` | 502 | yes |
| `timeout` | 504 | yes |
| `blocked-address`, `host-not-allowed` | 403 | yes |
| `not-configured`, `disabled`, `out-of-range` | 404 | no |

WARN logs are rate-limited per host and reason (at most one every 60 seconds, with the number suppressed in between). They contain only the provider, host, reason, upstream status and zoom level, never the URL, query string or key. The admin uses these responses to show the tile failure banner; see [Basemaps · Troubleshooting](./gis-basemap#troubleshooting).
