# 快速开始

## 使用 Docker 试用

只需安装 Docker。数据库、Redis、后端和管理台都在容器里启动。

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
docker compose -f docker-compose.full.yml run --rm init show
```

最后一条命令会打印管理员口令（口令不写进日志）。

打开 <http://127.0.0.1:8088>，用 `admin` 登录。

也可看 `docker compose -f docker-compose.full.yml logs ready` 里的登录提示。

数据库镜像默认从 GHCR 拉取多架构 `ghcr.io/mugsun/postgis-pgvector:16-3.4`（amd64 + arm64），不必本机构建，也不必设 `MUGSUN_PG_*`。

管理台端口默认只绑定 `127.0.0.1`，只能在本机访问。

在服务器上试用、需要从其他机器访问时，启动前设置 `MUGSUN_HTTP_BIND=0.0.0.0`。端口用 `MUGSUN_HTTP_PORT` 修改。

![管理台工作台](/screenshots/pc-workbench.png)

国内服务器无法拉取 Docker Hub 镜像时，在 Docker 的 `daemon.json` 里配置 `registry-mirrors` 后重启 Docker，或给 Docker 配置代理。

::: warning
登录后不会强制改密码，请登录后在个人中心修改密码。这套 compose 只用于试用，生产环境要注入的配置见 [Boot 配置](/boot/configuration)。
:::

## 本地开发

需要 JDK 21、Maven 3.9+、Docker，管理台还需要 Node.js 22.13+ 和 pnpm 11.11+。

### 1. 启动后端

当前 tip 依赖 `mugsun-core` `0.2.0-SNAPSHOT`，须先装到本地。

```bash
git clone https://github.com/mugsun/mugsun-core.git
cd mugsun-core && mvn -B clean install -DskipTests && cd ..
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
./mvnw -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

仓库自带 Maven Wrapper（`./mvnw`）；本机 Maven 3.9+ 也可直接用 `mvn`。


`config/application-local.yml` 为可选覆盖（Spring `optional` import，已 gitignore）。

需要时再参考 `config/application-local.yml.example` 自行创建；example 无必填项。

> **请始终在仓库根目录、带 `-am` 构建**（或 `./mvnw clean package -DskipTests`）。

> 只编 server 且不带 `-am` 时，会从本地 `~/.m2` 取该版本的 jar。

> 当前 tip 为 `0.2.0-SNAPSHOT`。

> 各分支共用该坐标，打出的 jar 可能带上别的分支旧代码；与是否 `clean` 无关。

> 拿不准时先在根目录执行：`./mvnw -B install -DskipTests`（系统 `mvn` 亦可）。

`curl http://localhost:8080/ping` 返回响应即表示后端启动成功。

默认账号 `admin`。

平台种子口令由 `mugsun.security.init-password` 或 `MUGSUN_INIT_PASSWORD` 注入。

该口令仅用于首次播种平台 admin，以及 `init show`。

未注入时，非 prod 有内置缺省口令（仅本地）；prod 必须注入。

本地也可显式 `export MUGSUN_INIT_PASSWORD=…`。勿把明文写进仓库。

重置口令、新建租户管理员与导入用户的默认口令为各自随机的一次性口令，只在创建/重置接口响应里返回。

首次登录须改密后才能使用其它接口。管理前端若仍写死「初始口令=环境变量」文案，需改为展示接口返回的一次性口令并引导改密。

`java -jar` 要在仓库根目录执行，才能读到可选的 `config/application-local.yml`。

::: details 5432 或 6379 端口被占用
换一个宿主机端口。在同一个终端里导出，后端启动时也会读到：

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
```

其他解决方法见 [常见问题](/guide/faq)。
:::

### 2. 启动管理台

在 `mugsun-boot` 的上一级目录：

```bash
git clone https://github.com/mugsun/mugsun-pc.git
cd mugsun-pc && pnpm install && pnpm dev
```

埋点 SDK 默认依赖 npm `@mugsun/track-web@0.3.0`，不必再克隆 [mugsun-track](https://github.com/mugsun/mugsun-track)。

联调 SDK 源码（可选）：平级克隆 `mugsun-track` 后，用 `pnpm link ../mugsun-track`，或在 `.npmrc` 写 `@mugsun/track-web=link:../mugsun-track`，再 `pnpm install`。

浏览器打开 <http://localhost:3006>。本地登录前要完成一次安全验证，题型从五种里随机出一种，说明见[行为验证码](/pc/captcha)。

### 3. 上报第一条埋点

在管理台「埋点分析 → 接入管理」新建应用，获取 `appKey`：

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

到「埋点分析 → 数据概览」选中这个应用，即可查看上报的数据。

## 下一步

- [开发入门：第一个接口](/boot/tutorial/first-api)
- [架构](/guide/architecture)
- [Boot 配置](/boot/configuration)
- [上线安全清单](/boot/security-checklist)
- [常见问题](/guide/faq)
