# 快速开始

只需要安装 Docker（Compose v2.17+）。整套系统都在容器里启动，包括数据库和 Redis。

<div class="ms-steps">

### 启动

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
```

第一次启动要在本机构建后端和管理后台的镜像，需要等一段时间。

### 查看管理员口令

```bash
docker compose -f docker-compose.full.yml run --rm init show
```

口令在第一次启动时随机生成，保存在 Docker 卷里。

### 登录

打开 <http://127.0.0.1:8088>，用 `admin` 和上一步的口令登录。第一次登录要先修改口令。

![登录后看到的工作台](/screenshots/pc-workbench.png)

</div>

::: warning 只用于试用
这套 Compose 只用于试用。生产环境要注入的配置见[配置参考](/boot/configuration)和[安全清单](/boot/security-checklist)。
:::

## 调整启动方式

表里的变量要在执行 `up` 之前设置。

| 需求 | 做法 |
| --- | --- |
| 从其他机器访问 | 设置 `MUGSUN_HTTP_BIND=0.0.0.0`，默认只能在本机访问 |
| 换端口 | 设置 `MUGSUN_HTTP_PORT`，默认 `8088` |
| 换时区 | 设置 `MUGSUN_TZ`，默认 `Asia/Shanghai` |
| 再看一遍登录提示 | `docker compose -f docker-compose.full.yml logs ready` |
| 清空数据重新开始 | `docker compose -f docker-compose.full.yml down -v`，数据和密钥都会删除 |

::: details 拉不到 Docker Hub 的镜像
在 Docker 的 `daemon.json` 里配置 `registry-mirrors` 后重启 Docker，或者给 Docker 配置代理。
:::

## 从源码启动 {#本地开发}

要改代码时，把后端和管理后台分别从源码启动。

需要 JDK 21、Maven 3.9+ 和 Docker。管理后台还需要 Node.js 22.13+ 和 pnpm 11.11+。

<div class="ms-steps">

### 启动后端

`main` 分支依赖 mugsun-core 的快照版本。Maven Central 上没有这个版本，要先装到本地。

```bash
git clone https://github.com/mugsun/mugsun-core.git
cd mugsun-core && mvn -B clean install -DskipTests && cd ..

git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d    # PostgreSQL 5432、Redis 6379
./mvnw -pl mugsun-boot-server -am package -DskipTests
export MUGSUN_INIT_PASSWORD='<admin 的初始口令>'
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

`curl http://localhost:8080/ping` 有响应就是启动成功。

### 启动管理后台 {#2-启动管理台}

回到 `mugsun-boot` 的上一级目录执行：

```bash
git clone https://github.com/mugsun/mugsun-pc.git && cd mugsun-pc
pnpm install
pnpm dev
```

浏览器会自动打开 <http://localhost:3006>。用 `admin` 和上一步设置的初始口令登录。

### 上报第一条埋点

在管理后台的「埋点分析 → 接入管理」里新建应用，拿到 `appKey`。然后在你的页面里安装 SDK：

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

const tracker = createTracker({
  endpoint: 'http://localhost:8080',
  appKey: '<你的 appKey>',
})
tracker.track('hello_mugsun')
```

到「埋点分析 → 数据概览」选中这个应用，就能看到刚上报的数据。

</div>

::: details 5432 或 6379 端口被占用
换一个宿主机端口。在同一个终端里导出，后端启动时也会读到：

```bash
export MUGSUN_DB_PORT=55432 MUGSUN_REDIS_PORT=56379
docker compose up -d
```

其他问题见[常见问题](/guide/faq)和[报错速查](/guide/errors)。
:::

## 下一步

<div class="ms-cards">

- [写第一个接口](/boot/tutorial/first-api) 在后端新增一个 `GET /hello` 接口。
- [架构](/guide/architecture) 各个仓库负责什么，可选模块怎么开关。
- [配置参考](/boot/configuration) 生产环境要注入的环境变量和配置项。
- [安全清单](/boot/security-checklist) 上线前逐项核对的检查项。

</div>
