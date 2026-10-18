# 升级指南

从 0.1.0 升级 boot 的埋点模块后，按本页做两件事：回填历史 UV，确认用户时间线索引建完。

本页只适用于 PostgreSQL 埋点库。关闭了 `mugsun.track.flyway-enabled` 的部署，需要手工执行 T2、T3 的 SQL；T4 不会运行，分区索引由后台补建任务补齐，后台补建也关闭时要自建分区索引。

## 回填历史 UV

看板的 UV 按设备 ID（`distinct_id`）去重。只有看板时区是 UTC 时，日趋势和概览才读按日汇总表 `track_stats_day`，升级前汇总好的日子还是旧口径，需要回填一次。

默认时区 `Asia/Shanghai` 和其它非 UTC 时区直接按明细统计，不读这张表，不受影响，可以跳过本节。时区由 `mugsun.track.timezone.default-zone` 和按租户的 `mugsun.track.timezone.tenants` 决定。

先在低峰期用小应用试跑一天：

```json
{"days": 1, "appKey": "小应用"}
```

同样参数再跑一次，日志应为「改动 0 行」。确认无误后，按默认的最近 90 天跑全量。

### 执行

二选一。高峰期不要打开 `on-startup`。

1. PowerJob 里新建任务，处理器填 `com.mugsun.boot.track.powerjob.TrackUvBackfillProcessor`，配成每天 02:05 运行。日志出现 `UV 回填完成` 后停用。参数可留空，或写 `{"days": 180}`、`{"days": 30, "appKey": "你的应用"}`。
2. 没有 PowerJob 时，低峰期设 `MUGSUN_TRACK_UV_BACKFILL_ON_STARTUP=true` 重启。日志出现 `UV 回填完成：run_id=...` 后改回 `false`。

PowerJob 只有全部完成才显示成功。不在运行时段、到点暂停、锁丢失或有某天超时，都显示失败，下次定时会接着跑。

### 改了什么

- 只改 `track_stats_day` 里 `uv` 与重算结果不一致的行，不动其它列，不新增行。
- 明细已过保留期的日子保留原值。
- 每改一行，旧值先写入 `track_stats_day_uv_backup`（迁移 `T2` 建表）。
- 重复执行时，已经一致的行不会再改。
- 范围默认是最近 90 个闭合日（UTC，不含今天），用 `MUGSUN_TRACK_UV_BACKFILL_DAYS` 调整，取值 1 到 3660。

### 对线上库的影响

每个「应用 × 天」一个事务，只扫一次当天明细。事务内 `statement_timeout` 为 120 秒，`work_mem` 默认 256MB（`MUGSUN_TRACK_UV_BACKFILL_WORK_MEM`）。两天之间默认停 300 毫秒（`MUGSUN_TRACK_UV_BACKFILL_SLEEP_MILLIS`）。

默认只在北京时间 02:00 到 07:00 运行，到点自动暂停，下次从断点继续。进度记在 `track_rollup_cursor`（`job_key = uv_backfill`）。`MUGSUN_TRACK_UV_BACKFILL_WINDOW_ENABLED=false` 可以取消时段限制。

回填用独立的 Redis 锁，多实例同一时刻只有一个在跑。Redis 不可用时不执行。

某个「应用 × 天」出现超时或死锁等数据库错误时，只回滚这一天，日志写 WARN，其它应用照常继续。同一个应用总是超时，可以只给它放宽超时，键要加中括号和引号：

```yaml
mugsun:
  track:
    uv-backfill:
      app-statement-timeout:
        "[MyApp_1]": 600s
```

::: details 大库上线前的检查
1. 在从库上先 `SET work_mem = '256MB'`，再对一个大应用的一天跑 `EXPLAIN (ANALYZE, BUFFERS)`，确认只扫单个月分区。
2. 默认库没有覆盖全部行的 `(app_key, received_at)` 索引（`idx_event_geo` 只覆盖有坐标的行），所以 BRIN 位图扫描或单分区顺序扫描都正常。根据耗时和 temp 读写决定要不要加索引。
3. 迁移里不建索引。确需索引时，在低峰期对要回填的月分区单独 `CREATE INDEX CONCURRENTLY`，回填后删掉。
4. 并发建索引失败会留下 INVALID 索引。`pg_index.indisvalid` 为 false 时，先 `DROP INDEX CONCURRENTLY` 再重建。

查询语句和完整步骤见 boot 仓库的 [docs/upgrade/track-uv-backfill.md](https://github.com/mugsun/mugsun-boot/blob/main/docs/upgrade/track-uv-backfill.md)。
:::

### 还原与清理

```sql
-- 还原某一批
UPDATE track_stats_day d SET uv = b.old_uv, update_time = now()
FROM track_stats_day_uv_backup b
WHERE b.run_id = '日志里的 run_id' AND d.id = b.stats_day_id;

-- 确认无误后清理备份
DELETE FROM track_stats_day_uv_backup WHERE backup_time < now() - interval '30 days';
```

## 建用户时间线索引（T3 / T4）

用户细查的时间线需要两条新索引：`idx_event_user_ts_timeline (app_key, user_id, ts, id)` 和 `idx_event_distinct_ts_timeline (app_key, distinct_id, ts, id)`。启动后自动建，一般不需要手工操作。

先确认埋点库连接满足要求：直连 PostgreSQL，或使用 PgBouncer 的 session 模式。

::: warning 不支持 PgBouncer transaction pooling
埋点库的 Flyway 锁和建索引用的 advisory 锁都是会话级锁。
:::

然后用这条 SQL 看进度，两行的 `indisvalid` 都是 `t` 就说明建完了：

```sql
SELECT c.relname AS parent_index, x.indisvalid
FROM pg_index x JOIN pg_class c ON c.oid = x.indexrelid
WHERE c.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline');
```

### 建索引的过程

`track_event` 按月分区，所以分三步：

- **T3**（SQL 迁移）只在父表上 `CREATE INDEX … ON ONLY track_event`，不扫数据，不锁写。这时父索引是 invalid。
- **T4**（Java 迁移）启动时只处理空分区，例如提前建好的下月分区和 default 分区。有数据的分区一律跳过，启动时不会建大索引，也不会让启动失败。
- **后台补建**：有数据的分区由后台任务在低峰期逐个补建。全部挂上后，父索引自动变为 valid。

补建期间查询照常可用。已补好的分区走新索引，没补到的分区走 T1 的旧索引 `idx_event_user_timeline` 和 `idx_event_distinct_timeline`，旧索引本次不删。

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

- 想在维护窗口自己建索引时，设 `backfill-enabled=false`。新分区和空分区仍会自动处理。
- 只在运行时段内开始新分区。已经开始的分区会建完，可能超出 `window-end`。
- 每补完一个分区，在 `track_rollup_cursor` 写一行（`job_key = timeline_index`，`app_key` 为分区名）。
- T4、后台补建和分区维护任务共用一把 advisory 锁，多实例同一时刻只有一个在建。

### 耗时与停机

每个分区要建两条索引，耗时大致与分区大小成正比。在空闲的 PostgreSQL 16 上实测，300 万行（507 MB）的月分区约 40 秒。按这个比例估算，1 亿行约 20 到 30 分钟，线上有写入时更慢。实际耗时看日志 `时间线索引后台补建：分区 … 完成（… ms）`。

停应用会取消正在建的索引。被中断的分区留下的 invalid 索引，下次运行会先删掉再重建，不需要手工处理。

任务会在自己的会话里关掉 `statement_timeout`。如果数据库角色或 PgBouncer 强制了语句超时，大分区会反复被杀掉。这时请对埋点库连接放开超时，或者关掉后台补建，改为手工建索引。

::: details 查看每个分区的进度
已挂接的子索引：

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

还没挂接的分区（后台任务待补）：

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
:::

### 是否需要 flyway repair

从已发布版本升级不需要。T3 和 T4 是新增迁移，`T2` 是 UV 回填的备份表。

只有部署过 boot#25 合并前预览构建的库需要处理。这类库启动时会报校验失败或 ignored migration。

::: warning 不要用 flyway repair
repair 会把旧记录改成新的 T2，UV 备份表就不会再建。
:::

::: details 删除旧的迁移记录
以下 SQL 要在埋点库执行，也就是 `mybatis-flex.datasource.track.url` 指向的库。主库也有 `flyway_schema_history`，版本号同样是 2、3、4，连错库会删掉主库的迁移记录。

```sql
-- 1) 确认当前连的是埋点库（应能看到 track_event）
SELECT current_database(), to_regclass('track_event') IS NOT NULL AS is_track_db;

-- 2) 看要删哪些 SQL 迁移记录（script 以 T 开头）
SELECT installed_rank, version, description, script, success
FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));

-- 3) 确认无误后删除
DELETE FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));
```

第 2、3 步只覆盖 SQL 迁移。T4 是 Java 迁移，`script` 列是类名 `db.track.migration.T4__…`，要单独查和删：

```sql
SELECT installed_rank, version, script FROM flyway_schema_history
WHERE version = '4' AND script LIKE 'db.track.migration.T4%';

DELETE FROM flyway_schema_history
WHERE version = '4' AND script LIKE 'db.track.migration.T4%';
```

重启后依次执行 T2、T3、T4。三个迁移都可以安全重跑：T2、T3 用 `IF NOT EXISTS`，T4 跳过已挂好的分区。
:::

## 用户时间线的设备上限

按用户 ID 查时间线时，最多合并最近活跃的 1000 个匿名设备。超过时，接口返回 `devicesTruncated: true` 和 `deviceCount`，管理后台的「用户细查」也会提示。这时请改用访客标识查询。

## 下一步

- [埋点概述](/track/)
- [安装与初始化](/track/install)
