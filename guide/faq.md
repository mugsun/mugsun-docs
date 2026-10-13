# 常见问题

## 产品与许可

### mugsun 适合什么项目？

需要私有化交付、同时要后台管理与产品行为分析的中后台项目。它不是拖拽式低代码平台，也不是公有云埋点 SaaS。详见 [介绍](/guide/introduction)。

### 许可证是什么？

boot、core 为 Apache-2.0；pc、track 为 MIT。pc 的 UI 基座衍生自 art-design-pro（MIT），对外分发须保留仓内 `NOTICE`。以各仓 `LICENSE` 为准。

### 有在线演示吗？

ms-ui 组件有 [H5 在线演示](/demo)。管理台与埋点全链路目前没有公网演示环境，请按 [快速开始](/guide/getting-started) 本地拉起。

### cloud 微服务版和 ms-ui 源码什么时候开放？

cloud 仍在规划中，本站不提供安装教程。ms-ui 的组件文档与 H5 演示已开放，源码仓 `mugsun-uniappx-ui` 暂未公开。

## 启动与构建

### 还需要先 `mvn install` mugsun-core 吗？

不需要。`com.mugsun:mugsun-*:0.1.0` 已发布至 Maven Central。只有离线环境才需要平级克隆 core 并 `mvn clean install -DskipTests`。

### `docker compose up -d` 会把应用也起起来吗？

不会。compose 只启动 PostgreSQL（5432）与 Redis（6379），应用打包后用 `java -jar mugsun-boot-server/target/mugsun-boot.jar` 运行。


### 本机 5432 / 6379 已被占用？

compose 与后端读同一组环境变量，换端口后一起生效，不用改 yml：

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

后端还认 `MUGSUN_DB_HOST`、`MUGSUN_DB_NAME`、`MUGSUN_DB_USERNAME`、`MUGSUN_DB_PASSWORD`、`MUGSUN_REDIS_HOST`，或整条 `MUGSUN_DB_URL`。埋点库 `mugsun_track` 默认跟随同一主机和端口，`TRACK_JDBC_URL` 仍可单独覆盖。`prod` 不读这些变量，见 [配置](/boot/configuration)。

### `spring-boot:run` 报 `Unable to find a suitable main class`？

旧版本在仓库根目录执行 `mvn -pl mugsun-boot-server -am spring-boot:run` 时，插件也会作用于父工程而报错。[mugsun-boot #13](https://github.com/mugsun/mugsun-boot/pull/13) 已修复，请拉取最新代码后在仓库根目录重试。推荐方式仍是先 `mvn -pl mugsun-boot-server -am package -DskipTests`，再在仓库根目录 `java -jar mugsun-boot-server/target/mugsun-boot.jar`。

### 启动时读不到本地配置？

本地配置路径是 `optional:file:./config/application-local.yml`，工作目录必须是 boot 仓库根目录。先 `cp config/application-local.yml.example config/application-local.yml`。

### `prod` 启动直接退出？

`prod` 未注入初始口令（`MUGSUN_INIT_PASSWORD`）时会拒绝启动，这是有意的安全默认值。

### 只想要后端核心，不要 GIS / AI？

构建时用 `-Pbasic,'!full'`，或保留 full 并在运行时设置 `MUGSUN_GIS_ENABLED=false` / `MUGSUN_AI_ENABLED=false`。见 [架构全景 · 模块装配](/guide/architecture#模块装配-两层开关)。

## 管理台

### 为什么新开标签页要重新登录？

0.1.0 起 token 存在 `sessionStorage`（仅当前标签页），不再写入 `localStorage`，降低 XSS 后长期凭证被窃取的风险。语言、用户信息等非敏感字段仍保存在 `localStorage`。

### `pnpm install` 报找不到 `@mugsun/track-web`？

管理台以 `file:../mugsun-track` 引用 SDK，且 SDK 仓不提交 `dist/`。请把 mugsun-track 克隆到平级目录并执行 `pnpm setup:sdk`；不需要埋点时设 `VITE_ENABLE_TRACK=false`。

## 埋点

### 埋点会采集输入框内容吗？

不会。SDK 不采集 `input` / `textarea` 的值，`password` 与 `maskSelectors` 命中区域整块屏蔽，回放默认遮罩输入与页面文本（0.2.0 起）。详见 [隐私与合规](/track/privacy)。

### URL 里的 token 会被上报吗？

接口监控事件中的 URL 会剥离敏感 query：`token`、`access_token`、`authorization`、`id_token`、`refresh_token`、`api_key`、`apikey`、`auth`、`secret`、`password`（大小写不敏感），值替换为 `***`。

### `appKey` 泄露了怎么办？

`appKey` 本来就在浏览器里可见，不是密钥。服务端靠存在性校验、限流、队列背压与事件校验防护。

还有问题？到对应仓库提 [Issue](https://github.com/mugsun)。
