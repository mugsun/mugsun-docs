# 升级指南

从 0.1.0 升级 boot 时，有两项迁移可能中止：

- V7：openGauss 和达梦要先确认没有同租户重复手机号。PostgreSQL 和金仓不受影响。
- V11：所有数据库都要先确认租户编号没有被复用。

所有部署都要看[移除旧的数字图形验证码](#移除旧的数字图形验证码)。

## 未合入版本：未登录的 multipart 请求被前置拒绝（不兼容变更）

**multipart 请求只接受白名单里的上传接口，且必须已登录。** 详见[未登录的 multipart 请求](/boot/permissions#未登录的-multipart-请求)。

- URL 参数里的 token 不再被接受：multipart 请求只认 `Authorization` 请求头和同名 Cookie，用 URL 参数传 token 会返回 401。
- 新增上传接口要把路径加进 `mugsun.security.multipart.allowed-paths`，否则 multipart 请求返回 415。
- yml 里的列表是整体替换，要连同默认的 5 条一起写，否则默认的上传接口会全部变成 415。
- 条目为空、不以 `/` 开头、含 `*`、`..`、`;`、`{`、`}` 时拒绝启动。
- 客户端上传前要先确认已登录：未登录时可能收不到 401，而是看到连接被关闭。

## 0.1.1：生产默认关闭自助注册（不兼容变更）

**生产默认关闭注册，需要开放请设 `mugsun.auth.register.enabled=true`。**

- 新的主配置 `mugsun.auth.register.mode` 有三档：
  - `OFF`：关闭，注册接口 404。
  - `OPEN`：开放。
  - `APPROVAL`：注册后审核，预留，目前设成它会拒绝启动。
- `enabled=true/false` 是 `OPEN`/`OFF` 的简写。
- 未设置时：生产 `OFF`；`spring.profiles.active` 显式含 dev、test 或 local 且不含 prod 时 `OPEN`。
- 前端读 `GET /auth/captcha/config` 的 `registerMode` 隐藏注册入口。
- 注册新增限流（IP、账号、手机号），超限返回 429。
- 部署在反代后面必须设 `MUGSUN_OPENAPI_TRUSTED_PROXIES`。
  - 否则整站只算一个 IP，每小时一共只能注册 10 次。
  - 详见[配置参考](/boot/configuration#自助注册)。

## 0.1.1：导出、导入、上传权限码（V13、V14）

- 用户导出改用 `sys:user:export`，导入改用 `sys:user:import`。
- 附件上传需要 `sys:file:upload`。
- V13 按旧权限给已有角色补授，升级后原来能用的人照样能用。
- V14 播种内置 `user` 角色，并给它和注册角色补授 `sys:file:upload`。
- 之后新建的角色默认没有任何权限，需要在「角色管理」里勾选。
- 前端直传须带 `size`，签名有效期 15 分钟。详见[权限与附件](/boot/permissions)。
- 待清理队列只删 `tmp/` 下或本次新生成、未登记的 key。
  - 升级前已在队列、不在 `tmp/` 下的旧项会被丢弃，需人工清理对应对象。

## 同租户重复手机号

新版迁移 V7 在 openGauss、达梦上把用户手机号改为同一租户内唯一，与 PostgreSQL 一致。手机号为空的用户和已删除的用户不参与。

库里已有重复时，迁移会报「V7 升级中止」并停下。此时还没有改动任何索引。

### 查出重复

升级前先在业务库执行：

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

```sql [达梦]
SELECT tenant_id, MAX('****' || RIGHT(phone, 4)) AS phone_tail, COUNT(*) AS users,
       LISTAGG(id || ':' || username, ', ') WITHIN GROUP (ORDER BY id) AS id_username
FROM sys_user
WHERE is_deleted = 0 AND phone IS NOT NULL AND phone <> ''
GROUP BY tenant_id, phone
HAVING COUNT(*) > 1
ORDER BY tenant_id, phone;
```

:::

每行是一组重复。`phone_tail` 只显示号码后 4 位，`id_username` 列出这些用户的 ID 和账号。

查询结果含个人信息，请勿贴到工单或群聊里。

### 处理重复

每组只留一个用户用这个号码。其他人在「用户管理」里改成各自的号码或清空手机号，不再使用的账号直接删除。

处理完再执行一次查重，没有结果即可。

### 重新迁移

::: warning openGauss 的已知问题
目前 Flyway 无法对 openGauss 执行迁移。原因是 Flyway 会执行 `SET ROLE`，openGauss 要求带密码，直接拒绝。

openGauss-lite 暂时无法应用 V8：已发布的 V8 在 lite 上有语法错误。进展见 [mugsun-boot#102](https://github.com/mugsun/mugsun-boot/issues/102)。
:::

完整版 openGauss 请用 gsql 按版本号逐个执行 `db/migration-og` 里的脚本。

失败的 V7 已整体回滚。处理完重复后，重新执行 V7 即可。

每个脚本都带上 `-1 -v ON_ERROR_STOP=1`，出错就整体回滚并停下。

gsql 手工执行不会写 `flyway_schema_history`。#102 修好后改回 Flyway 时，先执行一次 `flyway baseline`，把 `baselineVersion` 设为已执行的最后一个版本。

达梦的 DDL 自动提交，迁移失败后 Flyway 会留下一条失败记录。按[达梦：清掉失败记录](#达梦-清掉失败记录)处理后再重启，版本号填 `7`。

迁移不再报「V7 升级中止」，就说明 V7 已完成。

## 移除旧的数字图形验证码

新版不再提供 `GET /auth/captcha`。登录页要先完成行为验证码，再把拿到的 `captchaToken` 放进登录请求。

1. 前端改走 `GET /auth/captcha/config` → `POST /auth/captcha/challenge` → `POST /auth/captcha/verify`，请求体带 `captchaToken`。旧前端登录会返回 `40013`。
2. 在 yml、`.env`、compose 和 K8s 配置里删掉 `mugsun.captcha.type`（`MUGSUN_CAPTCHA_TYPE`）和 `mugsun.captcha.expire-seconds`。写着 `IMAGE` 的部署不删会启动失败。
3. 默认五种题型全部启用，每次随机出一种。只想要滑块时设 `mugsun.captcha.default-types: [SLIDER]`。
4. 前端还没改完却要先升级后端时，可临时设 `mugsun.captcha.enabled=false`，登录失败锁定照常生效。

## V11 中止：租户编号被复用

新版迁移 V11 把租户编号改为永不复用：`sys_tenant` 里同一个编号只能有一行，已删除的租户也算。

同一个编号已有多行时，迁移会报「V11 升级中止」并停下。此时还没有改动任何索引。

### 查出复用的编号

::: code-group

```sql [PostgreSQL / 金仓 / openGauss]
SELECT tenant_code, count(*) AS tenants,
       string_agg(id::text || ':' || is_deleted, ', ') AS id_deleted
FROM sys_tenant
GROUP BY tenant_code
HAVING count(*) > 1
ORDER BY tenant_code;
```

```sql [达梦]
SELECT tenant_code, COUNT(*) AS tenants,
       LISTAGG(id || ':' || is_deleted, ', ')
         WITHIN GROUP (ORDER BY id) AS id_deleted
FROM sys_tenant
GROUP BY tenant_code
HAVING COUNT(*) > 1
ORDER BY tenant_code;
```

:::

每行是一个被多个租户用过的编号。`id_deleted` 列出这些租户的 ID，冒号后的 0 表示在用，1 表示已删除。

### 处理复用

业务表、凭据和数据源都按编号关联。已删除租户留在这些表里的行，现在都算在在用的租户名下。

先核对这个编号下的数据属于谁，把属于已删除租户的行迁走或清理掉。

再保留在用的租户，给每一条已删除的租户行各换一个没人用过的 6 位编号，例如：

```sql
UPDATE sys_tenant SET tenant_code = '<新编号>' WHERE id = <已删除租户的 id>;
```

处理完再执行一次查重，没有结果即可。

### 重新迁移

PostgreSQL 和金仓上失败的 V11 已整体回滚，直接重启。

openGauss 上同样已回滚。用 gsql 重新执行 V11 脚本，带上 `-1 -v ON_ERROR_STOP=1`。

达梦按[达梦：清掉失败记录](#达梦-清掉失败记录)处理后再重启，版本号填 `11`。

## 达梦：清掉失败记录

达梦的 DDL 自动提交，迁移失败后 Flyway 会留下一条失败记录。不清掉的话，重启时校验失败。

清理前先备份 `flyway_schema_history` 表：

```sql
CREATE TABLE flyway_schema_history_bak AS SELECT * FROM flyway_schema_history;
```

再用下面两种方式之一清掉失败记录：

::: code-group

```sql [SQL]
-- <版本号> 换成失败的版本，例如 '7' 或 '11'
DELETE FROM flyway_schema_history WHERE "version" = '<版本号>' AND "success" = 0;
```

```sh [Flyway CLI]
# 社区版 Flyway 不认达梦，先把达梦驱动和插件放进 CLI 的 drivers 目录：
#   DmJdbcDriver18-8.1.3.62.jar（达梦官方 JDBC 驱动）
#   db-migration-dameng-flyway-4.1.2.jar（Maven Central：com.github.mengweijin）
# 连接参数与应用使用的业务库一致
flyway -url="jdbc:dm://<主机>:5236?schema=<模式名>" -user=<用户名> -password=<密码> repair
```

:::

`flyway repair` 会删掉历史表里所有失败的记录。
