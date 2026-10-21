# core 0.1.0 → 0.2.0

::: warning 0.2.0 is not released yet
As of 2026-10-21, Maven Central has only 0.1.0, and git has only the tag `v0.1.0`. The main branch version is `0.2.0-SNAPSHOT`.

This page follows the Unreleased section of the CHANGELOG on the main branch and may change before release.
:::

The boot main branch already depends on core `0.2.0-SNAPSHOT`, so projects on boot main already have these changes.

## Breaking changes

### API encryption uses SM4-GCM and requires a key

core no longer has a built-in key, and API encryption now uses SM4-GCM.

- Without `MUGSUN_API_KEY`, the application refuses to start by default.
- The key must be 32 hex characters, or padded standard base64 that decodes to exactly 16 bytes. A key of the wrong length is rejected; it is never padded or truncated.
- Ciphertext is now base64(12-byte IV ‖ ciphertext ‖ tag). CBC ciphertext from 0.1.0 can no longer be decrypted, so the frontend and backend must be upgraded together.
- Every decryption failure returns the same error.
- `encrypt(null)` and `decrypt(null)` both return null instead of throwing.

API encryption only obscures traffic. It does not prevent replay, is not bound to an endpoint, and does not replace TLS.

### Unique constraint violations return 400

When an insert or update violates a unique constraint, the HTTP status is now 400 instead of 500.

The response has `code` 400 and a message saying the data already exists. It contains no SQL, constraint name or field value.

These errors are no longer written to boot's error log table `sys_error_log`; the server only logs a WARN line. If your frontend detects duplicate submissions by status 500, change it to 400.

### Dameng unique key error codes

`mugsun-starter-mybatis` adds `sql-error-codes.xml` at the classpath root with the Dameng unique key error codes -6602, -6612 and -6625.

If your application has its own `sql-error-codes.xml` at the classpath root, it hides this file. Copy the Dameng entries into yours.

## Configuration changes

| Property | Default | Description |
| --- | --- | --- |
| `mugsun.crypto.api-key` | none | New; environment variable `MUGSUN_API_KEY`; required |
| `mugsun.crypto.allow-ephemeral-keys` | `false` | New; when true, a missing key is replaced by a key valid only in this process |
| `mugsun.crypto.strict-keys` | `false` | Existing; when true, ephemeral keys are refused too |

An ephemeral key changes on every restart and is not shared between instances, so use it only for local development. boot's `application-dev.yml` already turns on `allow-ephemeral-keys`.

## License

The license changed from Apache-2.0 to MIT. The 0.1.0 artifacts on Maven Central keep the Apache-2.0 license declared when they were published.

## Upgrade steps

1. Generate a key:

   ```bash
   openssl rand -hex 16
   ```

2. Set `MUGSUN_API_KEY` in the environment variables or secret store of every environment. All instances must use the same key.
3. Switch the frontend's API encryption to SM4-GCM and the new ciphertext format, and release it together with the backend.
4. Change the frontend's duplicate-submission check from status 500 to 400.
5. If you use Dameng and ship your own `sql-error-codes.xml`, merge in the Dameng error codes.
6. After 0.2.0 is released, change the dependency version to `0.2.0`.

## See it work

Start the application without `MUGSUN_API_KEY` and without `allow-ephemeral-keys`. Startup fails with this log line:

```text
未配置接口加密密钥 MUGSUN_API_KEY（32 位 hex 或带填充的 16 字节 base64），拒绝启动；仅本地开发可设 mugsun.crypto.allow-ephemeral-keys=true
```

With the key set, create a record that already exists. The API returns HTTP 400 with `code` 400 and the duplicate-data message.

Check which core version your project actually uses:

```bash
mvn dependency:tree | grep com.mugsun
```
