# Data permissions

Data permissions decide which rows a user can see inside one tenant. They apply after tenant isolation: rows are filtered by tenant first and by data scope second.

## Data scopes

Every role has one data scope, stored in the `sys_role.data_scope` column:

| Value | Scope | Filter |
| --- | --- | --- |
| 1 | All data | No condition |
| 2 | Own department | Department column equals the user's department |
| 3 | Department and sub-departments | Department column is in the user's department or any department below it |
| 4 | Own data only | Owner column equals the current user |
| 5 | Custom departments | Department column is in the departments selected on the role (`sys_role_dept`) |
| 6 | Custom statement | The SQL fragment configured on the role (`sys_role.custom_sql`) |

When a user has several roles, the scopes are combined as a union. If any role has "all data", no condition is added.

If the user has no department or no role, or the scopes produce no condition at all, the query returns no rows. It never falls back to all data.

## Configure it on a role

Add or edit a role under System Settings → Role Manage and choose a value from 1 to 5 in the data scope field. For custom departments, also select the visible departments.

Only the platform super admin can set "all data" or a custom statement. A custom statement is not offered in the console dropdown; the platform super admin sets `customSql` when calling `POST /system/role/submit`.

## See it work

Add a role whose data scope is "Own Data Only", grant it to the user `zhangsan`, and select User Manage in its menu permissions.

![Data scope of a role](/screenshots/datascope/role-data-scope.png)

Check users, roles and data scopes with this query:

```sql
SELECT u.username, r.role_code, r.data_scope
FROM sys_user u
JOIN sys_user_role ur ON ur.user_id = u.id AND ur.is_deleted = 0
JOIN sys_role r ON r.id = ur.role_id AND r.is_deleted = 0
WHERE u.is_deleted = 0 AND u.tenant_id = '000000'
ORDER BY u.username;
```

The `data_scope` of `zhangsan` is 4. Sign in as `zhangsan` and call `GET /system/user/page`: `totalRow` is 1 and only he is returned. When the admin calls the same endpoint, every user of the tenant is returned, and the count matches this query:

```sql
SELECT count(*) FROM sys_user WHERE tenant_id = '000000' AND is_deleted = 0;
```

Next: [Enable it on an endpoint](./annotation)
