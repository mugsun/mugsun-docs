# 快速开始

本页带你从空环境走到三个可验证的结果：**后端健康检查通过 → 管理台登录成功 → 看板出现第一条埋点事件**。每一步都给出验收方式，命令与各仓 README 保持一致。

## 环境要求

| 工具 | 版本 | 用途 |
| --- | --- | --- |
| JDK | 21 | 运行 boot |
| Maven | 3.9+ | 构建 boot（自动从 Maven Central 拉取 `com.mugsun:mugsun-*:0.1.0`） |
| Docker / Docker Compose | 近期版本 | 启动 PostgreSQL 16（含 PostGIS、pgvector）与 Redis 7 |
| Node.js | ≥ 22.13 | 管理台与埋点 SDK（可选） |
| pnpm | ≥ 11.11（管理台锁定 `pnpm@11.28.2`） | 同上 |

推荐目录结构（管理台以 `file:../mugsun-track` 引用 SDK，因此需平级）：

```text
mugsun/
  mugsun-boot/    # 后端 :8080
  mugsun-pc/      # 管理台 :3006（可选）
  mugsun-track/   # 埋点 SDK（管理台启用埋点模块时需要）
```

::: tip 不需要再本地 install core
`mugsun-core` 0.1.0 已发布至 [Maven Central](https://central.sonatype.com/search?q=com.mugsun)，构建 boot 时由 Maven 自动解析。仅在离线环境才需要平级克隆 core 并执行 `mvn clean install -DskipTests`。
:::

## 第 1 步：启动后端

```bash
git clone https://github.com/mugsun/mugsun-boot.git
cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

- `docker compose up -d` 只启动 PostgreSQL（5432）与 Redis（6379），首次会构建带 PostGIS + pgvector 的数据库镜像。
- 打包默认使用 `full` profile（core + gis + track + ai）。
- `java -jar` 必须在仓库根目录执行，才能读到 `config/application-local.yml`。确认 `java -version` 输出 21。

::: details 能用 `mvn -pl mugsun-boot-server -am spring-boot:run` 吗？
可以，开发时可在仓库根目录直接运行（[mugsun-boot #13](https://github.com/mugsun/mugsun-boot/pull/13) 起）。部署与验收仍推荐先打包再 `java -jar`。
:::

**验收：**

- `curl http://localhost:8080/ping` 返回正常响应
- 开发环境 OpenAPI：`http://localhost:8080/swagger-ui/index.html`（`prod` 下关闭）

::: warning 初始口令
默认账号 `admin` / `123456`，可通过环境变量 `MUGSUN_INIT_PASSWORD` 覆盖。`prod` 未注入初始口令会拒绝启动。登录后请立刻修改密码，演示口令不要暴露到公网。
:::

启动失败时先看 [常见问题](/guide/faq#启动与构建)。工作目录必须是 boot 仓库根目录，否则读不到 `config/application-local.yml`。

## 第 2 步：启动管理台（可选）

在与 `mugsun-boot` 同级的目录执行：

```bash
git clone https://github.com/mugsun/mugsun-track.git
git clone https://github.com/mugsun/mugsun-pc.git
cd mugsun-pc
pnpm setup:sdk
pnpm install
pnpm dev
```

- `pnpm setup:sdk` 会构建平级的 `mugsun-track`；设置 `VITE_ENABLE_TRACK=false` 时可跳过这一步，但平级的 `mugsun-track` 目录仍须存在，否则 `pnpm install` 会失败。
- `pnpm dev` 启动在 `http://localhost:3006` 并自动打开浏览器。

开发期 `/api/**` 由 Vite 代理到 `.env.development` 中的 `VITE_API_PROXY_URL`（默认 `http://localhost:8080`）。

**验收：** 用第 1 步的账号登录（本地配置开启了验证码回显，验证码会自动填好），进入工作台，顶栏出现「埋点分析」「系统管理」等菜单。

![管理台登录页](/screenshots/pc-login.png)

![管理台工作台](/screenshots/pc-workbench.png)

::: info 登录态只在当前标签页
自 0.1.0 起，`accessToken` / `refreshToken` 存于 `sessionStorage`，不再写入 `localStorage`。新开标签页需要重新登录，这是预期行为。
:::

## 第 3 步：发送第一个埋点事件（可选）

1. 在管理台「埋点分析 → 接入管理」创建应用，得到 `appKey`。
2. 在任意 Web 项目里安装并初始化 SDK：

::: code-group

```bash [pnpm]
pnpm add @mugsun/track-web
```

```bash [npm]
npm install @mugsun/track-web
```

```bash [yarn]
yarn add @mugsun/track-web
```

:::

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'http://localhost:8080', // 上报到 {endpoint}/track/collect
  appKey: '<上一步得到的 appKey>',
})

track.track('hello_mugsun', { from: 'getting-started' })
```

**验收：** 浏览器网络面板中 `/track/collect` 返回 2xx；管理台「埋点分析 → 数据概览」选择该应用后出现数据。

![埋点数据概览（演示数据）](/screenshots/track-overview.png)完整排查步骤见 [第一个事件](/track/first-event)。

## 下一步

- 了解各仓分工与数据流：[架构全景](/guide/architecture)
- 调整模块、数据源与安全配置：[Boot 配置](/boot/configuration)
- 上线前逐项核对：[安全清单](/boot/security-checklist)
- 管理台二次开发：[管理台本地开发](/pc/development)
