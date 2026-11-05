# Ask analytics

The console page **Analytics → Ask** answers natural-language questions
against your own track data (read-only).

Route: `/track/ask` (menu **Ask**, icon `ri:chat-search-line`).

Pick an app and day window, type a question, and the server extracts an
intent then orchestrates existing analysis APIs.

Numbers come only from TrackAnalysis / Funnel / Retention.
Nothing is written; there is no NL2SQL.

This page is unrelated to AI dataset Q&A or the generic Chat product.

## Supported intents

| Intent | Meaning | Second permission |
| --- | --- | --- |
| `overview` | Overview cards (PV/UV, …) | `sys:track-overview:list` |
| `trend` | Daily or hourly trend | `sys:track-overview:list` |
| `pages` | Top pages | `sys:track-overview:list` |
| `online` | Current online users | `sys:track-overview:list` |
| `geo` | Geo breakdown | `sys:track-overview:list` |
| `events` | Event list | `sys:track-event:list` |
| `vitals` | Web Vitals | `sys:track-perf:list` |
| `errors` | Error fingerprints | `sys:track-error:list` |
| `funnel` | Funnel (needs step event names) | `sys:track-funnel:list` |
| `retention` | Retention | `sys:track-retention:list` |
| `unsupported` | Not recognized; HTTP still 200 | — |

Examples: “last 7 days overview”, “how many online now”,
“funnel: view,submit,done”.

Funnels need at least two step event names (e.g. `漏斗：a,b,c`).

Default window is 7 days; allowed range is 1–90 (same as analysis).

## Console

1. Pick an app (`appKey`) and days (today / last 7 / last 30).
2. Enter a question (max 500 characters) and submit.
3. Render by `resultType`: summary, metric cards, line chart, table, or raw.
4. Related replays: at most 5 (errors first); open the replay page.
5. Without the entry permission, show a banner and do not call the API.

Replay navigation: `/track/replay?sessionId=…&appKey=…`.

Without replay list permission the response sets `replayDenied=true`,
distinct from an empty replay list.

### Local mock (dev only)

By default the page calls the real `POST /api/system/track/ask`.

Local same-shape mock runs only when both `import.meta.env.DEV` and
`VITE_TRACK_ASK_MOCK=true` are set.

In production builds `DEV` is always false, so the mock branch is dropped.

## API

| Item | Detail |
| --- | --- |
| Method / path | `POST /system/track/ask` |
| Common gateway prefix | `/api/system/track/ask` |
| Entry permission | `sys:track-ask:list` (login required) |
| Second check | Re-check the table permission for `intent` |
| Body | `appKey`, `question` (required); optional `days` 1–90 |

### Response highlights

| Field | Meaning |
| --- | --- |
| `intent` / `params` | Parsed intent and params (`days`, `steps`, …) |
| `source` | Always `track-analysis` |
| `resultType` | `metrics` / `series` / `table` / `raw` / `unsupported` |
| `summary` | Human summary; numbers from analysis services |
| `metrics` / `series` / `table` / `raw` | Filled by type; others usually null |
| `replays` | ≤5; each has `sessionId`, `appKey`, … |
| `replayEmpty` / `replayDenied` | No data / no replay permission |
| `warnings` | e.g. LLM failed; fell back to rules |

`series` is analysis trend rows: `[{date|time, pv, uv, …}]`,
not `{name, points}`.

Cross-tenant or inaccessible apps use the same “app not found” wording
as other analysis APIs.

`unsupported` still returns a successful business code and guides a
rephrase; it is not a 4xx.

## Intent vs numbers

1. Prefer an LLM intent extract when the ask gateway is wired;
   otherwise (or on failure) use the rule parser.
2. The LLM may emit only `intent` / `params` — never metrics.
3. Numbers come only from `TrackAnalysisService`,
   `TrackFunnelService`, and `TrackRetentionService`.
4. This cut does not add NL2SQL or arbitrary SQL.
5. On LLM failure, append `warnings` and fall back to rules;
   never invent partial numbers.

Entry permission is seeded by main-DB migration **V19**.

Roles that already have `sys:track-overview:list` also receive the ask entry.

## Related

- [Analytics overview](/en/track/)
- [Error issues](/en/track/error-issues)
- [Install & setup](/en/track/install) (`release`)
