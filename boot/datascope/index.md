# 数据权限

数据权限决定一个用户在同一个租户里能看到哪些行。它在多租户隔离之后生效：先按租户过滤，再按数据范围过滤。

## 数据范围

每个角色有一个数据范围，存在 `sys_role.data_scope` 列：

| 值 | 范围 | 过滤条件 |
| --- | --- | --- |
| 1 | 全部数据 | 不加条件 |
| 2 | 本部门数据 | 部门列等于用户所在部门 |
| 3 | 本部门及子部门 | 部门列属于用户所在部门及其下级部门 |
| 4 | 仅本人数据 | 本人列等于当前用户 |
| 5 | 自定义部门 | 部门列属于角色勾选的部门（`sys_role_dept`） |
| 6 | 自定义语句 | 角色上配置的 SQL 片段（`sys_role.custom_sql`） |

一个用户有多个角色时，取各角色范围的并集。任一角色是全部数据，就不加条件。

用户没有部门、没有角色，或者范围算不出任何条件时，查询不返回数据，不会退回到全部数据。

## 在角色上配置

在「系统管理 → 角色管理」新增或编辑角色，在「数据范围」里选择 1 到 5。选择自定义部门时，再勾选可见的部门。

全部数据和自定义语句只有平台超管能设置。

自定义语句不在管理台的下拉框里，由平台超管调用 `POST /system/role/submit` 时填写 `customSql`。

## 看效果

新增一个数据范围为「仅本人数据」的角色，把它授给用户 `zhangsan`，并在「菜单授权」里勾选「用户管理」。

![角色的数据范围](/screenshots/datascope/role-data-scope.png)

用下面的语句核对用户、角色和数据范围：

```sql
SELECT u.username, r.role_code, r.data_scope
FROM sys_user u
JOIN sys_user_role ur ON ur.user_id = u.id AND ur.is_deleted = 0
JOIN sys_role r ON r.id = ur.role_id AND r.is_deleted = 0
WHERE u.is_deleted = 0 AND u.tenant_id = '000000'
ORDER BY u.username;
```

`zhangsan` 这一行的 `data_scope` 是 4。

用 `zhangsan` 登录后调用 `GET /system/user/page`，`totalRow` 是 1，只返回他自己。

管理员调用同一个接口，返回本租户的全部用户，条数与下面的语句相同：

```sql
SELECT count(*) FROM sys_user WHERE tenant_id = '000000' AND is_deleted = 0;
```

下一节：[在接口上启用](./annotation)
