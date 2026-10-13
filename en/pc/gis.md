# GIS & maps

With `VITE_ENABLE_GIS` on, the admin registers the **GIS** menu (frontend `modules/gis`, backend `mugsun-boot-gis`). All screenshots below come from a local run of mugsun-boot + mugsun-pc (1440×900) with **no basemap key configured**, so map areas show a grey canvas plus vector features only. Add a key for Tianditu / AMap / Baidu / Google to get basemap tiles. The UI is shown in Chinese.

::: tip Demo data
The two analytics geo screenshots use demo events seeded into the local dev database (~150 events across Beijing, Shanghai, Guangzhou and other cities), for illustration only.
:::

## Basemap providers `/gis/provider`

Keys are stored server-side only; tiles are proxied through an authenticated same-origin API and keys are never echoed back to the page.

![Basemap providers](/screenshots/gis/gis-provider.png)

## Map workspace `/gis/workspace`

Available by default. Without a usable basemap it shows an empty state with a shortcut to the provider settings. Set `gis.module.enabled` to hide the whole module.

![Map workspace (no basemap)](/screenshots/gis/gis-workspace.png)

## Examples `/gis/lab`

Runnable examples grouped by scenario: markers & overlays, tracks & fences, query & measurement, 3D tiles, data ingestion. Each can be added to the workspace.

![Example: POIs](/screenshots/gis/gis-lab.png)

![Example: heatmap](/screenshots/gis/gis-lab-heatmap.png)

## Layers `/gis/layer`

Import a layer to preview it on the map; once added to the workspace you can adjust opacity and save it into a scene.

![Layers](/screenshots/gis/gis-layer.png)

## Scenes `/gis/scene`

Save your workspace as a scene, preview it, and reopen it to keep editing.

![Scenes](/screenshots/gis/gis-scene.png)

## Spatial analysis `/gis/analyze`

Runs server-side with JTS: input is normalized to WGS84 GeoJSON and computed in meters on Web Mercator (buffer, etc.). Results can be saved as a layer or overlaid.

![Spatial analysis](/screenshots/gis/gis-analyze.png)

## Analytics geo

The analytics overview `/track/overview` shows region distribution (from IP geolocation) and a visit heatmap (from precise coordinates).

![Region distribution and visit heatmap](/screenshots/gis/track-geo-region.png)

Precise location is off by default. Turn on **Precise location** for an app under `/track/app`; the SDK reports coordinates with the session after the user grants location permission.

![App settings: precise location switch](/screenshots/gis/track-app-precise-geo.png)
