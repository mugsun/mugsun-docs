# 问数据

管理台「埋点分析 → 问数据」用自然语言只读查询自家埋点。

路径：`/track/ask`（菜单「问数据」，图标 `ri:chat-search-line`）。

选应用与天数后输入中文问题，服务端抽意图并编排既有分析接口。

数字只来自 TrackAnalysis / Funnel / Retention，不写库、不做 NL2SQL。

与 AI 数据集问数、通用 Chat 无关。

## 能问什么

| 意图 `intent` | 含义 | 二次权限 |
| --- | --- | --- |
| `overview` | 概览卡片（PV/UV 等） | `sys:track-overview:list` |
| `trend` | 按天或按小时趋势 | `sys:track-overview:list` |
| `pages` | 热门页面 | `sys:track-overview:list` |
| `online` | 当前在线人数 | `sys:track-overview:list` |
| `geo` | 地域分布 | `sys:track-overview:list` |
| `events` | 事件列表 | `sys:track-event:list` |
| `vitals` | Web Vitals | `sys:track-perf:list` |
| `errors` | 错误指纹 | `sys:track-error:list` |
| `funnel` | 漏斗（须步骤事件名） | `sys:track-funnel:list` |
| `retention` | 留存 | `sys:track-retention:list` |
| `unsupported` | 未识别；HTTP 仍 200 | — |

示例：「最近 7 天概览」「今日在线人数」「漏斗：view,submit,done」。

漏斗须至少 2 个步骤事件名；可写「漏斗：a,b,c」。

天数默认 7，范围 1–90（与分析窗一致）。

## 管理台

1. 选应用（`appKey`）与天数（今日 / 近 7 天 / 近 30 天）。
2. 输入问题（最多 500 字）后提交。
3. 按 `resultType` 展示摘要、指标卡、折线、表格或 raw。
4. 相关回放最多 5 条（有错优先）；可跳回放页。
5. 无入口权时页顶提示，不发请求。

回放跳转：`/track/replay?sessionId=…&appKey=…`。

无回放列表权时响应 `replayDenied=true`，与「暂无回放」区分。

### 本地 mock（仅开发）

默认打真接口 `POST /api/system/track/ask`。

仅同时满足 `import.meta.env.DEV` 与
`VITE_TRACK_ASK_MOCK=true` 时走本地同形假数据。

生产构建中 `DEV` 恒为 false，mock 分支不进产物。

## API

| 项 | 说明 |
| --- | --- |
| 方法 / 路径 | `POST /system/track/ask` |
| 网关常见前缀 | `/api/system/track/ask` |
| 入口权限 | `sys:track-ask:list`（须登录） |
| 二次鉴权 | 按 `intent` 再校验上表读权 |
| Body | `appKey`、`question`（必填）；`days` 可选 1–90 |

### 响应要点

| 字段 | 说明 |
| --- | --- |
| `intent` / `params` | 解析出的意图与参数（如 `days`、`steps`） |
| `source` | 固定 `track-analysis` |
| `resultType` | `metrics` / `series` / `table` / `raw` / `unsupported` |
| `summary` | 人话摘要；数字来自分析服务 |
| `metrics` / `series` / `table` / `raw` | 按类型择一填充，其余多为 null |
| `replays` | ≤5；元素含 `sessionId`、`appKey` 等元数据 |
| `replayEmpty` / `replayDenied` | 无数据 / 无回放权 |
| `warnings` | 如 LLM 失败已降级规则解析 |

`series` 为分析趋势行：`[{date|time, pv, uv, …}]`，不是 `{name, points}`。

跨租户或无权应用与分析同口径，提示「应用不存在」。

`unsupported` 仍业务码成功，引导换问法，不抛 4xx。

## 意图与数字边界

1. 优先 LLM 抽意图（若装配了问数据网关）；失败或不可用则规则解析。
2. LLM **只**产 `intent` / `params`，禁止填指标。
3. 数字只调用既有 `TrackAnalysisService`、`TrackFunnelService`、
   `TrackRetentionService`。
4. 本刀不做 NL2SQL，不开放任意 SQL。
5. LLM 失败写入 `warnings` 后降级规则，不半截编造数。

入口权由主库迁移 **V19** 写入菜单与权限。

已有 `sys:track-overview:list` 的角色会补授入口权。

## 相关页面

- [埋点概述](/track/)
- [错误问题单](/track/error-issues)
- [安装与初始化](/track/install)（`release`）
