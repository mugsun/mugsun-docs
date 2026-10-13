# Basemap tile proxy security

`/system/gis/tile/**` is a same-origin tile proxy, so vendor keys never reach the browser. The proxy enables the following protections by default.

## Rate limiting

Requests are counted separately per logged-in user and per client IP over a 1-minute window. Requests over the limit get `429 Too Many Requests` with a `Retry-After` header (in seconds).

```yaml
mugsun:
  gis:
    tile:
      rate-limit-per-user: ${MUGSUN_GIS_TILE_RATE_PER_USER:1200}  # 0 = unlimited
      rate-limit-per-ip: ${MUGSUN_GIS_TILE_RATE_PER_IP:2400}      # 0 = unlimited
```

## Images only

Only png, jpeg, webp and gif responses are passed through, and the `Content-Type` must match the file's magic bytes. SVG, HTML and mismatched bodies are replaced with a blank tile. Every tile response carries `X-Content-Type-Options: nosniff`.

## No redirects

The four vendor engines (Tianditu, AMap, Baidu, Google: tiles, search, reverse geocoding and the Google session request) and custom XYZ basemaps **do not follow 3xx redirects**. A redirect is treated as a failure.

## Blocked ranges (custom XYZ)

In addition to private, loopback and link-local addresses, three more ranges are blocked by default. Each one can be enabled separately:

| Range | Purpose | Switch (default false) |
| --- | --- | --- |
| `198.18.0.0/15` | Benchmark network, also used by fake-ip proxies | `mugsun.gis.xyz.allow-benchmark-net` |
| `64:ff9b::/96` | NAT64 | `mugsun.gis.xyz.allow-nat64` |
| `2002::/16` | 6to4 | `mugsun.gis.xyz.allow-6to4` |

When NAT64 or 6to4 is enabled, the embedded IPv4 address is still checked against the IPv4 rules.

::: tip fake-ip proxies
If a fake-ip proxy resolves public domains to `198.18.x.x`, every custom XYZ tile comes back blank. Set `allow-benchmark-net: true` (or `MUGSUN_GIS_XYZ_ALLOW_BENCHMARK_NET=true`), preferably on development machines only.
:::
