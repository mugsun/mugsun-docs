# 常见问题

问题按主题分成五组。手里有具体的报错原文时，先查[报错速查](/guide/errors)更快。

## 产品与许可

### mugsun 适合什么项目？

适合要私有化部署、同时需要管理后台和用户行为分析的项目。

它不是拖拽式的低代码平台，也不是公有云上的埋点服务。各部分是什么、能不能单独使用，见[介绍](/guide/introduction)。

### 用的是什么许可？

后端、管理后台、埋点 SDK 和 ms-ui 都是 MIT 许可，以各仓库的 `LICENSE` 文件为准。

管理后台的界面在 art-design-pro（MIT）的基础上修改，分发时要保留仓库里的 `NOTICE` 文件。

### 有在线演示吗？

ms-ui 有，见[在线演示](/demo#ms-ui)。

管理后台和埋点看板还没有公网演示站，按[快速开始](/guide/getting-started)在本机启动。

### 微服务版和 ms-ui 的源码什么时候开放？

微服务版（cloud）还在规划，没有可以安装的版本。

ms-ui 的文档和 H5 演示已经开放，源码仓库暂时没有公开。

## 启动与构建

### 用 Docker 启动，还要自己编译吗？

不用。[快速开始](/guide/getting-started)里的 `docker-compose.full.yml` 会在容器里构建并启动整套系统。

这一组里剩下的问题，都是从源码启动时才会遇到的。

### 从源码启动，为什么要先安装 mugsun-core？

`main` 分支依赖 mugsun-core 的快照版本 `0.2.0-SNAPSHOT`，Maven Central 上没有这个版本。

把 mugsun-core 克隆到同级目录，执行 `mvn -B clean install -DskipTests` 装到本地仓库。

Maven Central 上的 `0.1.0` 是上一个发布版本，和现在的 `main` 分支不配套。

### `docker compose up -d` 会把后端也启动吗？

要看用的是哪个文件：

| 命令 | 启动什么 |
| --- | --- |
| `docker compose up -d` | 只有 PostgreSQL（5432）和 Redis（6379），后端要自己打包运行 |
| `docker compose -f docker-compose.full.yml up -d` | 整套系统，包括后端和管理后台 |

### 本机的 5432 或 6379 端口被占用了怎么办？

Compose 和后端读同一组环境变量。换了端口两边一起生效，不用改 yml：

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

数据库和 Redis 不在本机时，用下面的变量指过去：

| 变量 | 作用 |
| --- | --- |
| `MUGSUN_DB_HOST` `MUGSUN_DB_PORT` `MUGSUN_DB_NAME` | 业务库的主机、端口和库名 |
| `MUGSUN_DB_USERNAME` `MUGSUN_DB_PASSWORD` | 业务库的账号 |
| `MUGSUN_DB_URL` | 整条 JDBC 地址。设了以后，上面三个地址变量不再起作用 |
| `MUGSUN_REDIS_HOST` `MUGSUN_REDIS_PORT` | Redis 的主机和端口 |

埋点库 `mugsun_track` 的地址，按下面的顺序取第一个有值的：

1. `TRACK_JDBC_URL`。
2. `MUGSUN_DB_URL`。沿用它的主机、端口和参数，只把库名换成 `mugsun_track`。
3. `MUGSUN_DB_HOST` 和 `MUGSUN_DB_PORT`。

`prod` 下业务库只读 `JDBC_URL`，埋点库仍然按这个顺序取。没设 `TRACK_JDBC_URL` 时，它会去读 `MUGSUN_DB_*`。

### Apple Silicon 上第一次 `docker compose up -d` 很慢？

慢多半是因为第一次要拉镜像。

默认的 PostgreSQL 镜像 `ghcr.io/mugsun/postgis-pgvector:16-3.4` 带 arm64 架构，不需要在本机构建。

只有改了 `docker/postgres/Dockerfile`，才需要执行 `docker compose build postgres`。

### `spring-boot:run` 报 `Unable to find a suitable main class`？

旧版本在仓库根目录执行 `mvn -pl mugsun-boot-server -am spring-boot:run` 会报这个错，拉取最新代码即可。

更推荐先打包再运行：

```bash
./mvnw -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

### 启动时读不到本地配置？

本地配置文件是 `config/application-local.yml`，按相对路径加载。启动时的工作目录必须是后端仓库的根目录。

这个文件要自己从示例复制：

```bash
cp config/application-local.yml.example config/application-local.yml
```

### 启动报 `Migration checksum mismatch for migration version 1`？ {#checksum}

这个库是用较早的 `main` 分支建的。boot 发布 0.2 之前，每套库的迁移只有一个基线脚本，改库就是直接改它。基线变了，旧库里记的校验和就对不上。

迁移并成一个基线之前建的库也报这个错，后面还跟着几行 `Detected applied migration not resolved locally`。

| 情况 | 做法 |
| --- | --- |
| 开发库，数据可以不要 | 执行 `docker compose down -v` 和 `docker compose up -d`，再启动后端重建 |
| 数据要保留 | 没有现成的原地升级办法。先备份，数据自己导出，重建以后再导入 |

`down -v` 会删掉开发数据卷，不要对共用的库执行。

不要只改迁移历史里的校验和。那样只是让校验通过，基线里新加的表、字段和菜单不会自己出现。

详见[后端升级指南](/boot/upgrade#baseline)。

### 不带 `dev` 启动，进程直接退出？

启动时没有带 `dev` 这类开发 profile，后端就按生产环境处理，判定规则见[配置参考](/boot/configuration#怎么判定是不是生产)。

生产环境缺少初始口令或字段加密密钥时拒绝启动。本地自测请加上 `--spring.profiles.active=dev`，报错的处理办法见[报错速查](/guide/errors#startup)。

### 只想要后端的基础部分，不要 GIS 和 AI？

有两种办法：

- 打包时加 `-Pbasic,'!full'`，产物里就没有这两个模块。
- 保留完整的包，运行时设 `MUGSUN_GIS_ENABLED=false` 和 `MUGSUN_AI_ENABLED=false`。

两种办法的区别见[架构](/guide/architecture#模块装配-两层开关)。

## 管理后台

### 为什么新开一个标签页要重新登录？

登录令牌存在 `sessionStorage` 里，只在当前标签页有效，关掉标签页就清除。这样可以降低令牌被 XSS 长期盗用的风险。

语言和用户信息这类不敏感的内容仍然存在 `localStorage` 里，见[登录状态存在哪里](/pc/development#登录状态存在哪里)。

### `pnpm install` 提示找不到 `@mugsun/track-web`？

管理后台依赖 npm 上的 `@mugsun/track-web`，正常情况下直接 `pnpm install` 就行，不需要克隆 mugsun-track。

装不上时，先检查网络和 npm 镜像。

要调试 SDK 的源码时，把 mugsun-track 克隆到同级目录，在 `.npmrc` 里加一行，再执行 `pnpm install`：

```ini
@mugsun/track-web=link:../mugsun-track
```

## 埋点

### 埋点会采集输入框里的内容吗？

自动采集的点击等事件从不带输入框的值。

会话回放默认是关的。打开以后，页面文字和输入框的值按原文显示，密码框、银行卡和验证码字段始终不录。

要遮掉输入内容，给回放插件传 `maskAllInputs: true`，见[开启遮罩与过滤](/track/privacy#开启遮罩与过滤)。

### 地址里的 token 会被上报吗？

不会按原文上报。SDK 上报的地址里，`token`、`access_token` 和 `code` 这类敏感参数的值会换成 `***`。

hash 里的参数也一样处理。完整的参数清单见 [URL 敏感参数](/track/privacy#url-敏感参数)。

### `appKey` 泄露了怎么办？

`appKey` 本来就写在页面代码里，谁都能看到，它不是密钥。

后端按 IP 限流，限制单次上报的大小，并校验每条事件的格式。被拒绝的上报记在[接入健康](/track/first-event#接入健康)里。

## 部署与运行

### 升级后旧的前端登录不了，返回 40013？

登录、注册和发送验证码都返回 `40013`，提示「请先完成安全验证」。

原因是后端移除了旧的数字图形验证码。验证码开启时，请求必须带 `captchaToken`。

把前端升级到行为验证码的流程，见[后端升级指南](/boot/upgrade#移除旧的数字图形验证码)。

### 后端重启后，加密接口报「加密报文解密失败」？ {#transport-key}

后端重启时换了接口传输密钥，已经打开的页面还在用旧密钥，所以加密接口都解不开。

没有配置 `MUGSUN_API_KEY` 时，密钥保存在 `~/.mugsun/api-transport.key`，重启后继续用，正常不会出这个问题。

出现了，通常是密钥文件被删、`MUGSUN_HOME` 变了，或者 Docker 没有给这个目录挂卷。

刷新页面就能恢复，管理后台会重新取一次密钥。用 Docker 或多实例部署时，要配置 `MUGSUN_API_KEY`，或者挂一个共享卷。

### 「定时任务」页提示服务暂时连不上？

默认的 Docker 环境里没有 PowerJob Server，后端连不上调度服务，所以列表是空的。

要用这个页面，自己部署 PowerJob Server，再配置 `POWERJOB_ENABLED` 等环境变量，见[定时任务](/boot/features/job)。

只需要简单的单机定时任务时，可以直接用 Spring 的 `@Scheduled`。

### 多实例部署时，部分用户收不到站内信的推送？

消息已经写进库里，但连在另一个实例上的用户收不到实时推送。

原因是 `mugsun.websocket.sender-type` 被改成了 `local`，推送只发给本实例上的连接。

保持默认值 `redis`，推送会经 Redis 的发布订阅转发到每个实例。

### 多实例部署时，附件的下载链接时好时坏？

同一个下载链接在一个实例上能打开，在另一个实例上打不开。

原因是没有配置 `MUGSUN_FILE_SIGN_SECRET`，每个实例各自随机生成了签名密钥。重启以后旧链接也会失效。

给所有实例配置同一个 `MUGSUN_FILE_SIGN_SECRET`，长度不少于 32 个字符。

### 在一个实例上关掉 GIS 或 AI，其他实例多久生效？

立即生效。系统参数改动以后，会经 Redis 广播通知每个实例清掉本地缓存。

广播依赖 `jetcache.remote.default.broadcastChannel`，默认值是 `mugsun`。覆盖这段配置时不要把它丢掉。

也可以在启动时用环境变量 `MUGSUN_GIS_ENABLED=false` 和 `MUGSUN_AI_ENABLED=false` 关闭。

### 覆盖 JetCache 的配置要注意什么？

一般不用动这段配置。`prod` 和 `demo` 都不覆盖它，Redis 地址由 `REDIS_*` 变量自动合成。

一定要覆盖时，注意三点：

- 在同一级保留 `type: redis.lettuce` 和 `broadcastChannel`。
- 不要留空的 `jetcache.remote.default:`，否则启动报 `StringIndexOutOfBoundsException`。
- 尽量不要手写 `uri`。手写的不会被覆盖，但启动时要和 `spring.data.redis` 核对，对不上就拒绝启动。

### Redis 口令里有特殊字符，要自己编码吗？

不用。合成 JetCache 的地址时，口令里的 `@` `:` `/` `?` `#` `%` 会自动做百分号编码。

一键启动的 Compose 生成的口令只有字母和数字。自己设的口令可以带特殊字符。

### openGauss 上迁移执行不了？

启动时 Flyway 还没开始执行迁移就失败了。原因是 Flyway 会执行 `SET ROLE`，而 openGauss 要求这条语句带密码。

openGauss 用 gsql 执行 `db/migration-og` 里的基线 `V1__baseline_0_2.sql`，见[后端升级指南](/boot/upgrade#baseline-opengauss)。

openGauss-lite 暂时不能用，V8 脚本在它上面有语法错误。

## 提问之前

先查[报错速查](/guide/errors)和这一页。

还是解决不了，就到对应的仓库提 [Issue](https://github.com/mugsun)，写清楚重现步骤、版本和操作系统。

版本可以写 Maven 或 npm 的版本号，也可以写提交的 SHA。
