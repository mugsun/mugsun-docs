# Error issues

The console page **Analytics → Error issues** is a fingerprint-aggregated workflow:
list, detail, assign, resolve and reopen.
It is separate from the Error monitor event stream and does not replace fingerprint grouping.

On ingest of `$error` events the server upserts an issue by `appKey + fingerprint`.
There is no workflow-engine auto-create.

## Status and release flags

| Field | Values | Meaning |
| --- | --- | --- |
| `status` | `OPEN` / `ASSIGNED` / `RESOLVED` | Unassigned / assigned / resolved |
| `releaseFlag` | `NEW` / `REGRESSED` / `ONGOING` | Only when the list is filtered by `release` |
| `regressed` | boolean | Same fingerprint returned after it was resolved |

`releaseFlag` is relative to the filter value:

- `NEW`: `firstRelease` equals the filter (first seen on that release)
- `REGRESSED`: regressed, and `lastRelease` equals the filter
- `ONGOING`: matches the filter but is neither of the above

Without a `release` filter the response has no `releaseFlag`.

If a RESOLVED issue sees the same fingerprint again: set `regressed`, reopen and clear `resolvedAt`;
`ASSIGNED` when an assignee remains, otherwise `OPEN`.

## Console actions

Route: `/track/error-issue` (menu **Error issues**).

1. Pick an app (`appKey`); optionally filter by `release` / status / assignee / regressed only.
2. Open detail: fingerprint, release range, latest stack and related error events.
3. With write permission: assign, mark resolved or reopen.
4. From detail, open the latest session replay when `sys:track-replay:view` is granted and `latestSessionId` is present.
5. Jump to **User lookup** with query params when `latestUserId` or `latestDistinctId` is present.

Empty `assigneeId` clears the assignee.
Assigning a RESOLVED issue reopens it: with an assignee → `ASSIGNED`, clear → `OPEN`, and clears `resolvedAt`.
Manual reopen: `ASSIGNED` if assigned, otherwise `OPEN`; does not clear `regressed`.

Related events still use `/system/track/errors/detail`, not a new error-issues path.

## API

Prefix: `/system/track/error-issues` (console calls often go through `/api/system/track/error-issues`).

| Method | Path | Permission | Notes |
| --- | --- | --- | --- |
| GET | `/page` | `sys:track-error:list` | Page; filters appKey / release / status / assigneeId / regressedOnly |
| GET | `/detail` | `sys:track-error:list` | Detail; see appKey rules below |
| POST | `/assign` | `sys:track-error-issue:edit` | body: `id`, `appKey`, `assigneeId` (nullable) |
| POST | `/resolve` | `sys:track-error-issue:edit` | body: `id`, `appKey` |
| POST | `/reopen` | `sys:track-error-issue:edit` | body: `id`, `appKey` |

### Anti-IDOR: detail and writes require appKey

- Looking up by `id` or any write requires `appKey` as well; the server checks tenant + appKey and rejects id-only access.
- Detail may also use `appKey + fingerprint` without `id`.
- The console always sends the current app's `appKey` on detail / assign / resolve / reopen; it does not call without it.

Read permission reuses Error monitor `sys:track-error:list`.
Write permission is `sys:track-error-issue:edit` (main-DB migration V18; button under Error monitor, granted to roles that already had the read permission).

## Data and release linkage

Tracking-DB migration **T5** creates `track_error_issue` (unique on `app_key + fingerprint`).
Columns include `first_release` / `last_release` / `releases` (JSON text array), and more.

Pass `options.release` when initializing the SDK so error events carry the version;
issues associate releases and can be filtered by them.
When omitted the field is not sent. See [Install & setup](/en/track/install#options).

## Related

- [Install & setup](/en/track/install) (`release`)
- [Plugins · Errors](/en/track/plugins) (fingerprint rules)
- [Analytics overview](/en/track/)
