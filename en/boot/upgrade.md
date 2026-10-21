# Upgrade guide

When upgrading boot from 0.1.0, openGauss and Dameng deployments must first make sure no tenant has duplicate phone numbers. PostgreSQL and KingbaseES are not affected and can skip that section. Every deployment should read [Legacy digit captcha removed](#legacy-digit-captcha-removed).

## Duplicate phone numbers within a tenant

The new migration V7 makes user phone numbers unique within a tenant on openGauss and Dameng, matching PostgreSQL. Users without a phone number and deleted users are not checked.

If duplicates already exist, the migration reports "V7 升级中止" (V7 upgrade stopped) and halts. No index has been changed at that point.

### Find duplicates

Before upgrading, run this on the business database:

::: code-group

```sql [openGauss]
SELECT tenant_id, phone, count(*) AS users,
       string_agg(id::text || ':' || username, ', ') AS id_username
FROM sys_user
WHERE is_deleted = 0 AND phone IS NOT NULL AND phone <> ''
GROUP BY tenant_id, phone
HAVING count(*) > 1
ORDER BY tenant_id, phone;
```

```sql [Dameng]
SELECT tenant_id, phone, COUNT(*) AS users,
       LISTAGG(id || ':' || username, ', ') WITHIN GROUP (ORDER BY id) AS id_username
FROM sys_user
WHERE is_deleted = 0 AND phone IS NOT NULL AND phone <> ''
GROUP BY tenant_id, phone
HAVING COUNT(*) > 1
ORDER BY tenant_id, phone;
```

:::

Each row is one group of duplicates. `id_username` lists the IDs and usernames of those users.

### Resolve duplicates

Keep one user per number in each group. In User management, give the others their own number or clear their phone field, and delete accounts that are no longer used.

Run the query again afterwards. It should return no rows.

### Migrate again

On openGauss the failed V7 was rolled back as a whole. If Flyway runs your migrations, just restart.

If you run scripts by hand with gsql, run the V7 script again with `-1 -v ON_ERROR_STOP=1`, so an error rolls everything back and stops there.

On Dameng, DDL statements are not rolled back with the migration, and Flyway keeps a failed record. Delete that record, then restart:

```sql
DELETE FROM flyway_schema_history WHERE version = '7' AND success = 0;
```

Once the migration no longer reports "V7 升级中止", V7 has completed.

## Legacy digit captcha removed

`GET /auth/captcha` is gone. The login page completes a behavioral captcha first and puts the returned `captchaToken` in the login request.

1. Switch the frontend to `GET /auth/captcha/config` → `POST /auth/captcha/challenge` → `POST /auth/captcha/verify` and send `captchaToken` in the body. An old frontend gets `40013` on login.
2. Remove `mugsun.captcha.type` (`MUGSUN_CAPTCHA_TYPE`) and `mugsun.captcha.expire-seconds` from yml, `.env`, compose and K8s config. A deployment that still sets `IMAGE` fails to start.
3. `SLIDER` and `WORD_CLICK` are enabled by default, one picked at random per challenge. For slider only, set `mugsun.captcha.default-types: [SLIDER]`.
4. If the backend must be upgraded before the frontend, set `mugsun.captcha.enabled=false` for now; login lockout still applies.
