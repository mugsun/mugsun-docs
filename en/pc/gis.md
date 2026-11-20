# GIS and maps

GIS is a group of map pages in the admin console for viewing maps, drawing shapes, managing layers and running spatial analysis.

This page lists the pages first, then shows how to draw your first map, and ends with how accurate the results measured in meters are.

![The Map page, with drawing tools on the left and the scene, search and basemap controls on top](/screenshots/gis/gis-workspace.png)

## The pages

Click GIS in the top navigation. The left menu has four pages, and two more pages are not in the menu.

| Page | Path | What it is for |
| --- | --- | --- |
| Map | `/gis/workspace` | Draw points, lines and polygons, measure distance and area, overlay layers, and save it all as a scene |
| Examples | `/gis/lab` | 13 examples you can run right away, each with the API behind it |
| Layers | `/gis/layer` | Store data as layers that the Map page and other modules can overlay |
| Basemap | `/gis/provider` | Set the keys of basemap providers, see [Basemap setup](/en/pc/gis-basemap) |
| Spatial analysis | `/gis/analyze` | Operations such as buffer and intersects. Open it from More → Analyze on the Map page |
| Scenes | `/gis/scene` | The scene list. Day to day, switch scenes in the drop-down at the top left of the Map page |

- 2D maps use OpenLayers and 3D uses Cesium.
- APIs and storage use WGS84 coordinates. With an Amap or Baidu basemap, the page converts the offset before display.
- Basemap tiles are relayed by the backend, so keys never reach the browser. See [Tile proxy security](/en/pc/gis-tile-security).
- The bottom-right corner of the map shows the basemap attribution, for example the Tianditu copyright line.
- The page shows no map review number. Add one yourself as the rules require when you publish a map.
- This module is optional. To turn it off, see [Switches and permissions](#switches).

## Draw your first map

<div class="ms-steps">

### Prepare a basemap

By default the map uses the public OpenStreetMap tiles. If the backend can reach them, the map shows up with no setup.

To change the basemap, open Basemap, click a provider, fill in Access key and click Save. See [Basemap setup](/en/pc/gis-basemap).

### Open the map

Open Map. In the top-right corner you can switch between 2D and 3D, and change the basemap and its style.

### Draw shapes

Pick Point, Line or Polygon in the toolbar on the left, then click on the map. Double-click to finish a line or a polygon.

### Save it as a scene

Fill in Scene name at the top left and click Save scene. Next time, open it from the Select scene drop-down.

</div>

- A scene stores the shapes you drew, the overlaid layers, the basemap and the view.
- Drawing and measuring work in 2D only. 3D only shows shapes that are already saved.
- If the map stays grey and says "The basemap didn't load", follow [Troubleshooting](/en/pc/gis-basemap#troubleshooting).
- With no usable basemap, the map area shows "No basemap available" and a button that leads to the setup.
- A saved key is not shown again. Leave the input empty to keep it.

## What is on the Map page

| Where | What |
| --- | --- |
| Top left | The Select scene drop-down, Scene name and Save scene |
| Top center | Search for places and POIs with at least 2 characters. Go to jumps to a longitude and latitude |
| Top right | 2D and 3D, the basemap, the style, and a tag that tells whether PostGIS is present |
| Toolbar on the left | Pan, Select, Point, Line and Polygon. Everything else is under More |
| Last button of the toolbar | Opens the side panel with four tabs: Layers, Sketch, 3D and Properties |

The most used items under More are listed below.

| Item | Description |
| --- | --- |
| Circle, Rectangle, Label | Three more shapes |
| Distance, Area | Measure length and area. The result stays on the map |
| Point heat | Shows the points you drew as a heatmap |
| Cluster | Merges nearby points of overlaid layers |
| Analytics heat | Overlays precise coordinates reported by tracking. Only present when the tracking module is on |
| Overview | Shows a small overview map in a corner |
| Snapshot | Saves the current map as a PNG image |
| Export GeoJSON and Import | Export or import the shapes you drew |
| Buffer selection | Buffers the selected shape by 500 meters |

- The Layers tab of the side panel lists the overlaid layers and lets you change their opacity. Click a layer in the catalog below to overlay it.
- Query in the side panel searches features in the chosen layer in three ways: Current view, Nearest and Within radius.
- With a shape selected, change its name, color and notes on the Properties tab.
- In 3D, the 3D tab lets you turn on Terrain and Extrude polygons, and load 3D Tiles.
- Terrain needs `gis.terrain.url` set under Parameters first. Without it the switch is greyed out.
- Place search uses the API of the current basemap provider. It is not available with custom tiles.

## Layers and data import

The Layers page manages data stored in the database. Click Add layer to create one. Render has five options.

| Render | Where the data comes from |
| --- | --- |
| Vector | Points, lines and polygons that you paste or import |
| Point heat | Points that you paste or import, shown as a heatmap |
| XYZ | The URL of a tile service |
| WMS | The service URL and WMS layers |
| 3D Tiles | The URL of a `tileset.json`. For the built-in sample use `hosted:demo-city` |

- Vector data can be GeoJSON, an array of objects with `lon` and `lat`, or WKT, CSV, KML or GPX.
- Coordinates are stored as WGS84 and other fields are kept as they are.
- Click Validate to see how many features are recognized, then click Save.
- One import takes at most 8,000 features and 200,000 vertices, and at most 2 MB of text.
- Broken geometries are repaired on save, and the page tells you how many were repaired.
- Click Overlay in the list to put the layer on the Map page, where it can be saved with the scene.
- With PostGIS, a layer of 2,000 features or more is shown with vector tiles, which only fetch the data in the current view.
- A layer shown with vector tiles cannot be exported and has no whole-layer statistics.

## Examples

The Examples page has 13 examples you can run right away, in five groups. Click Code at the top right to see the API and the data behind an example.

![The Examples page, with the list of examples on the left and a heatmap on the map](/screenshots/gis/gis-lab-heatmap.png)

| Group | Examples |
| --- | --- |
| Markers & overlays | POIs, heatmap and point clustering |
| Tracks & fences | Track playback, geofence, buffer analysis and spatial operations |
| Query & measure | Radius query, click to pick an address, and distance and area measurement |
| 3D scene | 3D Tiles |
| Data intake | Raster overlay and multi-format ingest |

- The examples use built-in demo data, most of it from the APIs under `/system/gis/demo`.
- The sample 3D Tiles data ships with the backend and has 16 buildings. Click a building to see its name and number of floors.

## Spatial analysis

Open it from More → Analyze on the Map page. Choose a Source layer or paste data, choose an operation and click Run.

| Operation | What else to fill in |
| --- | --- |
| Buffer | Buffer (m), from 1 to 200000 |
| Distance, Intersects, Contains and Difference | Other layer |
| Simplify | Simplify tolerance, from 0 to 1 |
| The other six | Nothing |

- The other six are Centroid, Envelope and Convex hull, plus Area, Length and Union.
- Operations run on the server with JTS. The input is normalized to WGS84 GeoJSON first.
- The result is drawn on the map. Save as layer stores it in the layer library, and Overlay takes it to the Map page.
- For how accurate the results in meters are, see the next section.

## How accurate meters are {#metric-accuracy}

Buffer, distance, area and length are all measured in meters on the ground, on the WGS84 ellipsoid. Which path is used depends on the feature and the database.

| Feature | With PostGIS | Without PostGIS |
| --- | --- | --- |
| Radius, nearest-neighbor and buffer in layer queries | Computed in the database with `geography` | Java path |
| Buffer and Contains in spatial analysis, with a source layer selected and no pasted data | Handed to the layer query and computed in the database | Handed to the layer query's Java path |
| Everything else in spatial analysis, and any request with `engine=java` | Java path | Java path |

- Without PostGIS means databases such as MySQL or Dameng.
- The tag at the top right of the Map page reads PostGIS or Java fallback, which tells whether the database has PostGIS.
- The layer query APIs and the analysis API both accept `engine=java`, which forces the Java path for diagnostics and comparison.
- Only the platform super admin can use `engine=java`. For anyone else the request returns 403.
- With `engine=java`, the analysis API does not hand off to the layer query and analyzes the whole input in memory.

### How the Java path computes

The Java path is built on GeographicLib and JTS. The edge between two vertices is treated as a geodesic on the WGS84 ellipsoid.

| Operation | Method |
| --- | --- |
| Buffer | An ellipsoidal azimuthal equidistant projection centered on the feature envelope, buffered on the plane and projected back |
| Distance | A projection centered on the query point to find the geometrically closest point, then the GeographicLib inverse |
| Area | GeographicLib `PolygonArea` directly on the ellipsoid, outer ring minus holes |
| Length | The sum of geodesic segment lengths |

- GeographicLib uses Karney's algorithms, the same source as PostGIS `geography`. Treating edges as geodesics matches it too.
- A buffer is densified every 1 km along the geodesic, both before projecting and after projecting back.
- When the absolute latitude is 88° or more, the buffer projection is centered on the pole instead.
- Distance counts vertices and any point along an edge. A point inside a polygon has distance 0.
- Area matches PostGIS `ST_Area(geography)`.

### How large the error is

The table shows the relative error of buffers on the Java path, with points, lines and polygons combined into one range.

| Location | 500 m buffer | 20 km buffer | 200 km buffer |
| --- | --- | --- | --- |
| Equator | 0 to +0.03% | −0.03% to 0 | −0.03% to 0 |
| Beijing (39.9°N) | 0 to +0.03% | −0.03% to 0 | −0.03% to 0 |
| 72°N | 0 to +0.02% | −0.03% to 0 | −0.03% to 0 |
| 78°N | 0 to +0.02% | −0.03% to 0 | −0.03% to 0 |
| 86°N | 0 to +0.02% | −0.03% to 0 | −0.03% to 0 |
| 88°S | −0.02% to +0.03% | −0.04% to 0 | −0.05% to 0 |
| Long-edge lines and polygons at 88°–89.6° | −0.05% to +0.05% | −0.03% to 0 | not measured |

- For each vertex on the buffer boundary, the geodesic distance to the source feature is compared with the requested meters.
- GeographicLib provides the ground truth.
- The remaining error comes mainly from approximating arcs with line segments, 32 per quarter circle.

The comparison with the PostGIS path is below.

| Compared | Difference |
| --- | --- |
| Points, lines and polygons at the equator, Beijing and 72°N, buffer distance 500 m to 200 km | −0.18% to +0.002% |
| Lines and polygons at 88°–89.6°, buffer distance 500 m to 5 km | −0.05% to +0.05% |
| Area of the buffers from the two paths | −0.5% to +0.8% |
| Area against `ST_Area(geography)`, including a 60°×60° polygon and a 170°-wide polygon at high latitude | less than 10⁻¹⁵ |

- The first two rows measure the outer-ring vertices of the same buffer to the source feature with `ST_Distance(geography)`.
- The buffer area differs mostly because PostGIS `ST_Buffer(geography)` itself uses a projected approximation.

::: warning Earlier versions
Earlier versions computed meters on the Web Mercator plane without a latitude correction. Buffer radii and distances shrank by cos(latitude), and areas by cos²(latitude).

A 500 m buffer in Beijing was really about 383 m, and at 72°N only about 31%. See the table above for accuracy after upgrading.
:::

## Special cases and limits {#metric-limits}

The polar regions and the area around the 180° meridian are computed as usual, with no latitude limit. Only two kinds of features cannot be computed, and the page then says that n features were skipped.

### The two kinds of features that cannot be computed {#skipped}

Neither kind encloses a pole itself, but the result cannot be written as an ordinary longitude/latitude polygon.

| Case | Why | What to do |
| --- | --- | --- |
| The buffer result encloses a pole | The buffer covers the North or South Pole and cannot be output as an ordinary longitude/latitude polygon | Shrink the buffer distance, or split the feature near the pole |
| A single part spans more than 180° of longitude | It is still wider than 180° after being made continuous, or the buffer wraps around the globe and its direction is ambiguous | Split the feature at 180° first |

Different entry points react differently to these two kinds of features.

| Entry point | Reaction |
| --- | --- |
| Spatial analysis on a single geometry | Returns an error. The same goes for geometries taken from the source layer with `engine=java` |
| Buffer query on a layer | Skips these features and returns the rest. The response reports the number in `skipped` |
| Radius and nearest-neighbor queries on a layer | Skip features wider than 180°, also counted in `skipped` |
| Buffer and Contains handed from spatial analysis to the layer query | The response carries `skipped` as well |
| Area and length totals in spatial analysis | Features wider than 180° are left out and counted in `metrics.metricsSkipped` |

- The backend writes a WARN log when it skips features, at most one per minute for the same layer and operation.
- Polygons that enclose a pole are not subject to these two limits and are buffered and measured as usual.
- A buffer that only extends past 180° is not skipped. The result is cut at 180° and returned.
- An empty geometry has infinite distance, so radius queries never match it and nearest-neighbor puts it last.
- The buffer of an empty geometry is empty, and its area and length are 0.

### Crossing the 180° meridian {#antimeridian}

Features, query ranges and buffer results may all cross the 180° meridian. They are handled the way RFC 7946 writes them.

| Case | How it is handled |
| --- | --- |
| The parts of a feature lie on both sides of 180° | They are made continuous in longitude before distance, area and length are computed |
| A buffer result extends past 180° | It is cut at 180° and returned as a MultiPolygon, for example a buffer near Fiji |
| A bbox query whose west bound is greater than its east bound | Treated as a range crossing 180° and queried as two boxes, for example `minLon=170&maxLon=-170` |
| The prefilter range of a radius or nearest-neighbor query extends past 180° | Split into two boxes, so features on the other side are not missed |
| A stored feature written like `LINESTRING(179.9 0, -179.9 0)` | Treated as a short line crossing 180°, not as a long line spanning the globe |

- A feature crosses 180° when its planar envelope is wider than 180° and no longer is after adding 360 to negative longitudes.
- In bbox, intersects, contains and radius queries, such features do not match by mistake near 0° and are found near 180°.
- A query point near 180° works too. For example, longitude 179.9 finds a feature at -179.9.
- For distance, the query point moves into the same longitude range as the feature, using whichever position is closer.
- The short line in the table is about 20,004 km from (0, 0) and about 11.1 km from (179.95, 0.1).
- The prefilter of radius and nearest-neighbor queries keeps a margin when converting meters to degrees.
- A bbox query whose south bound is not less than its north bound is still an error.
- A wide feature that really runs east across most of the globe is also read as a short feature crossing 180°. Split it into several parts to express it.
- The PostGIS path and the Java path behave the same, and the stored data is unchanged.

### Polygons that enclose a pole {#polar}

A polygon with the North or South Pole inside can also have its area, buffer and distance computed. Both forms below count as enclosing a pole.

| Form | Example |
| --- | --- |
| A polar cap, connected to the pole along ±180° | `POLYGON((-180 80, …, 180 80, 180 90, -180 90, -180 80))` |
| A ring around the pole without a pole vertex | `POLYGON((0 80, 90 80, 180 80, -90 80, 0 80))` |

- The test is that the longitude accumulated along the outer ring is about ±360°, the same idea as GeographicLib `PolygonArea`.
- A ring around the pole is rewritten to the first form when it is stored, and a WARN log is written.
- Area is computed with `PolygonArea` on the original ring.
- Buffer and distance use an azimuthal equidistant projection centered on the pole. A point inside the polygon has distance 0.
- The buffer result is written with the RFC 7946 polar cut, that is, connected to the pole along ±180°.
- For an irregular polygon, the buffer result is a polar cap along one latitude, the southernmost or northernmost latitude after buffering.
- That cap is an approximation. It is not a precise offset of the original boundary.
- With PostGIS, such polygons are still buffered in Java, because `ST_Buffer(geography)` drops the polar side.
- Polygons that only cross 180° and do not enclose a pole are still buffered by `ST_Buffer` in the database.
- Query points in the polar regions or on a pole work.

### Edges are geodesics {#geodesic-edges}

RFC 7946 treats the edge between two vertices as a straight line in longitude/latitude, while this system uses geodesics on the ellipsoid. The same polygon therefore gets a slightly different area.

| Extent | Area difference |
| --- | --- |
| 1°×1° at the equator | +0.003% |
| 10°×10° at 30°–40°N | +0.004% |
| 10°×10° at the equator | +0.25% |
| 10°×10° at 60°–70°N | −0.37% |
| The extent of China, 73°–135°E and 18°–54°N | −0.59% |
| 60°×60° from 0° to 60° | +2.27% |

- The table was measured with GeographicLib, comparing straight longitude/latitude edges densified to 20,000 points with geodesic edges.
- The larger the extent and the closer to the equator or to high latitudes, the bigger the gap. At city scale it is negligible.
- Long edges at high latitude that span many degrees of longitude bow toward the pole. An edge along 75°N from longitude 0° to 170° rises to about 89°N in the middle.
- For such features, PostGIS `geography` is the reference for area, length and distance.
- Nearest neighbor on the PostGIS path is approximate. It takes candidates by planar longitude/latitude distance, then re-sorts them by `geography` distance.
- The number of candidates is 10 times the result count, at least 100 and at most 10,000.
- At high latitudes and in dense layers, the truly nearest feature may fall outside the candidates.

### The column and index in the database {#migration}

With PostGIS, features crossing 180° are found through a generated column and an index. Note the points below when you upgrade the database.

| Object | Description |
| --- | --- |
| `gis_feature.wraps_antimeridian` | A generated boolean column that marks whether a feature crosses 180°. The database computes it and the application does not maintain it |
| `idx_gis_feature_wrap` | A partial GiST index on `ST_ShiftLongitude(geom)` that only covers features that cross 180° and are not deleted |

- Migration V16 adds the column. It is skipped entirely when PostGIS or the `gis_feature` table is absent.
- Migration V17 builds the index with `CREATE INDEX CONCURRENTLY`, which does not run inside a transaction.
- Flyway uses a session-level lock on the main database, which corresponds to `flyway.postgresql.transactional.lock=false`.
- So connect to PostgreSQL directly, or use the session mode of PgBouncer. The transaction mode does not work.
- Bbox, intersects, contains and radius queries, and nearest neighbor too, all use this index.
- Without PostGIS, the column and the index are not used and the Java path is unchanged.

## Narrow screens and control positions {#layout}

| Page | Wide screen | Width up to 768px |
| --- | --- | --- |
| Map | Zoom buttons in the bottom-left corner | The three top toolbars take one row each, the bottom status bar fills a row, and the zoom buttons move to the top right |
| Pages with a left panel | Zoom buttons to the right of the panel, so the panel does not cover them | The hint at the bottom fills a row. Click the × on its right to hide it |

- On a narrow screen the three rows of the Map page are view and basemap, scene and save, then search. 2D and 3D stay at the far left.
- The pages with a left panel are Examples, Layers and Basemap, plus Scenes and Spatial analysis.
- The Examples page has no hint at the bottom.
- A hidden hint shows up again the next time you open the page.

## Maps in tracking {#track}

Tracking uses maps in three places, and the data sources differ.

| Where | What it shows | Data source |
| --- | --- | --- |
| Region distribution on Overview | Visits by region | The region derived from the IP address |
| Visit heatmap on Overview | A heatmap of where visits came from | Precise coordinates reported by the SDK |
| The Spatial behavior page | Heat cells or individual points | Precise coordinates reported by the SDK |

- Precise coordinates are not collected by default. After you turn on Precise location for an app under Integration, the SDK asks the user for location permission first.
- Analytics heat under More on the Map page overlays the same precise coordinates.
- For details, see [Spatial behavior](/en/track/spatial).

## Switches and permissions {#switches}

GIS is an optional module with three switches, all on by default.

| Switch | Where to set it | When it is off |
| --- | --- | --- |
| `VITE_ENABLE_GIS` | An environment variable when building the admin console | The build has no map pages |
| `mugsun.gis.enabled` | The backend config file, or the environment variable `MUGSUN_GIS_ENABLED` | The backend does not load this module |
| `gis.module.enabled` | Parameters in the admin console | The menu is hidden and the map APIs return 404 |

Every page and button has a permission code, which you grant under Role Manage.

| Permission code | What it controls |
| --- | --- |
| `gis:workspace:list` | Opening the Map page |
| `gis:scene:save` and `gis:scene:remove` | Saving and deleting scenes |
| `gis:layer:list` | Opening the Layers page |
| `gis:layer:save` and `gis:layer:remove` | Saving and deleting layers |
| `gis:analyze:run` | Running spatial analysis |
| `gis:demo:list` | Opening the Examples page |
| `gis:provider:list` | Opening the Basemap page |
| `gis:provider:save` and `gis:provider:remove` | Saving and clearing basemap settings |

For the full rules on switch values, see [the two layers of module switches](/en/guide/architecture#two-layers-of-module-switches) on the architecture page.

## Next steps

<div class="ms-cards">

- [Basemap setup](/en/pc/gis-basemap) Which basemaps are supported, how to set keys, and what to check when the map does not show.
- [Tile proxy security](/en/pc/gis-tile-security) Rate limits, address blocking and failure responses of the tile relay.
- [Spatial behavior](/en/track/spatial) Plot the coordinates reported by tracking as a heatmap.
- [Features](/en/boot/features/) The other features the backend ships with, one page each.

</div>
