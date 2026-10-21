# Upgrade guide

When upgrading boot from 0.1.0, two migrations can stop:

- V7: openGauss and Dameng deployments must first make sure no tenant has duplicate phone numbers. PostgreSQL and KingbaseES are not affected.
- V11: every database must first make sure no tenant code has been reused.

## Duplicate phone numbers within a tenant

The new migration V7 makes user phone numbers unique within a tenant on openGauss and Dameng, matching PostgreSQL. Users without a phone number and deleted users are not checked.

If duplicates already exist, the migration reports "V7 升级中止" (V7 upgrade stopped) and halts. No index has been changed at that point.

### Find duplicates

Before upgrading, run this on the business database:

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

```sql [Dameng]
SELECT tenant_id, MAX('****' || RIGHT(phone, 4)) AS phone_tail, COUNT(*) AS users,
       LISTAGG(id || ':' || username, ', ') WITHIN GROUP (ORDER BY id) AS id_username
FROM sys_user
WHERE is_deleted = 0 AND phone IS NOT NULL AND phone <> ''
GROUP BY tenant_id, phone
HAVING COUNT(*) > 1
ORDER BY tenant_id, phone;
```

:::

Each row is one group of duplicates. `phone_tail` shows only the last 4 digits, and `id_username` lists the IDs and usernames of those users.

The results contain personal information. Do not paste them into tickets or group chats.

### Resolve duplicates

Keep one user per number in each group. In User management, give the others their own number or clear their phone field, and delete accounts that are no longer used.

Run the query again afterwards. It should return no rows.

### Migrate again

::: warning Known issue on openGauss
Flyway currently cannot run migrations against openGauss: Flyway runs `SET ROLE`, and openGauss rejects it because it requires a password. The published V8 is also a syntax error on openGauss-lite. See [mugsun-boot#102](https://github.com/mugsun/mugsun-boot/issues/102) for progress.
:::

On openGauss, run the scripts in `db/migration-og` one by one with gsql, in version order. The failed V7 was rolled back as a whole, so after resolving the duplicates, run V7 again.

Run each script with `-1 -v ON_ERROR_STOP=1`, so an error rolls everything back and stops there.

On Dameng, DDL auto-commits, so a failed migration leaves a failed record in Flyway's history. Follow [Dameng: remove the failed record](#dameng-remove-the-failed-record) with version `7`, then restart.

Once the migration no longer reports "V7 升级中止", V7 has completed.

## V11 stopped: tenant code reused

The new migration V11 makes tenant codes never reusable: a code may appear on only one row in `sys_tenant`, deleted tenants included.

If a code already appears on several rows, the migration reports "V11 升级中止" (V11 upgrade stopped) and halts. No index has been changed at that point.

### Find reused codes

::: code-group

```sql [PostgreSQL / KingbaseES / openGauss]
SELECT tenant_code, count(*) AS tenants,
       string_agg(id::text || ':' || tenant_name || CASE WHEN is_deleted = 0 THEN '' ELSE ' (deleted)' END, ', ') AS id_name
FROM sys_tenant
GROUP BY tenant_code
HAVING count(*) > 1
ORDER BY tenant_code;
```

```sql [Dameng]
SELECT tenant_code, COUNT(*) AS tenants,
       LISTAGG(id || ':' || tenant_name || CASE WHEN is_deleted = 0 THEN '' ELSE ' (deleted)' END, ', ')
         WITHIN GROUP (ORDER BY id) AS id_name
FROM sys_tenant
GROUP BY tenant_code
HAVING COUNT(*) > 1
ORDER BY tenant_code;
```

:::

Each row is a code used by several tenants. `id_name` lists those tenants.

### Resolve reused codes

Business tables, credentials and datasources are all linked by code, so the new tenant may already see data the old tenant left behind. Check who owns the data under that code first.

Then keep the tenant that is in use and give the deleted tenant a 6-digit code nobody has used, for example:

```sql
UPDATE sys_tenant SET tenant_code = '<new code>' WHERE id = <id of the deleted tenant>;
```

Run the query again afterwards. It should return no rows.

### Migrate again

On PostgreSQL and KingbaseES the failed V11 was rolled back as a whole. Just restart. On openGauss it was rolled back too; run the V11 script again with gsql and `-1 -v ON_ERROR_STOP=1`.

On Dameng, follow [Dameng: remove the failed record](#dameng-remove-the-failed-record) with version `11`, then restart.

## Dameng: remove the failed record

On Dameng, DDL auto-commits, so a failed migration leaves a failed record in Flyway's history. If you don't remove it, validation fails on restart.

Back up the `flyway_schema_history` table first:

```sql
CREATE TABLE flyway_schema_history_bak AS SELECT * FROM flyway_schema_history;
```

Then remove the failed record in one of these ways:

::: code-group

```sql [SQL]
-- Replace <version> with the failed version, for example '7' or '11'
DELETE FROM flyway_schema_history WHERE "version" = '<version>' AND "success" = 0;
```

```sh [Flyway CLI]
# Community Flyway does not support Dameng. Put the Dameng driver and plugin into the CLI's drivers directory first:
#   DmJdbcDriver18.jar (the official Dameng JDBC driver)
#   db-migration-dameng-flyway-4.1.2.jar (Maven Central: com.github.mengweijin)
# Use the same connection settings as the application's business database
flyway -url="jdbc:dm://<host>:5236?schema=<schema>" -user=<user> -password=<password> repair
```

:::

`flyway repair` removes every failed record from the history table.
