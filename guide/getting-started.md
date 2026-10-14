# 快速开始

## 只用 Docker 试用

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
docker compose -f docker-compose.full.yml run --rm init show
```

最后一条命令会打印管理员密码。打开 <http://localhost:8088>，用 `admin` 登录。

![管理台工作台](/screenshots/pc-workbench.png)

国内拉不到 Docker Hub 镜像时，在 Docker 的 `daemon.json` 里配置 `registry-mirrors` 后重启 Docker，或给 Docker 配置代理。

::: warning
登录后不会强制改密码，请到个人中心自己改。这套 compose 只用于试用，生产环境要注入的配置见 [Boot 配置](/boot/configuration)。
:::

## 本地开发

需要 JDK 21、Maven 3.9+、Docker，管理台还需要 Node.js 22.13+ 和 pnpm 11.11+。

### 1. 启动后端

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

`curl http://localhost:8080/ping` 有响应即成功。默认账号 `admin` / `123456`。

::: details 5432 或 6379 端口被占用
换一个宿主机端口。在同一个终端里导出，后端启动时也会读到：

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
```

其他办法见 [常见问题](/guide/faq)。
:::

### 2. 启动管理台

在 `mugsun-boot` 的上一级目录：

```bash
git clone https://github.com/mugsun/mugsun-track.git
git clone https://github.com/mugsun/mugsun-pc.git
cd mugsun-pc && pnpm setup:sdk && pnpm install && pnpm dev
```

浏览器打开 <http://localhost:3006>，本地环境验证码会自动填好。

### 3. 发第一条埋点

在管理台「埋点分析 → 接入管理」新建应用，拿到 `appKey`：

::: code-group
```bash [pnpm]
pnpm add @mugsun/track-web
```
```bash [npm]
npm install @mugsun/track-web
```
:::

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'http://localhost:8080',
  appKey: '<你的 appKey>',
})
track.track('hello_mugsun')
```

到「埋点分析 → 数据概览」选中这个应用，就能看到数据。

## 下一步

- [架构](/guide/architecture)
- [Boot 配置](/boot/configuration)
- [上线安全清单](/boot/security-checklist)
- [常见问题](/guide/faq)
