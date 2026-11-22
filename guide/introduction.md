# 介绍

mugsun 是一套开源的中后台系统，后端和管理后台配套提供，自带埋点分析、GIS 和 AI 三个可选模块。

多租户、工作流和代码生成这些功能已经做好，你在它上面写自己的业务。

![管理后台的埋点数据概览页](/readme/track-overview.png)

## 它由哪几部分组成

| 部分 | 是什么 | 技术栈 |
| --- | --- | --- |
| [mugsun-boot](/boot/) | 后端，打包后是一个可执行 JAR | JDK 21、Spring Boot 4 和 MyBatis-Flex |
| [mugsun-cloud](/cloud/) | 后端的微服务版，由一个网关和四个服务组成 | Spring Cloud Gateway 和 Nacos |
| [mugsun-pc](/pc/) | 管理后台，菜单和按钮权限由后端返回 | Vue 3、Vite 7 和 Element Plus |
| [@mugsun/track-web](/track/) | 浏览器埋点 SDK，发布在 npm 上 | TypeScript，会话回放基于 rrweb |
| [ms-ui](/uniappx/) | uni-app x 组件库，有 119 个组件 | uvue 和 uts |
| [mugsun-core](/core/) | 后端的公共依赖，也可以单独引入 | Spring Boot Starter |
| [mugsun-start](/start/) | 项目生成器，还在开发中 | Spring Initializr |

这几部分都以 MIT 许可发布，可以整套使用，也可以只用其中一部分。

ms-ui 的源码仓库暂未公开，文档和 H5 演示对所有人开放。各部分的发布版本见[版本总览](/guide/upgrade/)。

## 它是怎么运行的

<ArchDiagram />

- 后端是一个 JAR，运行时需要 PostgreSQL 和 Redis。要拆成几个服务部署，用[微服务版](/cloud/)。
- 管理后台是一个单页应用，请求都发给后端。菜单和按钮权限由后端的 `/auth/info` 接口返回。
- GIS、埋点分析和 AI 是三个可选模块。打包时可以去掉，启动时也可以用环境变量关闭。
- 埋点数据保存在单独的 `mugsun_track` 库里，和业务库分开。

各仓库的分工和模块开关的规则见[架构](/guide/architecture)。

## 自带哪些功能

| 功能 | 说明 |
| --- | --- |
| [账号与权限](/boot/permissions) | 用户、角色和部门。菜单和按钮权限在后台配置，数据权限按角色限定能看到哪些行 |
| [多租户](/boot/tenant/) | 一个库、一套表服务多个租户，业务表按 `tenant_id` 自动隔离 |
| [工作流](/boot/features/workflow) | 在后台画流程，支持条件、并行和会签 |
| [代码生成](/boot/codegen/) | 把一张表变成后端代码、管理后台页面和菜单 SQL |
| [开放平台](/boot/open-api) | 第三方系统用 OAuth2 或 API Key 接入 |
| [埋点分析](/track/) | 可选。看板、错误监控和会话回放 |
| [GIS 与地图](/pc/gis) | 可选。图层、场景和空间查询 |
| [AI 中心](/pc/ai-center) | 可选。模型接入、对话和知识库 |

其余功能见[功能概览](/boot/features/)。

## 适合与不适合

| 适合 | 不适合 |
| --- | --- |
| 数据不能出内网的中后台项目 | 想要拖拽生成页面、完全不写代码的项目 |
| 既要管理后台又要行为分析，不想再接一套公有云分析服务 | 只需要前端模板、不需要后端的项目 |
| 要求使用人大金仓、达梦数据库或国密算法的项目 | 想直接用公有云上的埋点服务的项目 |

## 先看看效果

ms-ui 的组件可以在[在线演示](/demo)里直接操作。

管理后台和埋点分析目前没有公网演示环境。按[快速开始](/guide/getting-started)可以在本机完整启动。

## 下一步

<div class="ms-cards">

- [快速开始](/guide/getting-started) 用 Docker 在本机启动整套系统。
- [架构](/guide/architecture) 各个仓库负责什么，可选模块怎么开关。
- [后端概述](/boot/) 后端自带的功能和本地开发的方法。
- [常见问题](/guide/faq) 启动和部署时常见的问题。

</div>
