# 介绍

mugsun 是一套面向中小团队、**可完整私有化部署**的中后台底座。它把三件通常要分别拼装的东西放进同一套代码和同一个数据库里：

1. **业务后端**：用户、角色、菜单、部门、数据权限、多租户、工作流、文件、开放平台。
2. **管理台**：权限由后端下发，开箱即有系统管理页面，可选 GIS / 埋点看板 / AI 管理页。
3. **产品行为分析**：浏览器 SDK 采集 → 后端摄入 → 管理台看板，不依赖公有云分析服务。

## 组成

| 仓库 | 角色 | 技术栈 | 许可 |
| --- | --- | --- | --- |
| [mugsun-boot](https://github.com/mugsun/mugsun-boot) | 模块化单体后端 | JDK 21 · Spring Boot 3.5.13 · MyBatis-Flex · Sa-Token · JetCache · Warm-Flow · Flyway · Spring AI 1.1.2 | Apache-2.0 |
| [mugsun-core](https://github.com/mugsun/mugsun-core) | BOM 与 Starter | MyBatis-Flex 1.11.8 · Sa-Token 1.44.0 · BouncyCastle | Apache-2.0 |
| [mugsun-pc](https://github.com/mugsun/mugsun-pc) | 管理台 | Vue 3.5 · Vite 7 · Element Plus 2.11 · Pinia · Vue Router | MIT |
| [mugsun-track](https://github.com/mugsun/mugsun-track) | 浏览器埋点 SDK `@mugsun/track-web` | TypeScript · 插件化内核 | MIT |
| ms-ui（`mugsun-uniappx-ui`） | uni-app x 跨端组件库 | uvue · uts | 商业版（源码不公开），文档与演示开放 |

## 设计取舍

- **单体优先，按模块装配。** 一个 JAR、一套 PostgreSQL + Redis 即可运行；GIS、埋点、AI 是 Maven 模块，用 Profile 决定是否打进包，用环境变量决定是否启用。微服务版 cloud 仍在规划中。
- **权限只有一份。** 管理台不维护独立权限模型，菜单、按钮权限码与用户信息都来自 boot 的 `/auth/info` 等接口。
- **安全默认值写进代码而不是附录。** 缺初始口令拒绝启动；附件按上传者与租户隔离；AI 出站请求统一过 SSRF 校验；埋点 SDK 尊重 DNT、不采集输入框的值、上报前剥离 URL 中的敏感参数。
- **数据带得走。** 埋点事件、回放与配置都落在你自己的库里，SDK 的 `appKey` 只用于标识应用，不承担鉴权。

## 不是什么

- 不是拖拽式低代码平台，也不追求功能清单的长度。
- 不是公有云埋点 SaaS，没有托管账号服务。
- 目前没有管理台与埋点全链路的公网演示环境；ms-ui 组件有 [H5 在线演示](/demo)。

## 下一步

[快速开始](/guide/getting-started) · [架构全景](/guide/architecture) · [常见问题](/guide/faq)
