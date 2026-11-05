# Spatial behavior

The console page **Analytics → Spatial** plots precise coordinates as
heat cells or individual points.

Route: `/track/spatial` (menu **Spatial**, icon `ri:map-2-line`).

Read permission: `sys:track-spatial:list` (main-DB migration **V20**;
roles that already have overview read also receive this entry).

This page is separate from overview `/system/track/geo` (IP regions plus
the overview heat map). It only reads server-rounded `geo_lon` / `geo_lat`
columns and never returns IP or `geo_acc`. The old `/geo` endpoint is
unchanged.

## How coordinates get attached

1. Turn on **Precise location** for the app under Integrations `/track/app`.
2. Register `geoPlugin()` and keep `geoEnabled` true (local option or
   `/track/config`; remote values apply on the next start).
3. After the browser grants location permission, the plugin writes
   coordinates as super-properties. You may also set them on `props`:

| Key | Meaning |
| --- | --- |
| `geo_lon` / `$geo_lon` | Longitude (WGS84) |
| `geo_lat` / `$geo_lat` | Latitude (WGS84) |
| `geo_acc` | Accuracy in meters (props only; not promoted to a column) |

Also accepted: `longitude`/`latitude`, `lon`/`lat`, or nested
`geo.{lon,lng,lat}`.

The server rounds to **4 decimal places** (~11 m) before storing columns.
Invalid or out-of-range values drop the columns only — the event itself
is kept. Events without coordinates never appear on this page.

See [Install & setup](/en/track/install) (`geoEnabled`) and
[Plugins](/en/track/plugins) (`geoPlugin`).

Lab seed app (when `mugsun.lab.seed-fronttest=true`):
`appKey` = `ak_lab_spatial_demo`.

## Console

1. Pick an app (`appKey` required) and days (today / last 7 / last 30;
   `days` 1–30, default 7).
2. Choose mode: `agg` heat cells (default) or `points`.
3. Optional: filter by event names (comma-separated) and map viewport
   `bbox` / `zoom`.
4. Click a point: prefer session replay (needs `sys:track-replay:view`);
   otherwise open user lookup. Pass `userId` as the original string —
   never coerce to `number` (snowflake IDs lose precision).
5. Without read permission, show a banner and do not call the API.

By default the page calls the real `GET /api/system/track/spatial`.
Local same-shape mock runs only when both `import.meta.env.DEV` and
`VITE_TRACK_SPATIAL_MOCK=true` are set; production builds drop the mock
branch.

Funnel-shaped params (`funnelId` / `funnelSteps` / `windowHours` /
`convertedOnly`) are accepted for contract alignment, but this cut has
**no funnel-definition table**: `converted` is always `false`, and
`convertedOnly=true` returns an empty result. Filter conversions with
`eventNames` instead.

## API

| Item | Detail |
| --- | --- |
| Method / path | `GET /system/track/spatial` |
| Common gateway prefix | `/api/system/track/spatial` |
| Permission | `sys:track-spatial:list` (login required) |
| Rate limit | 60 requests / minute / user (Redis sliding window, prefix `mugsun:track:rls:`) |

### Query parameters

| Param | Detail |
| --- | --- |
| `appKey` | Required |
| `days` | Optional 1–30, default 7 |
| `mode` | `agg` (default) or `points` |
| `bbox` | Optional `minLon,minLat,maxLon,maxLat` (WGS84; no 180° wrap) |
| `zoom` | Optional 1–20; maps to grid precision below |
| `gridPrecision` | Optional 1–4; wins over `zoom` when set |
| `eventNames` | Optional comma-separated event names (string, not an array) |

### zoom → grid precision `p`

| zoom | `p` |
| --- | --- |
| ≤5 | 1 |
| 6–8 | 2 |
| 9–11 | 3 |
| ≥12 | 4 |

Default when both are omitted: `p = 2`. Aggregation is
`round(geo_lon/geo_lat, p) GROUP BY` and does **not** require PostGIS on
the track schema.

### Response highlights

| Field | Meaning |
| --- | --- |
| `mode` | `agg` / `points` |
| `cells` | agg: `[{lon, lat, count}]`, ordered by count desc |
| `points` | points: `lon`/`lat`/`eventName`/`ts`/`sessionId`/`distinctId`/`userId`, …; `converted` always `false` in this cut |
| `geoCount` | Total geo-tagged events in the window (before truncation) |
| `truncated` | Whether a hard cap truncated the payload |

### Hard caps and boundaries

| Item | Value |
| --- | --- |
| Aggregate cells | ≤ **5000** (truncate by count; `truncated=true`) |
| Detail points | ≤ **2000** (newest `received_at` first) |
| Days | ≤ **30** (same window as funnels) |
| Privacy | No IP / `geo_acc` / Web Mercator coordinates |

Cross-tenant or inaccessible apps use the same “app not visible” wording
as other analysis APIs.

## Related

- [Analytics overview](/en/track/)
- [Ask analytics](/en/track/ask) (intent `geo` still uses overview regions, not this page)
- [GIS · Analytics geo](/en/pc/gis#analytics-geo)
- [Install & setup](/en/track/install)
