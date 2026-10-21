# Basemaps & tile allow-list

All basemap tiles in the admin are **proxied same-origin** by mugsun-boot: the browser only requests `/api/system/gis/tile/...`. Keys stay on the server (SM4-encrypted) and are never echoed back to the page.

## Supported basemaps

| Provider | code | Key | Coordinates |
| --- | --- | --- | --- |
| Tianditu | `tianditu` | required (tk) | WGS84 |
| AMap | `amap` | required (Web Service key) | displayed in GCJ-02 |
| Baidu | `baidu` | required (ak) | displayed in BD-09 |
| Google | `google` | required (Map Tiles API key) | WGS84 |
| Custom tiles | `xyz` | optional | WGS84, no datum shift |

How vendor tiles are fetched (per the boot code):

| Provider | Tile URL | Key parameter | Upstream CRS | Allowed tile hosts |
| --- | --- | --- | --- | --- |
| Tianditu | `https://t0`–`t7.tianditu.gov.cn/DataServer?T=…` | `tk` | WGS84 (CGCS2000) | `*.tianditu.gov.cn` |
| AMap | `https://webrd0{1-4}.is.autonavi.com/appmaptile?…` (imagery/labels use `webst0{1-4}`) | `key` | GCJ-02 | `*.autonavi.com`, `*.amap.com` |
| Baidu | `https://maponline{0-3}.bdimg.com/tile/?qt=vtile…` (imagery uses `/starpic/`) | `ak` | BD-09 | `*.bdimg.com`, `*.baidu.com` |
| Google | `https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session=…` (a session is created first) | `key` | WGS84 | `*.googleapis.com` |

The API always speaks WGS84; AMap and Baidu coordinates are converted to and from GCJ-02 and BD-09 on the server. All four vendors are fetched without following redirects, capped at 2 MB per tile, and only png, jpeg, webp and gif are passed through (the type must match the file's magic bytes). Anything else is replaced with a blank tile. See [Tile proxy security](./gis-tile-security).

Configure them under **GIS → Basemap**. The workspace, map picker, analytics heatmap and 3D view all share the same basemap.

## When no basemap is configured

If no basemap is both configured and enabled, the map, lab, layer, scene and analysis pages show the same notice over the map area instead of a blank canvas:

- It explains that a basemap is needed: Tianditu requires a key (tk); if you don't want to apply for a key, use a keyless custom XYZ basemap instead (such as the built-in OpenStreetMap preset, whose host must be on the deployment allow-list).
- **Configure basemap** opens **GIS → Basemap** and is only shown to users with the `gis:provider:list` permission; other users are asked to contact an administrator.
- **Read the docs** links to this page.

"Not configured" is decided by the backend's `/system/gis/status` response. If that request fails (network down or a server error), the page shows "Couldn't load basemap status" with a retry button instead of claiming nothing is configured.

![Notice when no basemap is configured](/screenshots/gis/gis-basemap-empty.png)

::: tip Default OSM preset
The deployment allow-list includes `tile.openstreetmap.org` by default. Tenants that have never saved a config use the OSM preset, and the notice above is not shown. If tiles are still blank, check the network: for example, a fake-ip proxy that resolves the host to `198.18.x.x` is blocked. See [Tile proxy security](./gis-tile-security).
:::

## Custom XYZ tiles

- The URL template must use `https` and contain `{z}`, `{x}`, `{y}`. `{s}` rotates subdomains (comma-separated, up to 8). If a key is needed, reference it as `{key}`; it is only substituted on the server.
- An **attribution** is required. It is rendered as plain text at the bottom-right of the map, in both 2D and 3D.
- Built-in preset: OpenStreetMap Standard (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, `© OpenStreetMap contributors`). It is the default until a tenant saves its own config.
- **Test** fetches one tile through exactly the same restricted path the server uses for real tiles.
- Place search is unavailable while custom tiles are selected; switch to a vendor basemap to search.

## Host allow-list (set by ops)

To prevent SSRF, custom tiles may only reach hosts explicitly allowed in the deployment config. Tenant admins can only enter URLs within the list and cannot change the list itself.

```yaml
mugsun:
  gis:
    xyz:
      # exact host or any subdomain; empty disables custom tiles
      allowed-hosts: ${MUGSUN_GIS_XYZ_ALLOWED_HOSTS:tile.openstreetmap.org}
      default-preset: ${MUGSUN_GIS_XYZ_DEFAULT_PRESET:osm}
      # OSM requires an identifiable User-Agent; set your own app name and contact in production
      user-agent: ${MUGSUN_GIS_XYZ_USER_AGENT:mugsun-boot-gis/0.1 (+https://github.com/mugsun/mugsun-boot)}
      max-tile-bytes: 2097152       # per-tile limit
      cache-max-bytes: 67108864     # in-process tile cache; 0 disables it
      cache-ttl-seconds: 86400
      allow-benchmark-net: ${MUGSUN_GIS_XYZ_ALLOW_BENCHMARK_NET:false}  # 198.18.0.0/15
      allow-nat64: ${MUGSUN_GIS_XYZ_ALLOW_NAT64:false}                  # 64:ff9b::/96
      allow-6to4: ${MUGSUN_GIS_XYZ_ALLOW_6TO4:false}                    # 2002::/16
```

Every tile fetch is checked on the server:
- https and the default port only; userinfo is rejected;
- IP literals are rejected (including decimal and hex forms);
- the host is resolved via DNS, and the request is rejected if any address is loopback, private, link-local (including cloud metadata at 169.254.169.254), CGNAT, multicast or reserved;
- `198.18.0.0/15` (benchmark network, also used by fake-ip proxies), `64:ff9b::/96` (NAT64) and `2002::/16` (6to4) are **blocked by default**; each can be enabled with `allow-benchmark-net`, `allow-nat64` or `allow-6to4` (all default false). With NAT64 or 6to4 enabled, the embedded IPv4 address is still checked against the IPv4 rules;
- redirects are not followed, size (`max-tile-bytes`) and timeouts are capped, only png, jpeg, webp and gif are accepted (the type must match the magic bytes; SVG is always rejected), and responses carry `X-Content-Type-Options: nosniff`.

See [Tile proxy security](./gis-tile-security) for the switches, rate limits and fake-ip proxy setups.

## Troubleshooting {#troubleshooting}

### The map is grey and a banner says "The basemap didn't load"

When several tiles in a row fail (8 by default, or no tile on the first screen succeeds), a banner appears above the map with the reason code returned by the backend. **Retry** requests the tiles again. Users who can configure basemaps also see **Switch basemap**; other users are asked to contact an administrator. The banner disappears as soon as any tile loads. The 3D view shows the banner too.

![Tile load failure banner](/screenshots/gis/gis-tile-error.png)

![Tile load failure banner in 3D](/screenshots/gis/gis-tile-error-3d.png)

On failure, the backend tile proxy returns an error status with an `X-Mugsun-Tile-Error` reason header. Common reasons:

| Reason code | Status | Meaning |
| --- | --- | --- |
| `blocked-address` | 403 | The tile host resolved to a private, reserved or blocked-by-default range |
| `host-not-allowed` | 403 | The host is not on the allow-list |
| `timeout` | 504 | Upstream timed out |
| `upstream-status` / `upstream-unreachable` | 502 | Upstream returned an error or could not be reached |
| `bad-content-type` | 502 | Upstream did not return png, jpeg, webp or gif |

The backend logs a rate-limited WARN per host and reason (at most one per minute, with no URL or key); search for `GIS tile proxy failed`. See [Tile proxy security](./gis-tile-security#failure-responses) for the full list.

### Reason `blocked-address`: a fake-ip proxy resolved the tile host to 198.18.x.x

The fake-ip mode of proxies such as Surge or Clash resolves public hosts (for example `tile.openstreetmap.org`) to fake addresses in `198.18.0.0/15`. That range is blocked by default, so every tile fails. Pick one fix:

1. **Turn off fake-ip** on the machine running mugsun-boot (switch to redir-host or normal mode), or keep the boot process off the proxy.
2. **Route tile hosts directly**: set the tile hosts (for example `tile.openstreetmap.org`, `*.tianditu.gov.cn`) to DIRECT and add them to the fake-ip filter so they resolve to real addresses.
3. **Explicitly enable `allow-benchmark-net`**:

   ```yaml
   mugsun:
     gis:
       xyz:
         allow-benchmark-net: true   # or MUGSUN_GIS_XYZ_ALLOW_BENCHMARK_NET=true
   ```

   ::: danger Risk
   Any tile host that resolves into `198.18.0.0/15` is then allowed. The range is reserved for benchmarking and may host internal services on some networks, so enabling it weakens SSRF protection. Use it on development machines only; prefer the first two options in production. The switch only affects custom XYZ basemaps.
   :::

## Tile usage terms

::: warning OpenStreetMap
`tile.openstreetmap.org` is a donation-funded service run by the OSMF and covered by the [OSM Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/): you must show `© OpenStreetMap contributors`, send an identifiable User-Agent, respect caching, and must not bulk-download tiles. **It is not suitable for heavy production traffic.** Run your own tile server or use a commercial provider in production.
:::

::: warning CARTO
CARTO basemaps (`basemaps.cartocdn.com`) are governed by the [CARTO terms](https://carto.com/legal) and require `© OpenStreetMap contributors © CARTO`. In our testing they currently return an "API KEY REQUIRED" watermark tile for keyless requests, so CARTO is not built in. If you need it, add `basemaps.cartocdn.com` to the allow-list, enter the URL and key under Basemap, and confirm your licence.
:::

::: tip Tianditu and other vendors
Vendor basemaps must also be attributed according to their own terms. Publishing maps inside mainland China additionally requires compliance with map review (审图号) regulations.
:::
