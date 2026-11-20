# 问数据

「问数据」让你用一句中文查自己的埋点数据，比如「最近 7 天概览」。它只读，不写库，也不生成 SQL。

页面在「埋点分析 → 问数据」。它和 AI 中心的数据集问数、对话没有关系，没装 AI 模块也能用。

## 它是怎么回答的

<div class="ms-flow ms-flow--3">

1. 从问题里判断你想看哪一类数据，这一步叫识别意图。
2. 按意图调用对应的分析接口，和各个分析页面用的是同一套。
3. 把结果整理成摘要、指标、图表或表格。

</div>

数字全部来自分析接口。模型只参与第一步，而且只负责判断意图，它填不了任何数字。

| 情况 | 怎么识别意图 |
| --- | --- |
| 没装 AI 模块 | 用关键词规则 |
| 装了 AI 模块，也设了默认对话模型 | 先问模型。模型判断不了时改用关键词规则，结果里带一条提示 |
| 装了 AI 模块，但没启用或没有默认对话模型 | 用关键词规则，每次结果里带一条模型调用失败的提示 |

发给模型的只有问题原文和所选的天数，埋点数据不会发出去。

## 能问什么

| 想看的 | 意图 | 结果 | 还需要的权限 |
| --- | --- | --- | --- |
| 漏斗 | `funnel` | 原始数据 | `sys:track-funnel:list` |
| 留存 | `retention` | 原始数据 | `sys:track-retention:list` |
| 性能指标 | `vitals` | 明细 | `sys:track-perf:list` |
| 错误 | `errors` | 明细，前 20 组 | `sys:track-error:list` |
| 当前在线人数 | `online` | 指标 | `sys:track-overview:list` |
| 地域分布 | `geo` | 原始数据 | `sys:track-overview:list` |
| 热门页面 | `pages` | 明细 | `sys:track-overview:list` |
| 事件 | `events` | 明细，前 20 种 | `sys:track-event:list` |
| 趋势 | `trend` | 趋势图 | `sys:track-overview:list` |
| 概览 | `overview` | 指标 | `sys:track-overview:list` |

关键词规则认下面这些词，左边是意图：

```text
funnel      漏斗 转化漏斗 转化步骤
retention   留存 回访
vitals      性能 加载 卡顿 vitals LCP INP CLS FCP TTFB
errors      错误 报错 异常 崩溃 fingerprint
online      在线 此刻多少人
geo         地域 地理 省份 热力 地图
pages       页面排行 热门页面 页面访问 页面榜
events      事件分析 事件列表 事件统计 自定义事件，或者「事件」后面跟事件名
trend       趋势 曲线 走势 按天 按日 时间序列
overview    概览 总览 PV UV 访问量 多少人 会话数 跳出
```

一句话里有好几类的词时，排在上面的优先。用模型识别时不受这些词限制。

下面是几个能直接用的问法：

```text
最近 7 天概览
今日在线人数
热门页面
最近有哪些报错
事件 order_submit 的情况
漏斗：view,submit,done
```

漏斗要在后面写出至少两个步骤的事件名，用逗号隔开。问不了的问题不会报错，页面会提示换一种问法。

### 时间范围

时间范围用页面上方的「今天」「近 7 天」「近 30 天」选。页面每次都把选中的天数带给后端，问题里写的天数不起作用。

直接调接口又不传 `days` 时，才从问题里取天数，取不到就按 7 天：

```text
近 N 天          N，1 到 90
今天 今日         1
本周 一周 七天     7
一个月 三十天      30
```

## 在后台使用

<div class="ms-steps">

### 选应用和时间范围

问数据按应用分开。先在上方选应用，再选时间范围。

### 输入问题

问题最多 500 字。按回车或者点「提问」提交。

### 看结果

「结果」卡片先给一句摘要，下面标着识别出的意图。再往下按结果的类型显示指标、趋势图、明细表或原始数据。

### 打开回放

最下面的「相关回放」列出这个应用最近的会话回放，带错误的排在前面，最多 5 条。点「打开回放」跳到会话回放页。

</div>

## 权限

入口权限是 `sys:track-ask:list`。识别出意图以后，后端还会检查这类数据本身的查看权限，也就是上面表格的最后一列。

| 情况 | 结果 |
| --- | --- |
| 没有入口权限 | 页面顶部提示缺少权限，不发请求 |
| 有入口权限，没有这类数据的权限 | 这次提问返回无权限的错误 |
| 没有 `sys:track-replay:list` | 结果照常显示，「相关回放」提示没有回放权限 |

升级时，已经有数据概览权限的角色会自动拿到入口权限。

## 接口

`POST /system/track/ask`，要登录，要有 `sys:track-ask:list`。请求体是 JSON：

```json
{
  "appKey": "your-app-key",
  "question": "最近 7 天概览",
  "days": 7
}
```

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `appKey` | 是 | 应用的 AppKey |
| `question` | 是 | 问题，最多 500 字 |
| `days` | 否 | 1 到 90。传了就以它为准 |

响应里的字段：

| 字段 | 说明 |
| --- | --- |
| `intent` | 识别出的意图。识别不了时是 `unsupported` |
| `params` | 识别出的参数，比如 `days` 和 `steps` |
| `resultType` | `metrics` `series` `table` `raw` `unsupported` |
| `summary` | 一句摘要 |
| `metrics` `series` `table` `raw` | 结果本身。按 `resultType` 填对应的一个，`raw` 有时会一起带上 |
| `replays` | 最多 5 条回放，每条带 `sessionId` `startTime` `entryPath` `hasError` `durationMs` |
| `replayEmpty` `replayDenied` | 没有回放；没有回放列表的权限 |
| `warnings` | 提示，比如模型调用失败后改用了规则 |
| `source` | 固定是 `track-analysis` |

识别不了的问题也返回 HTTP 200，`resultType` 是 `unsupported`，`summary` 里是换个问法的建议。

摘要和提示是后端生成的中文，英文界面下也是中文。

## 没有后端时看页面

开发管理后台时，把环境变量 `VITE_TRACK_ASK_MOCK` 设成 `true`，页面会改用本地的假数据。它只在开发模式下有效，打包后不起作用。

## 下一步

<div class="ms-cards">

- [AI 中心](/pc/ai-center) 配置默认对话模型，让问数据用模型识别意图。
- [错误问题单](/track/error-issues) 把查到的错误指派给人，跟到解决。
- [空间行为](/track/spatial) 在地图上看事件发生在哪里。

</div>
