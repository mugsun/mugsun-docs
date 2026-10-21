# Multi-tenancy

mugsun serves many tenants from one database and one set of tables. Business tables carry a `tenant_id` column, and MyBatis-Flex adds the current tenant to every query, update and delete.

## Turn on isolation

The isolation column is set once in `application.yml` and is on by default:

```yaml
mybatis-flex:
  global-config:
    tenant-column: tenant_id
```

To isolate a new table, do two things:

1. Add a `tenant_id VARCHAR(12)` column when you create the table.
2. Add `private String tenantId;` to the entity. The field only needs to match the column; no extra annotation is required.

On insert, the framework fills `tenant_id` with the current tenant. Do not set it in your own code.

## Where the current tenant comes from

The framework looks for the current tenant in this order and stops at the first match:

1. A tenant set explicitly in code with `TenantContext.execute` or `TenantContext.ignore`.
2. The tenant a platform super admin selected with "switch tenant view".
3. The tenant code stored in the login session.

When none of these is present, any operation on a tenant table throws `TenantException`. It never falls back to reading every tenant.

## Platform tenant

The tenant with code `000000` is the platform tenant, created when the system is initialized. A user in the platform tenant who holds the `admin` role is the platform super admin and can manage tenants, plans and data sources.

The platform super admin can call `POST /auth/switch-tenant/{tenantId}` to view one tenant's data, pass `-1` to view all tenants, and call `POST /auth/switch-tenant/reset` to return to the platform tenant. Calls from any other user are rejected.

## See it work

This query lists every table that has a `tenant_id` column. All of them are isolated by tenant:

```sql
SELECT table_name
FROM information_schema.columns
WHERE table_schema = 'public' AND column_name = 'tenant_id'
ORDER BY table_name;
```

The result includes system tables such as `sys_user`, `sys_dept`, `sys_role` and `sys_post`, as well as business tables of the AI, workflow and GIS modules. Next, count users per tenant:

```sql
SELECT tenant_id, count(*) AS users
FROM sys_user
WHERE is_deleted = 0
GROUP BY tenant_id
ORDER BY tenant_id;
```

Each tenant gets one row. Sign in as a tenant's admin and call `GET /system/user/page`; the number of records matches that tenant's `users` value.

Next: [Tenants and plans](./manage)
