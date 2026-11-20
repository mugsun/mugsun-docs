# 后端概述

[mugsun-boot](https://github.com/mugsun/mugsun-boot) 是 mugsun 的后端，打包后是一个可执行 JAR，运行时需要 PostgreSQL 和 Redis。

账号权限、多租户和工作流这些常用功能已经做好。GIS、埋点分析和 AI 是三个可选模块，用不到的可以不打进包。

![系统管理里的菜单管理页](/readme/system-menu.png)

## 从哪里开始

<div class="ms-cards">

- [快速开始](/guide/getting-started) 用 Docker 启动整套系统，或者从源码启动后端。
- [第一个接口](/boot/tutorial/first-api) 开发入门的第一节，新增一个 `GET /hello` 接口。
- [代码生成](/boot/codegen/) 把一张表变成后端代码、管理后台页面和菜单 SQL。
- [功能概览](/boot/features/) 工作流、表单和定时任务等功能的用法。

</div>

## 启动

需要 JDK 21、Maven 3.9+ 和 Docker。第一次启动前要先安装 mugsun-core，步骤见[快速开始](/guide/getting-started#本地开发)。

```bash
docker compose up -d    # PostgreSQL 5432、Redis 6379
./mvnw -pl mugsun-boot-server -am package -DskipTests
export MUGSUN_INIT_PASSWORD='<admin 的初始口令>'
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

`curl http://localhost:8080/ping` 有响应就是启动成功。接口文档在 <http://localhost:8080/swagger-ui/index.html>。

构建和启动都要在仓库根目录执行，构建要带 `-am`。

## 自带的功能

| 功能 | 说明 |
| --- | --- |
| [账号与权限](/boot/permissions) | 用户、角色和部门。菜单和按钮权限在后台配置 |
| [数据权限](/boot/datascope/) | 按角色限定能看到哪些行 |
| [多租户](/boot/tenant/) | 一个库、一套表服务多个租户，业务表按 `tenant_id` 自动隔离 |
| [工作流](/boot/features/workflow) | 基于 Warm-Flow。在后台画流程，支持条件、并行和会签 |
| [代码生成](/boot/codegen/) | 把一张表变成后端代码、管理后台页面和菜单 SQL |
| [开放平台](/boot/open-api) | OAuth2（含 PKCE）和 API Key 两种接入方式 |
| [对象存储](/boot/features/storage) | 附件可以存本地、MinIO 或阿里云 OSS |
| [定时任务](/boot/features/job) | 基于 PowerJob，需要另外部署 PowerJob Server |
| [国密](/boot/configuration#安全与密钥) | SM2 和 SM3 由 `MUGSUN_GM_ENABLED` 开关，SM4 的密钥用 `MUGSUN_SM4_KEY` 配置 |

其余功能见[功能概览](/boot/features/)。

## 可选模块

| 模块 | 内容 | 关闭用的变量 |
| --- | --- | --- |
| 埋点分析 | 接收 SDK 上报的数据，提供看板、错误监控和会话回放 | `MUGSUN_TRACK_ENABLED` |
| GIS | 图层、场景和空间查询，可以输出矢量瓦片 | `MUGSUN_GIS_ENABLED` |
| AI | 模型接入、对话和知识库，检索使用 pgvector | `MUGSUN_AI_ENABLED` |

默认把三个模块都打进 JAR。只打包核心功能时，用 Maven Profile 选择：

```bash
./mvnw -pl mugsun-boot-server -am package -DskipTests -Pbasic,'!full'
```

其他 Profile 和开关的规则见[架构](/guide/architecture#模块装配-两层开关)。

## 数据库和技术栈

默认使用 PostgreSQL 16，带 PostGIS 和 pgvector 两个扩展。表结构由 Flyway 管理，启动时自动升级。

使用人大金仓或达梦数据库时，打包时加上 `-Pkingbase` 或 `-Pdameng`。

| 项 | 说明 |
| --- | --- |
| 框架 | Spring Boot 3、MyBatis-Flex 和 Sa-Token |
| 缓存 | JetCache，远程缓存用 Redis 7 |
| AI 模块 | 模型调用和向量检索由模块自己实现，没有引入 Spring AI |
| 许可 | MIT |

## 目前的限制

- 只有单体版本，没有微服务版本。
- 内置的 MCP Server 暂时下线，加上鉴权后恢复。
- 定时任务需要另外部署 PowerJob Server，并设置 `POWERJOB_ENABLED=true`。

## 上线之前

<div class="ms-cards">

- [配置参考](/boot/configuration) 生产环境要注入的环境变量和配置项。
- [安全清单](/boot/security-checklist) 上线前逐项核对的检查项。
- [升级指南](/boot/upgrade) 更新到新的主干版本时要做的事。
- [报错速查](/guide/errors) 按报错信息查原因和解决办法。

</div>
