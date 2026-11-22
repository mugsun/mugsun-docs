# core 0.1.0 → 0.2.0

::: warning 0.2.0 is not released yet
As of 2026-11-20, Maven Central and the git tags have only 0.1.0, and the main branch version is `0.2.0-SNAPSHOT`.

This page follows the Unreleased section of the CHANGELOG on the main branch and may change before release.
:::

The core that boot main depends on already includes these changes, so projects on boot main already have them.

## See which changes affect you

| Change | Who is affected | What to do |
| --- | --- | --- |
| [API encryption moves to SM4-GCM](#api-crypto) | Frontends and backends that use API encryption | Upgrade both sides together |
| [Unique constraint violations return 400](#duplicate-key) | Frontends that detect duplicate submissions by 500 | Check for 400 instead |
| [Dameng unique-key error codes](#dm-error-codes) | Projects on Dameng that ship their own `sql-error-codes.xml` | Merge the Dameng entries |
| [License changes to MIT](#license) | Projects that redistribute core | Review your license notices |

## API encryption moves to SM4-GCM {#api-crypto}

core no longer has a built-in key, and API encryption moves from SM4-CBC to SM4-GCM. Ciphertext from 0.1.0 can no longer be decrypted, so the frontend and the backend must be upgraded together.

### Where the key comes from

Without `MUGSUN_API_KEY` the application no longer refuses to start. The first start generates a 16-byte key.

The key is saved to `~/.mugsun/api-transport.key`, and every later restart reuses it.

You can change the directory with `mugsun.home` or the environment variable `MUGSUN_HOME`.

When `MUGSUN_API_KEY` is set, that value is used. It has to meet these rules:

- It must be 32 hex characters, or padded standard base64 that decodes to exactly 16 bytes.
- A key of the wrong length is an error. It is never padded or truncated.
- A value that decodes to the removed built-in default makes the application refuse to start.

::: warning Two kinds of deployment must set the key
When Docker has no volume for the key directory, the key changes on every restart. Several instances each generate their own key and cannot decrypt each other's data.

Give all instances of such a deployment the same `MUGSUN_API_KEY`, or mount a shared volume.
:::

### Changes to the ciphertext and the API

- The ciphertext format is now `base64(12-byte IV ‖ ciphertext ‖ tag)`.
- Every decryption failure reports the same error, whether the key is wrong, the format is wrong or the data was modified.
- When an API annotated with `@ApiDecrypt` cannot decrypt the request, it returns a message saying the encrypted body could not be decrypted.
- `encrypt(null)` and `decrypt(null)` both return null instead of throwing.

API encryption only obscures traffic. It does not prevent replay, is not bound to an endpoint, and does not replace HTTPS.

## Unique constraint violations return 400 {#duplicate-key}

When an insert or update violates a unique constraint, the HTTP status is now 400 instead of 500.

The response has `code` 400 and a `msg` saying the data already exists. It contains no SQL, constraint name or field value.

These errors are no longer written to boot's error log table `sys_error_log`. The server only logs one WARN.

If your frontend detects duplicate submissions by status 500, change it to check for 400.

## Dameng unique-key error codes {#dm-error-codes}

`mugsun-starter-mybatis` adds a `sql-error-codes.xml` at the classpath root.

The file supplies the Dameng unique-key error codes -6602, -6612 and -6625.

If your application has its own `sql-error-codes.xml` at the classpath root, it hides this file, and you need to copy the Dameng entries into yours.

## License changes to MIT {#license}

The license changes from Apache-2.0 to MIT. The 0.1.0 artifacts already on Maven Central keep the Apache-2.0 license they were released under.

## Configuration changes

| Property | Default | Notes |
| --- | --- | --- |
| `mugsun.crypto.api-key` | empty | New. Maps to the environment variable `MUGSUN_API_KEY`. A key is generated when it is not set |
| `mugsun.home` | `~/.mugsun` | New. Maps to the environment variable `MUGSUN_HOME`. Generated key files are stored here |
| `mugsun.crypto.strict-keys` | `false` | Existing property. It no longer affects API encryption |

`allow-ephemeral-keys`, which existed during development, has been removed. Setting it has no effect.

## Upgrade steps

1. A single instance whose `~/.mugsun` directory persists needs no key configuration.
2. For Docker without a volume, or for several instances, generate a key and set the same `MUGSUN_API_KEY` on every instance:

   ```bash
   openssl rand -hex 16
   ```

3. Change the frontend's API encryption to SM4-GCM and the new ciphertext format, fetch the key from `GET /crypto/bootstrap` after sign-in, and release it together with the backend.
4. Check how the frontend detects duplicate submissions, and change it from 500 to 400.
5. Projects on Dameng that ship their own `sql-error-codes.xml` merge the Dameng error code entries.
6. After 0.2.0 is released, change the dependency version to `0.2.0`.

## See it work

Start the application without `MUGSUN_API_KEY`. The log of the first start has a line like this, with the path of your own home directory:

```text
未配置 MUGSUN_API_KEY，已自动生成接口加密密钥并保存到 /home/you/.mugsun/api-transport.key
```

Restart once more. The line is gone, and only one WARN remains, which says that a generated key is in use and gives the file path.

Create a record that already exists. The API returns HTTP 400 with `code` 400 and a `msg` saying the data already exists.

Check which core version the project really uses:

```bash
mvn dependency:tree | grep com.mugsun
```
