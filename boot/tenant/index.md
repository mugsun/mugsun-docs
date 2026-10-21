# 多租户

mugsun 用一个库、一套表服务多个租户。业务表带 `tenant_id` 列，查询、修改和删除时由 MyBatis-Flex 自动加上当前租户的条件。

## 开启隔离

隔离列在 `application.yml` 里统一配置，默认已经开启：

```yaml
mybatis-flex:
  global-config:
    tenant-column: tenant_id
```

新表要参与隔离，需要两步：

1. 建表时加一列 `tenant_id VARCHAR(12)`。
2. 实体里加 `private String tenantId;`，字段名与列名对应即可，不需要额外注解。

新增数据时 `tenant_id` 由框架按当前租户填入，代码里不要自己赋值。

## 当前租户从哪里来

框架按下面的顺序取当前租户，取到第一个就停止：

1. 代码里用 `TenantContext.execute` 或 `TenantContext.ignore` 显式指定的租户。
2. 平台超管用「切换租户视图」选中的租户。
3. 登录会话里保存的本租户编号。

三者都没有时，对租户表的操作会抛出 `TenantException`，不会退回到查询全部租户。

## 平台租户

编号为 `000000` 的租户是平台租户，系统初始化时创建。平台租户下持有 `admin` 角色的用户是平台超管，能管理租户、套餐和数据源。

平台超管可以调用 `POST /auth/switch-tenant/{tenantId}` 查看某个租户的数据，传 `-1` 查看全部租户，调用 `POST /auth/switch-tenant/reset` 回到本租户。其他用户调用会被拒绝。

## 看效果

用下面的语句查出所有带 `tenant_id` 列的表，这些表都按租户隔离：

```sql
SELECT table_name
FROM information_schema.columns
WHERE table_schema = 'public' AND column_name = 'tenant_id'
ORDER BY table_name;
```

结果里有 `sys_user`、`sys_dept`、`sys_role`、`sys_post` 等系统表，也有 AI、工作流和 GIS 模块的业务表。再按租户统计用户数：

```sql
SELECT tenant_id, count(*) AS users
FROM sys_user
WHERE is_deleted = 0
GROUP BY tenant_id
ORDER BY tenant_id;
```

每个租户各自一行。用某个租户的管理员登录后调用 `GET /system/user/page`，返回的条数与这一行的 `users` 相同。

下一节：[租户与套餐](./manage)
