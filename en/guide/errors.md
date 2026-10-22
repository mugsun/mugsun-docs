# Error reference

This page lists common errors from startup logs, migrations and API responses. The original error text is taken from the source code on the main branches of boot, core and pc, and each entry explains the cause and the fix.

The messages are in Chinese, exactly as the code produces them. Variable parts, such as a number of minutes or a field name, are shown as `…`.

## API status codes

Every backend API returns the same structure, `{"code":…,"msg":…}`. The codes below come from `ResultCode` in core.

### 400: operation failed

```text
操作失败
```

Returned with HTTP 400 when a parameter has the wrong type, a required parameter is missing, or the request body is not valid JSON.

Check the parameters and the body format. When bean validation fails, `msg` is replaced by the validation message configured on the field.

### 400: data already exists

```text
数据已存在，请勿重复提交
```

An insert or update violated a unique constraint, for example a duplicate account or code. The message does not name the field; the field is in the server's WARN log.

Submit a value that is not used yet. These errors are not written to the error log table.

### 401: not authorized

```text
请求未授权
```

The request has no sign-in token, or the token expired or was kicked out. The admin console signs out and shows its own unauthorized message.

Sign in again. The token lives only in the current tab, so a new tab also needs a fresh sign-in.

### 403: no permission

```text
没有访问权限
```

The current role lacks the permission or role that the API requires.

Ask an admin to grant the matching menu or button permission to the role under Role Management.

### 403: no access to an API path

```text
没有接口「…」的访问权限。请让管理员在接口权限中把该路径授给当前角色
```

The API has an API permission rule, and the current role has not been granted the path.

Grant the path to the role under API Permissions, as the message says.

### 403: platform-only resource

```text
仅平台超管可访问平台级资源
```

An account of an ordinary tenant opened a platform-only feature, such as scheduled tasks, reports or storage settings.

Sign in as the super admin of the platform tenant `000000`.

### 404: resource not found

```text
资源不存在
```

The path does not exist. This usually means a typo, or the module that provides the API is turned off.

Check the API path. When GIS, AI or another module is off, its APIs do not exist.

### 405: method not allowed

```text
请求方法不允许
```

The wrong HTTP method was used, for example GET on an API that expects POST.

Use the method from the API documentation.

### 500: internal server error

```text
服务器内部异常
```

The backend hit an unhandled exception. The details are only in the server log, which has an uncaught exception line with the full stack trace.

Find the stack trace in the server log by the traceId in the response header. boot also writes the error to the error log.


## Captcha

Captcha errors are HTTP 200 with the business codes below in `code`. The codes are defined in `CaptchaCodes` in boot.

### 40010: verification expired

```text
验证已过期，请重新验证
```

The captcha challenge, or the `captchaToken` issued after verification, has expired.

Fetch a new challenge and verify again.

### 40011: verification failed

```text
验证未通过，请再试一次
```

The drag position, rotation angle or click order was wrong. Every failure returns the same message to resist probing.

Complete the check again.

### 40012: too many attempts

```text
尝试次数过多，请稍后再试
```

Too many failures from the same source in a short time triggered rate limiting.

Wait and try again. The response `data` carries how long to wait.

### 40013: security check required

```text
请先完成安全验证
```

The captcha is on, but the sign-in, sign-up or code request has no `captchaToken`. Old frontends that still call the removed `GET /auth/captcha` also get this.

Get a `captchaToken` from `/auth/captcha/challenge` and `/auth/captcha/verify` first and put it in the request body. See the [backend upgrade guide](/en/boot/upgrade).

### 40014: no check needed

```text
当前无需安全验证
```

The tenant has the captcha turned off, but the frontend still fetched a challenge.

The frontend should call `GET /auth/captcha/config` first and show the captcha only when it says so.

### 40015: accessible method not enabled

```text
未启用无障碍验证方式
```

A challenge was requested for keyboard use, but the tenant has neither the slider nor the rotate type enabled. Keyboard use supports only those two.

Enable at least one of slider or rotate in the tenant's captcha settings.

### 40016: no method available

```text
验证方式暂不可用，请联系管理员
```

None of the tenant's enabled types can be used, for example only icon click is enabled and the icon list is missing.

Enable another type in the tenant's captcha settings, or restore the icon resources.


## Sign-in and accounts

### Wrong account or password

```text
账号或密码错误。请核对账号和密码后再登录
```

The account does not exist or the password is wrong. Both cases return the same message so that nobody can probe which accounts exist.

Check the account and password. Repeated failures lock the account.

### Account locked

```text
账号已锁定，请 … 分钟后再试
账号已锁定，请联系管理员解锁
```

After as many wrong passwords as the security policy allows, the account is locked for a while. When an admin locked it by hand, the message asks you to contact the admin.

Wait for the lock to expire, or ask an admin to unlock the account under User Management.

### Account disabled

```text
账号已停用，请联系管理员
```

An admin disabled the account.

Ask an admin to enable it under User Management.

### Session expired

```text
登录已失效，请重新登录
```

The session is no longer valid, for example the token expired or was kicked out before an API that needs sign-in was called.

Sign in again.

### Tenant account limit reached

```text
租户账号数已达上限（…），请联系管理员开通
```

When creating a user, the tenant already has as many accounts as its limit allows.

Ask a platform admin to raise the tenant's account limit under Tenant Management.


## Startup

These errors appear in the startup log, and the application exits.

### SM4 field encryption key missing

```text
未配置 SM4 字段加密密钥 MUGSUN_SM4_KEY，拒绝启动；本地开发用 dev profile（设 mugsun.crypto.sm4-local-key-file）
```

No field encryption key is configured.

For local development, start with `--spring.profiles.active=dev`, which creates a local key file. In production, generate a key with `openssl rand -hex 16` and set it as `MUGSUN_SM4_KEY`.

### SM4 key in the wrong format

```text
MUGSUN_SM4_KEY 格式不对：须为 32 位 hex、解码后 16 字节的标准 base64，或过渡期的 16 字符旧写法；不补零不截断，拒绝启动
```

The key has the wrong length or encoding.

Use 32 hex characters, for example the output of `openssl rand -hex 16`.

### SM4 key cannot decrypt existing data

```text
MUGSUN_SM4_KEY 解不开库里已有的加密数据（…），拒绝启动。可能是换了密钥没迁移，或旧部署配的是 32 位 hex / 24 位 base64（旧版只取前 16 个字符）：请按文档「迁移」设 MUGSUN_SM4_OLD_KEY_LEGACY_PADDED=true 跑 Sm4KeyMigrationTool，或填回原来的密钥
```

At startup, the current key cannot decrypt fields that are already encrypted in the database. Usually the key was changed without migrating the data.

Put the original key back. If you really need a new key, migrate the data with `Sm4KeyMigrationTool` as the message says.

### API encryption key equals the old built-in default

```text
MUGSUN_API_KEY 等于已删除的旧内置默认值，拒绝启动：请换成新密钥（openssl rand -hex 16），或删掉该配置让系统自动生成
```

A missing `MUGSUN_API_KEY` is no longer an error; a key is generated automatically. See [core 0.1.0 → 0.2.0](/en/guide/upgrade/core-0-2-0).

The old built-in default is refused: remove the setting so a key is generated, or replace it using `openssl rand -hex 16`. All instances must use the same key.

### Initial password missing in production

```text
生产环境必须注入初始口令（环境变量 MUGSUN_INIT_PASSWORD 或配置 mugsun.security.init-password），禁止使用内置默认口令启动
```

The `prod` profile is active but no initial password is configured, so the built-in default would be used.

Set `MUGSUN_INIT_PASSWORD` and start again.

### SM2 transport keys missing in production

```text
strict-keys 模式：未注入 SM2 传输密钥（MUGSUN_SM2_PRIVATE_KEY/MUGSUN_SM2_PUBLIC_KEY），拒绝启动
```

The `prod` profile turns on `strict-keys`, so the SM2 transport key pair must be provided.

A missing audit-signing key no longer stops startup; it is generated into `~/.mugsun/audit-sign-sm2.key` with a WARN.

Set the key pair environment variables named in the message.

### Local file signing secret

```text
prod 开启了本地存储直出（x-file-storage local-plus enable-access=true），必须配置 mugsun.file.local-access.sign-secret（MUGSUN_FILE_SIGN_SECRET，至少 32 字符）
mugsun.file.local-access.sign-secret 至少需要 32 个字符
```

Serving downloads from local storage needs a secret to sign the download links.

Set `MUGSUN_FILE_SIGN_SECRET` to at least 32 characters, the same value on every instance.

### In-memory captcha store in production

```text
mugsun.captcha.store=memory 不能用于 prod profile，请改为 redis
```

The memory store works only within one instance and is not allowed in production.

Remove `mugsun.captcha.store=memory`, or set it to `redis`.

### Frontend URL missing

```text
未配置 mugsun.web.front-url（环境变量 MUGSUN_FRONT_URL），无法跳转 OAuth 同意页
```

OAuth authorization in the open platform redirects to the consent page in the admin console, but the console URL is not configured.

Set `MUGSUN_FRONT_URL` to the full console URL, such as `https://admin.example.com`.


## Database migrations

### V7 aborted

```text
V7 升级中止：sys_user 有 … 组同租户重复手机号（未删除用户），手机号唯一索引建不了。…
```

Only on openGauss and Dameng. The database has duplicate phone numbers within a tenant, so the unique index cannot be built.

Find and resolve the duplicates as described in the [backend upgrade guide](/en/boot/upgrade), then run the migration again.

### V11 aborted

```text
V11 升级中止：sys_tenant 有 … 个租户编号被重复使用（含已删除行），全量唯一索引建不了。…
```

A tenant code has been reused, including by deleted tenants.

Find and resolve the reused codes as described in the [backend upgrade guide](/en/boot/upgrade), then run the migration again.


## Admin console messages

When the admin console gets an HTTP error, it shows one of these messages. The text is in `src/locales/langs/zh.json` in pc. For business failures, the console shows the `msg` returned by the backend.

```text
未授权访问，请重新登录
禁止访问该资源
请求的资源不存在
服务器内部错误，请稍后重试
网关错误，请稍后重试
服务暂时不可用，请稍后重试
网关超时，请稍后重试
网络连接异常，请检查网络连接
```

| Line | Cause | Fix |
| --- | --- | --- |
| 1 | The backend returned 401 | Sign in again |
| 2 | The backend returned 403 | Ask an admin to grant the role access |
| 3 | The backend returned 404 | Check the path and confirm the module is on |
| 4 | The backend returned 500 | Look up the server log by traceId |
| 5 | The gateway returned 502 | Check that the backend is running and the proxy target is right |
| 6 | The gateway returned 503 | The backend is restarting or overloaded; try again later |
| 7 | The gateway returned 504 | Check slow APIs, or raise the proxy timeout |
| 8 | The request got no response at all | Check the network, the backend URL and the CORS settings |

## Your error is not here

Look in the [FAQ](/en/guide/faq) as well. If you are still stuck, open an issue on the relevant repository with the steps to reproduce, the version and your system.
