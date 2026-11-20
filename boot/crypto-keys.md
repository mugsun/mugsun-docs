# 密钥与加密

boot 用到四类密钥。这一页说明每类密钥管什么、不配会怎样、值怎么写，以及旧数据怎么迁移。

## 四类密钥

| 密钥 | 环境变量 | 用途 | 没配时 |
| --- | --- | --- | --- |
| 字段加密密钥 | `MUGSUN_SM4_KEY` | 加密落库的敏感字段 | `dev` 下用本地密钥文件，其他环境拒绝启动 |
| 接口传输密钥 | `MUGSUN_API_KEY` | 加密接口的请求体和响应 | 自动生成并保存，重启复用 |
| SM2 传输密钥对 | `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | 登录、改密、注册时加密密码 | 每次启动临时生成并告警，`prod` 下拒绝启动 |
| 审计签名密钥对 | `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | 给审计日志签名 | 自动生成并保存，重启复用 |

几条通用规则：

- 自动生成的密钥文件放在 `~/.mugsun`。目录可以用 `mugsun.home` 或环境变量 `MUGSUN_HOME` 改。
- `strict-keys`（环境变量 `MUGSUN_STRICT_KEYS`）在 `prod` 下默认开启。
  - 开启后，缺字段加密密钥或 SM2 传输密钥对就拒绝启动。
  - 接口传输密钥和审计签名密钥不受它影响，照常自动生成。
- 日志只写密钥文件的路径，不写密钥内容。

## 生成密钥

boot 仓库带了一个脚本，一次生成全部密钥：

```bash
scripts/gen-keys.sh >> .env
```

- 输出是 `KEY=VALUE` 格式，包含 `MUGSUN_SM4_KEY`、`MUGSUN_API_KEY` 和两对 SM2 密钥。
- 加 `--all` 会另外生成 `MUGSUN_INIT_PASSWORD` 和 `MUGSUN_FILE_SIGN_SECRET`。
- 依赖 OpenSSL 1.1.1 及以上版本，要支持 SM2。
- `.env` 里是真实密钥，不要提交到 git。

## 字段加密密钥

`MUGSUN_SM4_KEY` 用来加密落库的敏感字段，比如第三方凭据和身份证号。它没有内置默认值，也不会每次启动随机生成。

只要这一个值时，用下面的命令生成：

```bash
openssl rand -hex 16
```

### 值的写法

- 只接受三种写法，先去掉前后空白：
  - 32 位 hex，大小写都行；
  - 带填充的标准 base64，解码后正好 16 字节；
  - 16 个字符的旧写法，只在过渡期兼容，启动时打 WARN，下一个版本只接受 32 位 hex。
- 其他写法一律拒绝启动：不补零、不截断，也没有兼容开关。

### 启动自检

应用启动时会用当前密钥试解库里已有的密文，防止换了密钥却没迁移数据：

- 每个加密字段最多抽 3 行，像密文的每一条都试解。
- 有一条解不开就拒绝启动，报出表、字段和主键，并提示用 `LEGACY_PADDED` 迁移。
- 空库直接通过。
- `mugsun.crypto.sm4-self-check=false` 可以跳过自检，只建议排障时临时用。
- 生产环境下这个开关不生效，照常自检。

### 加密了哪些字段

| 表 | 字段 |
| --- | --- |
| `sys_user` | `id_card` |
| `sys_tenant_datasource` | `ds_password` |
| `sys_notify_channel` | `secret` |
| `sys_oauth_client` | `client_secret` |
| `sys_api_key` | `secret_key` |
| `sys_oss` | `access_key`、`secret_key` |
| `ai_model` | `api_key`、`secret_key` |
| `ai_secret` | `secret_key` |
| `ai_datasource` | `password` |
| `ai_vector_store` | `password` |
| `ai_mcp_tool` | `api_key` |
| `gis_map_provider` | `api_key`、`secret` |

解密失败时字段返回空，不会把空值写回库里。

### ECB 的局限

字段加密目前用 SM4-ECB，密文是确定的，这样 `sys_user.id_card` 才能做等值查询。它的局限：

- 相同明文得到相同密文，库里的重复值能被看出来；
- 密文不防篡改；
- 密文不绑定行，可以被搬到别的行。

ECB 是只留给 `id_card` 的例外。其余 14 个字段不需要等值查询，计划迁到带完整性校验的 SM4-GCM。

## 接口传输密钥

`MUGSUN_API_KEY` 用于接口加密：标了 `@ApiDecrypt`、`@ApiEncrypt` 的接口，请求体和响应的 `data` 用 SM4-GCM 加密后传输。

注解怎么用，见 core 的[加密接口的请求和响应](/core/#加密接口的请求和响应)。

### 不配也能启动

- 没配时，首次启动用 SecureRandom 生成 16 字节密钥，写入 `~/.mugsun/api-transport.key`。
- 之后每次重启复用这个文件。
- 新建的目录权限是 700，文件是 600。文件权限比 600 宽时打 WARN，不拒绝启动。
- 先写临时文件再原子改名，多个进程同时首次启动也只生成一次。
- 密钥文件是符号链接时拒绝启动。
- 配了 `MUGSUN_API_KEY` 就用配的值。配置值等于已删除的旧内置默认值时拒绝启动。

::: warning 这两种部署必须配 `MUGSUN_API_KEY` 或挂共享卷
- Docker 没给 `~/.mugsun`（或 `MUGSUN_HOME`）挂卷：每次重启都会换新密钥。
- 多实例：各自生成的密钥不一致，互相解不开。

检测到容器环境且没配密钥时，启动日志打 WARN。
:::

### 值的写法 {#api-key-format}

- 只接受两种写法，先去掉前后空白：
  - 32 位 hex，大小写都行；
  - 带填充的标准 base64，解码后正好 16 字节。
- 其他写法一律拒绝启动，不补零也不截断。
- 密文格式是 `base64(IV 12 字节 ‖ 密文 ‖ 标签 16 字节)`，必须带填充。
- 加密带完整性校验，密文被篡改后解密失败。

### 前端怎么拿到同一把密钥

运行时，管理后台登录后调 `GET /crypto/bootstrap` 取 `keyHex`：

- 只对已登录会话下发，不在匿名白名单里，会话必须带租户。
- 按用户限流，默认每分钟 30 次，配置项是 `mugsun.crypto.bootstrap.per-user-per-minute`。
- 未登录返回 401，会话没有租户返回 403，超过限流返回 429，都不含密钥。
- 响应带 `Cache-Control: no-store`。日志只记谁调了，不记密钥。
- 配了 `MUGSUN_API_KEY` 时返回的就是配置值，统一成 32 位小写 hex。
- 只下发传输密钥。签名密钥、SM2 私钥和字段加密密钥，任何接口都不下发。

本地开发时，后端还会把同一把密钥写进 mugsun-pc 的 `.env.local`：

- 写入的变量是 `VITE_CRYPTO_API_KEY`，只改这一行，其余行原样保留。
- 只在 `spring.profiles.active` 非空、含 `dev`、`test` 或 `local`、且不含 `prod` 时执行。
- pc 的 `.gitignore` 没忽略 `.env.local` 就拒绝写入。
- pc 目录用 `MUGSUN_PC_DIR` 指定，没配就找 `../mugsun-pc` 和 `../../mugsun-pc`。
- `mugsun.crypto.pc-env-local.enabled=false` 可以关掉。

构建期配的 `VITE_CRYPTO_API_KEY` 和后端下发的值不一致时，前端直接报错并停用加密，不会悄悄用错的密钥。

::: danger 只是传输混淆，不能代替 HTTPS
对称密钥要下发到浏览器，对客户端不保密。生产必须走 HTTPS。

不防重放、不绑定接口：密文可以被原样重发，或搬到另一个加密接口。
:::

这把密钥只用于传输混淆。不要拿它做落库加密或派生签名，也不要和签名密钥共用。

## SM2 传输密钥对

`MUGSUN_SM2_PRIVATE_KEY` 和 `MUGSUN_SM2_PUBLIC_KEY` 用来在登录、改密和注册时加密密码。

- 私钥是 64 位 hex。公钥是 `04` 开头的未压缩点，共 130 位 hex。
- 留空时每次启动临时生成一对并告警。重启后密钥会变，登录可能因此失败。
- `strict-keys` 开启时（`prod` 默认），缺这对密钥就拒绝启动。
- 生产环境要配固定的一对。
- 关闭国密开关后密码不再用 SM2 加密，见[关闭国密后的行为](/boot/configuration#关闭国密后的行为)。

## 审计签名密钥对

`MUGSUN_SIGN_PRIVATE_KEY` 和 `MUGSUN_SIGN_PUBLIC_KEY` 用来给审计日志签名，和传输密钥分开存。

- 没配时自动生成，存到 `~/.mugsun/audit-sign-sm2.key`，重启复用。
- 这把密钥任何接口都不下发。
- Docker 不给密钥目录挂卷时，每次重启都会换新密钥，历史签名就验不过了。
  - 这种部署要配上这对环境变量，或者给目录挂持久卷。
  - 检测到容器环境且没配时，启动日志打 WARN。

## 本地开发

- 用 `dev` 启动：`mvn spring-boot:run` 默认就是，`java -jar` 要加 `--spring.profiles.active=dev`。
- 接口传输密钥和审计签名密钥没配时自动生成到 `~/.mugsun`，重启复用。
- 字段加密密钥没配时，用 `mugsun.crypto.sm4-local-key-file` 指向的本地密钥文件：
  - 默认是 `${user.home}/.mugsun/dev-sm4.key`，可以用 `MUGSUN_SM4_LOCAL_KEY_FILE` 改；
  - 首次启动生成随机密钥写进去，之后每次启动复用，重启后本地数据仍能解开；
  - 文件创建时就是 600 权限，目录 700，权限过宽会打 WARN；
  - 删掉文件后，用它加密的本地数据就解不开了。
- 本地密钥文件只在 `dev` 的配置里设置。`MUGSUN_STRICT_KEYS=true` 时它不生效。
- SM2 传输密钥对留空时每次启动临时生成，建议填一对固定的本地密钥。

## 从旧版本升级

早期版本在没配密钥时，会回落到仓库里公开的内置值。现在内置值已经全部去掉，行为有这些变化：

- `dev` 以外的环境缺 `MUGSUN_SM4_KEY` 会拒绝启动。
- `MUGSUN_API_KEY` 和审计签名密钥没配时自动生成并保存，不再拒绝启动。
- 接口加密从 SM4-CBC 改为 SM4-GCM。旧密文不再兼容，管理后台要同步升级。
- `strict-keys` 不再影响接口传输密钥和审计签名密钥。
- 配置项 `mugsun.crypto.allow-ephemeral-keys` 已移除。
- 密钥不再按字符补零或截断。
  - 旧版本对所有密钥都按字符处理：短的补零，长的截断到 16 个字符。
  - 所以旧版配的 32 位 hex 或 24 位 base64 密钥，现在解码出来是另一把密钥，也要迁移。

### 升级步骤

1. 处理 `MUGSUN_API_KEY`：
   - 单实例、密钥目录能持久保存的部署，可以删掉它，让系统自动生成。
   - Docker 不挂卷或多实例部署，用 `openssl rand -hex 16` 生成新值配上。
   - 还配着旧的 16 个字符写法的，要先换成新格式或删掉，否则拒绝启动。
2. 前端改为登录后从 `GET /crypto/bootstrap` 取密钥。
   - 构建期仍配 `VITE_CRYPTO_API_KEY` 的，必须和后端是同一个值，前后端一起发布。
3. 确认 `MUGSUN_SM4_KEY` 已配置，写法合法。
4. 按下表判断要不要先迁移旧数据。要迁移的部署，直接填旧值照样解不开旧数据。

| 之前的 `MUGSUN_SM4_KEY` | 怎么办 |
| --- | --- |
| 一直是 16 个字符的写法 | 密钥字节不变，可以直接升级 |
| 没配过，用的是旧回落值 | 先迁移 |
| 短于 16 个字符 | 先迁移 |
| 32 位 hex 或 24 位 base64 | 先迁移。旧密钥填原值，并设 `MUGSUN_SM4_OLD_KEY_LEGACY_PADDED=true` |

### 迁移旧数据 {#migrate}

直接填新密钥，旧数据全部解不开；填回旧值，等于继续用公开的密钥。

应用同一时间只装一把密钥，所以重新加密要用离线迁移工具，它同时拿新旧两把密钥。

迁移工具的主类是 `com.mugsun.boot.common.crypto.Sm4KeyMigrationTool`。输入全部走环境变量，不写在命令行里：

| 环境变量 | 说明 |
| --- | --- |
| `MUGSUN_SM4_OLD_KEY` | 旧密钥。旧回落值见 git 历史，仅用于迁移 |
| `MUGSUN_SM4_OLD_KEY_LEGACY_PADDED` | 旧密钥是短密钥、旧回落值，或旧版配过的 32 位 hex、24 位 base64 时设 `true`，按旧版补零、截断的方式还原 |
| `MUGSUN_SM4_NEW_KEY` | 新密钥，写法同 `MUGSUN_SM4_KEY` |
| `MUGSUN_MIGRATE_JDBC_URL`、`MUGSUN_MIGRATE_DB_USER`、`MUGSUN_MIGRATE_DB_PASSWORD` | 目标库连接 |

迁移步骤：

1. 备份数据库，停掉应用。
2. 先跑 dry-run（默认，不写库）：

   ```bash
   java -cp mugsun-boot.jar \
     -Dloader.main=com.mugsun.boot.common.crypto.Sm4KeyMigrationTool \
     org.springframework.boot.loader.launch.PropertiesLauncher
   ```

   按表和字段输出总数、需重加密、已是新密钥、历史明文、解不开的条数。
   用 Docker 镜像时，换掉入口直接跑 java：

   ```bash
   docker run --rm --env-file migrate.env --entrypoint java <镜像> \
     -cp /app/app.jar \
     -Dloader.main=com.mugsun.boot.common.crypto.Sm4KeyMigrationTool \
     org.springframework.boot.loader.launch.PropertiesLauncher --dry-run
   ```

   `migrate.env` 用完即删，不要提交。
3. 「解不开」全为 0 后，**先确认第 1 步的备份可用**，再加 `--apply` 跑一次。
   单事务写库，有一条解不开就整体回滚。
4. 把 `MUGSUN_SM4_KEY` 换成新密钥启动。核对标准：error 日志里「SM4 解密失败」为 0 条。
5. 字段里存的第三方凭据全部轮换。

注意事项：

- 新旧密钥相同会被拒绝执行，包括同一把密钥的 hex、base64 两种写法。
- 密钥只从环境变量读，命令行只认 `--dry-run` 和 `--apply`。
- 输出只有表名、字段、行数和解不开的主键，不含密钥、明文或密文。
- 租户独立数据源（`sys_tenant_datasource`）的库要各跑一次。
- 配了 `mugsun.db.default-schema` 的，JDBC URL 里要带上该 schema。
  - PG 用 `currentSchema=`；多个 schema 就每个各跑一次。
- 迁移前不要在管理后台保存解不开的记录。
- 接口加密只影响传输，不落库，换密钥即可，不用迁移。
- 本地以前用旧回落值加密的数据，升级后会解不开，需要重建本地库或按上面的步骤迁移。

## 下一步

<div class="ms-cards">

- [配置参考](/boot/configuration) 按主题查配置项和环境变量。
- [安全清单](/boot/security-checklist) 上线前逐项核对密钥和开关。
- [升级指南](/boot/upgrade) 其他需要手动处理的升级项。

</div>
