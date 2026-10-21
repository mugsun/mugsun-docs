# 升级指南

从 0.1.0 升级 boot 时，openGauss 和达梦的部署要先确认没有同租户重复手机号。PostgreSQL 和金仓不受影响，可以跳过本页。

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

达梦的 DDL 自动提交，迁移失败后 Flyway 会留下一条失败记录，要先清掉这条记录再重启。

清理前先备份 `flyway_schema_history` 表，例如：

```sql
CREATE TABLE flyway_schema_history_bak AS SELECT * FROM flyway_schema_history;
```

再用下面两种方式之一清掉失败记录：

::: code-group

```sql [SQL]
DELETE FROM flyway_schema_history WHERE version = '7' AND success = 0;
```

```sh [Flyway CLI]
# 连接参数与应用使用的业务库一致
flyway -url=<JDBC URL> -user=<用户名> -password=<密码> repair
```

:::

`flyway repair` 会删掉历史表里所有失败的记录。

迁移不再报「V7 升级中止」，就说明 V7 已完成。
