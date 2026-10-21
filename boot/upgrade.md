# 升级指南

从 0.1.0 升级 boot 时，openGauss 和达梦的部署要先确认没有同租户重复手机号。PostgreSQL 和金仓不受影响，可以跳过这一节。所有部署都要看[移除旧的数字图形验证码](#移除旧的数字图形验证码)。

## 同租户重复手机号

新版迁移 V7 在 openGauss、达梦上把用户手机号改为同一租户内唯一，与 PostgreSQL 一致。手机号为空的用户和已删除的用户不参与。

库里已有重复时，迁移会报「V7 升级中止」并停下。此时还没有改动任何索引。

### 查出重复

升级前先在业务库执行：

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

```sql [达梦]
SELECT tenant_id, phone, COUNT(*) AS users,
       LISTAGG(id || ':' || username, ', ') WITHIN GROUP (ORDER BY id) AS id_username
FROM sys_user
WHERE is_deleted = 0 AND phone IS NOT NULL AND phone <> ''
GROUP BY tenant_id, phone
HAVING COUNT(*) > 1
ORDER BY tenant_id, phone;
```

:::

每行是一组重复，`id_username` 列出这些用户的 ID 和账号。

### 处理重复

每组只留一个用户用这个号码。其他人在「用户管理」里改成各自的号码或清空手机号，不再使用的账号直接删除。

处理完再执行一次查重，没有结果即可。

### 重新迁移

openGauss 上失败的 V7 已整体回滚，用 Flyway 迁移的部署直接重启。

用 gsql 手工执行的部署，重新执行 V7 脚本时带上 `-1 -v ON_ERROR_STOP=1`，出错就整体回滚并停下。

达梦的建表语句不随迁移回滚，Flyway 会留下一条失败记录。先删掉这条记录再重启：

```sql
DELETE FROM flyway_schema_history WHERE version = '7' AND success = 0;
```

迁移不再报「V7 升级中止」，就说明 V7 已完成。

## 移除旧的数字图形验证码

新版不再提供 `GET /auth/captcha`。登录页要先完成行为验证码，再把拿到的 `captchaToken` 放进登录请求。

1. 前端改走 `GET /auth/captcha/config` → `POST /auth/captcha/challenge` → `POST /auth/captcha/verify`，请求体带 `captchaToken`。旧前端登录会返回 `40013`。
2. 在 yml、`.env`、compose 和 K8s 配置里删掉 `mugsun.captcha.type`（`MUGSUN_CAPTCHA_TYPE`）和 `mugsun.captcha.expire-seconds`。写着 `IMAGE` 的部署不删会启动失败。
3. 默认启用 `SLIDER` 和 `WORD_CLICK`，每次随机出一种。只想要滑块时设 `mugsun.captcha.default-types: [SLIDER]`。
4. 前端还没改完却要先升级后端时，可临时设 `mugsun.captcha.enabled=false`，登录失败锁定照常生效。
