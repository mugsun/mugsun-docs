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

Configure them under **GIS → Basemap**. The workspace, map picker, analytics heatmap and 3D view all share the same basemap.

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
```

Every tile fetch is checked on the server:
- https and the default port only; userinfo is rejected;
- IP literals are rejected (including decimal and hex forms);
- the host is resolved via DNS, and the request is rejected if any address is loopback, private, link-local (including cloud metadata at 169.254.169.254), CGNAT, multicast or reserved;
- redirects are not followed, size and timeouts are capped, and only `image/*` responses are accepted.

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
