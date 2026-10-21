# 升级指南

从 0.1.0 升级 boot 时，有两项迁移可能中止：

- V7：openGauss 和达梦要先确认没有同租户重复手机号。PostgreSQL 和金仓不受影响。
- V11：所有数据库都要先确认租户编号没有被复用。

## 同租户重复手机号

新版迁移 V7 在 openGauss、达梦上把用户手机号改为同一租户内唯一，与 PostgreSQL 一致。手机号为空的用户和已删除的用户不参与。

库里已有重复时，迁移会报「V7 升级中止」并停下。此时还没有改动任何索引。

### 查出重复

升级前先在业务库执行：

::: code-group

```sql [openGauss]
SELECT tenant_id, max('****' || right(phone, 4)) AS phone_tail, count(*) AS users,
       string_agg(id::text || ':' || username, ', ') AS id_username
FROM sys_user
WHERE is_deleted = 0 AND phone IS NOT NULL AND phone <> ''
GROUP BY tenant_id, phone
HAVING count(*) > 1
ORDER BY tenant_id, phone;
```

```sql [达梦]
SELECT tenant_id, MAX('****' || RIGHT(phone, 4)) AS phone_tail, COUNT(*) AS users,
       LISTAGG(id || ':' || username, ', ') WITHIN GROUP (ORDER BY id) AS id_username
FROM sys_user
WHERE is_deleted = 0 AND phone IS NOT NULL AND phone <> ''
GROUP BY tenant_id, phone
HAVING COUNT(*) > 1
ORDER BY tenant_id, phone;
```

:::

每行是一组重复。`phone_tail` 只显示号码后 4 位，`id_username` 列出这些用户的 ID 和账号。

查询结果含个人信息，请勿贴到工单或群聊里。

### 处理重复

每组只留一个用户用这个号码。其他人在「用户管理」里改成各自的号码或清空手机号，不再使用的账号直接删除。

处理完再执行一次查重，没有结果即可。

### 重新迁移

openGauss 上失败的 V7 已整体回滚，用 Flyway 迁移的部署直接重启。

用 gsql 手工执行的部署，重新执行 V7 脚本时带上 `-1 -v ON_ERROR_STOP=1`，出错就整体回滚并停下。

达梦的 DDL 自动提交，迁移失败后 Flyway 会留下一条失败记录。按[达梦：清掉失败记录](#达梦-清掉失败记录)处理后再重启，版本号填 `7`。

迁移不再报「V7 升级中止」，就说明 V7 已完成。

## V11 中止：租户编号被复用

新版迁移 V11 把租户编号改为永不复用：`sys_tenant` 里同一个编号只能有一行，已删除的租户也算。

同一个编号已有多行时，迁移会报「V11 升级中止」并停下。此时还没有改动任何索引。

### 查出复用的编号

::: code-group

```sql [PostgreSQL / 金仓 / openGauss]
SELECT tenant_code, count(*) AS tenants,
       string_agg(id::text || ':' || tenant_name || CASE WHEN is_deleted = 0 THEN '' ELSE '（已删除）' END, ', ') AS id_name
FROM sys_tenant
GROUP BY tenant_code
HAVING count(*) > 1
ORDER BY tenant_code;
```

```sql [达梦]
SELECT tenant_code, COUNT(*) AS tenants,
       LISTAGG(id || ':' || tenant_name || CASE WHEN is_deleted = 0 THEN '' ELSE '（已删除）' END, ', ')
         WITHIN GROUP (ORDER BY id) AS id_name
FROM sys_tenant
GROUP BY tenant_code
HAVING COUNT(*) > 1
ORDER BY tenant_code;
```

:::

每行是一个被多个租户用过的编号，`id_name` 列出这些租户。

### 处理复用

业务表、凭据和数据源都按编号关联，新租户可能已经看到了旧租户留下的数据。先核对这个编号下的数据属于谁，再处理。

处理方法：保留现在在用的租户，把已删除租户的编号改成一个没人用过的 6 位编号，例如：

```sql
UPDATE sys_tenant SET tenant_code = '<新编号>' WHERE id = <已删除租户的 id>;
```

处理完再执行一次查重，没有结果即可。

### 重新迁移

PostgreSQL、金仓和 openGauss 上失败的 V11 已整体回滚，直接重启。

达梦按[达梦：清掉失败记录](#达梦-清掉失败记录)处理后再重启，版本号填 `11`。

## 达梦：清掉失败记录

达梦的 DDL 自动提交，迁移失败后 Flyway 会留下一条失败记录。不清掉的话，重启时校验失败。

清理前先备份 `flyway_schema_history` 表：

```sql
CREATE TABLE flyway_schema_history_bak AS SELECT * FROM flyway_schema_history;
```

再用下面两种方式之一清掉失败记录：

::: code-group

```sql [SQL]
-- <版本号> 换成失败的版本，例如 '7' 或 '11'
DELETE FROM flyway_schema_history WHERE "version" = '<版本号>' AND "success" = 0;
```

```sh [Flyway CLI]
# 社区版 Flyway 不认达梦，先把达梦驱动和插件放进 CLI 的 drivers 目录：
#   DmJdbcDriver18.jar（达梦官方 JDBC 驱动）
#   db-migration-dameng-flyway-4.1.2.jar（Maven Central：com.github.mengweijin）
# 连接参数与应用使用的业务库一致
flyway -url="jdbc:dm://<主机>:5236?schema=<模式名>" -user=<用户名> -password=<密码> repair
```

:::

`flyway repair` 会删掉历史表里所有失败的记录。
