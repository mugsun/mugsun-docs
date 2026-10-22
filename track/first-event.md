# 第一个事件

目标：从接入到在管理台看板看到**至少一条**事件。

## 前置条件

- boot 已运行，且 track 模块启用（默认 profile `full` 包含；未设置 `MUGSUN_TRACK_ENABLED=false`）
- 能登录管理台（见 [快速开始](/guide/getting-started)）

## 步骤

1. **创建应用**：管理台进入「埋点分析 → 接入管理」，新建应用，复制 `appKey`。
2. **初始化 SDK**：

   ```ts
   import { createTracker } from '@mugsun/track-web'

   const track = createTracker({
     endpoint: 'http://localhost:8080',
     appKey: '<appKey>',
     debug: true, // 控制台输出 SDK 日志，排查完再关
   })
   ```

3. **触发事件**：刷新页面产生 `pageview`，或手动调用：

   ```ts
   track.track('first_event', { source: 'docs' })
   await track.flush() // 不等批量阈值，立即发送
   ```

4. **核对**：浏览器网络面板中 `POST /track/collect` 返回 2xx；在「埋点分析 → 事件分析」选择该应用，列表与下方「实时事件流」出现新事件。

   ![事件分析（演示数据）](/screenshots/track-event.png)

## 没看到事件？

| 现象 | 排查 |
| --- | --- |
| 没有任何 `/track/collect` 请求 | 浏览器开启了 Do Not Track（`respectDnt` 默认 `true`），或设了 `respectGpc: true` 且浏览器开启了 Global Privacy Control；或调用过 `optOut()`；或 `enabled: false` / 采样率为 0 |
| 请求地址是 `…/track/collect/track/collect` | `endpoint` 只填服务根地址，SDK 会自动拼接 `/track/collect` |
| 请求 4xx | `appKey` 不存在或应用被停用；在接入管理中核对 |
| 请求成功但看板为空 | 确认看板选中了正确的应用与时间范围 |
| 仍不确定 | 运行 [接入自检](#接入自检)，并查看管理端 [接入健康](#管理端-接入健康) 的拒绝原因 |

## 接入自检

在浏览器控制台运行：

```ts
const report = await tracker.selfCheck()
console.table(report.items)
```

报告结构为 `{ status, at, sdkVersion, items }`，`status` 取最差一项。每项 `{ id, status: 'ok' | 'warn' | 'fail', message, fix }`：

| `id` | 检查内容 |
| --- | --- |
| `config.endpoint` / `config.appKey` | endpoint 是否合法 http(s)、是否误带 `/track` 路径、HTTPS 页面是否上报到 HTTP；appKey 格式 |
| `config.conflict` / `config.enabled` | 冲突选项（如 `batchSize > maxBatchSize`、开启接口监控却未加载 `api-monitor`）；总开关 |
| `ping` | 真实请求一次 `GET /track/config?app_key=`（不带 cookie，5 秒超时）：网络/CORS、应用不存在、应用已停用 |
| `sampling` / `consent` | 采样率与本机是否在样本内；DNT、GPC、`optOut()` |
| `privacy` | 隐私默认值是否被关闭（如开启响应体采集却关闭脱敏） |
| `queue` | 本地队列积压（≥80% 告警） |
| `replay` | 开启回放但未加载回放插件 |
| `filters` | 是否配置了 `beforeSend` / `ignoreErrors` / `skipHandledErrors` |

自检不发送任何用户数据，也不写入事件队列；提示文案为中文。自检实现由 `createTracker` 注入，不计入 core 入口体积；只用 `@mugsun/track-web/core` 时需自行注入 `deps.selfCheck = runSelfCheck`。

## 管理端：接入健康

「埋点应用」页的 **接入健康** tab 按应用展示：

- **最近收到事件**：相对时间（悬停看具体时间）。超过 24 小时未收到显示告警；从未收到时提示运行 `selfCheck()`。没有实时记录时按事件定义的最近出现时间估算，并标注出来。
- 页面顶部提示计数可能包含非 SDK 来源的请求。
- **近 7 天拒绝原因**：失败 / 告警计数，点「拒绝原因」查看每个原因码的今日与 7 天次数、最近一次时间与服务端信息，以及修复建议。

SDK 上报地址带 `?app_key=`（`{endpoint}/track/collect?app_key=…`），请求体无法解析或超限被拒时，服务端仍能把原因归到对应应用。只记录已存在应用的拒绝，未知 appKey 不落记录。

::: warning 计数可被伪造
拒绝计数按请求里的 appKey 归属，而 appKey 在浏览器中公开。任何人都可以用你的 appKey 发送坏请求，让计数上涨，因此计数可能包含并非来自 SDK 的请求。这只会造成误报，不能借此读取数据，也不影响已入库的事件。判断时请结合 SDK 的 `selfCheck()`。
:::

对应接口（需应用查看权限，按租户隔离）：

| 接口 | 返回 |
| --- | --- |
| `GET /system/track/app/health/summary` | 本租户每个应用：`appKey`、`appName`、`enabled`、`lastReceivedAt`、`lastReceivedSource`（`redis` / `event_def` / `null`）、`staleAfterMs`、`fail7d`、`warn7d`、`topCodes` |
| `GET /system/track/app/health?appKey=` | 同上（无 `topCodes`）加 `reasons[]`：`code`、`severity`（`fail` / `warn`）、`description`、`suggestion`、`today`、`last7d`、`lastAt`、`lastMessage` |

原因码：`APP_DISABLED`、`BAD_PAYLOAD`、`PAYLOAD_TOO_LARGE`、`SCHEMA_ERROR`、`BAD_EVENT_NAME`、`EVENT_DISABLED`、`TS_ABSURD`、`CLOCK_SKEWED`、`RATE_LIMITED`、`BATCH_TRUNCATED`、`QUEUE_FULL`、`IDENTIFY_REJECTED`、`TENANT_MISMATCH`、`REPLAY_DISABLED`、`REPLAY_TOO_LARGE`、`API_BODY_DISABLED`、`API_BODY_TOO_LARGE`、`SERVER_BUSY`。服务端不做来源域名或签名校验，因此没有对应原因码。计数保存在 Redis，按天分桶保留 8 天。

## 下一步

[插件](/track/plugins) · [隐私与合规](/track/privacy)
