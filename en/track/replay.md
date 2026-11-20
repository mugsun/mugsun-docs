# Replay and user drilldown

Session Replay records what a user did on the page and plays it back. User Drilldown lists every event of a user or a visitor over a period of time, API requests included.

Both pages are under the Tracking menu. Replay needs Session replay turned on for the application and the replay plugin registered in the frontend; see [Plugins](/en/track/plugins#session-replay).

![The player drawer of Session Replay: the session information at the top, the recorded page in the middle, and the progress bar, the speeds and the event marker bar at the bottom](/readme/track-replay-en.png)

## The replay list

After you pick an application, the list shows its sessions that have a recording, sorted by start time, newest first. "With errors only" keeps only the sessions in which an error occurred.

| Column | Notes |
| --- | --- |
| Start time | When the session started |
| Duration | The length of the recording |
| Pages | The number of pages viewed in the session. A route change in a single-page application counts as a page |
| Events | The number of recording data items, not the number of tracking events |
| Size | The size of the recording data |
| Error | Shows "Has errors" when an error occurred in the session |
| Entry page | The first page of the session |
| Visitor | The anonymous ID of the visitor |

The list has no time range. Every recording within its retention period is there.

Not every session has a recording. Whether a recording is uploaded depends on the application's Replay sample rate; see [Plugins](/en/track/plugins#recorded-does-not-mean-uploaded).

## Playing

Click Play to open the player drawer. Playback starts by itself.

- The speed can be 1x, 2x, 4x or 8x. Periods without activity are skipped by default; you can turn that off.
- Below the progress bar is the event marker bar, which puts the tracking events of the session on the timeline.
- Markers come in five colors, for page views, clicks, errors, API requests and other events.
- Hover over a marker to see the event name, the time and the path. Click it to jump to that moment and continue.

The marker bar shows at most 500 events, and only those within the time span of the recording.

When part of the recording is missing, the top of the player says how many blocks are missing. See [Plugins](/en/track/plugins#when-the-page-closes) for why that happens and how it plays.

Besides the replay list, three other places open the same player drawer:

- Error details in Error Monitoring, where Replay appears when the session has a recording.
- The timeline in User Drilldown, where sessions with a recording have a Replay button.
- Links with the `sessionId` and `appKey` parameters, such as the session links given by [Ask analytics](/en/track/ask).

Replays are sensitive data. During playback, every recording block that is read makes the backend write an operation log entry titled `查看会话回放` (view session replay).

When pages contain personal data, turn on masking as described in [Privacy](/en/track/privacy#turning-on-masking-and-filtering) before recording.

## Retention and storage limits

Recording files are kept in the backend's [object storage](/en/boot/features/storage), not in the database.

| Limit | Default | Where to change it |
| --- | --- | --- |
| Days kept | 14 days, 30 at most | Replay retention in the application form |
| Total recording of one session | 20 MB | The parameter `track.replay.session-max-bytes` |
| Added per day on the whole platform | 10 GB | The parameter `track.storage.daily-max-bytes` |
| Added per day by one application | 2 GB | The parameter `track.storage.app-daily-max-bytes` |
| Free space on the storage disk | Receiving pauses below 5 GB | The parameter `track.storage.min-free-bytes` |

Once a session exceeds its total, later recording data is no longer accepted. The part already received still plays.

The two daily quotas are shared by replays and API response bodies and follow the UTC day. The free space check applies only when files are stored on the local disk.

When a quota is used up or space runs short, `STORAGE_FULL` shows up in Integration health; see [Your first event](/en/track/first-event#integration-health).

Expired recordings are cleaned up once a day, going by the start time of the session. See [Integration](/en/track/apps#system-parameters) for these parameters.

## User Drilldown

User Drilldown answers what one person did over a period of time. Support staff use it to look into a problem a user reported.

![The User Drilldown page: the timeline grouped by session, and an expanded API request with its status code, elapsed time and the View response body button](/screenshots/track/track-user.png)

<div class="ms-steps">

### Pick the application and the mode

With "System user", type a user name to search and pick the person from the dropdown. With "Guest UUID", enter the anonymous ID of the visitor.

### Pick the time range

It defaults to the last 24 hours and can be 7 days at most.

### Click Search

The timeline is grouped by session, newest first. Each fetch brings 50 events; click "Load more" for the next batch.

</div>

The two modes cover different ranges:

| Mode | What it finds |
| --- | --- |
| System user | The events of this user after signing in, plus the events sent while signed out by the devices the user has signed in on |
| Guest UUID | Only the events under this one anonymous ID |

With System user, at most the 1000 most recently active devices of the user are merged. Beyond that the page says so; use Guest UUID to look at one device instead.

The header of each session group shows the start time and the duration, followed by the number of pages and the session ID. When the session has a recording, the header has a Replay button.

Events in the timeline fall into these kinds. Any other event shows its event name:

| Kind | Event |
| --- | --- |
| Page view | `$pageview` |
| Page dwell | `$pageleave` |
| Click | `$click` |
| Error | `$error` |
| API | `api_request` |
| Identity binding | `$identify` |

Events are ordered by the time they occurred. When you arrive from a page such as Error Issues, the conditions are already filled in and you still click Search yourself.

### API requests and response bodies

An API row shows the status code, the elapsed time and the response size. Expand it to see the request method and the full URL, and the error message when the network failed.

API events exist only when the application has API monitoring turned on, and response bodies also need Response body capture; see [Plugins](/en/track/plugins#api-monitoring).

| Case | What the page shows |
| --- | --- |
| The response body was captured | The "View response body" button |
| It is a credential endpoint | Response body not captured (hard-blocked credential endpoint) |
| The response body exceeds the size limit | Response body not captured (exceeds the size limit) |
| The response body cannot be fetched, for example past its retention period | After clicking "View response body", a message says it was not captured or has been purged |

Response bodies are kept for 7 days by default and 30 at most, changed with Response body retention in the application form. The limit for a single response body defaults to 1 MB.

Each time a response body is viewed, the backend writes an operation log entry titled `查看接口响应体` (view API response body).

## Permissions

| Permission | What it allows |
| --- | --- |
| `sys:track-replay:list` | Opening Session Replay and seeing the list |
| `sys:track-replay:view` | Playing recordings. Without it Play does not appear in the list |
| `sys:track-user:list` | Opening User Drilldown and querying the timeline |
| `sys:track-user:view-body` | Viewing the response body of an API request |
| `sys:user:list` | Searching users in the System user mode. Only users within your own data scope are found |
| `sys:track-app:list` | Loading the application selector at the top of the page |

You only see the data of your own tenant; sessions of other tenants are treated as nonexistent. See [Logs and auditing](/en/boot/features/log) for where operation logs are read.

## API

All endpoints are under `/system/track`, use GET and require a login.

| Path | Permission | Parameters |
| --- | --- | --- |
| `/replay/page` | `sys:track-replay:list` | `appKey` `hasError` `pageNum` `pageSize` |
| `/replay/detail` | `sys:track-replay:list` | `sessionId` |
| `/replay/events` | `sys:track-replay:list` | `appKey` `sessionId` |
| `/replay/data` | `sys:track-replay:view` | `sessionId` `seq` |
| `/user/timeline` | `sys:track-user:list` | `appKey` `userId` `distinctId` `startTs` `endTs` `cursor` `pageSize` |
| `/user/api-body` | `sys:track-user:view-body` | `eventId` |

The four replay endpoints:

| Path | Notes |
| --- | --- |
| `/replay/page` | `appKey` is required. `hasError=1` returns only sessions with errors. `pageSize` defaults to 10 and is capped at 500 |
| `/replay/detail` | `replay` is the session information and `blocks` is the list of recording blocks, each with a sequence number `seq` |
| `/replay/events` | The events for the marker bar, each with `eventName` `ts` `urlPath`, at most 500 items |
| `/replay/data` | The content of one recording block, a JSON array. Every call writes an operation log entry |

The commonly used fields of the session information are `sessionId` `distinctId` `userId` `startTime` `durationMs` `pageCount` `rrwebEvents` `sizeBytes` `hasError` and `entryPath`.

The two User Drilldown endpoints:

| Parameter | Notes |
| --- | --- |
| `userId` `distinctId` | Pass one of them. With both, `userId` is used |
| `startTs` `endTs` | Timestamps in milliseconds, no more than 7 days apart |
| `cursor` | `nextCursor` from the previous page. Omit it for the first page |
| `pageSize` | Defaults to 20, capped at 100 |

`/user/timeline` returns `records` and `nextCursor`. An empty `nextCursor` means the end has been reached.

A query by `userId` also returns `deviceCount` and `devicesTruncated`; see the [Upgrade guide](/en/track/upgrade#device-limit-of-the-user-timeline) for what they mean.

The fields of each record are `eventId` `eventName` `ts` `clientTs` `urlPath` `routePath` `durationMs` `sessionId` `props` `hasReplay` and `hasApiBody`.

`props` is a JSON string. On success `/user/api-body` returns the captured response body as it is; when it cannot be fetched, it returns HTTP 400.

## Next

<div class="ms-cards">

- [Plugins](/en/track/plugins#session-replay) How replays are recorded and uploaded, and how to turn on API monitoring.
- [Privacy](/en/track/privacy) How to turn on masking, and how long replays and response bodies are kept.
- [Error issues](/en/track/error-issues) Jump from an issue to the timeline of the user who hit the error.

</div>
