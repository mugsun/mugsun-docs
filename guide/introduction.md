# 介绍

mugsun 是一套可以私有化部署的中后台系统，包含业务后端、管理后台和产品行为分析。

三部分共用一套代码和一个数据库，不依赖公有云服务。

## 模块

| 模块 | 说明 | 技术栈 | 许可 | 版本 |
| --- | --- | --- | --- | --- |
| [boot](/boot/) | 后端，一个可执行 JAR | JDK 21、Spring Boot 3、MyBatis-Flex、Sa-Token | Apache-2.0 | 0.1.0 |
| [core](/core/) | BOM 与 Starter，发布在 Maven Central | MyBatis-Flex、Sa-Token | Apache-2.0 | 0.1.0 |
| [pc](/pc/) | 管理后台 | Vue 3、Vite 7、Element Plus、Pinia | MIT | 0.1.0 |
| [track](/track/) | 浏览器埋点 SDK，发布在 npm | TypeScript，回放基于 rrweb | MIT | 0.2.0 |
| [ms-ui](/uniappx/) | uni-app x 跨端组件库 | uvue、uts | 商业版 | — |

ms-ui 的源码不公开，文档和 H5 演示对所有人开放。微服务版本还在规划中。

## 架构

后端是一个 JAR，运行时需要 PostgreSQL 和 Redis：

```text
浏览器 ──> pc 管理后台 ──/api──> boot ──> PostgreSQL + Redis
业务页面 ──@mugsun/track-web──> boot /track/*
```

GIS、埋点、AI 是可选的 Maven 模块，打包时用 Profile 选择是否包含。

管理后台的菜单和按钮权限都由后端 `/auth/info` 接口返回，前端不另存权限数据。

埋点事件、回放和配置都存在你自己的数据库里。

![管理后台工作台](/screenshots/pc-workbench.png)

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
