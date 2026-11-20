# Logs and auditing

The backend ships six kinds of logs; sign-ins, write operations and API access are recorded automatically, with no code to write. Operation logs carry a hash chain and signatures, so a deleted or altered record can be detected.

![The operation log page: after clicking Verify Integrity, a dialog reports that the audit chain is intact and how many records were verified](/screenshots/features/log-oper-verify.png)

## What it does

| Log | What it records | Table |
| --- | --- | --- |
| Login Logs | The result, IP and sign-in method of every sign-in | `sys_login_log` |
| Operation Logs | The parameters, operator and result of every write request | `sys_oper_log` |
| API Logs | The status code, duration and trace ID of API requests | `sys_api_log` |
| Error Logs | Unhandled exceptions, with their location and stack trace | `sys_error_log` |
| General Logs | Events that business code writes itself | `sys_usual_log` |
| Change Records | Snapshots of a row before and after a change, and the field differences | `sys_data_audit` |

- Operation logs are signed one by one and linked into a hash chain; Verify Integrity points to the first record that fails.
- Fields such as passwords, tokens and phone numbers in request parameters are replaced with `***` before they are written.
- API logs and error logs carry the same trace ID, which is also in the `X-Trace-Id` response header, so one can be looked up from the other.
- API logs, error logs and operation logs are cleaned up when they expire, and the retention period can be changed.

## Enable it

The six logs start with the backend and need no configuration. Four system parameters can be changed under System Settings → Parameters, and take effect without a restart:

| Parameter key | Default | Purpose |
| --- | --- | --- |
| `monitor.access-log.sample-rate` | 100 | Percentage of GET requests written to the API log, from 0 to 100 |
| `monitor.access-log.slow-ms` | 1000 | Requests that take at least this many milliseconds are marked slow |
| `monitor.log.retention-days` | 30 | Days to keep API logs and error logs |
| `monitor.oper-log.retention-days` | 180 | Days to keep operation logs |

The first three parameters are already in the list. Add the last one under this key; without it the default applies.

Sampling applies to GET requests only, and slow requests are never sampled out. File uploads and downloads, tracking endpoints and the API documentation are not written to the API log.

The retention period can be 1 to 3650 days; a value outside this range falls back to the default. Cleanup runs once when the backend starts and once a day after that, and deletes expired records outright.

## Use it

All six pages are under System Settings.

### Name an operation

Write requests are recorded in the operation log automatically, with the title `自动留痕`. Add `@OperationLog` to an endpoint method to use your own title; an annotated GET endpoint is recorded too:

```java
@OperationLog("导出行政区划")
@GetMapping("/export")
public void export(HttpServletResponse response) {
    // ...
}
```

List the paths that should not be recorded automatically in `mugsun.oper-log.exclude-paths`; see [Operation log exclusions](/en/boot/configuration#operation-log-exclusions).

### Check that operation logs are untouched

Open System Settings → Operation Logs and click Verify Integrity. The backend checks the hash and signature of every record in order, and reports that the audit chain is intact when all of them pass.

When something is wrong, the dialog shows Tampering detected, with the first failing record and the reason:

| Reason | Meaning |
| --- | --- |
| `哈希链断裂（记录被删除或插入）` | The record does not link to the one before it |
| `记录内容被篡改` | The content does not match the hash computed when it was written |
| `签名无效（记录被伪造）` | The hash matches but the signature does not verify |

### Record what changed in a row

Change records are written by business code. First add `@AuditField` to the entity fields you want to track; when `dict` holds a dictionary code, values are shown as dictionary labels:

```java
@AuditField("昵称")
private String nickname;

@AuditField(value = "状态", dict = "user_status")
private Integer status;
```

Take a copy of the entity before and after saving, and pass both to `AuditService`:

```java
auditService.record("sys_user", user.getId().toString(), before, after, operator);
```

A `null` `before` is recorded as a create, a `null` `after` as a delete, and both present as an update.

Field Changes in the detail view lists only the fields with `@AuditField`, and Snapshot Diff shows the two full snapshots. Snapshots are stored exactly as passed in, so clear fields such as passwords before the call.

### Handle error logs

Unhandled exceptions go to Error Logs with the status Pending; business errors do not. Click the edit button at the end of the row, choose Handled or Ignored in Claim & Handle, and add a handle note if you like.

### Write general logs

For business events that fit none of the logs above, write them with `UsualLogService`:

```java
usualLogService.record("warn", "order-sync", "同步订单失败：" + reason, null);
```

The first two arguments are the level and the business id, and the page filters by both. The level is `info`, `debug`, `warn` or `error`.

The third argument is the content, which is cut off after 1000 characters. The last one is the tenant id; `null` means the current tenant.

### Unlock an account

When an account is locked after repeated failed sign-ins, Unlock appears at the end of its row in Login Logs; click it and confirm to lift the lock.

Two system parameters set the lock rule:

- `security.login.fail-max` is the number of failures that locks an account, 5 by default.
- `security.login.lock-minutes` is how many minutes the lock lasts, 10 by default.

## Notes

- The permission codes of login logs and operation logs are not attached to any menu, so only accounts with the `admin` role (wildcard `*`) can use these two pages.
- Only the platform super admin can see change records. Among the built-in features, only editing a user writes change records.
- Masking matches field names, and the list includes `code`. A business field named `code` shows only `***` in the operation log.
- After the audit-signing key is replaced, older records fail verification; see [Audit-signing key pair](/en/boot/crypto-keys#audit-signing-key-pair).
- Login logs, general logs and change records are not cleaned up automatically.

## Verify

Verify the latest 100 operation log records:

```bash
curl -s "http://localhost:8080/system/oper-log/verify?limit=100" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":{"valid":true,"verified":100,"message":"审计链完整，共验签 100 条记录"},"msg":"操作成功","dataType":null}
```

Without `limit`, all records are checked.

Each record's `prev_hash` equals the `record_hash` of the record before it; compare them with this query:

```sql
SELECT id, title, request_uri, prev_hash, record_hash
FROM sys_oper_log
ORDER BY id DESC
LIMIT 3;
```

## Next steps

<div class="ms-cards">

- [Configuration](/en/boot/configuration#audit-log) The queue limit for logs from unauthenticated requests, and the operation log exclusion paths.
- [Keys and encryption](/en/boot/crypto-keys) How the audit-signing key pair is generated and where it is kept.
- [Scheduled tasks](./job) Run the built-in `LogCleanProcessor` to clean up expired logs right away.
- [Error reference](/en/guide/errors) Look up causes and fixes by error message.

</div>
