# Keys and encryption

boot uses four kinds of keys. This page explains what each key protects, what happens when it is missing, how to write its value, and how to migrate old data.

## The four keys

| Key | Environment variable | Purpose | When missing |
| --- | --- | --- | --- |
| Field encryption key | `MUGSUN_SM4_KEY` | Encrypts sensitive fields stored in the database | Under `dev` a local key file is used; elsewhere startup is refused |
| API transport key | `MUGSUN_API_KEY` | Encrypts the request body and response of encrypted endpoints | Generated and saved, then reused across restarts |
| SM2 transport key pair | `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | Encrypts passwords at sign-in, password change and registration | A temporary pair is generated on every start with a warning; under `prod` startup is refused |
| Audit-signing key pair | `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | Signs audit logs | Generated and saved, then reused across restarts |

A few general rules:

- Auto-generated key files live in `~/.mugsun`. Change the directory with `mugsun.home` or the `MUGSUN_HOME` environment variable.
- `strict-keys` (environment variable `MUGSUN_STRICT_KEYS`) is on by default under `prod`.
  - When it is on, a missing field encryption key or SM2 transport key pair stops startup.
  - The API transport key and the audit-signing key are not affected and are still generated.
- Logs record only the path of a key file, never the key itself.

## Generate keys

The boot repository ships a script that generates all the keys in one go:

```bash
scripts/gen-keys.sh >> .env
```

- The output is in `KEY=VALUE` form and contains `MUGSUN_SM4_KEY`, `MUGSUN_API_KEY` and two SM2 key pairs.
- `--all` also generates `MUGSUN_INIT_PASSWORD` and `MUGSUN_FILE_SIGN_SECRET`.
- It needs OpenSSL 1.1.1 or later, with SM2 support.
- `.env` holds real keys. Don't commit it to git.

## Field encryption key

`MUGSUN_SM4_KEY` encrypts sensitive fields stored in the database, such as third-party credentials and ID card numbers. It has no built-in default, and it is never generated at random on each start.

When you need only this one value, generate it with:

```bash
openssl rand -hex 16
```

### Value format

- Only three forms are accepted, after trimming surrounding whitespace:
  - 32 hex characters, upper or lower case;
  - standard base64 with padding that decodes to exactly 16 bytes;
  - the legacy 16-character form, accepted only during the transition. It logs a WARN at startup, and the next version accepts only 32 hex characters.
- Anything else stops startup: no zero-padding, no truncation, and no compatibility switch.

### Startup self-check

At startup the application tries to decrypt ciphertext already in the database with the current key. This catches a key that was changed without migrating the data:

- Up to 3 rows are sampled per encrypted field, and every value that looks like ciphertext is tried.
- If any one fails to decrypt, startup is refused. The message names the table, column and primary key, and suggests migrating with `LEGACY_PADDED`.
- An empty database passes.
- `mugsun.crypto.sm4-self-check=false` skips the check. Use it only temporarily while troubleshooting.
- In production the switch has no effect and the check always runs.

### Which fields are encrypted

| Table | Columns |
| --- | --- |
| `sys_user` | `id_card` |
| `sys_tenant_datasource` | `ds_password` |
| `sys_notify_channel` | `secret` |
| `sys_oauth_client` | `client_secret` |
| `sys_api_key` | `secret_key` |
| `sys_oss` | `access_key`, `secret_key` |
| `ai_model` | `api_key`, `secret_key` |
| `ai_secret` | `secret_key` |
| `ai_datasource` | `password` |
| `ai_vector_store` | `password` |
| `ai_mcp_tool` | `api_key` |
| `gis_map_provider` | `api_key`, `secret` |

When decryption fails, the field comes back empty, and the empty value is never written back to the database.

### Limits of ECB

Field encryption currently uses SM4-ECB. Its ciphertext is deterministic, which is what lets `sys_user.id_card` be queried by equality. The limits:

- the same plaintext gives the same ciphertext, so duplicate values in the database are visible;
- ciphertext is not protected against tampering;
- ciphertext is not bound to its row and can be moved to another row.

ECB is an exception kept only for `id_card`. The other 14 fields need no equality query and are planned to move to SM4-GCM, which checks integrity.

## API transport key

`MUGSUN_API_KEY` is for endpoint encryption. On endpoints marked `@ApiDecrypt` or `@ApiEncrypt`, the request body and the `data` of the response travel encrypted with SM4-GCM.

For how to use the annotations, see [Encrypt an endpoint's request and response](/en/core/#encrypt-an-endpoint-s-request-and-response) in core.

### It starts without the key

- When the key is missing, the first start generates a 16-byte key with SecureRandom and writes it to `~/.mugsun/api-transport.key`.
- Every later restart reuses that file.
- A newly created directory gets mode 700 and the file gets 600. A file with wider permissions than 600 logs a WARN but does not stop startup.
- The key is written to a temporary file and renamed atomically, so several processes starting for the first time at once still generate only one key.
- A key file that is a symbolic link stops startup.
- When `MUGSUN_API_KEY` is set, that value is used. A value equal to the old, removed built-in default stops startup.

::: warning These two deployments must set `MUGSUN_API_KEY` or mount a shared volume
- Docker without a volume for `~/.mugsun` (or `MUGSUN_HOME`): every restart gets a new key.
- Several instances: each generates its own key, and they can't decrypt each other's data.

When a container environment is detected and no key is set, the startup log shows a WARN.
:::

### Value format {#api-key-format}

- Only two forms are accepted, after trimming surrounding whitespace:
  - 32 hex characters, upper or lower case;
  - standard base64 with padding that decodes to exactly 16 bytes.
- Anything else stops startup, with no zero-padding and no truncation.
- The ciphertext format is `base64(12-byte IV + ciphertext + 16-byte tag)`, and the padding is required.
- Encryption includes an integrity check, so tampered ciphertext fails to decrypt.

### How the frontend gets the same key

At runtime, the admin console calls `GET /crypto/bootstrap` after sign-in to get `keyHex`:

- The key is handed only to signed-in sessions. The endpoint is not on the anonymous allowlist, and the session must have a tenant.
- It is rate-limited per user, 30 calls a minute by default. The setting is `mugsun.crypto.bootstrap.per-user-per-minute`.
- Not signed in returns 401, a session without a tenant returns 403, and exceeding the limit returns 429. None of them contains the key.
- The response carries `Cache-Control: no-store`. The log records who called, not the key.
- When `MUGSUN_API_KEY` is set, the configured value is returned, normalized to 32 lowercase hex characters.
- Only the transport key is handed out. No endpoint ever returns the signing key, the SM2 private key or the field encryption key.

In local development, the backend also writes the same key into mugsun-pc's `.env.local`:

- The variable written is `VITE_CRYPTO_API_KEY`. Only that line is changed; the other lines are kept as they are.
- It runs only when `spring.profiles.active` is non-empty, includes `dev`, `test` or `local`, and does not include `prod`.
- If pc's `.gitignore` does not ignore `.env.local`, nothing is written.
- Point to the pc directory with `MUGSUN_PC_DIR`. When it is unset, `../mugsun-pc` and `../../mugsun-pc` are tried.
- `mugsun.crypto.pc-env-local.enabled=false` turns this off.

When the build-time `VITE_CRYPTO_API_KEY` differs from the value the backend hands out, the frontend reports an error and disables encryption. It never silently uses the wrong key.

::: danger Transport obfuscation only, not a replacement for HTTPS
The symmetric key has to be sent to the browser, so it is not secret from the client. Production must use HTTPS.

There is no replay protection and no binding to an endpoint: ciphertext can be resent as is, or moved to another encrypted endpoint.
:::

Use this key only for transport obfuscation. Don't use it to encrypt stored data or to derive signatures, and don't share it with the signing key.

## SM2 transport key pair

`MUGSUN_SM2_PRIVATE_KEY` and `MUGSUN_SM2_PUBLIC_KEY` encrypt passwords at sign-in, password change and registration.

- The private key is 64 hex characters. The public key is an uncompressed point starting with `04`, 130 hex characters in total.
- When they are empty, a temporary pair is generated on every start with a warning. The keys change after a restart, and sign-in can fail because of it.
- With `strict-keys` on (the default under `prod`), a missing pair stops startup.
- Set a fixed pair in production.
- With SM-series crypto off, passwords are no longer SM2-encrypted; see [When SM-series crypto is off](/en/boot/configuration#when-sm-series-crypto-is-off).

## Audit-signing key pair

`MUGSUN_SIGN_PRIVATE_KEY` and `MUGSUN_SIGN_PUBLIC_KEY` sign audit logs. They are stored separately from the transport keys.

- When they are missing, a pair is generated and saved to `~/.mugsun/audit-sign-sm2.key`, then reused across restarts.
- No endpoint ever returns this key.
- On Docker without a volume for the key directory, every restart gets a new key, and earlier signatures no longer verify.
  - For such deployments, set these two environment variables or mount a persistent volume for the directory.
  - When a container environment is detected and they are not set, the startup log shows a WARN.

## Local development

- Start with `dev`: `mvn spring-boot:run` does so by default; with `java -jar`, add `--spring.profiles.active=dev`.
- When the API transport key and the audit-signing key are missing, they are generated into `~/.mugsun` and reused across restarts.
- When the field encryption key is missing, the local key file that `mugsun.crypto.sm4-local-key-file` points to is used:
  - the default is `${user.home}/.mugsun/dev-sm4.key`; change it with `MUGSUN_SM4_LOCAL_KEY_FILE`;
  - the first start writes a random key into it and every later start reuses it, so local data still decrypts after a restart;
  - the file is created with mode 600 and the directory with 700; wider permissions log a WARN;
  - once the file is deleted, local data encrypted with it can no longer be decrypted.
- The local key file is set only in the `dev` config. It has no effect when `MUGSUN_STRICT_KEYS=true`.
- When the SM2 transport key pair is empty, a temporary pair is generated on every start. Set a fixed local pair instead.

## Upgrading from older versions

When no key was set, early versions fell back to built-in values that are public in the repository. All built-in values are gone now, and the behavior changed as follows:

- Outside `dev`, a missing `MUGSUN_SM4_KEY` stops startup.
- A missing `MUGSUN_API_KEY` or audit-signing key is generated and saved. It no longer stops startup.
- Endpoint encryption moved from SM4-CBC to SM4-GCM. Old ciphertext is not compatible, so the admin console must be upgraded together.
- `strict-keys` no longer affects the API transport key or the audit-signing key.
- The setting `mugsun.crypto.allow-ephemeral-keys` was removed.
- Keys are no longer zero-padded or truncated by character.
  - Older versions treated every key by character: short keys were zero-padded and long ones were cut to 16 characters.
  - So a 32-character hex key or a 24-character base64 key set in an older version now decodes to a different key, and it needs migration too.

### Upgrade steps

1. Deal with `MUGSUN_API_KEY`:
   - Single-instance deployments whose key directory persists can remove it and let the system generate one.
   - For Docker without a volume, or several instances, generate a new value with `openssl rand -hex 16` and set it.
   - If the legacy 16-character form is still set, replace it with the new format or remove it first. Otherwise startup is refused.
2. Have the frontend fetch the key from `GET /crypto/bootstrap` after sign-in.
   - If `VITE_CRYPTO_API_KEY` is still set at build time, it must be the same value as the backend's, and the two must be released together.
3. Make sure `MUGSUN_SM4_KEY` is set and well-formed.
4. Use the table below to decide whether old data must be migrated first. Where migration is needed, setting the old value as it was still won't decrypt the old data.

| Previous `MUGSUN_SM4_KEY` | What to do |
| --- | --- |
| Always the 16-character form | The key bytes are unchanged; upgrade directly |
| Never set; the old fallback value was used | Migrate first |
| Shorter than 16 characters | Migrate first |
| 32 hex characters or 24 base64 characters | Migrate first. Give the old key its original value and set `MUGSUN_SM4_OLD_KEY_LEGACY_PADDED=true` |

### Migrating old data {#migrate}

Setting a new key directly leaves all old data undecryptable. Putting the old value back means you keep using a publicly known key.

The application holds only one key at a time, so re-encryption needs an offline migration tool that takes both the old key and the new one.

The tool's main class is `com.mugsun.boot.common.crypto.Sm4KeyMigrationTool`. All input comes from environment variables, never from the command line:

| Environment variable | Purpose |
| --- | --- |
| `MUGSUN_SM4_OLD_KEY` | The old key. The old fallback value is in the git history; use it for migration only |
| `MUGSUN_SM4_OLD_KEY_LEGACY_PADDED` | Set to `true` when the old key is a short key, the old fallback value, or a 32-character hex or 24-character base64 key set in an older version. The key is then restored the old way, with zero-padding and truncation |
| `MUGSUN_SM4_NEW_KEY` | The new key, in the same format as `MUGSUN_SM4_KEY` |
| `MUGSUN_MIGRATE_JDBC_URL`, `MUGSUN_MIGRATE_DB_USER`, `MUGSUN_MIGRATE_DB_PASSWORD` | Connection to the target database |

Migration steps:

1. Back up the database and stop the application.
2. Run a dry run first. It is the default and writes nothing:

   ```bash
   java -cp mugsun-boot.jar \
     -Dloader.main=com.mugsun.boot.common.crypto.Sm4KeyMigrationTool \
     org.springframework.boot.loader.launch.PropertiesLauncher
   ```

   For each table and column it prints the total and four counts: rows to re-encrypt, rows already on the new key, legacy plaintext rows, and rows that can't be decrypted.
   With the Docker image, replace the entrypoint and run java directly:

   ```bash
   docker run --rm --env-file migrate.env --entrypoint java <image> \
     -cp /app/app.jar \
     -Dloader.main=com.mugsun.boot.common.crypto.Sm4KeyMigrationTool \
     org.springframework.boot.loader.launch.PropertiesLauncher --dry-run
   ```

   Delete `migrate.env` after use, and never commit it.
3. Once the "can't be decrypted" count is 0 everywhere, **confirm the backup from step 1 is usable**, then run once more with `--apply`.
   It writes in a single transaction and rolls everything back if any row can't be decrypted.
4. Start the application with `MUGSUN_SM4_KEY` set to the new key. The check: the error log contains no line with the text below.

   ```text
   SM4 解密失败
   ```

5. Rotate every third-party credential stored in those fields.

Notes:

- Identical old and new keys are refused, including the hex and base64 forms of the same key.
- Keys are read only from environment variables. The command line accepts only `--dry-run` and `--apply`.
- The output contains only table names, columns, row counts and the primary keys of rows that can't be decrypted. It never contains keys, plaintext or ciphertext.
- Databases of tenants with their own data source (`sys_tenant_datasource`) each need a separate run.
- With `mugsun.db.default-schema` set, the JDBC URL must carry that schema.
  - On PostgreSQL use `currentSchema=`. With several schemas, run once per schema.
- Don't save undecryptable records in the admin console before migrating.
- Endpoint encryption affects transport only and stores nothing. Changing the key is enough, and no migration is needed.
- Local data encrypted with the old fallback value can't be decrypted after the upgrade. Rebuild the local database or migrate as above.

## Next steps

<div class="ms-cards">

- [Configuration](/en/boot/configuration) Look up settings and environment variables by topic.
- [Security checklist](/en/boot/security-checklist) Check keys and switches item by item before going live.
- [Upgrade guide](/en/boot/upgrade) Other upgrade items that need manual work.

</div>
