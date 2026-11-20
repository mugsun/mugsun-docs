# 升级指南

boot 还没有发布过正式版本。这一页写给已经部署了主干代码的项目：更新到新的主干之前，先看这里。

## 先看哪些变更影响你

| 变更 | 谁受影响 | 升级时要做的事 |
| --- | --- | --- |
| [迁移并成一个基线](#baseline) | 所有已经部署的项目 | 库不能原地更新，要重建 |
| [multipart 请求只接受白名单接口](#multipart) | 自己加过上传接口，或用 URL 参数传 token 的项目 | 把上传接口加进白名单，改用请求头传 token |
| [生产默认关闭自助注册](#register) | 生产环境开放注册的项目 | 显式打开注册开关 |
| [导出、导入、上传权限码](#perm-codes) | 所有项目 | 一般不用处理；之后新建的角色要手动授权 |
| [移除旧的数字图形验证码](#移除旧的数字图形验证码) | 所有项目 | 删掉旧配置，前端改用行为验证码 |
| [V7：同租户重复手机号](#同租户重复手机号) | openGauss、达梦，还停在合并基线之前的库 | 升级前查重并处理，否则迁移中止 |
| [V11：租户编号被复用](#v11) | 所有数据库，还停在合并基线之前的库 | 升级前查重并处理，否则迁移中止 |

第一项决定库怎么更新。中间四项是行为变化。最后两项是合并基线之前的迁移，可能中止；PostgreSQL 和金仓不受 V7 影响。

## 迁移并成一个基线 {#baseline}

**用合并之前的主干建的库不能原地更新，要重建。** 这是不兼容变更。

主干把数据库迁移并成了每套库一个基线脚本：主库是 `V1__baseline_0_2.sql`，埋点库是 `T1__baseline_0_2.sql`。

基线由原来的脚本按版本号顺序拼成，语句没有改动。PostgreSQL 上的 V17 和埋点库的 T4 是 Java 迁移，仍然在基线之后单独执行。

旧库的迁移历史是按原来的脚本逐条记的，和基线对不上。启动时 Flyway 校验失败，后端不会启动，日志里有这样的内容：

```text
Migration checksum mismatch for migration version 1
Detected applied migration not resolved locally: 2.
```

更新的步骤：

1. 删掉主库和埋点库，再建空库。
   - 用 `docker compose` 起的库，执行 `docker compose down -v` 和 `docker compose up -d`。
2. 清掉 Redis 里的缓存，免得读到旧库的数据。
3. 启动新的后端，Flyway 从零迁移。

`down -v` 会删掉数据卷，不要对共用的库执行。

这次更新没有提供保留数据的升级办法。库里有要保留的数据时，要自己导出，重建以后再导入。

本地用 Maven 编译过旧代码的，更新后先执行一次 `mvn clean`。不清理的话，`target` 里残留的旧脚本会让 Flyway 报错：

```text
Found more than one migration with version 1
```

boot 发布 0.2 之前，基线本身还会改。基线每改一次，已有的库都要这样重建一次。

### openGauss {#baseline-opengauss}

openGauss 不走 Flyway。用 gsql 执行基线，库要建成 `DBCOMPATIBILITY 'PG'`：

```bash
gsql -d mugsun -U <用户名> -f mugsun-boot-core/src/main/resources/db/migration-og/V1__baseline_0_2.sql \
  -1 -v ON_ERROR_STOP=1
```

openGauss 不记迁移历史。之前已经按版本号执行完全部脚本的库，执行过的语句和基线相同，不用重建。

## multipart 请求只接受白名单接口 {#multipart}

**multipart 请求只接受白名单里的上传接口，而且必须已登录。** 这是不兼容变更。

规则见[multipart 请求白名单](/boot/permissions#未登录的-multipart-请求)。升级时要注意：

- URL 参数里的 token 不再被接受，这样传会返回 401。
  - multipart 请求只认 `Authorization` 请求头和同名 Cookie。
- 新增的上传接口要把路径加进 `mugsun.security.multipart.allowed-paths`，否则返回 415。
- yml 里的列表是整体替换。要连同默认的 7 条一起写，否则默认的上传接口全部变成 415。
- 条目为空、不以 `/` 开头，或含 `*`、`..`、`;`、`{`、`}` 时，后端拒绝启动。
- 客户端上传前先确认已登录。未登录时可能收不到 401，而是看到连接被关闭。
- 被拒的请求不会被解析，也不会写磁盘。
  - 但在 `max-swallow-size` 以内，容器仍可能读完请求体再丢弃。
  - 部署时务必在反向代理上设置请求体上限（约 21MB）。

## 生产默认关闭自助注册 {#register}

**生产环境默认关闭注册。需要开放时设 `mugsun.auth.register.enabled=true`。** 这是不兼容变更。

- 主配置 `mugsun.auth.register.mode` 有三档：
  - `OFF`：关闭，注册接口返回 404。
  - `OPEN`：开放。
  - `APPROVAL`：注册后审核。这一档是预留的，现在设成它会拒绝启动。
- `enabled=true` 和 `enabled=false` 是 `OPEN` 和 `OFF` 的简写。
- 没有设置时，生产环境是 `OFF`。
  - `spring.profiles.active` 里写了 dev、test 或 local，且没有 prod，才是 `OPEN`。
- 前端读 `GET /auth/captcha/config` 的 `registerMode`，据此隐藏注册入口。
- 注册新增了限流，按 IP、账号和手机号计数，超限返回 429。
- 部署在反向代理后面时，必须设 `MUGSUN_OPENAPI_TRUSTED_PROXIES`。
  - 否则整站只算一个 IP，每小时一共只能注册 10 次。
  - 详见[配置参考](/boot/configuration#自助注册)。

## 导出、导入、上传权限码 {#perm-codes}

迁移 V13 和 V14 新增了几个权限码，并按原有权限给已有角色补授。升级后原来能用的人照样能用。

| 操作 | 新的权限码 | V13 补授给谁 |
| --- | --- | --- |
| 导出用户 | `sys:user:export` | 已有 `sys:user:list` 的角色 |
| 导入用户 | `sys:user:import` | 已有 `sys:user:add` 的角色 |
| 上传附件 | `sys:file:upload` | 所有已有角色 |
| 表单、流程的写操作 | 见[权限与附件](/boot/permissions) | 各租户的 `admin` 角色 |

- V14 播种内置的 `user` 角色，并给它和注册时分配的角色补授 `sys:file:upload`。
- 升级之后新建的角色默认没有任何权限。
  - 要让它能上传附件，在「角色管理」里点「授权」，勾选「上传附件」。
- 前端直传的申请要带 `size`，签名有效 15 分钟，见[前端直传](/boot/permissions#前端直传)。
- 待清理队列只删 `tmp/` 下的对象，或本次新生成、还没登记的对象。
  - 升级前已在队列里、又不在 `tmp/` 下的旧项会被丢弃，对应的对象需要人工清理。

## 同租户重复手机号

::: tip 只适用于合并基线之前的主干
迁移并成一个基线以后，V7 不再单独执行，新建的库不会遇到这里的中止。

把旧数据导入新库之前，仍然要按这一节查重，否则唯一索引会拒绝重复的手机号。
:::

迁移 V7 在 openGauss 和达梦上把用户手机号改为同一租户内唯一，和 PostgreSQL 一致。

手机号为空的用户和已删除的用户不参与。

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

每组只留一个用户用这个号码。

其他人在「用户管理」里改成各自的号码或清空手机号，不再使用的账号直接删除。

处理完再执行一次查重，没有结果即可。

### 重新迁移

::: warning openGauss 的已知问题
目前 Flyway 无法对 openGauss 执行迁移。原因是 Flyway 会执行 `SET ROLE`，openGauss 要求带密码，直接拒绝。

openGauss-lite 暂时无法应用 V8：已发布的 V8 在 lite 上有语法错误。进展见 [mugsun-boot#102](https://github.com/mugsun/mugsun-boot/issues/102)。
:::

完整版 openGauss 请用 gsql 按版本号逐个执行 `db/migration-og` 里的脚本。

失败的 V7 已整体回滚。处理完重复后，重新执行 V7 即可。

每个脚本都带上 `-1 -v ON_ERROR_STOP=1`，出错就整体回滚并停下。

gsql 手工执行不会写 `flyway_schema_history`。

等 #102 修好、改回 Flyway 时，先执行一次 `flyway baseline`，把 `baselineVersion` 设为已执行的最后一个版本。

达梦的 DDL 自动提交，迁移失败后 Flyway 会留下一条失败记录。

按[达梦：清掉失败记录](#达梦-清掉失败记录)处理后再重启，版本号填 `7`。

迁移不再报「V7 升级中止」，就说明 V7 已完成。

## 移除旧的数字图形验证码

后端不再提供 `GET /auth/captcha`。登录页要先完成行为验证码，再把拿到的 `captchaToken` 放进登录请求。

1. 前端改走下面三个接口，登录请求体带上 `captchaToken`。旧前端登录会返回 `40013`。
   - `GET /auth/captcha/config`
   - `POST /auth/captcha/challenge`
   - `POST /auth/captcha/verify`
2. 在 yml、`.env`、compose 和 K8s 配置里删掉下面两项。写着 `IMAGE` 的部署不删会启动失败。
   - `mugsun.captcha.type`（`MUGSUN_CAPTCHA_TYPE`）
   - `mugsun.captcha.expire-seconds`
3. 默认五种题型全部启用，每次随机出一种。只想要滑块时设 `mugsun.captcha.default-types: [SLIDER]`。
4. 前端还没改完却要先升级后端时，可临时设 `mugsun.captcha.enabled=false`。登录失败锁定照常生效。

## V11 中止：租户编号被复用 {#v11}

::: tip 只适用于合并基线之前的主干
迁移并成一个基线以后，V11 不再单独执行，新建的库不会遇到这里的中止。

把旧数据导入新库之前，仍然要按这一节查重，否则唯一索引会拒绝被复用的租户编号。
:::

迁移 V11 把租户编号改为永不复用：`sys_tenant` 里同一个编号只能有一行，已删除的租户也算。

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

## 下一步

<div class="ms-cards">

- [配置参考](/boot/configuration) 本页提到的配置项和环境变量。
- [权限与附件](/boot/permissions) 权限码、上传限制和 multipart 白名单。
- [安全清单](/boot/security-checklist) 升级完成后，上线前再核对一遍。

</div>
