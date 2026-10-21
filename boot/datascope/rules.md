# 数据权限规则

数据权限规则在角色范围之外，再给某张表设定一个上限。规则保存在 `sys_data_scope` 表里，只有平台超管能维护。

## 新增规则

在「系统管理 → 数据权限」点「新增规则」，填写以下内容：

- 规则名称和规则编码，编码只能用字母、数字、下划线和冒号；
- 受控表、部门列和本人列，都用小写字母、数字和下划线，部门列和本人列不能相同；
- 收紧范围：全部、本部门、本部门及子部门或仅本人；
- 启用或停用。

同一张表只能有一条启用中的规则。保存后规则立即生效，不需要重启。

## 规则怎样生效

启用规则后，这张表成为受控表。用户的角色范围比规则更宽时，按规则的范围过滤；角色范围已经比规则更严时，保持角色范围。规则不会放宽任何人能看到的数据。

规则的收紧也作用于数据范围为全部数据的角色，包括管理员。

## 看效果

新增一条规则：受控表 `sys_user`，部门列 `dept_id`，本人列 `id`，收紧范围选「本部门」。列表上方的「当前生效」会显示 `sys_user · 本部门`。

![数据权限规则](/screenshots/datascope/data-scope-rules.png)

用下面的语句核对启用中的规则：

```sql
SELECT resource_code, table_name, dept_column, user_column, scope_type, status
FROM sys_data_scope
WHERE is_deleted = 0 AND status = 1;
```

`scope_type` 是 2。此时管理员调用 `GET /system/user/page`，只返回与他同部门的用户，条数与下面的语句相同，把 `2001` 换成管理员的部门 id：

```sql
SELECT count(*)
FROM sys_user
WHERE tenant_id = '000000' AND is_deleted = 0 AND dept_id = 2001;
```

管理员没有部门时，返回 0 条。把规则改成停用后，管理员重新看到全部用户。

上一节：[在接口上启用](./annotation)
