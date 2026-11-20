# 升级指南

后端从 0.1.0 升级以后，埋点库的表结构由启动时的迁移自动更新，大多数部署不用手工操作。这一页讲的是迁移以外可能要动手的三件事。

| 要做的事 | 谁需要做 |
| --- | --- |
| [回填历史 UV](#回填历史-uv) | 看板时区是 UTC 的部署 |
| [确认时间线索引建完](#用户时间线索引) | 所有部署，通常看一眼就行 |
| [清理旧的迁移记录](#清理旧的迁移记录) | 装过预览构建、启动时报迁移校验失败的库 |

SDK 从 0.2.0 升到 0.3.0 的变化不在这一页，见[隐私与合规](/track/privacy#从-0-2-0-升级、保留原来的遮罩)。

## 升级前

埋点库只支持 PostgreSQL。升级前确认连接方式：

- 埋点库的连接要直连 PostgreSQL，或者走 PgBouncer 的 session 模式。
- 多个节点同时启动时，后启动的会等前一个迁移完，最多等 10 分钟左右。

::: warning 不支持 PgBouncer 的 transaction 模式
埋点库的迁移锁和建索引用的锁都是会话级的，在 transaction 模式下不可靠。
:::

升级后第一次启动，埋点库会依次执行下面的迁移：

| 迁移 | 做什么 |
| --- | --- |
| T2 | 建备份表 `track_stats_day_uv_backup`，回填 UV 时用来存旧值 |
| T3 | 在 `track_event` 父表上建两个时间线索引，不扫数据，不锁写入 |
| T4 | 给空的分区挂上索引。有数据的分区启动时跳过，留给后台任务 |
| T5 | 建[错误问题单](/track/error-issues)的表 `track_error_issue` |

主库的迁移 V18 到 V20 加了错误问题单、问数据和空间行为的权限。已有错误监控或概览权限的角色会自动拿到。

关掉了 `mugsun.track.flyway-enabled` 的部署要手工执行 T2、T3、T5 的 SQL。T4 不会运行，分区上的索引由后台任务补建。

## 回填历史 UV

现在 UV 按设备去重，也就是按 `distinct_id`。升级前已经汇总好的日子用的还是旧算法，按登录用户合并。

回填就是用明细把这些日子的 UV 重算一遍，让趋势图前后对得上。

只有看板时区是 UTC 时才需要回填。默认的 `Asia/Shanghai` 和其他时区直接按明细统计，不读汇总表，可以跳过这一节。

| 配置 | 作用 |
| --- | --- |
| `mugsun.track.timezone.default-zone` | 默认的看板时区 |
| `mugsun.track.timezone.tenants` | 按租户单独设时区 |

<div class="ms-steps">

### 先用小应用试跑一天

在低峰期用下面的参数跑一次。同样的参数再跑一遍，日志里应该是「改动 0 行」。

```json
{"days": 1, "appKey": "small-app-key"}
```

### 跑全量

确认没问题后不带参数再跑，默认回填最近 90 天。两种跑法任选一种，高峰期不要用第二种：

| 跑法 | 怎么做 | 怎么算完成 |
| --- | --- | --- |
| PowerJob | 新建任务，处理器填下面的类名，配成每天 02:05 运行 | 日志出现「UV 回填完成」后停用任务 |
| 启动时跑 | 设 `MUGSUN_TRACK_UV_BACKFILL_ON_STARTUP=true`，在低峰期重启 | 日志出现「UV 回填完成」后改回 `false` |

```text
com.mugsun.boot.track.powerjob.TrackUvBackfillProcessor
```

### 看结果

每跑一遍，日志里有一行汇总。开头是「UV 回填完成」才算全部跑完，后面是批次号和改动的行数：

```text
UV 回填完成：run_id=uvbf-20261120T180500Z-1a2b，应用 3 个，重算 270 天（有日表行但明细已清理、保留原值 0 天），改动 1520 行（旧值已备份到 track_stats_day_uv_backup）
```

PowerJob 里只有全部回填完才显示成功。不在运行时段、到点暂停、某一天超时，都显示失败。

这里的失败只是提醒还没跑完，下次定时会从断点接着跑。

</div>

PowerJob 的任务参数可以留空，也可以指定天数，或者只跑一个应用：

```text
{"days": 180}
{"days": 30, "appKey": "your-app-key"}
```

### 它改了什么

| 项目 | 说明 |
| --- | --- |
| 改哪些数据 | 只改 `track_stats_day` 的 `uv` 一列，而且只改和重算结果不一样的行 |
| 不改什么 | 访问量、会话数这些其他列不动，也不新增行 |
| 明细已经清理的日子 | 保留原值，不会改成 0 |
| 备份 | 每改一行，旧值先写进 `track_stats_day_uv_backup`，带着这一批的 `run_id` |
| 重复执行 | 已经一致的行不再改，也不再写备份 |
| 范围 | 默认最近 90 天，不含今天。用 `MUGSUN_TRACK_UV_BACKFILL_DAYS` 调，1 到 3660 |

### 对线上库的影响

回填按「应用 × 天」一个一个处理，每个是一个事务，只扫一次当天的明细。

| 限制 | 默认值 | 怎么改 |
| --- | --- | --- |
| 运行时段 | 北京时间 02:00 到 07:00 | `MUGSUN_TRACK_UV_BACKFILL_WINDOW_ENABLED=false` 取消限制 |
| 单个事务的超时 | 120 秒 | 配置项 `mugsun.track.uv-backfill.statement-timeout-seconds` |
| 排序用的内存 | 256MB | `MUGSUN_TRACK_UV_BACKFILL_WORK_MEM` |
| 两次处理之间的停顿 | 300 毫秒 | `MUGSUN_TRACK_UV_BACKFILL_SLEEP_MILLIS` |

到点会自动暂停，下次从断点继续。进度记在 `track_rollup_cursor` 表里。

多个实例同一时刻只有一个在跑，靠 Redis 锁保证。Redis 不可用时不执行。

某个应用的某一天超时或死锁时，只回滚这一天，日志里记一条警告。这个应用剩下的日子留到下次，其他应用照常继续。

同一个应用总是超时，可以只给它放宽：

```yaml
mugsun:
  track:
    uv-backfill:
      app-statement-timeout:
        "[MyApp_1]": 600s
```

键要写成带引号的中括号，否则带点、下划线或大写字母的 AppKey 可能对不上。

::: details 大库上线前的检查
1. 在从库上对一个大应用的一天跑 `EXPLAIN (ANALYZE, BUFFERS)`，先把 `work_mem` 设成 256MB。
2. 确认只扫了当天所在的那一个月分区。出现 BRIN 位图扫描或单分区顺序扫描都正常。
3. 耗时接近超时，或者临时文件读写很多时，先调大 `work-mem`，或者给这个应用单独放宽超时。
4. 还不行再给要回填的月分区建临时索引，用 `CREATE INDEX CONCURRENTLY`，回填完删掉。
5. 并发建索引失败会留下无效的索引。`indisvalid` 是 false 时，先删掉再重建。

查询语句和完整步骤见后端仓库的 [track-uv-backfill.md](https://github.com/mugsun/mugsun-boot/blob/main/docs/upgrade/track-uv-backfill.md)。
:::

### 还原和清理

```sql
-- 按日志里的 run_id 还原那一批
UPDATE track_stats_day d SET uv = b.old_uv, update_time = now()
FROM track_stats_day_uv_backup b
WHERE b.run_id = '日志里的 run_id' AND d.id = b.stats_day_id;

-- 确认没问题以后清理备份
DELETE FROM track_stats_day_uv_backup WHERE backup_time < now() - interval '30 days';
```

还原以后再跑回填，数据又会改成新算法的结果。

## 用户时间线索引

用户细查的时间线要用两个新索引。它们在启动后自动建，一般不用手工操作，只要确认建完了：

```sql
SELECT c.relname AS parent_index, x.indisvalid
FROM pg_index x JOIN pg_class c ON c.oid = x.indexrelid
WHERE c.relname IN ('idx_event_user_ts_timeline', 'idx_event_distinct_ts_timeline');
```

两行的 `indisvalid` 都是 `t`，就是建完了。

### 索引是怎么建起来的

`track_event` 按月分区，直接在父表上建索引会锁住写入，所以分三步：

<div class="ms-flow ms-flow--3">

1. T3 只在父表上登记索引，不扫数据。这时父表上的索引还是无效状态。
2. T4 在启动时处理空的分区，有数据的分区一律跳过，所以不会拖慢启动。
3. 后台任务在低峰期逐个补建有数据的分区，全部建完后父表上的索引自动生效。

</div>

补建期间查询照常可用：建好的分区用新索引，还没建的分区用原来的旧索引。旧索引这次不删。

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

- 想在维护窗口自己建索引，把 `backfill-enabled` 设成 `false`。新分区和空分区仍然自动处理。
- 只在运行时段里开始新的分区。已经开始的会建完，可能超过 `window-end`。
- 多个实例同一时刻只有一个在建。

### 要多久

每个分区建两个索引，耗时大致和分区大小成正比。

| 分区大小 | 大约耗时 |
| --- | --- |
| 300 万行，507 MB | 40 秒。在空闲的 PostgreSQL 16 上实测 |
| 1 亿行 | 20 到 30 分钟。按比例估算，线上有写入时更慢 |

实际耗时看日志，每建完一个分区记一条，带着毫秒数：

```text
时间线索引后台补建：分区 track_event_2026_10 完成（41250 ms）
```

停应用会取消正在建的索引。中断留下的无效索引，下次运行时先删再重建，不用手工处理。

任务会在自己的会话里关掉语句超时。数据库角色或 PgBouncer 强制了超时的话，大分区会反复被中断。

这时放开埋点库连接的超时，或者关掉后台补建，改成手工建。

::: details 查看每个分区的进度
已经挂上的分区索引：

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

还没挂上的分区：

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

后台任务已经建完的分区：

```sql
SELECT app_key AS partition, last_bucket AS done_at
FROM track_rollup_cursor WHERE job_key = 'timeline_index' ORDER BY 1;
```
:::

## 清理旧的迁移记录

从正式发布的版本升级不需要做这一步。只有装过预览构建的库需要，表现是启动时报迁移校验失败，或者提示有被忽略的迁移。

::: warning 不要用 flyway repair
repair 会把旧记录改成新的 T2，UV 备份表就不会建了。
:::

::: details 删除旧的迁移记录
下面的 SQL 要在埋点库里执行，也就是 `mybatis-flex.datasource.track.url` 指向的库。

主库里也有 `flyway_schema_history`，版本号同样是 2、3、4。连错了库会删掉主库的迁移记录。

```sql
-- 1) 确认当前连的是埋点库，应该能看到 track_event
SELECT current_database(), to_regclass('track_event') IS NOT NULL AS is_track_db;

-- 2) 看要删哪些 SQL 迁移记录，script 以 T 开头
SELECT installed_rank, version, description, script, success
FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));

-- 3) 确认无误后删除
DELETE FROM flyway_schema_history
WHERE script LIKE 'T%'
  AND (version IN ('3', '4') OR (version = '2' AND description = 'track event timeline index'));
```

上面只处理了 SQL 迁移。T4 是 Java 迁移，记录里的 `script` 是类名，要单独查和删：

```sql
SELECT installed_rank, version, script FROM flyway_schema_history
WHERE version = '4' AND script LIKE 'db.track.migration.T4%';

DELETE FROM flyway_schema_history
WHERE version = '4' AND script LIKE 'db.track.migration.T4%';
```

重启后会依次执行 T2、T3、T4。这三个迁移重跑是安全的。
:::

## 用户时间线的设备上限

按用户 ID 查时间线时，最多合并这个用户最近活跃的 1000 个匿名设备。

超过时接口返回 `devicesTruncated: true` 和 `deviceCount`，「用户细查」页面也会提示。这时改用访客标识查。

## 下一步

<div class="ms-cards">

- [错误问题单](/track/error-issues) 升级后新增的页面，把错误指派给人，跟到解决。
- [安装与初始化](/track/install) SDK 0.3.0 的安装方式和全部配置项。
- [后端升级指南](/boot/upgrade) 后端的不兼容变更，和可能中止的主库迁移。

</div>
