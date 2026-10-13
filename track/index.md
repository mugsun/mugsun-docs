# 埋点概述

mugsun track 是**嵌入式**的产品行为分析能力：浏览器 SDK [`@mugsun/track-web`](https://www.npmjs.com/package/@mugsun/track-web) 采集 → boot 的 track 模块摄入 → 管理台「埋点分析」看板。采集、存储与分析都在你的部署里，不依赖公有云账号。

<p align="center">
  <img src="/brand/arch/track-iso-zh.jpg" alt="埋点数据流示意" width="100%" />
</p>

## 能力

| 类别 | 内容 | 默认 |
| --- | --- | --- |
| 页面 | 页面浏览 `pageview`、停留 `pageleave`；Vue Router 路由模板聚合 | 开启 |
| 交互 | 全埋点 `autocapture`、有效曝光 `exposure`、`v-track` 声明式指令 | 开启 |
| 质量 | Web Vitals、JS 错误（带 `release` 与指纹） | 开启 |
| 会话回放 | 基于 rrweb，独立入口 `@mugsun/track-web/replay`，按会话采样上传 | 需注册插件且 `replayEnabled` |
| 接口监控 | 请求元数据，可选响应体采集与脱敏 | 需注册插件且开关开启 |
| 圈选埋点 | 管理台下发规则，前端命中即上报 | 需注册插件 |
| 地理位置 | 精确定位上报 | 需注册插件且 `geoEnabled` |

## 看板

管理台「埋点分析」包含数据概览、事件分析、性能分析、错误监控、接入管理、会话回放、用户细查、漏斗分析与留存分析。

以下截图来自本地实跑的 boot + pc，数据由演示商城页面经 `@mugsun/track-web` 0.2.0 真实上报（约 110 个访客，同一天内）。

**数据概览**：浏览量、访客、会话、事件数与平均会话时长、跳出率，下方是 Top 页面和来源、设备、浏览器分布。会话在静默 30 分钟后结算，时长与跳出率只统计已结算会话。概览接口的 `cards.settledSessionCount` 是统计区间内已结算的会话数；它为 0 时时长与跳出率还没定稿，看板显示「—」而不是 0。

![数据概览（演示数据）](/screenshots/track/track-overview.png)

**事件分析**：按事件名汇总次数、会话数与 UV，`$` 开头为内置事件，其余为业务自定义事件或圈选规则产生的事件。

![事件分析（演示数据）](/screenshots/track/track-event.png)

**漏斗分析**：选 2–5 个有序步骤和转化窗口，查看每步人数、相对上一步与总转化率。

![漏斗分析（演示数据）](/screenshots/track/track-funnel.png)

**性能分析**：Web Vitals 各指标的 P75 与分位明细，按阈值标记良好/待改进/差。

![性能分析：限速（类 Fast 3G + 4 倍 CPU 降速）下真实采集的 Web Vitals。INP 只记录耗时 40ms 以上的交互，演示页点击都很轻，所以没有样本，显示「-」。指标由浏览器在限速下真实测得，上报由脚本模拟页面隐藏触发（演示数据）](/screenshots/track/track-perf.png)

**错误监控**：JS 错误按指纹聚合，显示次数、影响会话与首末次时间，可下钻到明细和关联回放。管理台自身接入时不上报已处理的请求错误（业务校验失败、网络失败等已提示给用户的 HttpError），这类失败由接口监控记录。

![错误监控（演示数据）](/screenshots/track/track-error.png)

**留存分析**：新客留存网格。访客首次活跃那天（UTC 日切）进入当天的新客组，表格行是新客日期和人数，列 D+0、D+1……是之后第 N 天又活跃的人数占比，颜色越深留存越高。可选近 7/14/30 天；最多回看 30 天，更早已活跃的人不会被误算成新客。按服务端接收时间分天，客户端时间不参与，所以要有连续多天的真实上报才有 D+1 及以后的数据。这里不放截图：演示数据只有一天，网格里只有 D+0。

会话回放与圈选的截图见
**会话回放**：按会话列出开始时间、时长、页面数（含 SPA 路由切换）、事件数、大小和是否含错误，可只看含错误的会话，点操作列播放。

![会话回放列表（演示数据）](/screenshots/track/track-replay-list.png)
 [插件 · 会话回放](/track/plugins#会话回放) 和 [插件 · 圈选与地理位置](/track/plugins#圈选与地理位置)。

## 可靠性

- 队列默认写入 IndexedDB，断网或刷新后按指数退避补发；队列容量与超龄均有上限。
- 传输降级：`sendBeacon` → `fetch keepalive` → `XHR`；页面隐藏与 `pagehide` 时自动冲刷。
- 每条事件带稳定 `event_id`，服务端幂等去重。
- 构建门禁：`dist/core.js` gzip 不超过 8 KB。

## 服务端端点

| 端点 | 用途 |
| --- | --- |
| `POST /track/collect` | 批量事件摄入（gzip 或明文 JSON） |
| `GET /track/config` | SDK 远端配置下发 |
| `POST /track/replay` | 回放块摄入 |
| `POST /track/api-body` | 接口响应体摄入（独立通道） |
| `POST /track/visual/draft` | 圈选草稿 |

`/track/*` 为匿名端点。`appKey` 在浏览器可见，不是密钥；服务端通过存在性校验、限流、背压与事件校验防护。

## 升级：历史 UV 回填

看板的 UV（独立访客）按设备 ID（`distinct_id`）去重。从 0.1.0 升级后，今天的数据和以后每天新生成的日统计都用这个口径，但升级前已经算好的历史日子还是旧口径，趋势图上过去几天的 UV 会对不上。需要回填一次：

- **改什么**：只改 `track_stats_day` 里 `uv` 与重算结果不一致的行，其它列不动、不新增行；明细已过保留期（当天没有事件）的日子保留原值。
- **先备份**：每改一行，旧值先写入 `track_stats_day_uv_backup`（新迁移 `T2` 建表），按日志里的 `run_id` 可整批还原。
- **可重复执行**：再跑一次时已经一致的行不会再改。
- **范围**：默认最近 90 个闭合日（UTC，不含今天），从昨天往前倒序，用 `MUGSUN_TRACK_UV_BACKFILL_DAYS` 调整（1–3660）。

### 对线上库的影响

- 每个「应用 × 天」一个事务，只扫一次当天明细，事务内 `statement_timeout` 默认 120 秒、`work_mem` 默认 256MB（`MUGSUN_TRACK_UV_BACKFILL_WORK_MEM`）；两天之间默认停 300 毫秒（`MUGSUN_TRACK_UV_BACKFILL_SLEEP_MILLIS`）。
- 某个「应用 × 天」遇到数据库错误（超时 57014，或死锁、锁等待、连接中断等偶发错误）只回滚这一天，WARN 日志带 SQLState，该应用游标不推进、其余日子留到下次，其它应用照常继续。同一个应用的同一天连续超时时，只给这个应用放宽超时（键要加中括号）：

  ```yaml
  mugsun:
    track:
      uv-backfill:
        app-statement-timeout:
          "[MyApp_1]": 600s
  ```
- 默认只在**北京时间 02:00–07:00** 运行，到点自动暂停；进度记在 `track_rollup_cursor`（`job_key = uv_backfill`），下次从断点继续。`MUGSUN_TRACK_UV_BACKFILL_WINDOW_ENABLED=false` 可取消时段限制。
- 使用独立 Redis 锁并逐天续期，多实例同一时刻只有一个在跑；**Redis 不可用时不执行**。

### 上线前实跑

1. 在从库上对一个大应用的一天跑 `EXPLAIN (ANALYZE, BUFFERS)`，先 `SET work_mem = '256MB'`，确认只扫单个月分区。默认库没有 `app_key, received_at` 索引，BRIN 位图扫描或单分区顺序扫描都正常；再看耗时、temp 读写和 shared read，决定要不要加索引。查询语句见 boot 仓库 `docs/upgrade/track-uv-backfill.md`。
2. 用小应用试跑一天：`{"days": 1, "appKey": "小应用"}`；同样参数再跑一次，日志应为「改动 0 行」。
3. 低峰期再按默认 90 天跑全量。

迁移里不建索引。确需索引时，在低峰期对要回填的月分区单独 `CREATE INDEX CONCURRENTLY`，这是只为回填建的单分区临时索引：不挂父表、新分区不会有、回填后删掉。并发建索引失败会留下 INVALID 索引，要查 `pg_index.indisvalid`，为 false 时先 `DROP INDEX CONCURRENTLY` 再重建。详细步骤和 SQL 见 boot 仓库 `docs/upgrade/track-uv-backfill.md`。

### 执行

**高峰期不要打开 `on-startup`。** 二选一：

1. PowerJob 里新建任务，处理器填 `com.mugsun.boot.track.powerjob.TrackUvBackfillProcessor`，**配成每天 02:05 定时运行，直到日志出现 `UV 回填完成`** 再停用。只有全部完成时 PowerJob 结果才是成功；不在时段、到点暂停、锁丢失或有天超时都显示未完成（失败），下次定时会续跑。参数可留空，或写 `{"days": 180}`、`{"days": 30, "appKey": "你的应用"}`。
2. 没有 PowerJob 时，低峰期设 `MUGSUN_TRACK_UV_BACKFILL_ON_STARTUP=true` 重启，日志出现 `UV 回填完成：run_id=...` 后改回 `false`。

### 还原与清理

```sql
-- 还原某一批
UPDATE track_stats_day d SET uv = b.old_uv, update_time = now()
FROM track_stats_day_uv_backup b
WHERE b.run_id = '日志里的 run_id' AND d.id = b.stats_day_id;

-- 确认无误后清理备份
DELETE FROM track_stats_day_uv_backup WHERE backup_time < now() - interval '30 days';
```

## 下一步

[安装与初始化](/track/install) → [第一个事件](/track/first-event) → [插件](/track/plugins) → [隐私与合规](/track/privacy)
