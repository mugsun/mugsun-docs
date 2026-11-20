# Ask analytics

Ask data lets you query your own tracking data with one sentence, such as asking for an overview of the last 7 days. It is read-only: it writes nothing to the database and generates no SQL.

The page is under Tracking → Ask data. It has nothing to do with dataset Q&A or chat in the AI center, and it works without the AI module.

## How it answers

<div class="ms-flow ms-flow--3">

1. It works out from the question which kind of data you want. This step is called intent detection.
2. It calls the analysis API for that intent, the same one the analysis pages use.
3. It turns the result into a summary, metrics, a chart or a table.

</div>

Every number comes from the analysis API. The model takes part in the first step only, and only decides the intent; it cannot fill in any number.

| Situation | How the intent is detected |
| --- | --- |
| The AI module is not installed | Keyword rules |
| The AI module is installed and a default chat model is set | The model is asked first. When it cannot decide, keyword rules take over and the result carries a warning |
| The AI module is installed but disabled, or has no default chat model | Keyword rules, and every result carries a warning that the model call failed |

Only the question text and the selected number of days are sent to the model. Tracking data is never sent.

## What you can ask

| What you want | Intent | Result | Permission also needed |
| --- | --- | --- | --- |
| Funnel | `funnel` | Raw data | `sys:track-funnel:list` |
| Retention | `retention` | Raw data | `sys:track-retention:list` |
| Performance metrics | `vitals` | Table | `sys:track-perf:list` |
| Errors | `errors` | Table, first 20 groups | `sys:track-error:list` |
| People online now | `online` | Metrics | `sys:track-overview:list` |
| Regions | `geo` | Raw data | `sys:track-overview:list` |
| Top pages | `pages` | Table | `sys:track-overview:list` |
| Events | `events` | Table, first 20 kinds | `sys:track-event:list` |
| Trend | `trend` | Trend chart | `sys:track-overview:list` |
| Overview | `overview` | Metrics | `sys:track-overview:list` |

The keyword rules know the words below, with the intent on the left:

```text
funnel      漏斗 转化漏斗 转化步骤
retention   留存 回访
vitals      性能 加载 卡顿 vitals LCP INP CLS FCP TTFB
errors      错误 报错 异常 崩溃 fingerprint
online      在线 此刻多少人
geo         地域 地理 省份 热力 地图
pages       页面排行 热门页面 页面访问 页面榜
events      事件分析 事件列表 事件统计 自定义事件, or 事件 followed by an event name
trend       趋势 曲线 走势 按天 按日 时间序列
overview    概览 总览 PV UV 访问量 多少人 会话数 跳出
```

When a sentence has words of several kinds, the one higher in the list wins. The rules only know Chinese words, so ask in Chinese unless a model does the detection; a model is not limited to these words.

Here are a few questions that work as they are:

```text
最近 7 天概览
今日在线人数
热门页面
最近有哪些报错
事件 order_submit 的情况
漏斗：view,submit,done
```

A funnel question has to list the event names of at least two steps, separated by commas. A question that cannot be answered is not an error; the page suggests trying another wording.

### Time range

Pick the time range with Today, Last 7 days or Last 30 days at the top of the page. The page always sends the selected number of days to the backend, so a number of days written in the question has no effect.

Only when you call the API directly without `days` is the number of days taken from the question, with 7 days as the fallback:

```text
近 N 天          N, 1 to 90
今天 今日         1
本周 一周 七天     7
一个月 三十天      30
```

## Using it in the admin console

<div class="ms-steps">

### Pick an application and a time range

Ask data works per application. Pick the application at the top first, then the time range.

### Type a question

A question can be up to 500 characters. Press Enter or click Ask to submit.

### Read the result

The Result card starts with a one-sentence summary and shows the detected intent under it. Below that come metrics, a trend chart, a table or raw data, depending on the type of the result.

### Open a replay

Related replays at the bottom lists the latest session replays of this application, the ones with errors first, five at most. Click "Open replay" to go to the Session Replay page.

</div>

## Permissions

The entry permission is `sys:track-ask:list`. Once the intent is known, the backend also checks the view permission of that kind of data, which is the last column of the table above.

| Situation | Result |
| --- | --- |
| No entry permission | The top of the page says the permission is missing, and no request is sent |
| Entry permission, but no permission for that kind of data | This question returns a no-permission error |
| No `sys:track-replay:list` | The result is shown as usual, and Related replays says there is no replay permission |

On upgrade, roles that already have the Overview permission get the entry permission automatically.

## API

`POST /system/track/ask` requires a login and `sys:track-ask:list`. The request body is JSON:

```json
{
  "appKey": "your-app-key",
  "question": "最近 7 天概览",
  "days": 7
}
```

| Parameter | Required | Notes |
| --- | --- | --- |
| `appKey` | Yes | The AppKey of the application |
| `question` | Yes | The question, up to 500 characters |
| `days` | No | 1 to 90. When passed, it takes precedence |

Fields of the response:

| Field | Notes |
| --- | --- |
| `intent` | The detected intent, or `unsupported` when it cannot be detected |
| `params` | The detected parameters, such as `days` and `steps` |
| `resultType` | `metrics` `series` `table` `raw` `unsupported` |
| `summary` | A one-sentence summary |
| `metrics` `series` `table` `raw` | The result itself. The one matching `resultType` is filled, and `raw` sometimes comes along |
| `replays` | Up to 5 replays, each with `sessionId` `startTime` `entryPath` `hasError` `durationMs` |
| `replayEmpty` `replayDenied` | No replays; no permission to list replays |
| `warnings` | Warnings, for example that rules were used after the model call failed |
| `source` | Always `track-analysis` |

A question that cannot be detected still returns HTTP 200, with `resultType` set to `unsupported` and a suggestion for another wording in `summary`.

The summary and the warnings are generated by the backend in Chinese, also when the console is in English.

## Viewing the page without a backend

When developing the admin console, set the environment variable `VITE_TRACK_ASK_MOCK` to `true` and the page uses local fake data instead. It only works in development mode and has no effect after a build.

## Next

<div class="ms-cards">

- [AI center](/en/pc/ai-center) Set a default chat model so that Ask data detects intents with a model.
- [Error issues](/en/track/error-issues) Assign the errors you find to someone and follow them until they are fixed.
- [Spatial behavior](/en/track/spatial) See on a map where events happen.

</div>
