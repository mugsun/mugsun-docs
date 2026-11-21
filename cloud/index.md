# 微服务版概述

[mugsun-cloud](https://github.com/mugsun/mugsun-cloud) 是 mugsun 后端的微服务版，由一个网关和四个服务组成。业务代码和单体版 [mugsun-boot](/boot/) 是同一份。

接口路径和返回格式与单体版相同。管理后台和埋点 SDK 不用改，把后端地址填成网关的地址即可。

::: warning 有几项功能和单体版不一样
比如审批流里的 AI 预审节点用不了，也没有 Docker 镜像。部署前先看[目前的限制](#目前的限制)。
:::

## 和单体版有什么不同

| 对比项 | 单体版 | 微服务版 |
| --- | --- | --- |
| 仓库 | [mugsun-boot](/boot/) | [mugsun-cloud](https://github.com/mugsun/mugsun-cloud) |
| 进程 | 一个 JAR | 一个网关和四个服务，其中三个服务可以不部署 |
| 运行时依赖 | PostgreSQL 和 Redis | PostgreSQL、Redis 和 Nacos |
| 对外的端口 | 后端的 `8080` | 只开放网关的 `8080` |
| 关掉模块 | 打包时去掉，或启动时关闭 | 不部署对应的服务 |
| 启动方式 | 用 Docker 启动整套系统，或从源码启动 | 从源码启动，没有 Docker 镜像 |

两个版本的业务代码、接口和库表相同。数据库、Redis 和密钥的配置项也相同，见[配置参考](/boot/configuration)。

## 由哪些服务组成

| 服务 | 端口 | 内容 |
| --- | --- | --- |
| 网关 | 8080 | 对外唯一的入口，基于 Spring Cloud Gateway |
| system | 8101 | 账号权限、租户和工作流等核心功能，对应单体版的 `mugsun-boot-core` |
| gis | 8102 | 可选。GIS，对应 `mugsun-boot-gis` |
| track | 8103 | 可选。埋点分析，对应 `mugsun-boot-track` |
| ai | 8104 | 可选。AI，对应 `mugsun-boot-ai` |

- 网关的 Maven 模块是 `mugsun-cloud-gateway`，四个服务的模块名是 `mugsun-cloud-` 加服务名。
- 公共层 `mugsun-cloud-common` 由四个服务共用，不单独运行。
- 服务注册和发现用 Nacos。PostgreSQL 和 Redis 的用法与单体版相同。
- 业务代码由脚本从 mugsun-boot 的一个提交复制过来，放在各模块的 `src/boot/` 下。要改业务逻辑，先改 mugsun-boot 再同步。

## 请求怎么转发

网关按路径把请求转给对应的服务，路径不改写。

| 路径 | 转给 |
| --- | --- |
| `/system/gis/**` | gis |
| `/track/**` | track |
| `/system/track/**` | track |
| `/system/ai/**` | ai |
| `/v1/**` | ai |
| 其余路径 | system |

登录校验和权限判断仍然在各个服务里做，和单体版是同一套代码。网关不解析令牌。

以 `/inner` 开头的路径留给服务之间互相调用。网关会拦下这些路径，不对外开放。

## 在本机启动

需要 JDK 21、Maven 3.9+ 和 Docker。mugsun-core、mugsun-boot 和 mugsun-cloud 放在同一个目录下。

<div class="ms-steps">

### 准备依赖

mugsun-core 要先装到本地仓库。数据库和 Redis 用单体版的 compose 文件启动。

```bash
git clone https://github.com/mugsun/mugsun-core.git
(cd mugsun-core && mvn -B clean install -DskipTests)

git clone https://github.com/mugsun/mugsun-boot.git
(cd mugsun-boot && docker compose up -d)    # PostgreSQL 5432、Redis 6379
```

### 启动 Nacos 并打包

```bash
git clone https://github.com/mugsun/mugsun-cloud.git && cd mugsun-cloud
deploy/dev/nacos.sh up
./mvnw -B package -DskipTests
```

### 启动 system

system 要最先启动，并等它启动完成。主库的表由它来建。

```bash
export MUGSUN_SERVICE_IP=127.0.0.1
export MUGSUN_INNER_SECRET='<用 openssl rand -hex 32 生成的值>'
export MUGSUN_INIT_PASSWORD='<admin 的初始口令>'
java -jar mugsun-cloud-service/mugsun-cloud-system/target/mugsun-cloud-system.jar --spring.profiles.active=dev
```

### 启动其他服务和网关

gis、track 和 ai 各开一个终端启动。下面是 gis 的命令，另外两个把路径里的 `gis` 换成 `track` 或 `ai`。

```bash
export MUGSUN_SERVICE_IP=127.0.0.1
export MUGSUN_INNER_SECRET='<和 system 相同的值>'
java -jar mugsun-cloud-service/mugsun-cloud-gis/target/mugsun-cloud-gis.jar --spring.profiles.active=dev
```

最后启动网关：

```bash
export MUGSUN_SERVICE_IP=127.0.0.1
java -jar mugsun-cloud-gateway/target/mugsun-cloud-gateway.jar
```

</div>

`curl http://localhost:8080/ping` 有响应，就是网关和 system 都通了。

网关的默认端口和单体版一样是 8080。同一台机器上，两个不能都用默认端口。

每个变量的作用和排查办法见仓库的 [README](https://github.com/mugsun/mugsun-cloud#readme)。

## 可以不部署的服务

gis、track 和 ai 三个服务可以不部署。system 按注册中心里有没有对应的实例，判断模块在不在。

| 服务 | 没部署时 |
| --- | --- |
| gis | 管理后台不显示 GIS 菜单，`/system/gis/**` 返回 503 |
| track | 不显示埋点分析菜单，`/track/**` 和 `/system/track/**` 返回 503，SDK 的上报也会收到 503 |
| ai | 不显示 AI 菜单，`/system/ai/**` 和 `/v1/**` 返回 503 |

服务启动后，菜单几秒内出现。服务停掉以后，菜单过一分钟左右才消失。

不需要某个模块时，不部署它的服务即可。这三个服务不接受 `MUGSUN_GIS_ENABLED=false` 这类开关，带着会拒绝启动。

## 目前的限制

下面是 2026-11-21 核对的结果，以仓库的 [README](https://github.com/mugsun/mugsun-cloud#readme) 为准。

- 审批流里的 [AI 预审节点](/boot/features/workflow#ai-approval)用不了。带这种节点的流程，要先在流程设计里去掉它。
- PowerJob 执行器只在 system 上启动，埋点的三个 PowerJob 处理器用不了。
- system 服务目前按单实例部署。
- 在 system 里改了数据权限规则、接口权限或租户数据源，其他服务最长 30 秒后生效。
- 只读演示模式（`demo` profile）没有在微服务版里验证过。
- 配置写在各服务的包里和环境变量里，没有接 Nacos 配置中心。
- 没有 Docker 镜像和 CI，也没有发布过版本。

## 上线之前

上线前先看仓库里的[部署注意事项](https://github.com/mugsun/mugsun-cloud/blob/main/docs/deployment.md)。它讲的是和单体版不一样的地方，前五节配错会出安全问题。

前五节讲的是：

- 对外只开放网关的端口，各服务的端口只让网关和其他服务访问。
- 网关前面还有反向代理时，把代理的地址段配给网关。
- 所有服务用同一套密钥，连同一个 Redis。
- 服务之间互相调用，要给四个服务配同一个 `MUGSUN_INNER_SECRET`。
- 生产环境的 Nacos 打开鉴权，端口只对网关和各服务开放。

单体版的[配置参考](/boot/configuration)和[安全清单](/boot/security-checklist)在微服务版里同样适用。

## 下一步

<div class="ms-cards">

- [后端概述](/boot/) 单体版自带的功能，微服务版里是同一份代码。
- [配置参考](/boot/configuration) 数据库、Redis 和密钥的配置项，两个版本相同。
- [架构](/guide/architecture) 各个仓库负责什么，可选模块怎么开关。
- [快速开始](/guide/getting-started) 用 Docker 在本机启动单体版的整套系统。

</div>
