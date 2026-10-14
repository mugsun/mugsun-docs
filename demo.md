# 在线演示

## 本地体验管理台与埋点

在本机按以下命令跑起完整后端（需 Docker 与 JDK 21）：

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

管理台（pc）与验收步骤见 [快速开始](/guide/getting-started)。账号以 [boot README](https://github.com/mugsun/mugsun-boot/blob/main/README.md) 为准，**首次登录请改密**。

## uni-app x（ms-ui） 组件 H5

组件文档页右下角有手机框，嵌入本站托管的 H5 预览（`/demo/index.html`）。例如打开 [Button](/uniappx/components/button)，即可在框内切换组件演示。

也可直接访问完整 H5 入口：[打开 ms-ui 演示](/demo/index.html)（新标签页）。

## 对外展示：只读演示模式

对外展示请用 boot 的 `demo` profile 部署只读环境，并使用非生产密钥：

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=prod,demo
```

::: warning 目前只支持 PostgreSQL
演示模式暂时只支持 PostgreSQL 部署。达梦、人大金仓、openGauss、MySQL 暂不支持 demo。
:::

开启后（`mugsun.demo.enabled=true`），后端按「默认拒绝」处理请求：

| 类别 | 处理 |
|---|---|
| GET / HEAD / OPTIONS 查询 | 放行 |
| 登录、登出、双因子、验证码校验 | 放行 |
| 埋点采集 `/track/collect`、`/track/replay`、`/track/api-body` | 放行（演示环境埋点保持开启；`mugsun.demo.track-collect=false` 可关） |
| 其余 POST / PUT / DELETE / PATCH（注册、改密/找回密码、上传、导入、AI、代码生成与低代码 DDL、任务调度、系统参数等） | HTTP 403，`msg` 为「演示环境只读」，`errorCode` 为 `DEMO_READONLY` |
| `/open/**`、`/oauth2/**`、`/v1/**`、`/system/crypto/**` | 任何方法都拒绝 |
| 带 `X-HTTP-Method-Override` 等方法覆盖头或 `_method` 参数的请求 | 拒绝 |
| WebSocket 入站消息 | 丢弃（只保留心跳），通道只用于服务端推送 |

新增的写接口默认就被拒；boot 仓库的 `docs/demo/readonly-endpoints.md` 是自动生成的全量写端点清单，由测试保证与代码一致。

::: tip 建设中
只读数据库账号（业务库只授 SELECT，埋点库独立账号只授 INSERT/SELECT）、每日 04:00（北京时间）重置样例数据、敏感词过滤（词表从外部路径加载，默认空表）、访问日志留存 6 个月、管理台的只读提示，会在后续版本陆续提供。在这些就绪之前，请不要把演示环境当作唯一防线。
:::

下一步：[快速开始](/guide/getting-started) · [安全清单](/boot/security-checklist) · [ms-ui](/uniappx/)

### 访问日志留存

演示模式下后端每个请求写一行访问日志到单独文件 `<日志目录>/mugsun-boot-access.log`，内容是 IP、方法、路径、状态码、耗时、用户 ID 和 traceId，**不记录 query 和请求体**。文件按天滚动并 gzip 压缩，默认保留 200 天、总量上限 20GB，不受日志库清理任务影响。依据是《网络安全法》第二十一条：留存网络日志不少于六个月。

- **挂载卷**：日志目录必须挂到持久卷（容器重建不丢），可用 `MUGSUN_DEMO_ACCESS_LOG_PATH` 改目录，`MUGSUN_DEMO_ACCESS_LOG_MAX_HISTORY`、`MUGSUN_DEMO_ACCESS_LOG_TOTAL_SIZE_CAP` 改保留天数和总量；保留天数不要低于 180。
- **磁盘估算**：每行约 200 字节，gzip 后约为十分之一。日均 100 万次请求约 20MB/天，200 天约 4GB；按峰值流量留出余量，达到总量上限时最早的文件会被删除。
- **备份**：把访问日志目录纳入定期备份（至少每周异地一份）。数据库里的接口日志、登录日志在演示模式下保留期不低于 180 天。
- **应用之外的请求**：真实 IP 与登录锁定、限流同一口径（只信任 `MUGSUN_OPENAPI_TRUSTED_PROXIES` 里的代理传来的 X-Forwarded-For）。在到达应用之前就失败的请求（Nginx 拒绝、400、超时等）不进这个文件，由 Nginx（管理台镜像或前置网关）的访问日志覆盖，同样按 ≥6 个月留存。
