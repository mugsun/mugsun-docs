# GIS & maps

With `VITE_ENABLE_GIS` on, the admin registers the **GIS** menu (frontend `modules/gis`, backend `mugsun-boot-gis`). All screenshots below come from a local run of mugsun-boot + mugsun-pc (1440×900). The UI is shown in Chinese.

::: info Basemap source & copyright
The basemap in these screenshots is **Tianditu** (China's National Platform for Common Geospatial Information Services) imagery + label tiles, proxied same-origin by boot; copyright belongs to Tianditu. The admin map currently shows no attribution / map-review-number control — when publishing, label the source and review number as required by Tianditu's terms. You need to apply for your own Tianditu key.
:::

::: tip Demo data
The analytics heatmap and region screenshots use demo events seeded into the local dev database (~150 geo-tagged events across Beijing, Shanghai, Guangzhou and other cities), for illustration only.
:::

## Basemap providers `/gis/provider`

Keys are stored server-side only (SM4-encrypted); tiles are proxied through an authenticated same-origin API. A configured key is never echoed back — the input only says "leave empty to keep".

![Basemap providers (Tianditu configured)](/screenshots/gis/gis-provider.png)

## Map workspace `/gis/workspace`

Draw points/lines/polygons, search places / POIs, switch 2D/3D and basemap styles (vector / imagery / labels). Set `gis.module.enabled` to hide the whole module.

![Map workspace](/screenshots/gis/gis-workspace.png)

**More → Analytics heatmap** overlays precise analytics coordinates as a heatmap layer; adjust opacity, zoom to, or remove it in the **Layers** panel.

![Workspace with analytics heatmap](/screenshots/gis/gis-workspace-track-heat.png)

## Examples `/gis/lab`

Runnable examples grouped by scenario: markers & overlays, tracks & fences, query & measurement, 3D tiles, data ingestion. Each can be added to the workspace.

![Example: POIs](/screenshots/gis/gis-lab.png)

![Example: heatmap](/screenshots/gis/gis-lab-heatmap.png)

## Spatial analysis `/gis/analyze`

Runs server-side with JTS: input is normalized to WGS84 GeoJSON and measured in ground meters (see "Metric accuracy" below). Results can be saved as a layer or overlaid. Below: a 500 m buffer around a point near Tiananmen.

![Spatial analysis: buffer](/screenshots/gis/gis-analyze.png)

### Metric accuracy {#metric-accuracy}

Everything measured in meters uses **ground meters**, but different features take different paths:

| Feature | With PostGIS | Without PostGIS (for example MySQL or Dameng) |
|---|---|---|
| Layer queries: radius, nearest neighbor, buffer | Computed in the database with `geography` (WGS84 ellipsoid) | Java path |
| Spatial analysis `/gis/analyze`: buffer and contains with a source layer selected and no pasted data | Handed to the layer query, so computed in the database as above | Java path |
| Spatial analysis `/gis/analyze`: everything else (pasted data, or distance, area, length, intersects, difference, etc.) | Java path | Java path |

Layer queries can also be forced onto the Java path for diagnostics.

How the Java path works: it projects with an azimuthal equidistant projection centered on the feature's envelope center (on the query point for distances) and computes on that plane, using the Gaussian radius of curvature at the center's latitude. Point-to-point and point-to-vertex distances are then recomputed with the Vincenty formula on the WGS84 ellipsoid (falling back to great-circle distance when nearly antipodal points do not converge). Radius and nearest-neighbor queries first prefilter by a longitude/latitude envelope with a generous meters-to-degrees margin, so no feature is missed.

Java-path accuracy (distance from the buffer boundary to the source feature, measured against WGS84 geodesic distance and PostGIS `geography`):

| Location | 500 m buffer | 20 km buffer | 200 km buffer |
|---|---|---|---|
| Equator | ±0.34% | −0.46% to +0.34% | −0.46% to +0.34% |
| Beijing (39.9°N) | ±0.20% | −0.32% to +0.20% | −0.33% to +0.20% |
| 72°N | ±0.03% | −0.15% to +0.03% | −0.17% to +0.03% |
| 78°N | ±0.01% | −0.14% to +0.01% | −0.16% to +0.01% |

Points, lines and polygons are all within 0.5%, and the difference from the PostGIS path is also within 0.5%. The remaining error comes from approximating the ellipsoid with a sphere and is largest near the equator.

::: warning Earlier versions
Earlier versions computed meters on the Web Mercator plane without a latitude correction: buffer radii and distances shrank by cos(latitude), and areas by cos²(latitude). A 500 m buffer in Beijing was really about 383 m, and at 72°N only about 31% of the requested size. After upgrading, the Java path differs from the PostGIS path by less than 0.5%.
:::

Java-path limits:

- **Buffers near the poles are not supported.** If a feature, or its buffered extent, reaches |latitude| > 85°, buffer, distance, area and length return the error "要素或缓冲范围进入极区" (the feature or buffer reaches the polar zone).
- **Crossing the 180° meridian is not supported.** If a feature crosses the 180° meridian, or its buffer extends past it, an error is returned. Split the feature at 180° first.
- **Empty geometries**: distance is treated as infinite (never matched by radius queries, sorted last by nearest neighbor), buffers are empty, and area and length are 0.

## Control layout and narrow screens {#layout}

- On the examples, layers, scenes, spatial analysis and basemap pages, the zoom buttons sit to the right of the left panel, so the panel no longer covers them. The workspace keeps its zoom buttons in the bottom-left corner.
- At viewport widths up to 768px (for example a 390px-wide phone):
  - On the layers, scenes, spatial analysis and basemap pages, the bottom hint becomes a full-width bar. Use the × on its right to hide it until you next open the page.
  - The workspace stacks its three top toolbars into full-width rows: view and basemap, scene and save, then search. 2D / 3D always stays at the far left. The bottom status bar also becomes a full-width bar, and the zoom buttons move to the top right.

![Pages with a left panel: zoom beside the panel (1440×900)](/screenshots/gis/gis-zoom-beside-panel.png)

<div style="display:flex;gap:16px;flex-wrap:wrap">
<img src="/screenshots/gis/gis-narrow-hint.png" alt="390px: layer page hint bar" width="300" />
<img src="/screenshots/gis/gis-workspace-narrow.png" alt="390px: stacked workspace toolbars" width="300" />
</div>

## Analytics geo

The analytics overview `/track/overview` shows region distribution (from IP geolocation) and a visit heatmap (from precise coordinates). They come from different data sources.

![Region distribution and visit heatmap](/screenshots/gis/track-geo-region.png)

Precise location is off by default. Turn on **Precise location** for an app under `/track/app`; the SDK reports coordinates with the session after the user grants location permission.

![App settings: precise location switch](/screenshots/gis/track-app-precise-geo.png)
