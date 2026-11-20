# Basemaps and allow-list

Basemaps are set up under GIS → Basemap. This page covers which basemaps are supported, how to set them up, and what to check when the map does not show.

The browser only asks the backend for tiles, and the backend fetches them from the provider. Keys are stored encrypted on the server and never shown on the page.

## Supported basemaps

| Basemap | Code | Key needed | Coordinates |
| --- | --- | --- | --- |
| Tianditu | `tianditu` | Yes, a tk | WGS84 |
| Amap | `amap` | Yes, a Web service key | Converted to GCJ-02 for display |
| Baidu | `baidu` | Yes, an ak | Converted to BD-09 for display |
| Google | `google` | Yes, a Map Tiles API key | WGS84 |
| Custom tiles | `xyz` | Optional | WGS84, no offset conversion |

- A new deployment uses the OpenStreetMap preset under Custom tiles, so the map works with no setup.
- Each tenant has its own settings. The Map, Examples and Layers pages, and the maps in tracking, share the same basemaps.
- APIs and storage use WGS84. With Amap or Baidu, the offset is converted for display and for place search.
- Keys are encrypted with SM4 before they are stored.

## Set up a vendor basemap

<div class="ms-steps">

### Apply for a key

Apply for a key on the provider's developer platform. The table above lists the kind of key each one needs.

### Enter it on the Basemap page

Open GIS → Basemap, click the provider's name, fill in Access key and click Save.

### Check the preview

The map on the right switches to this provider. Pick a style such as Vector or Imagery at the top right.

</div>

- After saving, the tag next to the name changes from Not configured to Key configured.
- A saved key is not shown again. Leave the input empty to keep it.
- Turn off Enabled and save to disable the basemap while keeping its key.
- Click Clear to delete the provider's settings.
- Saving needs the `gis:provider:save` permission, and clearing needs `gis:provider:remove`.
- Map pages remember the last basemap you used. With no record, they use the first usable one in the list.

## Custom tiles {#xyz}

Click Custom tiles on the Basemap page to connect any XYZ tile service.

| Field | How to fill it in |
| --- | --- |
| Preset | Choose OpenStreetMap Standard and the fields below are filled in for you |
| Tile URL | Starts with `https://`, contains `{z}`, `{x}` and `{y}`, at most 512 characters |
| Subdomains | Required when the URL has `{s}`. Comma-separated, at most 8 |
| Attribution | Shown at the bottom right of the map, at most 200 characters |
| Access key | Optional. The backend puts it where the URL says `{key}` |

- The host must be on the deployment's allow-list. Allowed hosts below the form shows the list.
- Click Test and the backend fetches one tile the same way as in real use, then shows how long it took.
- A tenant that has never saved settings uses the built-in OpenStreetMap preset.
- Custom tiles go up to zoom level 19. Coordinates are treated as WGS84 with no offset conversion.
- Place search is not available with custom tiles. Switch to a vendor basemap to search.

::: warning Public OpenStreetMap tiles
`tile.openstreetmap.org` is a public service run on donations and is not meant for heavy production traffic. For production, host your own tiles or buy a commercial service.

Follow the [OSM tile usage policy](https://operations.osmfoundation.org/policies/tiles/), which includes showing `© OpenStreetMap contributors` and no bulk downloading.
:::

## Host allow-list {#allow-list}

Custom tiles can only reach hosts allowed in the deployment config, so the backend cannot be used to reach the internal network. The list lives in the backend config file, and tenant admins cannot change it.

```yaml
mugsun:
  gis:
    xyz:
      allowed-hosts: ${MUGSUN_GIS_XYZ_ALLOWED_HOSTS:tile.openstreetmap.org}
      default-preset: ${MUGSUN_GIS_XYZ_DEFAULT_PRESET:osm}
      user-agent: ${MUGSUN_GIS_XYZ_USER_AGENT:mugsun-boot-gis/0.1 (+https://github.com/mugsun/mugsun-boot)}
      max-tile-bytes: 2097152
      cache-max-bytes: 67108864
      cache-ttl-seconds: 86400
```

| Setting | Description |
| --- | --- |
| `allowed-hosts` | Allowed hosts, comma-separated. Subdomains are allowed too. Leave it empty to turn custom tiles off |
| `default-preset` | The preset for tenants that have never saved settings. Only `osm` exists for now. Leave it empty to require setup first |
| `user-agent` | The User-Agent sent when fetching tiles. In production, change it to your own app name and contact |
| `max-tile-bytes` | Size limit of a single tile, 2 MB by default |
| `cache-max-bytes` | Limit of the in-memory tile cache in the backend, 64 MB by default. Set 0 to turn the cache off |
| `cache-ttl-seconds` | How long tiles are cached, one day by default |

- The first three can also be set through the environment variables written in the config.
- The backend re-checks the URL on every fetch. Only `https` and the default port are allowed, with no user name and no IP literal.
- If the host resolves to an internal, loopback or cloud metadata address, the request is rejected.
- Three more special ranges are blocked by default. For the switches, see [Tile proxy security](/en/pc/gis-tile-security#blocked-ranges).

## When no basemap is available {#empty}

When no basemap is both configured and enabled, every map page shows the hint below in the map area.

![The map area shows "No basemap available" and two buttons](/screenshots/gis/gis-basemap-empty.png)

- With the default config this hint does not appear, because of the OpenStreetMap preset.
- Configure basemap is shown only to people with the `gis:provider:list` permission. Others are told to contact an administrator.
- Read the docs opens this page.
- If the basemap status cannot be loaded, the page shows "Couldn't load basemap status" and Retry. It is not treated as missing setup.

## Troubleshooting {#troubleshooting}

### The map is grey and says "The basemap didn't load"

![The hint bar above the map, with a reason code and a Retry button](/screenshots/gis/gis-tile-error.png)

- The hint appears after 8 tiles fail in a row, or when no tile on the first screen succeeds. The same goes for the 3D view.
- Click Retry to request the tiles again. People with basemap permission can also click Switch basemap.
- As soon as one tile loads, the hint goes away.
- The Reason code in the hint comes from the backend. The common ones are below.

| Reason code | Status | Meaning | What to do |
| --- | --- | --- | --- |
| `blocked-address` | 403 | The host resolved to an internal or reserved address, or did not resolve | See [the next section](#fake-ip) |
| `host-not-allowed` | 403 | The host is not on the allow-list | Add the host to `allowed-hosts` |
| `timeout` | 504 | The backend did not get the tile within 8 seconds | Check the network from the backend to the provider |
| `upstream-status` | 502 | The provider returned a status other than 200 | Check the key, the quota and the tile URL |
| `upstream-unreachable` | 502 | The backend cannot connect to the provider | Check the backend's outbound network and DNS |
| `bad-content-type` | 502 | The provider did not return an image | Check the key and the tile URL |

- The backend also writes a WARN log, which you can find by searching for `GIS tile proxy failed`. It logs at most one line per minute for the same host and reason.
- For all reason codes, see [Failure responses](/en/pc/gis-tile-security#failure-responses).

### The reason code is `blocked-address` {#fake-ip}

The fake-ip mode of proxies such as Surge and Clash resolves public hosts to fake addresses in `198.18.0.0/15`.

That range is blocked by default, so every custom tile fails. Pick one of the fixes below.

| Fix | How |
| --- | --- |
| Turn off fake-ip | On the machine that runs the backend, switch the proxy to redir-host mode, or keep the backend process off the proxy |
| Connect to the tile host directly | Set the tile host to DIRECT in the proxy rules and add it to the fake-ip exclusion list |
| Allow the range | Set `mugsun.gis.xyz.allow-benchmark-net` to `true`, or use the environment variable `MUGSUN_GIS_XYZ_ALLOW_BENCHMARK_NET` |

::: danger Risk of allowing the range
Once allowed, any tile host that resolves into `198.18.0.0/15` can be reached. In some networks this range holds internal services, so allowing it weakens the protection of the internal network.

Allow it on development machines only. In production, use one of the first two fixes.
:::

- This switch only affects custom tiles.

## Terms of use {#terms}

- Vendor basemaps must credit their source as each provider's terms require. The bottom right of the map already shows the credit.
- To publish a map in mainland China, you must also show a map review number as the rules require. The page has none, so add it yourself.
- CARTO basemaps are not built in, because requests without a key get watermarked tiles.
- To use CARTO, add `basemaps.cartocdn.com` to the allow-list, fill in the URL and the key, and check the license scope yourself.

## Hosts the backend must reach {#upstream-hosts}

The backend fetches tiles from the provider on behalf of the browser, so its outbound network must allow the hosts below.

| Provider | Tile hosts | Key parameter | Notes |
| --- | --- | --- | --- |
| Tianditu | `t0.tianditu.gov.cn` to `t7.tianditu.gov.cn` | `tk` | Place search uses `api.tianditu.gov.cn` |
| Amap | `webrd01.is.autonavi.com` to `webrd04`, and `webst01` to `webst04` for imagery and labels | `key` | Place search uses `restapi.amap.com` |
| Baidu | `maponline0.bdimg.com` to `maponline3.bdimg.com` | `ak` | Place search uses `api.map.baidu.com` |
| Google | `tile.googleapis.com` | `key` | A session is created before fetching tiles. Place search uses `maps.googleapis.com` |

- Tile fetches do not follow redirects, take at most 2 MB per tile, and only accept PNG, JPEG, WebP and GIF.
- Anything else counts as a failure. See [Tile proxy security](/en/pc/gis-tile-security).

## Next steps

<div class="ms-cards">

- [GIS and maps](/en/pc/gis) How to use the map pages, and how accurate meters are.
- [Tile proxy security](/en/pc/gis-tile-security) Rate limits, address blocking and failure responses of the tile relay.
- [Content Security Policy (CSP)](/en/pc/csp) Which sources the page may load resources from.

</div>
