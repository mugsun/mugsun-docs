# Upgrade guide

boot has not published a release yet. This page is for projects that already run the main branch: read it before you update to a newer main.

## See which changes affect you

| Change | Who is affected | What to do when upgrading |
| --- | --- | --- |
| [Migrations merged into one baseline](#baseline) | Every deployed project | The database cannot be updated in place; rebuild it |
| [Multipart requests only on allowlisted endpoints](#multipart) | Projects that added their own upload endpoints or pass the token as a URL parameter | Add the endpoints to the allowlist and send the token in a header |
| [Self-registration is off by default in production](#register) | Projects that allow registration in production | Turn the registration switch on explicitly |
| [Export, import and upload permission codes](#perm-codes) | Every project | Usually nothing; roles created later need the grants by hand |
| [Legacy digit captcha removed](#legacy-digit-captcha-removed) | Every project | Delete the old settings and switch the front end to the behavioral captcha |
| [V7: duplicate phone numbers within a tenant](#duplicate-phone-numbers-within-a-tenant) | openGauss and Dameng, databases still on a main from before the baseline merge | Find and resolve duplicates first, or the migration stops |
| [V11: tenant code reused](#v11) | Every database still on a main from before the baseline merge | Find and resolve reuse first, or the migration stops |

The first one decides how the database is updated. The next four are behavior changes. The last two are migrations from before the baseline merge that can stop; PostgreSQL and KingbaseES are not affected by V7.

## Migrations merged into one baseline {#baseline}

**A database created by a main from before the merge cannot be updated in place and has to be rebuilt.** This is a breaking change.

The main branch merged the database migrations into one baseline script per database: `V1__baseline_0_2.sql` for the main database and `T1__baseline_0_2.sql` for the tracking database.

The baseline is the old scripts concatenated in version order, with no statement changed. V17 on PostgreSQL and T4 of the tracking database are Java migrations and still run separately, after the baseline.

The migration history of an old database lists the old scripts one by one and does not match the baseline. Flyway validation fails at startup and the backend does not start. The log contains lines like these:

```text
Migration checksum mismatch for migration version 1
Detected applied migration not resolved locally: 2.
```

To update:

1. Drop the main database and the tracking database, then create empty ones.
   - With `docker compose`, run `docker compose down -v` and `docker compose up -d`.
2. Clear the cache in Redis, so nothing stale from the old database is read.
3. Start the new backend. Flyway migrates from scratch.

`down -v` deletes the data volume, so do not run it against a shared database.

This update does not come with a way to keep the data. If the database holds data you need, export it yourself and import it after the rebuild.

If you compiled the old code locally with Maven, run `mvn clean` once after updating. Otherwise the old scripts left in `target` make Flyway fail:

```text
Found more than one migration with version 1
```

Until boot 0.2 is released, the baseline itself can still change. Every time it does, existing databases have to be rebuilt this way.

### openGauss {#baseline-opengauss}

openGauss does not use Flyway. Run the baseline with gsql, in a database created with `DBCOMPATIBILITY 'PG'`:

```bash
gsql -d mugsun -U <user> -f mugsun-boot-core/src/main/resources/db/migration-og/V1__baseline_0_2.sql \
  -1 -v ON_ERROR_STOP=1
```

openGauss keeps no migration history. A database that already ran every script in version order has executed the same statements as the baseline and does not need a rebuild.

## Multipart requests only on allowlisted endpoints {#multipart}

**Multipart requests are accepted only on allowlisted upload endpoints, and only when signed in.** This is a breaking change.

The rules are in [Multipart allowlist](/en/boot/permissions#anonymous-multipart-requests). When upgrading, note:

- Tokens in URL parameters are no longer accepted; a token passed that way gets 401.
  - Multipart requests read the token only from the `Authorization` header or a cookie of the same name.
- To add an upload endpoint, add its path to `mugsun.security.multipart.allowed-paths`, otherwise multipart requests to it get 415.
- A YAML list replaces the default as a whole. List the 7 default paths too, or every default upload endpoint starts returning 415.
- The backend refuses to start if an entry is empty, doesn't start with `/`, or contains `*`, `..`, `;`, `{` or `}`.
- Clients should make sure they are signed in before uploading. When not signed in, they may see the connection closed instead of a 401.
- Rejected requests are never parsed or written to disk.
  - Within `max-swallow-size`, though, the container may still read the rest of the body and discard it.
  - Always set a request body limit (about 21MB) on the reverse proxy.

## Self-registration is off by default in production {#register}

**Registration is off by default in production. To allow it, set `mugsun.auth.register.enabled=true`.** This is a breaking change.

- The main setting `mugsun.auth.register.mode` has three values:
  - `OFF`: closed; the registration endpoint returns 404.
  - `OPEN`: open.
  - `APPROVAL`: review after registration. This value is reserved; setting it now stops startup.
- `enabled=true` and `enabled=false` are shorthand for `OPEN` and `OFF`.
- When nothing is set, production is `OFF`.
  - It is `OPEN` only when `spring.profiles.active` names dev, test or local and does not name prod.
- The front end reads `registerMode` from `GET /auth/captcha/config` and hides the registration entry accordingly.
- Registration is now rate-limited by IP, account and phone number; requests over the limit get 429.
- Behind a reverse proxy you must set `MUGSUN_OPENAPI_TRUSTED_PROXIES`.
  - Otherwise the whole site counts as one IP and only 10 registrations per hour are possible in total.
  - See [Configuration](/en/boot/configuration#self-registration).

## Export, import and upload permission codes {#perm-codes}

Migrations V13 and V14 add several permission codes and grant them to existing roles based on what those roles already had. After the upgrade, people who could do these things still can.

| Action | New permission code | V13 grants it to |
| --- | --- | --- |
| Export users | `sys:user:export` | Roles that have `sys:user:list` |
| Import users | `sys:user:import` | Roles that have `sys:user:add` |
| Upload attachments | `sys:file:upload` | Every existing role |
| Form and flow write actions | See [Permissions & attachments](/en/boot/permissions) | Each tenant's `admin` role |

- V14 seeds the built-in `user` role and grants `sys:file:upload` to it and to the roles assigned at registration.
- Roles created after the upgrade start with no permissions.
  - To let such a role upload attachments, click Authorize in Role Manage and check the attachment upload permission.
- A direct-upload request must carry `size`, and the signature is valid for 15 minutes; see [Direct upload from the browser](/en/boot/permissions#direct-upload-from-the-browser).
- The cleanup queue only deletes objects under `tmp/`, or objects created in this run that were never registered.
  - Older entries that were already queued and are not under `tmp/` are dropped; clean up those objects by hand.

## Duplicate phone numbers within a tenant

::: tip Only for a main from before the baseline merge
Since the migrations were merged into one baseline, V7 no longer runs on its own, and a newly created database never hits the stop described here.

Before importing old data into a new database, still check for duplicates as described in this section, or the unique index rejects the duplicate phone numbers.
:::

The new migration V7 makes user phone numbers unique within a tenant on openGauss and Dameng, matching PostgreSQL. Users without a phone number and deleted users are not checked.

If duplicates already exist, the migration halts with a "V7 upgrade stopped" error. No index has been changed at that point. The log contains this text:

```text
V7 升级中止
```

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
Flyway currently cannot run migrations against openGauss. Flyway runs `SET ROLE`, and openGauss rejects it without a password.

On openGauss-lite, V8 cannot be applied yet: the published V8 is a syntax error there. See [mugsun-boot#102](https://github.com/mugsun/mugsun-boot/issues/102) for progress.
:::

On full openGauss, run the scripts in `db/migration-og` one by one with gsql, in version order.

The failed V7 was rolled back as a whole. After resolving the duplicates, run V7 again.

Run each script with `-1 -v ON_ERROR_STOP=1`, so an error rolls everything back and stops there.

Running scripts with gsql does not write `flyway_schema_history`. When you switch back to Flyway after #102 is fixed, run `flyway baseline` once, with `baselineVersion` set to the last version you applied.

On Dameng, DDL auto-commits, so a failed migration leaves a failed record in Flyway's history. Follow [Dameng: remove the failed record](#dameng-remove-the-failed-record) with version `7`, then restart.

Once the migration no longer reports that error, V7 has completed.

## Legacy digit captcha removed

`GET /auth/captcha` is gone. The login page completes a behavioral captcha first and puts the returned `captchaToken` in the login request.

1. Switch the frontend to `GET /auth/captcha/config` → `POST /auth/captcha/challenge` → `POST /auth/captcha/verify` and send `captchaToken` in the body. An old frontend gets `40013` on login.
2. Remove `mugsun.captcha.type` (`MUGSUN_CAPTCHA_TYPE`) and `mugsun.captcha.expire-seconds` from yml, `.env`, compose and K8s config. A deployment that still sets `IMAGE` fails to start.
3. All five types are enabled by default, one picked at random per challenge. For slider only, set `mugsun.captcha.default-types: [SLIDER]`.
4. If the backend must be upgraded before the frontend, set `mugsun.captcha.enabled=false` for now; login lockout still applies.

## V11 stopped: tenant code reused {#v11}

::: tip Only for a main from before the baseline merge
Since the migrations were merged into one baseline, V11 no longer runs on its own, and a newly created database never hits the stop described here.

Before importing old data into a new database, still check for reuse as described in this section, or the unique index rejects the reused tenant codes.
:::

The new migration V11 makes tenant codes never reusable: a code may appear on only one row in `sys_tenant`, deleted tenants included.

If a code already appears on several rows, the migration halts with a "V11 upgrade stopped" error. No index has been changed at that point. The log contains this text:

```text
V11 升级中止
```

### Find reused codes

::: code-group

```sql [PostgreSQL / KingbaseES / openGauss]
SELECT tenant_code, count(*) AS tenants,
       string_agg(id::text || ':' || is_deleted, ', ') AS id_deleted
FROM sys_tenant
GROUP BY tenant_code
HAVING count(*) > 1
ORDER BY tenant_code;
```

```sql [Dameng]
SELECT tenant_code, COUNT(*) AS tenants,
       LISTAGG(id || ':' || is_deleted, ', ')
         WITHIN GROUP (ORDER BY id) AS id_deleted
FROM sys_tenant
GROUP BY tenant_code
HAVING COUNT(*) > 1
ORDER BY tenant_code;
```

:::

Each row is a code used by several tenants. `id_deleted` lists their IDs. After the colon, 0 means active and 1 means deleted.

### Resolve reused codes

Business tables, credentials and datasources are all linked by code. Rows that a deleted tenant left in them now count as the live tenant's.

Check who owns the data under that code first, and migrate or clean up the rows that belong to the deleted tenant.

Then keep the live tenant, and give every deleted tenant row its own unused 6-digit code, for example:

```sql
UPDATE sys_tenant SET tenant_code = '<new code>' WHERE id = <id of the deleted tenant>;
```

Run the query again afterwards. It should return no rows.

### Migrate again

On PostgreSQL and KingbaseES the failed V11 was rolled back as a whole. Just restart.

On openGauss it was rolled back too. Run the V11 script again with gsql and `-1 -v ON_ERROR_STOP=1`.

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
#   DmJdbcDriver18-8.1.3.62.jar (the official Dameng JDBC driver)
#   db-migration-dameng-flyway-4.1.2.jar (Maven Central: com.github.mengweijin)
# Use the same connection settings as the application's business database
flyway -url="jdbc:dm://<host>:5236?schema=<schema>" -user=<user> -password=<password> repair
```

:::

`flyway repair` removes every failed record from the history table.

## Next steps

<div class="ms-cards">

- [Configuration](/en/boot/configuration) The settings and environment variables mentioned on this page.
- [Permissions & attachments](/en/boot/permissions) Permission codes, upload limits and the multipart allowlist.
- [Security checklist](/en/boot/security-checklist) Go through it again after upgrading, before launch.

</div>
