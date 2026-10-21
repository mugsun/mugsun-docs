# Data permission rules

A data permission rule sets a ceiling for one table on top of role scopes. Rules are stored in the `sys_data_scope` table and only the platform super admin can maintain them.

## Add a rule

Open System Settings → Data Scope, click "Add rule" and fill in:

- a rule name and a rule code; the code may contain letters, digits, underscores and colons;
- the controlled table, department column and owner column, in lowercase letters, digits and underscores; the two columns must differ;
- the tightened scope: all, own department, department and sub-departments, or own data only;
- enabled or disabled.

A table can have only one enabled rule. A saved rule takes effect immediately without a restart.

## How a rule applies

An enabled rule makes the table a controlled table. When a user's role scope is wider than the rule, rows are filtered by the rule's scope; when the role scope is already narrower, the role scope stays. A rule never widens the data anyone can see.

The rule also tightens roles whose scope is all data, including the admin.

## See it work

Add a rule with the controlled table `sys_user`, department column `dept_id`, owner column `id`, and the scope "own department". The "currently in effect" tag above the list shows `sys_user · 本部门`.

![Data permission rules](/screenshots/datascope/data-scope-rules.png)

Check the enabled rules with this query:

```sql
SELECT resource_code, table_name, dept_column, user_column, scope_type, status
FROM sys_data_scope
WHERE is_deleted = 0 AND status = 1;
```

`scope_type` is 2. Now when the admin calls `GET /system/user/page`, only users in the admin's department are returned, and the count matches this query. Replace `2001` with the admin's department id:

```sql
SELECT count(*)
FROM sys_user
WHERE tenant_id = '000000' AND is_deleted = 0 AND dept_id = 2001;
```

If the admin has no department, 0 rows are returned. Disable the rule and the admin sees every user again.

Previous: [Enable it on an endpoint](./annotation)
