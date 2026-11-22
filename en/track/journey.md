# Path analysis

Path Analysis shows where people went next after opening a page, and how many went no further.

The page is under the Tracking menu. It counts sessions, not people and not devices.

![The Path Analysis page: the selected path at the top, and one column per step listing the pages visited next](/screenshots/track/track-journey-en.png)

## How it differs from a funnel

| Aspect | Funnel | Path |
| --- | --- | --- |
| Question it answers | For steps decided in advance, how many people completed each one | Starting from one page, where sessions actually went next |
| Steps | Set up before searching | Picked as you go: click a row to follow it |
| Between steps | Other events may come in between | Must be consecutive, with no other page in between |
| Unit | People | Sessions |
| Events used | Any event | Page views only, `$pageview` |

When the key steps are already known and you want to watch conversion, use a [funnel](/en/track/funnel-retention).

When you do not yet know how people move around, or want to find destinations you did not expect, use Path Analysis.

## How it is counted

| Rule | Notes |
| --- | --- |
| Sessions | The page views of one session are lined up by the time they occurred. A visit after the session has ended is another session, and paths do not continue across sessions |
| Pages | The route template is preferred, for example `/order/:id`, so pages of one kind are merged. Without a route template the actual path is used |
| Repeats | Several views of the same page in a row count once, for example a reload |
| Between steps | Steps must be consecutive. With steps A and B selected, only sessions where B comes right after A count |
| Starting page | Each session is followed only from the first occurrence of the starting page |
| Time range | Today, Last 7 days or Last 30 days, starting at 00:00 in the local time zone |
| Number of steps | A path can have up to 5 steps |

Route templates are only available when `router` is passed while initializing the SDK; see [Install & setup](/en/track/install). For when a session ends, see [Overview](/en/track/overview).

Because only the first occurrence of the starting page is used, the numbers in every column add up:

- The sessions of all destinations in a column, plus "Other pages" and "No further page", equal the sessions that reached this step.
- The number on the row you click is the number of that step once it is selected.

For example, a session first goes from A to C and later from A to B. With steps A and B selected, this session does not count.

When a session crosses the start of the time range, only the part inside the range is visible.

## Following a path

<div class="ms-steps">

### Pick the application, time range and start mode

All three are at the top of the page. The application and the time range carry over from the other Tracking pages.

### Click a page in the "Starting page" column

A new column, "After step 1", appears on the right and lists the pages those sessions went to next.

### Keep clicking the next step

Each click adds another column on the right. Clicking a different row in the same column replaces that step with the new page and drops the later steps.

</div>

Each column has these parts:

| Part | Meaning |
| --- | --- |
| Sessions in the header | The sessions that reached this step. For the "Starting page" column, the sessions with page views in the time range |
| Each row | A page visited next, its sessions, and its share of the sessions in the header |
| Other pages | Sessions whose destination did not make the list. Click "Show more" to extend the list from 10 to up to 50 pages |
| No further page | Sessions that did not open another page after reaching this step |

"Other pages" and "No further page" stay fixed at the bottom of each column, so they remain visible while the list scrolls.

"Selected path" at the top of the page lists every step you have picked:

- Each step is followed by the sessions that reached it. From the second step on, its share of the previous step is shown as well.
- With two or more steps selected, "First step to last" is shown: the sessions of the last step divided by the sessions of the first.
- Click an earlier step to go back to it and drop the later ones. Click "Clear" to start over.

## Two start modes

| Start mode | Meaning | Good for |
| --- | --- | --- |
| Anywhere | The path may start in the middle of a session | Where people go after reaching a certain page |
| From entry page | The path must start at the first page of the session | How people move after they arrive |

The "Starting page" column means different things in the two modes:

- "Anywhere" lists the pages that appeared in sessions. One session counts toward several pages, so the rows add up to more than the total sessions.
- "From entry page" lists entry pages. A session has exactly one entry page, so the rows plus "Other pages" equal the total sessions.

When you switch the start mode or the time range, the selected path is kept and counted again under the new conditions.

A few things to know:

- The data comes from the page view event `$pageview`. If the application does not report page views, this page is empty.
- The selected path is not saved, so pick it again after reloading the page. Switching the application clears the selected path.
- The time range is shared with the other Tracking pages. If Last 14 days was chosen in Retention Analysis, this page queries 14 days as well.
- Results are cached on the backend for 45 seconds, so an immediate retry with the same conditions returns the same result.
- This page queries the raw event data directly, which is why the time range is limited to 30 days.

## Permissions

| Permission | What it allows |
| --- | --- |
| `sys:track-journey:list` | Opening Path Analysis and querying |
| `sys:track-app:list` | Loading the application selector at the top of the page |

You can only query applications of your own tenant.

## API

The endpoint is `GET /system/track/journey`. It requires a login and the permission `sys:track-journey:list`.

| Parameter | Notes |
| --- | --- |
| `appKey` | The application key. Required |
| `steps` | The selected steps as a JSON array, for example `["/","/list"]`. Up to 5 items, and two neighboring items may not be the same. Omit it when no starting page is selected yet |
| `days` | Defaults to 7. Accepts 1 to 30; anything else is an error |
| `start` | `any` or `entry`. Defaults to `any` |
| `limit` | How many destinations to list. Defaults to 10. Above 50 it is queried as 50 without an error |

`steps` is a JSON array rather than a comma-separated list because page addresses may contain commas. URL-encode it when putting it in the address.

It returns these fields:

| Field | Notes |
| --- | --- |
| `total` | The sessions with page views in the time range |
| `steps` | Every selected step; each item has `page` and the `sessions` that reached it |
| `next` | The destinations of the next step; each item has `page` and `sessions`, ordered by sessions from high to low. With no starting page selected, these are the pages that can be used as the starting page |
| `ended` | The sessions with no further page after the selected steps |
| `others` | The sessions whose destination did not make `next` |
| `days` `start` | The number of days and the start mode actually used |
| `unit` | The unit of the counts, always `session` |

With steps selected, the sessions in `next` plus `ended` and `others` equal the `sessions` of the last step.

## Next

<div class="ms-cards">

- [Funnels and retention](/en/track/funnel-retention) When the key steps are already known, use a funnel to watch the conversion of each step.
- [Replay and user drilldown](/en/track/replay) To see what one session actually did, watch its replay.
- [Overview and event analysis](/en/track/overview) Start with the overall traffic and the most visited pages.

</div>
