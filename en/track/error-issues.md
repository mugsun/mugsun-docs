# Error issues

Error Monitoring lists errors by fingerprint and answers which errors exist right now. Error issues add the handling on top of that: who is on it, whether it has been fixed, and whether it came back after the fix.

The page is under Tracking → Error Issues. You never create an issue by hand; the backend creates and updates them as error events arrive.

## The life of an issue

<div class="ms-flow ms-flow--3">

1. A new error fingerprint shows up for the first time, and an issue is created as Open.
2. Someone is assigned, and the status becomes Assigned.
3. After the fix it is marked Resolved. If the same error shows up again, the issue reopens by itself and is flagged as regressed.

</div>

Within one application, errors with the same fingerprint go to the same issue. See [Plugins](/en/track/plugins#errors) for how the fingerprint is computed.

Each incoming error event updates the following on the issue:

| What | Notes |
| --- | --- |
| Summary | The message of the latest error |
| Counts | The event count is exact. Session and user counts are estimates: each event is compared with the previous one only, and a different value adds one |
| Last seen | Time, page and stack of the latest event, plus its session and user |
| Releases | The release it first appeared in, the latest one, and every release it has been seen in |

## Status

| Status | Value in the API | Meaning |
| --- | --- | --- |
| Open | `OPEN` | Nobody is assigned yet |
| Assigned | `ASSIGNED` | Assigned to someone |
| Resolved | `RESOLVED` | Someone marked it as resolved |

What each action does to the status:

| Action | Status afterwards |
| --- | --- |
| Assign to someone | Assigned. A resolved issue is reopened by this as well |
| Clear the assignee | Open |
| Mark resolved | Resolved, and the time is recorded. The assignee stays |
| Reopen | Assigned if it has an assignee, otherwise Open |
| The same error shows up again after it was resolved | Reopened automatically and flagged as regressed |

Once set, the regressed flag is never removed automatically; it stays even after the issue is resolved again.

### Release flags

The list has a "New / regressed" column. When a release is entered in the filter bar, it tells how each error relates to that release:

| Flag | Value in the API | Meaning |
| --- | --- | --- |
| New | `NEW` | The error first appeared in this release |
| Regressed | `REGRESSED` | It was resolved and came back, and its latest occurrence is in this release |
| Ongoing | `ONGOING` | It has been seen in this release but is neither of the above |

Without a release, the column only shows "Regressed" for issues that have regressed.

The release comes from `release` passed when the SDK is initialized. Without it, error events carry no release and cannot be filtered by one; see [Install & setup](/en/track/install#options).

## Working in the admin console

<div class="ms-steps">

### Filter down to the issues you want

Pick an application, optionally enter a release in the Release box, choose a status or tick "Regressed only", then click Search. The list is sorted by last seen, newest first.

### Open the detail

Click the view button of a row. The upper half of the detail is the issue itself, including the summary, the counts, the stack and recent releases. The lower half lists the error events of this fingerprint.

### Assign, resolve, reopen

Click Assign and choose a person. After the fix click "Mark resolved", and click Reopen when it needs another look. These three buttons are shown only with the write permission.

### Follow the trail

If the latest occurrence has a session, "Open session replay" shows what the user was doing at that time. "View business user" jumps to User Drilldown, where you can see what this person did before and after.

</div>

## Permissions

| Permission | What it allows |
| --- | --- |
| `sys:track-error:list` | Viewing the list and the detail. It is the same permission as Error Monitoring |
| `sys:track-error-issue:edit` | Assign, mark resolved, reopen |
| `sys:track-replay:view` | Opening the session replay from the detail |

In a role's menu permissions the write permission is a button under Error Monitoring. On upgrade, roles that already have the Error Monitoring permission get it automatically.

## API

All endpoints are under `/system/track/error-issues` and require a login.

| Method | Path | Permission | Parameters |
| --- | --- | --- | --- |
| GET | `/page` | `sys:track-error:list` | `appKey` `release` `status` `assigneeId` `regressedOnly` `pageNum` `pageSize` |
| GET | `/detail` | `sys:track-error:list` | `id` with `appKey`, or `appKey` with `fingerprint` |
| POST | `/assign` | `sys:track-error-issue:edit` | `id` `appKey` `assigneeId`. An empty `assigneeId` unassigns |
| POST | `/resolve` | `sys:track-error-issue:edit` | `id` `appKey` |
| POST | `/reopen` | `sys:track-error-issue:edit` | `id` `appKey` |

Every parameter of `/page` is optional; `pageSize` defaults to 10 and is capped at 500.

The three POST endpoints take their parameters in a JSON request body and return the updated issue on success.

Each row of the list has these fields:

| Field | Notes |
| --- | --- |
| `id` `appKey` `fingerprint` | The issue, the application and the fingerprint |
| `title` | The message of the latest error |
| `status` | `OPEN` `ASSIGNED` `RESOLVED` |
| `assigneeId` `assigneeName` | The assignee. The name is the nickname, or the user name when there is no nickname |
| `firstRelease` `lastRelease` | The releases of the first and the latest occurrence |
| `firstSeenAt` `lastSeenAt` `resolvedAt` | Timestamps in milliseconds |
| `eventCount` `sessionCount` `userCount` | Numbers of events, sessions and users |
| `regressed` | Whether it has ever regressed |
| `releaseFlag` | The release flag, present only when `release` is passed |

The detail adds the information of the latest occurrence in fields that start with `latest`, plus `recentReleases` with the releases it has been seen in.

Reading the detail or performing an action by `id` requires `appKey` as well; an `id` alone finds nothing.

An issue that does not exist, belongs to another tenant or does not match the `appKey` all get the same answer, saying that the issue does not exist or you have no access.

The error events under a fingerprint still come from the Error Monitoring endpoint: `GET /system/track/errors/detail`.

## Where the data lives

Issues are stored in the `track_error_issue` table of the tracking database, one row per fingerprint per application. The table is created by migration T5 of the tracking database, and the write permission is added by migration V18 of the main database.

A failure to update an issue does not affect storing the event; it only leaves a warning in the backend log.

## Next

<div class="ms-cards">

- [Plugins](/en/track/plugins#errors) How errors are collected and how the fingerprint is computed.
- [Install & setup](/en/track/install#options) Pass `release` so that errors carry a release.
- [Privacy](/en/track/privacy) Error messages may contain personal data; how to rewrite them.

</div>
