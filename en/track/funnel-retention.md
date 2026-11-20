# Funnels and retention

Funnel Analysis shows how many people completed several things in order and how many dropped out at each step. Retention Analysis shows whether new people come back after a few days.

Both pages are under the Tracking menu, and both count people, not devices.

![The Funnel Analysis page: the funnel steps at the top, the conversion funnel chart at the lower left and the step details at the lower right](/screenshots/track/track-funnel.png)

## Who counts as one person

Funnels and retention identify people the same way:

- A device that has been linked to a business user through `identify` counts as that user. Several devices of one user are one person.
- A device that has never been linked counts by its anonymous ID: one device, one person.

The link also applies to earlier events. Once a device signs in, the events it sent before signing in count under that user as well.

UV on Overview only removes duplicate devices, so it is normal that the numbers here do not match UV. See [Install & setup](/en/track/install#identifying-users) for `identify`.

## How a funnel is counted

| Rule | Notes |
| --- | --- |
| Steps | 2 to 5 steps. Each step is one event, and no event may repeat |
| Order | The steps must happen in order. Other events may come in between |
| First step | The first occurrence of each person within the time range |
| Later steps | Must happen within the conversion window after the previous step. Anything later does not count |
| Conversion window | 1 hour, 24 hours or 7 days. Defaults to 24 hours |
| Time range | Today, Last 7 days or Last 30 days, starting at 00:00 in the local time zone |

The conversion window limits the gap between two neighboring steps, not the total time from the first step to the last.

For example, in a three-step funnel with a 24-hour window, the second step happens 20 hours after the first and the third another 20 hours later. This person completed the funnel.

Only the first occurrence of the first step is used. Someone who did the first step, went no further, and started over after more than the conversion window is not counted in the later steps.

Order is decided by the time the events occurred. Two steps with exactly the same time count as being in order.

## Building a funnel

<div class="ms-steps">

### Pick the application, time range and conversion window

All three are at the top of the page. The application and the time range carry over from the other Tracking pages.

### Set up the steps

Under Funnel steps, choose one event for each step. Click "Add step" to go up to 5 steps, use Move up and Move down to reorder, and keep at least 2.

### Click Search

The Conversion funnel chart is on the left and the Step details table on the right.

</div>

Step details has three numbers:

| Column | Meaning |
| --- | --- |
| Users | The number of people who reached this step |
| Conversion vs previous step | People at this step divided by people at the previous step. The first step has no such number |
| Overall conversion rate | People at this step divided by people at the first step |

A few things to know:

- The event dropdown comes from the event definitions of the application, at most 500 of them. An event appears there once it has been reported; see [Integration](/en/track/apps#event-definitions).
- Steps are not saved. After a reload you set them up again. Switching the application clears the result.
- When every step has 0 people, the page shows "No conversion data in this window".
- The result is cached in the backend for 45 seconds. Searching again right away with the same conditions returns the same copy.

## How retention is counted

Retention Analysis is about new users: people are grouped by the day they were first active, and each group is followed to see how many are still active on each later day.

| Rule | Notes |
| --- | --- |
| Active | Any event on that day |
| New user | First active within the selected time range, and not active in the 30 days before the range starts |
| Time range | Last 7 days, Last 14 days or Last 30 days. All of them include today |
| Day boundary | 00:00 in the local time zone. See [How the dashboards count](/en/track/#dashboard-trend) for setting the time zone |

The lookback is 30 days only. A returning user whose last visit was more than 30 days before the range is counted as new when coming back.

## Reading the retention grid

Pick an application and a time range and click Search. The New-user retention grid appears.

![The new-user retention grid on the Retention Analysis page: one row per day of new users, and the darker a cell the higher the retention](/screenshots/track/track-retention.png)

- Each row is one day of new users. The first column is the date and the number of new users on that day. Dates without new users take no row.
- D+0 is the day of the first activity, so it is always 100%. D+1 is the next day, and so on.
- The retention in a cell is the people still active on that day divided by the new users of the group. Hover over a cell to see the head counts.
- A darker cell means higher retention. Days that have not come yet show "·", decided by the date in the browser's time zone.

Retention only asks whether someone came back on that day, not whether they came every day in between. A person active on D+3 may have been absent on D+1 and D+2.

## Permissions

| Permission | What it allows |
| --- | --- |
| `sys:track-funnel:list` | Opening Funnel Analysis and searching |
| `sys:track-retention:list` | Opening Retention Analysis and searching |
| `sys:track-app:list` | Loading the application selector at the top of the page and the event dropdown of the funnel |

You can only query applications of your own tenant.

## API

Both endpoints are under `/system/track`, use GET and require a login.

| Path | Permission | Parameters |
| --- | --- | --- |
| `/funnel` | `sys:track-funnel:list` | `appKey` `steps` `days` `windowHours` |
| `/retention` | `sys:track-retention:list` | `appKey` `days` |

Parameters of `/funnel`:

| Parameter | Notes |
| --- | --- |
| `steps` | Event names separated by commas, 2 to 5 of them, no repeats |
| `days` | Defaults to 7. Accepts 1 to 30; anything else is an error |
| `windowHours` | One of `1` `24` `168`. Defaults to `24` |

`steps` in the response follows the order passed in, and each item has `eventName` and `count`. Conversion rates are not in the response; compute them from `count`.

`days` of `/retention` defaults to 7. Above 30 it is queried as 30 without an error, and `clamped` in the response is `true`.

`/retention` returns these fields:

| Field | Notes |
| --- | --- |
| `rows` | One item per date that has new users, in ascending date order |
| `rows[].cohortDate` | The date of the new users, formatted `yyyy-MM-dd` |
| `rows[].cohortSize` | The number of new users on that day |
| `rows[].retained` | Keys are day offsets starting from `"0"`, and values are the people active on that day. Days on which nobody was active have no key |
| `days` | The number of days actually used |
| `zone` `today` | The time zone used for day boundaries, and today's date in that zone |
| `clamped` | `true` when the requested days exceeded the limit and were changed to 30 |

## Next

<div class="ms-cards">

- [Overview and event analysis](/en/track/overview) Start with the overall traffic and the count of each event.
- [Replay and user drilldown](/en/track/replay) Look up the timeline of a user or a visitor to see what one person did.
- [Integration](/en/track/apps) Manage event definitions and disable events you no longer need.

</div>
