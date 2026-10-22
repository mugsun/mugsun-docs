# 常见问题

## 产品与许可

### mugsun 适合什么项目？

需要私有化交付、同时要后台管理与产品行为分析的中后台项目。它不是拖拽式低代码平台，也不是公有云埋点 SaaS。详见 [介绍](/guide/introduction)。

### 许可证是什么？

boot、core、pc、track、ms-ui 均为 MIT。pc 的 UI 基座衍生自 art-design-pro（MIT），对外分发须保留仓内 `NOTICE`。以各仓 `LICENSE` 为准。

### 有在线演示吗？

ms-ui 组件有 [H5 在线演示](/demo)。管理台与埋点全链路目前没有公网演示环境，请按 [快速开始](/guide/getting-started) 本地拉起。

### cloud 微服务版和 ms-ui 源码什么时候开放？

cloud 仍在规划中，本站不提供安装教程。ms-ui 的组件文档与 H5 演示已开放，源码仓库暂未公开。

## 启动与构建

### 还需要先 `mvn install` mugsun-core 吗？

不需要。`com.mugsun:mugsun-*:0.1.0` 已发布至 Maven Central。只有离线环境才需要同级克隆 core 并 `mvn clean install -DskipTests`。

### `docker compose up -d` 会把应用也起起来吗？

不会。compose 只启动 PostgreSQL（5432）与 Redis（6379），应用打包后用 `java -jar mugsun-boot-server/target/mugsun-boot.jar` 运行。


### 本机 5432 / 6379 已被占用？

compose 与后端读同一组环境变量，换端口后一起生效，不用改 yml：

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

后端还认 `MUGSUN_DB_HOST`、`MUGSUN_DB_NAME`、`MUGSUN_DB_USERNAME`、`MUGSUN_DB_PASSWORD`、`MUGSUN_REDIS_HOST`，或整条 `MUGSUN_DB_URL`。埋点库 `mugsun_track` 的地址按 `TRACK_JDBC_URL` → `MUGSUN_DB_URL` → `MUGSUN_DB_HOST`/`MUGSUN_DB_PORT` 的顺序回落：走 `MUGSUN_DB_URL` 时沿用它的主机、端口和参数，只把库名换成 `mugsun_track`。`prod` 的业务库只读 `JDBC_URL`，但埋点库同样按上面的顺序回落，所以 prod 没设 `TRACK_JDBC_URL` 时会读 `MUGSUN_DB_*`，见 [配置](/boot/configuration)。`MUGSUN_DB_URL` 这一级回落需要 [mugsun-boot #38](https://github.com/mugsun/mugsun-boot/pull/38)，之前的版本只认主机和端口。

### Apple Silicon 上首次 `docker compose up -d` 很慢？

数据库镜像在本地构建，基础镜像 `postgis/postgis` 官方只有 amd64，Apple Silicon 上走仿真，首次构建要多几分钟，运行也慢。想原生运行可换多架构基础镜像：

```bash
MUGSUN_PG_BASE_IMAGE=imresamu/postgis:16-3.4 MUGSUN_PG_PLATFORM=linux/arm64 docker compose up -d --build
```

### `spring-boot:run` 报 `Unable to find a suitable main class`？

旧版本在仓库根目录执行 `mvn -pl mugsun-boot-server -am spring-boot:run` 时，插件也会作用于父工程而报错。[mugsun-boot #13](https://github.com/mugsun/mugsun-boot/pull/13) 已修复，请拉取最新代码后在仓库根目录重试。推荐方式仍是先 `mvn -pl mugsun-boot-server -am package -DskipTests`，再在仓库根目录 `java -jar mugsun-boot-server/target/mugsun-boot.jar`。

### 启动时读不到本地配置？

本地配置路径是 `optional:file:./config/application-local.yml`，工作目录必须是 boot 仓库根目录。先 `cp config/application-local.yml.example config/application-local.yml`。


### 启动报 `Migration checksum mismatch for version 1`？

0.1.0 发布的 `V1__baseline_0_1.sql` 现在与 main 完全一致（[mugsun-boot #15](https://github.com/mugsun/mugsun-boot/pull/15) 起，CI 用 `db/RELEASED.sha256` 校验，不会再改）。报这个错说明开发库是用 0.1.0 发布前的 main，或 #11 到 #15 之间的 main 建的，库里记的是旧版 V1 的校验和。

- **开发库，数据不要了（推荐）：** `docker compose down -v && docker compose up -d`，再启动后端，按当前迁移重建。只删开发数据卷，别对共享库执行。
- **数据要保留：** 先备份，确认库结构和当前 V1 一致后，再改记 V1 的校验和（等同 `flyway repair` 对 V1 的效果）：`docker exec mugsun-pg psql -U mugsun -d mugsun -c "UPDATE flyway_schema_history SET checksum = 1472764584 WHERE version = '1';"`。这只改历史表记录，不补表结构；旧 V1 少的字段或菜单不会自动出现，所以结构不一致时还是重建更稳。

用 0.1.0 正式包建的库不受影响，直接升级即可。

### `prod` 启动直接退出？

`prod` 未注入初始口令（`MUGSUN_INIT_PASSWORD`）时会拒绝启动，这是有意的安全默认值。

### 只想要后端核心，不要 GIS / AI？

构建时用 `-Pbasic,'!full'`，或保留 full 并在运行时设置 `MUGSUN_GIS_ENABLED=false` / `MUGSUN_AI_ENABLED=false`。见 [架构全景 · 模块装配](/guide/architecture#模块装配-两层开关)。

## 管理台

### 为什么新开标签页要重新登录？

0.1.0 起 token 存在 `sessionStorage`（仅当前标签页），不再写入 `localStorage`，降低 XSS 后长期凭证被窃取的风险。语言、用户信息等非敏感字段仍保存在 `localStorage`。

### `pnpm install` 报找不到 `@mugsun/track-web`？

管理台以 `file:../mugsun-track` 引用 SDK，且 SDK 仓库不提交 `dist/`。请把 mugsun-track 克隆到同级目录并执行 `pnpm setup:sdk`；不需要埋点时可设 `VITE_ENABLE_TRACK=false` 跳过构建，但同级目录仍须存在，`pnpm install` 才能通过。

## 埋点

### 埋点会采集输入框内容吗？

自动采集的点击等事件不带 `input` / `textarea` 的值。会话回放从 0.3.0 起默认显示输入框的值和页面文本原文；密码框、`maskSelectors` 与 `data-track-mask` 区域、银行卡和一次性验证码字段始终不录。需要遮罩时传 `maskAllInputs: true` 和 `maskTextSelector`，见 [隐私与合规 · 开启遮罩与过滤](/track/privacy#开启遮罩与过滤)。

### URL 里的 token 会被上报吗？

不会原文上报。接口监控的 URL、`referrer`、链接 `href`、资源错误地址和回放里的页面地址中，`token`、`access_token`、`code`、`ticket`、`otp` 等敏感参数的值替换为 `***`，hash 里的参数也处理。完整清单见 [隐私与合规 · URL 敏感参数](/track/privacy#url-敏感参数)。

### `appKey` 泄露了怎么办？

`appKey` 本来就在浏览器里可见，不是密钥。服务端靠存在性校验、限流、队列背压与事件校验防护。

## 部署与运行

本节按现象、原因、解决的顺序写。看到具体报错原文时，也可以先查[报错速查](/guide/errors)。

### 升级后旧前端登录不了，返回 40013？

现象是登录、注册或发送验证码时都返回 `40013`，提示「请先完成安全验证」。

原因是后端移除了旧的数字图形验证码 `GET /auth/captcha`，验证码开启时请求必须带 `captchaToken`。

解决办法是把前端升级到新的行为验证码流程，见[后端升级指南](/boot/upgrade#移除旧的数字图形验证码)。

### 重启后接口都报「接口密文无效」？

现象是本地开发时，后端重启后已经打开的页面调用加密接口都失败。

现在没配 `MUGSUN_API_KEY` 时密钥会持久化到 `~/.mugsun/api-transport.key`，重启复用，正常不会再出现。

仍出现时，通常是密钥文件被删了、`MUGSUN_HOME` 变了，或 Docker 没给该目录挂卷。

解决办法是刷新页面重新登录，前端会重新取密钥。Docker 和多实例部署请配置 `MUGSUN_API_KEY` 或挂共享卷。

### 「定时任务」页提示服务暂时连不上？

现象是打开「定时任务」页时提示定时任务服务暂时连不上，列表为空。

原因是 PowerJob Server 不在默认的 Docker 环境里，后端连不上调度服务。

解决办法是自行部署 PowerJob Server，并配置 `POWERJOB_ENABLED` 等环境变量，见[定时任务](/boot/features/job)。

只需要简单的单机定时任务时，可以改用 Spring 的 `@Scheduled`。

### 多实例部署时，部分用户收不到站内信推送？

现象是消息已经写入库里，但连在另一台实例上的用户没有收到实时推送。

原因是 `mugsun.websocket.sender-type` 被改成了 `local`，推送只发给本机的连接。

解决办法是保持默认值 `redis`，让推送经 Redis 发布订阅转发到每个实例。

### 多实例部署时，附件下载链接时好时坏？

现象是同一个下载链接在一台实例上能打开，在另一台上打不开。

原因是没有配置 `MUGSUN_FILE_SIGN_SECRET`，每台实例各自随机生成了签名密钥。重启后旧链接也会失效。

解决办法是给所有实例配置同一个不少于 32 个字符的 `MUGSUN_FILE_SIGN_SECRET`。

### 关闭 GIS 或 AI 模块后，其他机器还能用？

现象是在系统参数里关掉模块后，多机部署中的其他机器最长一小时内仍然开着这个模块。

原因是模块开关的系统参数只缓存在每台机器的本地，缓存时间是一小时。这是已知问题，见 [mugsun-boot#90](https://github.com/mugsun/mugsun-boot/issues/90)。

解决办法是在问题修复前，关闭模块后依次重启各实例。

也可以用环境变量 `MUGSUN_GIS_ENABLED=false`、`MUGSUN_AI_ENABLED=false` 在启动时关闭。

### Redis 口令含特殊字符时连不上？

现象是 `prod` 或 `demo` profile 启动后连不上 Redis，或连到了错误的地址。

原因是这两个 profile 里 jetcache 的连接串把口令直接拼进 URI，口令含 `@`、`:`、`/`、`?`、`#`、`%` 时解析出错。

这是已知问题，见 [mugsun-boot#70](https://github.com/mugsun/mugsun-boot/issues/70)。

解决办法是在问题修复前，Redis 口令只用字母和数字。

### openGauss 上迁移跑不起来？

现象是在 openGauss 上启动时，Flyway 在执行任何迁移之前就失败了。

原因是 Flyway 会执行 `SET ROLE`，openGauss 要求带密码而拒绝执行。

openGauss-lite 上 V8 还有语法错误，见 [mugsun-boot#102](https://github.com/mugsun/mugsun-boot/issues/102)。

解决办法是完整版 openGauss 用 gsql 按版本号逐个执行 `db/migration-og` 里的脚本，步骤见[后端升级指南](/boot/upgrade)。

## 提问之前

先查[报错速查](/guide/errors)和本页。

还是解决不了，就到对应仓库提 [Issue](https://github.com/mugsun)，写清楚重现步骤、版本和系统。版本可以写 Maven 或 npm 的版本号，也可以写 commit SHA。

