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

**错误监控**：JS 错误按指纹聚合，显示次数、影响会话与首末次时间，可下钻到明细和关联回放。

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

## 看板趋势

概览的访问趋势选 3 天以上时按天画点，横轴固定是所选范围内的每一天。某天没有数据时按 0 画出，不会跳过（[mugsun-boot #28](https://github.com/mugsun/mugsun-boot/pull/28) 起）。选 1–2 天时按 5 分钟画点，只画有数据的时段。

趋势图和错误监控列表按租户时区切日，「今天」从当地 0 点开始（[mugsun-boot #31](https://github.com/mugsun/mugsun-boot/pull/31) 起，之前按 UTC 切日，UTC+8 下要到早上 8 点才算新的一天）。没配置时用 `Asia/Shanghai`，可以整体改，也可以按租户编号单独设：

```yaml
mugsun:
  track:
    timezone:
      default-zone: Asia/Shanghai   # 或环境变量 MUGSUN_TRACK_TIMEZONE
      tenants:
        "[000000]": Asia/Shanghai   # 键要加中括号和引号
```

[mugsun-boot #36](https://github.com/mugsun/mugsun-boot/pull/36) 起，概览卡片、页面、性能、漏斗、留存也按同一时区切日，所有看板的「今天」都从当地 0 点开始。

口径变化：

- **UV**：日趋势里每天的 UV 是这个当地日内的去重设备数（`distinct_id`）。之前按 UTC 日统计；维度趋势（事件、页面等）不指定维度值时，之前是把各维度值的 UV 相加，同一设备访问多个页面会被重复计，现在按设备去重。概览卡片的 UV 一直是整个区间按设备去重，不变。
- **会话数**：概览卡片的会话数是每个当地日的活跃会话数之和。
- **漏斗**：时间窗从「最近 N×24 小时」的滚动窗口改为从第一天的当地 0 点算起。选「近 1 天」就是今天 0 点到现在，当地清晨看到的数字会比以前小。
- **留存**：首访日和回访日都按当地日期算，23:59 首访、次日 00:01 再来算第 2 天留存。

时区不是 UTC 时，日趋势、概览卡片和性能直接按明细统计（按日汇总表是按 UTC 日算的），数据量大时比读汇总表慢一些。

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

## 升级：用户时间线索引（T3 / T4）

用户细查时间线按发生时间 `(ts, id)` 倒序翻页，需要两条新索引：`idx_event_user_ts_timeline (app_key, user_id, ts, id)` 和 `idx_event_distinct_ts_timeline (app_key, distinct_id, ts, id)`。`track_event` 是按月分区的父表，所以分两步建：

- **T3**（SQL 迁移）：只在父表上 `CREATE INDEX … ON ONLY track_event`，不扫数据、不锁写，瞬间完成。这时父索引是 invalid。
- **T4**（Java 迁移，不在事务内执行）：启动时只处理**空分区**，比如提前建好的下月分区和 default 分区。空分区上 `CREATE INDEX CONCURRENTLY`，确认 `pg_index.indisvalid` 为 true 后 `ATTACH PARTITION` 到父索引。**有数据的存量分区一律跳过，启动时不会同步建大索引。** T4 不会让启动失败：拿不到锁、出错或还有分区没补，都只写 WARN 日志并列出分区名。
- **后台补建**：存量分区由后台任务在低峰期逐个补建，由分区维护任务的每小时调度触发，单独线程执行，不占调度线程。全部分区挂齐后，父索引自动变为 valid。补建期间查询照常可用：已补好的分区走新索引，没补到的分区走 T1 的旧索引。
- **旧索引**：T1 的 `idx_event_user_timeline` 和 `idx_event_distinct_timeline` 保留，本次不删。

### 配置

```yaml
mugsun:
  track:
    timeline-index:
      backfill-enabled: true   # MUGSUN_TRACK_TIMELINE_INDEX_BACKFILL_ENABLED
      pause-millis: 5000       # 两个分区之间停多久
      window-enabled: true     # MUGSUN_TRACK_TIMELINE_INDEX_WINDOW_ENABLED
      window-start: "02:00"
      window-end: "06:00"
      window-zone: Asia/Shanghai
```

- `backfill-enabled=false` 时不补存量分区。新分区和空分区仍由 T4 和分区维护任务处理。想自己在维护窗口手工建索引时，可以关掉它。
- 只在运行时段内**开始**新分区；已经开始的分区会建完，可能超出 `window-end`。
- 每补完一个分区，在 `track_rollup_cursor` 写一行（`job_key = timeline_index`，`app_key` 为分区名）。中断后下次从 `pg_index` 的现状接着补；中断留下的 invalid 索引会先 `DROP INDEX CONCURRENTLY` 再重建。
- T4、后台补建和分区维护任务共用一把 PG 会话级 advisory 锁（`hashtext('track_timeline_index')`），多实例同一时刻只有一个在建。

### 预计耗时

每个分区建两条索引，各需对分区做两遍扫描，耗时大致与分区大小成正比。在 Mac mini 上、空闲的 PG 16 中，300 万行（507 MB）的月分区：`user_id` 索引 27 秒，`distinct_id` 索引 11 秒，合计约 40 秒。按这个比例，1 亿行的月分区约 20–30 分钟；线上有写入负载时会更慢，以日志 `时间线索引后台补建：分区 … 完成（… ms）` 的实际耗时为准。建索引期间会多占一份索引大小的磁盘空间和 IO。

### 连接要求

埋点库的 Flyway 和上面的 advisory 锁都是**会话级**锁，所以埋点库连接要直连 PostgreSQL，或使用 PgBouncer **session** 模式。**不支持 PgBouncer transaction pooling。** 多实例同时启动时，后启动的实例最多等迁移锁约 10 分钟（`lockRetryCount = 600`）。

### 检查进度

父索引的状态（`indisvalid = t` 表示所有分区都已挂齐）：

```sql
SELECT c.relname AS parent_index, x.indisvalid
FROM pg_index x JOIN pg_class c ON c.oid = x.indexrelid
WHERE c.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline');
```

每条父索引已挂接的子索引（按 `pg_inherits` 查，不靠名字猜）：

```sql
SELECT p.relname AS parent_index, t.relname AS partition, ci.relname AS child_index, x.indisvalid
FROM pg_inherits i
JOIN pg_class p  ON p.oid = i.inhparent
JOIN pg_class ci ON ci.oid = i.inhrelid
JOIN pg_index x  ON x.indexrelid = i.inhrelid
JOIN pg_class t  ON t.oid = x.indrelid
WHERE p.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline')
ORDER BY 1, 2;
```

还没挂接的分区（就是后台任务待补的）：

```sql
SELECT p.relname AS parent_index, part.relname AS partition
FROM pg_class p
CROSS JOIN pg_inherits pi
JOIN pg_class part ON part.oid = pi.inhrelid
WHERE p.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline')
  AND pi.inhparent = 'track_event'::regclass
  AND NOT EXISTS (
    SELECT 1 FROM pg_inherits ii JOIN pg_index x ON x.indexrelid = ii.inhrelid
    WHERE ii.inhparent = p.oid AND x.indrelid = part.oid)
ORDER BY 1, 2;
```

后台补建已完成的分区：

```sql
SELECT app_key AS partition, last_bucket AS done_at
FROM track_rollup_cursor WHERE job_key = 'timeline_index' ORDER BY 1;
```

### 停机与超时

- **停应用会中断补建**：应用关闭时，任务会停止，并取消正在执行的 `CREATE INDEX CONCURRENTLY`，不再开始下一个分区。被中断的分区会留下一个 invalid 索引，下次运行时先删掉再重建，不需要手工处理。
- **前提：数据库没有全局 `statement_timeout`**。任务在自己的会话里执行 `SET statement_timeout = 0`，结束后再 `RESET`。如果角色、数据库或 PgBouncer 层面强制了语句超时，并且会覆盖会话设置，大分区会建到一半被杀掉，反复重试。这种情况下请对埋点库的连接放开超时，或者关掉后台补建，在维护窗口手工建索引。
- 用户时间线按用户 ID 查询时，最多合并最近活跃的 1000 个匿名设备。超过时，接口返回 `devicesTruncated: true` 和 `deviceCount`，这时请改用访客标识查询。

### 是否需要 flyway repair

从已发布版本升级**不需要**。T3 和 T4 都是新增迁移，`T2` 归 UV 回填备份表。

只有部署过 boot#25 合并前预览构建的库才需要处理。这类库的 `flyway_schema_history` 里有 `2 | track event timeline index`，或者有一条早于 UV 备份 T2 的 3/4 记录，启动时会报校验失败或 ignored migration。**不要用 `flyway repair`**：repair 会把旧记录改成新的 T2，UV 备份表就不会再建。

正确做法是删掉这几条历史记录再重启。**以下 SQL 要在埋点库执行，也就是 `mybatis-flex.datasource.track.url` 指向的库，不是业务主库。** 主库也有 `flyway_schema_history`，版本号同样是 2/3/4，连错库会删掉主库的迁移记录。先用 SELECT 确认要删的行：

```sql
-- 1) 确认当前连的是埋点库（应能看到 track_event）
SELECT current_database(), to_regclass('track_event') IS NOT NULL AS is_track_db;

-- 2) 看要删哪些行（script 应以 T 开头）
SELECT installed_rank, version, description, script, success
FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));

-- 3) 确认无误后删除
DELETE FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));
```

T4 是 Java 迁移，`script` 列是类名 `db.track.migration.T4__…`，不以 `T` 开头。如果第 2 步没有列出 T4，请先确认它确实在埋点库里，再单独删：`… WHERE version = '4' AND script LIKE 'db.track.migration.T4%'`。

重启后会依次执行 T2、T3、T4。三个迁移都可以安全重跑：已有的索引会跳过，已挂好的分区也会跳过。

## 下一步

[安装与初始化](/track/install) → [第一个事件](/track/first-event) → [插件](/track/plugins) → [隐私与合规](/track/privacy)
