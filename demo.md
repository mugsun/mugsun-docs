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
| 埋点采集 `/track/collect`、`/track/replay`、`/track/api-body` | 默认拒绝；`MUGSUN_DEMO_TRACK_COLLECT=true` 时放行。在输出转义、敏感词和配额就绪前请保持关闭 |
| 其余 POST / PUT / DELETE / PATCH（注册、改密/找回密码、上传、导入、AI、代码生成与低代码 DDL、任务调度、系统参数等） | HTTP 403，`msg` 为「演示环境只读」，`errorCode` 为 `DEMO_READONLY` |
| `/open/**`、`/oauth2/**`、`/v1/**`、`/system/crypto/**` | 任何方法都拒绝 |
| 带 `X-HTTP-Method-Override` 等方法覆盖头或 `_method` 参数的请求 | 拒绝 |
| WebSocket | 入站消息丢弃（只保留心跳），通道只用于服务端推送；只接受 `MUGSUN_DEMO_WS_ALLOWED_ORIGINS`（默认管理端地址 `mugsun.web.front-url`）来源的握手 |
| 已知不保证（后续版本处理） | ① 公开的演示账号可被他人输错密码锁定；② 开了双因子时登录会发短信/邮件；③ 打开埋点采集后可匿名写入，有刷库和存储型 XSS 风险；④ 验证码、社交登录 state 写 Redis，AI 对话/导出会占连接和 CPU，AI 读接口可能访问外部模型。这些不进业务库，只读数据库账号拦不住 |

新增的写接口默认就被拒；boot 仓库的 `docs/demo/readonly-endpoints.md` 是自动生成的全量写端点清单，由测试保证与代码一致。

::: tip 建设中
只读数据库账号（业务库只授 SELECT，埋点库独立账号只授 INSERT/SELECT）、每日 04:00（北京时间）重置样例数据、敏感词过滤（词表从外部路径加载，默认空表）、访问日志留存 6 个月、管理台的只读提示，会在后续版本陆续提供。在这些就绪之前，请不要把演示环境当作唯一防线。
:::

下一步：[快速开始](/guide/getting-started) · [安全清单](/boot/security-checklist) · [ms-ui](/uniappx/)
