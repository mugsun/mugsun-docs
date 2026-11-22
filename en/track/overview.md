# Overview and event analysis

Overview shows the traffic of one application as a whole: how many people came, which pages they viewed and where they came from. Event Analysis counts events by name and shows the events that have just arrived.

Both pages are under the Tracking menu. Pick an application first, then a time range: Today, Last 7 days or Last 30 days.

The selected application and time range are remembered in the browser, and the other Tracking pages reuse them.

![The Overview page: six metric cards at the top, the visit trend and Online now in the middle, Pages and three distribution charts below](/readme/track-overview-en.png)

## Metric cards

| Metric | How it is counted |
| --- | --- |
| Page views (PV) | The number of `$pageview` events |
| Unique visitors (UV) | Distinct devices over the whole time range, not the sum of the daily UVs |
| Sessions | Sessions that have events on a day, summed over the days. A session that crosses midnight counts on both days |
| Events | The number of all events, both collected automatically and sent by your own code |
| Avg. session duration | The average duration of sessions that started in the time range and have ended |
| Bounce rate | The share of ended sessions with no more than one page view |
| Online now | Sessions with events in the last 5 minutes. The page fetches it every 5 seconds |

A device is told apart by the anonymous ID that the SDK generates for each browser; see [Install & setup](/en/track/install#identifying-users).

A session ends after 30 minutes without a new event, or when a `$session_end` event arrives. The backend checks once a minute.

When no session in the time range has ended yet, Avg. session duration and Bounce rate show a dash.

## Trend and distributions

| Card | Content |
| --- | --- |
| Visit trend | With Today, one point every 5 minutes for PV, sessions and events. With 7 or 30 days, one point per day and an extra line for UV |
| Pages | Three rankings, each with the top 10 pages: Most visited, Entry pages and Exit pages. See [Pages](#pages) |
| Traffic sources | PV by the host name of the referring page, top 10. Visits without a referrer are recorded as `direct` |
| Devices | PV by device type, top 10. Unrecognized ones are recorded as `unknown` |
| Top browsers | PV by browser, top 10. Unrecognized ones are recorded as `unknown` |
| Regions | PV, UV and events by the province of the IP address, sorted by events, at most 50 rows |
| Visit heatmap | The latest 2000 events that carry coordinates, drawn on a map |

See [How the dashboards count](/en/track/#dashboard-trend) for how days are cut in the daily trend and how days without data are drawn.

### Pages

Switch between three rankings at the top right of the card. Each shows the top 10 pages:

| Ranking | What it lists | Each row has |
| --- | --- | --- |
| Most visited | The pages with the most page views | PV, UV and average time |
| Entry pages | The first page of each session | Entries, bounces and bounce rate |
| Exit pages | The last page of each session | Exits, PV and exit rate |

![The Pages card switched to Entry pages, with entries, bounces and bounce rate in each row](/screenshots/track/track-page-rank-entry-en.png)

The page path prefers the route template, such as `/order/:id`, so pages of the same kind share one row. Without a route template the actual path is used.

Average time is the mean of the time on page reported by `$pageleave` events.

Entry pages and Exit pages are counted per session: the page views of a session are put in the order they happened, the first one is the entry page and the last one is the exit page.

- Entries is the number of sessions that came in through this page. Exits is the number of sessions that ended on this page. A session has exactly one entry page and one exit page.
- A bounce is a session with only one page view. A refresh counts as two page views, so it is not a bounce. Bounce rate = bounces ÷ entries.
- Exit rate = exits ÷ the PV of this page. It tells you how many of every 100 views of this page were the last page of a session.
- Page views without a page address are not counted. For a session that viewed only one page, that page is both its entry page and its exit page.
- When a session crosses the start of the time range, only the part inside the range is visible, and the first page inside the range counts as the entry page.

The bounce rate here covers all sessions in the time range, while the Bounce rate metric card only covers sessions that have ended, so the two numbers can differ slightly.

To see where users go after they come in through an entry page, use [Path analysis](/en/track/journey).

### Regions and the heatmap

Regions needs IP location lookup turned on in the backend; see [IP location](/en/boot/configuration#ip-location). While it is off, all events fall into a single row.

Two row names come from the backend as they are, in Chinese:

- `未知` (unknown): the province cannot be resolved, or the lookup is off.
- `内网` (intranet): a private network address, once the lookup is on.

The Visit heatmap needs all three of the following:

- Precise location is turned on for the application and the frontend registers the location plugin; see [Spatial behavior](/en/track/spatial#get-coordinates-onto-events-first).
- The admin console was built with the map module.
- The map service is enabled in the backend; see [GIS and maps](/en/pc/gis).

"N events with coordinates" next to the card title is the total count of such events in the time range. To look at an area in detail, use the [Spatial behavior](/en/track/spatial) page.

## Event Analysis

![The Event Analysis page: the list of events by name at the top and the real-time event stream below](/screenshots/track-event.png)

The list has one row per event name, sorted by count from high to low:

| Column | Notes |
| --- | --- |
| Event name | Events collected automatically start with `$`, such as `$pageview` |
| Count | The number of these events in the time range |
| Sessions | The number of sessions in which the event occurred |
| UV | The number of devices on which the event occurred |
| Last seen | The last time the backend received this event |

The filter box takes a complete event name. Press Enter and only that event stays. It matches the whole name, so part of a name finds nothing.

The action button of a row opens Event trend, which draws the count and the sessions of this event. The granularity follows the time range, the same as the visit trend.

### Real-time event stream

The Real-time event stream below the list shows the latest 20 events and refreshes every 5 seconds. You can pause and resume it.

An event shows up here as soon as it reaches the backend, before it is written to the database. Use it during setup to check that events are really sent; see [Your first event](/en/track/first-event).

Only about the latest 1000 events per application are kept for this view. For older ones use the list or [User Drilldown](/en/track/replay#user-drilldown).

## How fresh the data is

| Content | How it updates |
| --- | --- |
| Metric cards, the three distribution charts, Visit trend, Pages | The result is cached in the backend for 45 seconds. Clicking Refresh still waits for the cache to expire |
| Regions, Visit heatmap, the event list | Queried from the database every time, not cached |
| Online now, Real-time event stream | Read from Redis. The page fetches every 5 seconds |

The cache lives in the memory of each backend instance. With several instances, consecutive refreshes may show slightly different numbers.

With Today, the trend chart reads results that are aggregated once a minute. A new event waits for the next aggregation and then for the cache to expire, so it appears on the chart about two minutes later.

The time range goes by the time the backend received the event. Events resent after a network outage are counted on the day they arrive.

## Permissions

| Permission | What it shows |
| --- | --- |
| `sys:track-overview:list` | Every card on Overview |
| `sys:track-event:list` | The event list and the real-time event stream |
| `sys:track-app:list` | The application selector at the top of the page. Without it no application can be picked |

Event trend uses the `/trend` endpoint, so it also needs `sys:track-overview:list`.

You only see the applications and data of your own tenant.

## API

All endpoints are under `/system/track`, use GET and require a login.

| Path | Permission | Parameters |
| --- | --- | --- |
| `/overview` | `sys:track-overview:list` | `appKey` `days` |
| `/trend` | `sys:track-overview:list` | `appKey` `days` `dimType` `dimKey` |
| `/pages` | `sys:track-overview:list` | `appKey` `days` `limit` `type` |
| `/online` | `sys:track-overview:list` | `appKey` |
| `/geo` | `sys:track-overview:list` | `appKey` `days` |
| `/events/page` | `sys:track-event:list` | `appKey` `days` `eventName` `pageNum` `pageSize` |
| `/events/realtime` | `sys:track-event:list` | `appKey` `limit` |

Parameter values:

| Parameter | Notes |
| --- | --- |
| `appKey` | Required |
| `days` | Defaults to 7. Accepts 1 to 90; anything else is an error. 1 means today |
| `dimType` | One of `overview` `event` `page` `referrer` `device`. Defaults to `overview` |
| `dimKey` | One value of that dimension, for example the event name when `dimType=event` |
| `limit` | Defaults to 10 for `/pages` and 100 for `/events/realtime`. Capped at 500 for both |
| `type` | The ranking of `/pages`: `top` for most visited, `entry` for entry pages, `exit` for exit pages. Defaults to `top`. With `entry` and `exit`, `days` only accepts 1 to 30 |
| `pageSize` | Defaults to 10, capped at 500 |

What comes back:

| Path | Response |
| --- | --- |
| `/overview` | `cards` holds the metric cards. `referrerDist` `deviceDist` `browserTop` are the three distribution charts, each item with `name` and `value` |
| `/trend` | With `days` up to 2, each item has `time` `pv` `eventCount` `sessionCount`. Otherwise each item has `date` `pv` `uv` `sessionCount` `bounceCount` `eventCount` |
| `/pages` | With `top`, each item has `pagePath` `pv` `uv` `avgDurationMs`. With `entry`, each item has `pagePath` `sessions` `bounces` `bounceRate`. With `exit`, each item has `pagePath` `sessions` `pv` `exitRate` |
| `/online` | `online` is the number of sessions and `windowSeconds` is 300 |
| `/geo` | `regions` is the region table, `points` are the coordinates and `geoCount` is the total count of events with coordinates |
| `/events/page` | Each row has `eventName` `eventCount` `sessionCount` `uv` `lastTime` |
| `/events/realtime` | Each item has `id` `eventId` `eventName` `ts` `distinctId` `sessionId` `userId` `urlPath` |

The fields in `cards` are `pv` `uv` `sessionCount` `eventCount` `avgSessionDurationMs` `bounceRate` and `settledSessionCount`.

`bounceRate` is a ratio from 0 to 1. `settledSessionCount` is the number of ended sessions; while it is 0, the duration and the bounce rate have no value yet.

In `/pages`, `bounceRate` and `exitRate` are also ratios from 0 to 1, kept to 4 decimal places. The results of `entry` and `exit` are sorted by `sessions`, largest first.

Times are timestamps in milliseconds, and `date` is a date in the local time zone. When Redis is unreachable, `/online` returns 0 and `/events/realtime` returns an empty array.

## Next

<div class="ms-cards">

- [Funnels and retention](/en/track/funnel-retention) How far users get, and whether they come back after a few days.
- [Performance and errors](/en/track/perf-errors) Whether pages are slow and which errors occurred.
- [Ask analytics](/en/track/ask) Query these metrics with one sentence.

</div>
