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

- **Buffer (usual)**: ellipsoidal AEQD centered on the feature envelope (on the pole when |latitude| ≥ 88°).
- Buffer on that plane and project back; densify every 1 km along the geodesic before and after.
- **Buffer (pole-enclosing)**: outer-ring cumulative longitude ≈ ±360°, and high latitude or a pole vertex.
- Same idea as GeographicLib `PolygonArea`'s longitude-crossing count; uses pole-origin AEQD.
- Result written with an RFC 7946 polar cut (±180° edges connected to the pole).
- Irregular pole-enclosing polygons become an equal-latitude RFC polar-cap approximation.
- **Distance (usual)**: project around the query point, find the closest point, then GeographicLib inverse.
- A vertex or any point along an edge counts; a point inside a polygon gives 0.
- **Distance (pole-enclosing)**: pole-origin AEQD; 0 inside the RFC form, otherwise geodesic to the boundary.
- **Area**: GeographicLib `PolygonArea` on the ellipsoid (outer ring minus holes).
- Matches PostGIS `ST_Area(geography)`; pole-enclosing rings are fed as-is, without unwrap.
- **Length**: the sum of geodesic segment lengths.

Radius and nearest-neighbor queries first prefilter by a longitude/latitude envelope with a generous meters-to-degrees margin; when the envelope crosses the 180° meridian it is split into two boxes, so features on the other side are not missed. A bbox query whose west bound is greater than its east bound (for example `minLon=170&maxLon=-170`) is treated as a range crossing 180°, per RFC 7946 §5.2, and is also queried as two boxes; a south bound not less than the north bound is still an error. On the PostGIS path, nearest neighbor first takes candidates by planar longitude/latitude distance with the GiST KNN operator (`<->`; 10 times the result count, at least 100 and at most 10,000), then re-sorts them by `geography` distance. The result is approximate: at high latitudes and in dense layers, planar and ground-distance order differ a lot, so the truly nearest feature may fall outside the candidates and be missed.

Features already stored in a 180°-crossing form (such as `LINESTRING(179.9 0, -179.9 0)`) are treated as crossing 180°.

Rule: the planar envelope is wider than 180°, and no longer is after adding 360 to negative longitudes (`ST_ShiftLongitude`).

In bbox, intersects, contains and radius queries they no longer match near 0°, and they are found near 180° (including a bbox with west > east).

The PostGIS path and the Java path behave the same, and storage is unchanged (mugsun-boot#64).

Since [mugsun-boot#76](https://github.com/mugsun/mugsun-boot/issues/76), with PostGIS the generated column `wraps_antimeridian` records that flag.

The 180°-crossing query branch uses `ST_ShiftLongitude(geom) &&` plus wraps; the non-crossing branch uses `NOT wraps_antimeridian`.

Partial GiST `idx_gis_feature_wrap` serves the crossing branch; the Java fallback is unchanged.

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

The polar regions are computed normally; there is no latitude limit any more.

Crossing the 180° meridian follows RFC 7946 §3.1.9: each part is made continuous in longitude before distance, area and length.

A buffer that extends past 180° is cut there and returned as a MultiPolygon (for example, around Fiji).

**Pole-enclosing polygons** (cumulative longitude ≈ ±360°, matching GeographicLib `PolygonArea`) are supported.

Since [mugsun-boot#63](https://github.com/mugsun/mugsun-boot/issues/63): area uses `PolygonArea` directly.

Buffer and distance use pole-origin AEQD and write results with an RFC 7946 polar cut.

An irregular pole-enclosing polygon is buffered as an equal-latitude RFC polar-cap approximation.

A ring that only circles the pole without a pole vertex is rewritten on ingest to ±180° edges at the pole (with a WARN), and is no longer rejected.

Only two cases still cannot be computed (both for **non–pole-enclosing** features):

- **A non–pole-enclosing feature whose buffer result encloses a pole**: when the buffer covers the North or South Pole, it cannot be output as an ordinary longitude/latitude polygon.
- Buffering a pole-enclosing polygon itself uses pole-origin AEQD and is not limited this way.
- **A single part spanning more than 180° of longitude that is not pole-enclosing**: still wider than 180° after being made continuous.
- Or the buffer wraps all the way around the globe, so its direction is ambiguous.

In these cases:

- **Analyzing a single geometry** (input to `/gis/analyze`, including geometries taken with `engine=java`): an error is returned.
- When a non–pole-enclosing buffer encloses a pole: shrink the buffer distance or split the feature near the pole.
- For a part wider than 180°: split the feature at 180° first.
- **Layer queries** (radius, nearest neighbor, buffer, and buffer/contains handed off from analysis): a few failures do not fail the whole query.
  - Radius and nearest neighbor: a feature crossing 180° first adds 360 to negative longitudes so it stays continuous.
  - The query point moves into the same longitude range, using whichever representation is closer.
  - Example: `LINESTRING(179.9 0, -179.9 0)` is about 20,004 km from (0, 0).
  - About 11.1 km from (179.95, 0.1).
  - Features still wider than 180° after the shift and not pole-enclosing are skipped; pole-enclosing polygons are measured as usual.
  - Buffer: skip non–pole-enclosing features whose buffer encloses a pole, or parts wider than 180° that are not pole-enclosing.
  - Pole-enclosing polygons (including RFC polar caps) are buffered normally; buffers that only extend past 180° are cut at 180°.
  - `skipped` is the skip count; WARN at most once per layer and operation per minute.
- **When spatial analysis hands off to a layer query**, the response also carries `skipped`.
- Hits with a part wider than 180° that are not pole-enclosing are left out of area and length totals.
- Their number is reported in `metrics.metricsSkipped`.
- **Query point**: query points in the polar regions, including on a pole, work.
- Near 180° is fine too; for example longitude 179.9 finds a feature at -179.9.
- **Empty geometries**: distance is infinite (never matched by radius, last in nearest neighbor), buffers are empty, area and length are 0.

::: warning Known limitations
- **Pole-enclosing polygons are supported ([mugsun-boot#63](https://github.com/mugsun/mugsun-boot/issues/63))**.
- After detection, RFC polar caps and wrap-around rings can compute area, buffer and distance.
- Example: `POLYGON((-180 80, …, 180 80, 180 90, -180 90, -180 80))`.
- Example: `POLYGON((0 80, 90 80, 180 80, -90 80, 0 80))`.
- Wrap-around rings are rewritten on ingest to ±180° edges at the pole.
- The PostGIS layer buffer no longer skips polar caps.
- `geography` `ST_Buffer` still drops the polar side of a cap.
- The business path takes the original geometry and buffers it in the JVM with pole-origin AEQD.
- Polygons that only cross 180° and are no wider than 180° after the shift still use `ST_Buffer`.
- An irregular pole-enclosing buffer is an equal-latitude RFC polar-cap approximation, not a precise offset of the original boundary.
- **Edges are geodesics, unlike the straight edges of RFC 7946**: RFC 7946 treats the edge between two vertices as a straight line in longitude/latitude, while this system uses ellipsoidal geodesics, so the same polygon gets a somewhat different area; the larger the extent, the bigger the gap. Measured with GeographicLib (straight lon/lat edges densified to 20,000 points versus geodesic edges): 1°×1° at the equator +0.003%, 10°×10° at 30°–40°N +0.004%, 10°×10° at the equator +0.25%, 10°×10° at 60°–70°N −0.37%, the extent of China (73°–135°E, 18°–54°N) −0.59%, 60°×60° from 0° to 60° +2.27%. The difference is negligible at city scale.
- **Range queries on stored 180°-crossing features (fixed in [mugsun-boot#73](https://github.com/mugsun/mugsun-boot/pull/73))**.
- Before the fix they were treated as spanning the globe: false hits near 0°–10°, misses near 180° ([#64](https://github.com/mugsun/mugsun-boot/issues/64)).
- After the fix both paths treat them as crossing 180°; the rule matches #73 (wider than 180°, ≤180° after ShiftLongitude).
- A genuinely wide feature that runs east across most of the globe and is still ≤180° after the shift is also treated as crossing 180° and read the short way round.
- That matches RFC 7946; split such features into several parts if you need the long way.
- **`wraps_antimeridian` generated column and partial GiST ([mugsun-boot#76](https://github.com/mugsun/mugsun-boot/issues/76))**.
- With PostGIS, `gis_feature.wraps_antimeridian` is a `GENERATED ALWAYS AS STORED` boolean.
- Same rule as #73; PostgreSQL computes existing rows on add; the app does not maintain it.
- V16 adds the column; skipped when PostGIS or `gis_feature` is absent (Dameng / openGauss-lite same-number stubs).
- V17 is a non-transactional Java migration: `CREATE INDEX CONCURRENTLY` for partial GiST `idx_gis_feature_wrap`.
- Index expression `ST_ShiftLongitude(geom)`, predicate `wraps_antimeridian AND is_deleted = 0`.
- Crossing branch: `ST_ShiftLongitude(geom) &&` plus wraps; non-crossing: `NOT wraps_antimeridian`.
- Covers bbox / intersects / contains / radius / nearest neighbor; Java fallback still uses `GisAntimeridian`.
- Main-DB Flyway uses a session-level lock (`flyway.postgresql.transactional.lock=false`).
- See `FlywayPgCompatConfig`; same contract as tracking T4.
- Connect to PostgreSQL directly, or PgBouncer **session** mode; transaction pooling is not supported.
:::

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
