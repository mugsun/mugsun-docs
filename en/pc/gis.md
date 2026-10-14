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
| Spatial analysis `/gis/analyze`: buffer and contains with a source layer selected and no pasted data | Handed to the layer query, so computed in the database as above | Handed to the layer query's Java path |
| Spatial analysis `/gis/analyze`: everything else (pasted data, or distance, area, length, intersects, difference, etc.), and any request with `engine=java` | Java path | Java path |

Both layer queries and `/gis/analyze` accept `engine=java` to force the Java path (for diagnostics and comparison). With `engine=java`, `/gis/analyze` does not hand off to the layer query and analyzes the whole input in memory.

How the Java path works: everything is built on GeographicLib (Karney's algorithms, the same source as PostGIS `geography`) and JTS. The edge between two vertices is always treated as a geodesic on the WGS84 ellipsoid, as in PostGIS `geography`.

- **Buffer**: projects with an ellipsoidal azimuthal equidistant projection centered on the feature's envelope center (on the pole when |latitude| ≥ 88°), buffers on that plane and projects back. Edges are densified every 1 km along the geodesic before projecting and after projecting back.
- **Distance**: projects around the query point, finds the closest point on the geometry (a vertex or any point along an edge; a point inside a polygon gives 0), then computes the geodesic distance between the two points with GeographicLib.
- **Area**: GeographicLib `PolygonArea` on the ellipsoid (outer ring minus holes), matching PostGIS `ST_Area(geography)`.
- **Length**: the sum of geodesic segment lengths.

Radius and nearest-neighbor queries first prefilter by a longitude/latitude envelope with a generous meters-to-degrees margin; when the envelope crosses the 180° meridian it is split into two boxes, so features on the other side are not missed.

Because edges are geodesics, long edges at high latitude that span many degrees of longitude bow toward the pole. For example, an edge along 75°N from longitude 0° to 170° rises to about 89°N in the middle. For such features, area, length and distance differ a lot from a "straight lines in longitude/latitude" reading; PostGIS `geography` is the reference.

Java-path accuracy (relative error between the requested meters and the geodesic distance from each buffer-boundary vertex to the source feature, GeographicLib as ground truth, points, lines and polygons combined):

| Location | 500 m buffer | 20 km buffer | 200 km buffer |
|---|---|---|---|
| Equator | 0 to +0.03% | −0.03% to 0 | −0.03% to 0 |
| Beijing (39.9°N) | 0 to +0.03% | −0.03% to 0 | −0.03% to 0 |
| 72°N | 0 to +0.02% | −0.03% to 0 | −0.03% to 0 |
| 78°N | 0 to +0.02% | −0.03% to 0 | −0.03% to 0 |
| 86°N | 0 to +0.02% | −0.03% to 0 | −0.03% to 0 |
| 88°S | −0.02% to +0.03% | −0.04% to 0 | −0.05% to 0 |
| Long-edge lines and polygons at 88°–89.6° | −0.05% to +0.05% | −0.03% to 0 | not measured |

The remaining error comes mainly from approximating arcs with line segments (32 per quarter circle). Against the PostGIS path (the outer-ring vertices of the same buffer measured to the source feature with `ST_Distance(geography)`): points, lines and polygons at the equator, Beijing and 72°N differ by −0.18% to +0.002% for 500 m to 200 km, and lines and polygons at 88°–89.6° differ by −0.05% to +0.05% for 500 m to 5 km. The buffer areas of the two paths differ by −0.5% to +0.8%, mostly because PostGIS `ST_Buffer(geography)` itself uses a projected approximation. Areas against `ST_Area(geography)`, including a 60°×60° polygon and a 170°-wide high-latitude polygon, differ by less than 10⁻¹⁵.

::: warning Earlier versions
Earlier versions computed meters on the Web Mercator plane without a latitude correction: buffer radii and distances shrank by cos(latitude), and areas by cos²(latitude). A 500 m buffer in Beijing was really about 383 m, and at 72°N only about 31% of the requested size. See the table above for accuracy after upgrading.
:::

#### Java-path limits {#metric-limits}

The polar regions are computed normally; there is no latitude limit any more. Only two cases still cannot be computed:

- **Buffers that enclose a pole**: a buffer covering the North or South Pole cannot be output as a longitude/latitude polygon.
- **Crossing 180°**: a feature crosses the 180° meridian, or its buffer extends past it.

In these cases:

- **Analyzing a single geometry** (the input to `/gis/analyze`, including geometries taken from the source layer when `engine=java` is set): an error is returned. For a buffer enclosing a pole, shrink the buffer distance or split the feature near the pole; for 180° crossings, split the feature at 180° first.
- **Layer queries** (radius, nearest neighbor, buffer, and the buffer / contains that `/gis/analyze` hands to the layer query): a few features that cannot be computed do not make the whole query fail.
  - Radius and nearest neighbor: a feature crossing 180° (adjacent vertices more than 180° of longitude apart) first has 360 added to its negative longitudes, so it becomes one continuous piece instead of wrapping the long way around the globe; the query point is moved into the same longitude range, using whichever representation is closer to the feature. For example, `LINESTRING(179.9 0, -179.9 0)` is about 20,004 km from (0, 0) and about 11.1 km from (179.95, 0.1). Features still wider than 180° after the shift are skipped.
  - Buffer: features whose buffer encloses a pole or crosses 180° are skipped.
  - `skipped` in the response is the number of features skipped; the server logs a WARN with feature ids and the count (at most one per layer and operation per minute).
- **When spatial analysis hands off to a layer query**, the response also carries `skipped`; 180°-crossing features among the hits are left out of the area and length totals, and their number is reported in `metrics.metricsSkipped`.
- **Query point**: query points in the polar regions, including on a pole, work. Query points near the 180° meridian are fine too; for example a query point at longitude 179.9 finds a feature at -179.9.
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
