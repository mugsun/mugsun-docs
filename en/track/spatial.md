# Spatial behavior

Spatial behavior plots events that carry coordinates on a map. You can see where events concentrate, or open a single event and jump to the session replay of that moment.

The page is under Tracking → Spatial behavior. It uses the precise coordinates reported by the SDK, which is a different thing from the region distribution on Overview derived from the IP address; see [GIS and maps](/en/pc/gis#track) for the difference.

## Get coordinates onto events first

Precise coordinates are not collected by default, and events without coordinates never show up on this page.

<div class="ms-steps">

### Turn on the switch of the application

Under Tracking → Integration, edit the application and turn on Precise location. The switch does not take effect at once: the SDK fetches the new settings when it starts and uses them from the start after that.

### Register the location plugin

The location plugin is not one of the default plugins, so add it yourself:

```ts
import { createTracker, defaultPlugins, geoPlugin } from '@mugsun/track-web'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  plugins: [...defaultPlugins(), geoPlugin()],
})
```

### The user allows locating

The browser shows its location prompt, at most once per session. After the user allows it, all later events carry coordinates. If the user refuses or locating fails, events carry none and no error is raised.

</div>

::: warning Location is sensitive personal information
Before collecting precise locations, explain the purpose in your privacy policy and obtain the user's separate consent; see [Privacy](/en/track/privacy).
:::

### Sending coordinates yourself

You can do without the plugin. The backend accepts any of the key pairs below in the event properties:

| Longitude | Latitude |
| --- | --- |
| `geo_lon` | `geo_lat` |
| `$geo_lon` | `$geo_lat` |
| `longitude` | `latitude` |
| `lon` | `lat` |
| `geo.lon` or `geo.lng` | `geo.lat` |

```ts
tracker.track('store_checkin', { geo_lon: 116.3975, geo_lat: 39.9087 })
```

Coordinates are WGS84. The backend rounds longitude and latitude to 4 decimal places before storing them, which is about 11 meters.

Coordinates that are out of range or not numbers are dropped, while the event itself is stored as usual.

## Viewing in the admin console

<div class="ms-steps">

### Pick an application, a time range and a mode

Pick the application and the time range, choose "Aggregate heat" or "Event points", and click Search. To see only certain events, select them in the event name box or type them in.

### Read the heat

"Aggregate heat" merges events with nearby coordinates into one cell, and the heat of a cell follows the number of events in it. The total number of matching events is shown next to the map title.

### Look at a single event

Switch to "Event points" and click a point on the map. "Selected point" on the right shows the event name, the coordinates, the page and the time.

"Open replay" jumps to the replay of that session, and "User profile" jumps to User Drilldown.

### Zoom in for detail

After the first query, dragging or zooming the map queries again for the current view automatically. Cells get smaller as you zoom in, so you see a finer distribution.

</div>

| Message on the page | Meaning |
| --- | --- |
| Result truncated; zoom in or narrow filters and retry | More than 5000 cells or more than 2000 points, so only part is shown |
| No spatial data | No events with coordinates in this area and time range |
| Missing replay permission; cannot open replay | `sys:track-replay:view` is missing |

"Funnel ID", "Funnel step nos" and "Converted only" on the toolbar are reserved and do not filter anything yet. Ticking "Converted only" gives an empty result.

## How big a cell is

Aggregation groups by the number of decimal places of longitude and latitude; the more places, the smaller the cell. The page picks it from the zoom level of the map:

| Precision | Zoom level | Approximate cell size |
| --- | --- | --- |
| 1 | 5 and below | 11 km |
| 2 | 6 to 8 | 1.1 km |
| 3 | 9 to 11 | 110 m |
| 4 | 12 and above | 11 m |

When calling the API you can set the precision directly with `gridPrecision`, which takes precedence over `zoom`. With neither, precision 2 is used.

## Permissions

| Permission | What it allows |
| --- | --- |
| `sys:track-spatial:list` | Opening the page and querying |
| `sys:track-replay:view` | Jumping from the selected point to the session replay |

On upgrade, roles that already have the Overview permission get `sys:track-spatial:list` automatically.

## API

`GET /system/track/spatial` requires a login and `sys:track-spatial:list`. Each user can send at most 60 requests per minute.

| Parameter | Required | Notes |
| --- | --- | --- |
| `appKey` | Yes | The AppKey of the application |
| `days` | No | 1 to 30, 7 by default |
| `mode` | No | `agg` for heat cells, `points` for event points. `agg` by default |
| `bbox` | No | The query area, written as `minLon,minLat,maxLon,maxLat`. It cannot cross the 180° meridian |
| `zoom` | No | 1 to 20, used to decide the precision |
| `gridPrecision` | No | 1 to 4, takes precedence over `zoom` |
| `eventNames` | No | Event names, separated by commas |

In heat cell mode, `data` of the response looks like this:

```json
{
  "mode": "agg",
  "cells": [
    { "lon": 116.4, "lat": 39.91, "count": 128, "weight": 128 }
  ],
  "geoCount": 342,
  "truncated": false
}
```

| Field | Notes |
| --- | --- |
| `cells` | Heat cells, sorted by `count` from high to low, 5000 at most |
| `points` | Event points, newest first, 2000 at most. Present only in `points` mode |
| `geoCount` | The total number of matching events, counted before truncation |
| `truncated` | Whether the result was truncated |

Each point carries the fields below. The API returns neither the IP address nor the location accuracy `geo_acc`.

| Field | Notes |
| --- | --- |
| `lon` `lat` | Longitude and latitude |
| `eventName` `eventId` `ts` | Event name, event ID and time |
| `urlPath` | The page where the event happened |
| `sessionId` `distinctId` | The session and the visitor |
| `userId` | The signed-in user. It is a string; do not convert it to a number in the frontend, or it loses precision |

The time range follows the dashboard time zone of the tenant and looks at the time events reached the backend.

`funnelId` `funnelSteps` `windowHours` are reserved parameters and only have their format validated. `convertedOnly=true` returns an empty result directly.

## Demo data

Start the backend with `mugsun.lab.seed-fronttest=true` and it creates a demo application with a batch of events that carry coordinates.

The AppKey of the demo application is `ak_lab_spatial_demo`. If the application already exists, nothing is written again.

When developing the admin console, set the environment variable `VITE_TRACK_SPATIAL_MOCK` to `true` and the page uses local fake data instead. It only works in development mode.

## Next

<div class="ms-cards">

- [Plugins](/en/track/plugins#precise-location) When the location plugin asks for permission and which properties it adds.
- [GIS and maps](/en/pc/gis#track) Which data each of the three maps in tracking uses.
- [Privacy](/en/track/privacy) Tell users and obtain consent before collecting.

</div>
