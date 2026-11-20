# Performance and errors

Performance Analysis uses five web performance metrics to show how fast pages load and respond. Error Monitoring groups frontend errors by fingerprint and lists the count and the affected sessions of each group.

Both pages are under the Tracking menu. Pick an application and a time range first.

![The Performance Analysis page: five metric cards and the threshold legend at the top, the percentile details table below](/readme/track-perf-en.png)

## Metrics and ratings

The metrics are collected by the SDK's performance plugin and sent when the page is first hidden or closed, one event per metric. See [Plugins](/en/track/plugins#performance-metrics) for how they are collected.

| Metric | Meaning | Good | Poor |
| --- | --- | --- | --- |
| LCP | Largest Contentful Paint | Up to 2500 ms | Above 4000 ms |
| INP | Interaction to Next Paint | Up to 200 ms | Above 500 ms |
| CLS | Cumulative Layout Shift | Up to 0.1 | Above 0.25 |
| FCP | First Contentful Paint | Up to 1800 ms | Above 3000 ms |
| TTFB | Time to First Byte | Up to 800 ms | Above 1800 ms |

The rating goes by P75, the value that three quarters of the samples do not exceed. A P75 between the two lines is rated "Needs improvement".

The big number on a metric card is P75, with the rating next to it and the sample count below. The sample count is how many events of this metric arrived in the time range.

The Percentile details table lists the samples, the mean and three percentiles of each metric. P75 and P95 are colored by the same lines.

### Looking at one page

Enter a route template in the filter box and press Enter or click Search. Only the samples of that page are counted.

Enter the complete route template, such as `/order/:id`. For a page without a route template, enter the actual path.

### The values are estimates

Percentiles and the mean are not computed from every sample. The backend counts samples into groups by the boundaries below and estimates proportionally inside a group.

| Metric | Boundaries |
| --- | --- |
| CLS | 0.01 0.025 0.05 0.1 0.25 0.5 1 |
| The other four, in milliseconds | 100 250 500 1000 2500 5000 10000 30000 |

The error is large with few samples. With a single sample of 1200 ms, P75 shows `2125ms`.

A sample beyond the last boundary counts as that boundary. So a millisecond metric shows `30000ms` at most and CLS shows `1.000` at most.

## Error Monitoring

The list has one row per error fingerprint, sorted by last seen, newest first. See [Plugins](/en/track/plugins#errors) for how the fingerprint is computed.

| Column | Notes |
| --- | --- |
| Error summary | The message of the latest error in the group |
| Count | The number of errors of this group in the time range |
| Affected sessions | The number of sessions in which this group occurred |
| First seen | The first time it was received within the time range, not the first time ever |
| Last seen | The last time it was received within the time range |

The view button of a row opens Error details. The top shows the fingerprint, the total count and the affected sessions. Below are the individual errors of the group, newest first.

![Error details: an expanded error with its page, session, stack and context](/screenshots/track/track-error.png)

Expanding an error shows the following:

| Item | Notes |
| --- | --- |
| Page | The page path and the route template at the time of the error |
| Release | The application version that reported the error, set with `release` when the SDK is initialized |
| Session | The session ID and the anonymous ID of the visitor |
| Session replay | Replay appears when the session has a recording. Click it to play right away |
| Event ID | The ID of this error event |
| Stack | The stack as it was reported |
| Restore | The "Restore stack" button. Only errors with a release have it |
| Context | Every property of this error event |

To hand an error to someone and mark it as resolved, use [Error issues](/en/track/error-issues).

## Restoring the stack

Scripts in production are minified, so the line and column numbers in a stack do not match the source. After you upload the sourcemaps produced by the build, they can be converted back to positions in the source files.

<div class="ms-steps">

### Set `release` when initializing the SDK

Use a different value for every version, for example the version number of the build. See [Install & setup](/en/track/install#options) for how to write it.

### Upload the sourcemaps of that version

On the Sourcemaps tab of Integration, upload the `.map` files from the build output and enter the same value as the release. See [Integration](/en/track/apps#sourcemaps).

### Click "Restore stack" in Error details

Expand an error and click the button in the Restore row. The converted source paths with their line and column numbers are highlighted.

</div>

Sourcemaps are matched by file name. The file name of the script in the stack plus `.map` is the sourcemap file that is looked for.

For example, for `index-8f3a.js` in the stack, `index-8f3a.js.map` under this release is used.

The conversion runs in the browser, and the page downloads the sourcemaps it needs. At most 100 sourcemap files of one release are fetched for matching.

When the stack cannot be restored, the reason is shown where the button was:

| Message | Reason |
| --- | --- |
| No sourcemap uploaded for this release yet; upload one to restore the stack | This release of this application has no sourcemap |
| No stack frame matched any sourcemap file for this release | The file names do not match, or the position is not found in the sourcemap |

## Error alerting

Once an application turns on Error alerting, the backend checks two rules for every error that carries a fingerprint and sends an in-app message on a hit.

| Rule | When it sends |
| --- | --- |
| New error | Once when a fingerprint appears for the first time. This rule does not fire again for it within 7 days |
| Frequent error | Once when the count of one fingerprint within 10 minutes reaches the Alert threshold. It does not fire again in those 10 minutes |

The Alert threshold accepts 1 to 1000 and defaults to 10. The switch and the threshold are in the application's edit form; see [Integration](/en/track/apps#applications).

The two rules are checked independently. With a threshold of 1, the first error of a new fingerprint sends two messages.

The message is titled `埋点错误告警` (tracking error alert). The body names the application, the error fingerprint and the rule that fired, and links to Error Monitoring. Times in the body are in UTC.

The recipients are the users with a normal status under the role whose code is `admin`, in the tenant that owns the application. Without such users nothing is sent.

Alerts are in-app messages only. A failure to check or send is only logged and does not affect storing the error. See [Messages and announcements](/en/boot/features/message) for where messages are read.

## How fresh the data is

The result of Performance Analysis is cached in the backend for 45 seconds. The error list and Error details are queried from the database every time, not cached.

The time range goes by the time the backend received the event, the same as [Overview](/en/track/overview#how-fresh-the-data-is).

## Permissions

| Permission | What it allows |
| --- | --- |
| `sys:track-perf:list` | Opening Performance Analysis |
| `sys:track-error:list` | Opening Error Monitoring and viewing Error details |
| `sys:track-app:edit` | Restoring the stack. Listing sourcemaps needs this permission |
| `sys:track-replay:list` `sys:track-replay:view` | Seeing the session replay entry in Error details and playing it. Both are needed |
| `sys:track-app:list` | Loading the application selector at the top of the page |

You only see the applications and data of your own tenant.

## API

All endpoints are under `/system/track`, use GET and require a login.

| Path | Permission | Parameters |
| --- | --- | --- |
| `/vitals` | `sys:track-perf:list` | `appKey` `days` `routePath` |
| `/errors/page` | `sys:track-error:list` | `appKey` `days` `pageNum` `pageSize` |
| `/errors/detail` | `sys:track-error:list` | `appKey` `fingerprint` `days` `pageNum` `pageSize` |
| `/sourcemap/raw` | `sys:track-error:list` | `id` |

`days` defaults to 7 and accepts 1 to 90. `pageSize` defaults to 10 and is capped at 500.

| Path | Response |
| --- | --- |
| `/vitals` | One item per metric that has samples, with the fields `metric` `count` `avg` `p50` `p75` `p95` |
| `/errors/page` | Each row has `fingerprint` `eventCount` `sessionCount` `firstTime` `lastTime` `message` |
| `/errors/detail` | Each row has `eventId` `sessionId` `distinctId` `urlPath` `routePath` `time` `message` `release` `stack` `props` |
| `/sourcemap/raw` | The original content of the sourcemap file |

For `cls` in `/vitals`, the four values are the real value multiplied by 1000; `100` means 0.1. The other metrics are in milliseconds.

`props` is a JSON string. Times are timestamps in milliseconds.

## Next

<div class="ms-cards">

- [Error issues](/en/track/error-issues) Assign an error to someone and follow it until it is fixed.
- [Replay and user drilldown](/en/track/replay) See what the user did before the error.
- [Integration](/en/track/apps) Upload sourcemaps and turn on error alerting.

</div>
