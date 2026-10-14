# 介绍

mugsun 是一套可以私有化部署的中后台系统，包含业务后端、管理后台和产品行为分析。

三部分是独立的代码仓库，都部署在自己的服务器上，不依赖公有云服务。

## 模块

| <span style="white-space:nowrap">模块</span> | 说明 | 技术栈 | 许可 | <span style="white-space:nowrap">版本</span> |
| --- | --- | --- | --- | --- |
| <span style="white-space:nowrap">[boot](/boot/)</span> | 后端，一个可执行 JAR | JDK 21、Spring Boot 3、MyBatis-Flex、Sa-Token | Apache-2.0 | <span style="white-space:nowrap">0.1.0</span> |
| <span style="white-space:nowrap">[core](/core/)</span> | BOM 与 Starter，发布在 Maven Central | MyBatis-Flex、Sa-Token | Apache-2.0 | <span style="white-space:nowrap">0.1.0</span> |
| <span style="white-space:nowrap">[pc](/pc/)</span> | 管理后台 | Vue 3、Vite 7、Element Plus、Pinia | MIT | <span style="white-space:nowrap">0.1.0</span> |
| <span style="white-space:nowrap">[track](/track/)</span> | 浏览器埋点 SDK，发布在 npm | TypeScript，回放基于 rrweb | MIT | <span style="white-space:nowrap">0.2.0</span> |
| <span style="white-space:nowrap">[ms-ui](/uniappx/)</span> | uni-app x 跨端组件库 | uvue、uts | 商业版 | <span style="white-space:nowrap">—</span> |

ms-ui 的源码不公开，文档和 H5 演示对所有人开放。

## 架构

后端是一个 JAR，运行时需要 PostgreSQL 和 Redis：

```text
浏览器 ──> pc 管理后台 ──/api──> boot ──> PostgreSQL + Redis
业务页面 ──@mugsun/track-web──> boot /track/*
```

GIS、埋点、AI 是可选的 Maven 模块，打包时用 Profile 选择是否包含。

管理后台的菜单和按钮权限都由后端 `/auth/info` 接口返回，前端不另存权限数据。

埋点数据单独保存在 PostgreSQL 的 `mugsun_track` 库中，与业务库分开。

## 适合与不适合

| 适合 | 不适合 |
| --- | --- |
| 需要私有化交付、数据不能出内网的中后台项目 | 拖拽生成页面、不写代码的低代码平台 |
| 既要管理后台又要行为分析，不想再接一套公有云分析服务 | 只需要纯前端模板、不需要后端的项目 |
| 要求人大金仓、达梦数据库或国密算法的项目 | 现在就需要拆分成微服务的项目 |

## 在线演示

ms-ui 组件可以在文档页右侧的手机框里预览，窄屏下点底栏入口，也可以打开 [完整 H5 演示](/demo)。

管理后台和埋点目前没有公网演示环境，按 [快速开始](/guide/getting-started) 可以在本地完整启动。

## 下一步

- [快速开始](/guide/getting-started)
- [架构](/guide/architecture)
- [常见问题](/guide/faq)
