# core 0.1.0 → 0.2.0

::: warning 0.2.0 is not released yet
As of 2026-10-21, Maven Central has only 0.1.0, and git has only the tag `v0.1.0`. The main branch version is `0.2.0-SNAPSHOT`.

This page follows the Unreleased section of the CHANGELOG on the main branch and may change before release.
:::

The boot main branch already depends on core `0.2.0-SNAPSHOT`, so projects on boot main already have these changes.

## Breaking changes

### API encryption uses SM4-GCM, works out of the box, optional override

core no longer has a built-in key, and API encryption now uses SM4-GCM.

- Without `MUGSUN_API_KEY` the application no longer refuses to start: the first start generates a 16-byte key in `~/.mugsun/api-transport.key` (change with `mugsun.home` / `MUGSUN_HOME`) and later restarts reuse it.
- When `MUGSUN_API_KEY` is set it wins. It must be 32 hex characters, or padded standard base64 that decodes to exactly 16 bytes. A key of the wrong length is rejected; it is never padded or truncated. The removed old built-in default is rejected too.
- Docker without a volume and multi-instance deployments must set `MUGSUN_API_KEY` or mount a shared volume; otherwise the key changes on restart and instances cannot decrypt each other.
- Ciphertext is now base64(12-byte IV ‖ ciphertext ‖ tag). CBC ciphertext from 0.1.0 can no longer be decrypted, so the frontend and backend must be upgraded together.
- Every decryption failure returns the same error.
- `encrypt(null)` and `decrypt(null)` both return null instead of throwing.

API encryption only obscures traffic. It does not prevent replay, is not bound to an endpoint, and does not replace HTTPS.

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
| `mugsun.crypto.api-key` | empty | New; environment variable `MUGSUN_API_KEY`; optional, generated when missing |
| `mugsun.home` | `~/.mugsun` | New; environment variable `MUGSUN_HOME`; where generated key files live |
| `mugsun.crypto.strict-keys` | `false` | Existing; no longer affects API encryption |

`allow-ephemeral-keys`, which existed during development, is removed and has no effect.

## License

The license changed from Apache-2.0 to MIT. The 0.1.0 artifacts on Maven Central keep the Apache-2.0 license declared when they were published.

## Upgrade steps

1. Single-instance deployments where `~/.mugsun` persists need no configuration.
2. For Docker without a volume or multiple instances, generate a key and set the same `MUGSUN_API_KEY` on every instance:

   ```bash
   openssl rand -hex 16
   ```

3. Switch the frontend's API encryption to SM4-GCM and the new ciphertext format, fetch the key from `GET /crypto/bootstrap` after login, and release it together with the backend.
4. Change the frontend's duplicate-submission check from status 500 to 400.
5. If you use Dameng and ship your own `sql-error-codes.xml`, merge in the Dameng error codes.
6. After 0.2.0 is released, change the dependency version to `0.2.0`.

## See it work

Start the application without `MUGSUN_API_KEY`. The first start logs this line (the path follows your home directory):

```text
未配置 MUGSUN_API_KEY，已自动生成接口加密密钥并保存到 /home/you/.mugsun/api-transport.key
```

Restart once more: that line is gone, and only a WARN naming the auto-generated key file remains.

Create a record that already exists. The API returns HTTP 400 with `code` 400 and the duplicate-data message.

Check which core version your project actually uses:

```bash
mvn dependency:tree | grep com.mugsun
```
