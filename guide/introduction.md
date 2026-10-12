# 介绍

mugsun 是面向中小团队的**可私有化**中后台底座：多租户、国密与审计、嵌入式行为分析（SDK → 采集 → 看板），GIS / AI 以可选模块接入。

## 是什么

- 后端 [mugsun-boot](https://github.com/mugsun/mugsun-boot)：JDK 21 + Spring Boot 3.5，模块化（core / gis / track / ai）
- 管理台 [mugsun-pc](https://github.com/mugsun/mugsun-pc)：Vue 3 + TypeScript + Element Plus
- 埋点 [mugsun-track](https://github.com/mugsun/mugsun-track)：插件化 Web SDK（核心体积目标 gzip ≤ 8KB）
- 底座 [mugsun-core](https://github.com/mugsun/mugsun-core)：BOM 与 starter

## 不是什么

- 不是大而全低代码平台（不对标「模块墙」式后台）
- 不是公有云埋点 SaaS（分析能力随私有化部署带走）
- 微服务版 cloud、uniappx-ui 组件库仍为**规划中**，本站不提供安装教程装成已交付

## 和常见开源后台的差异

相对典型「功能清单」叙事，mugsun 更强调一条可验证的竖切：**埋点接入 → 服务端摄入 → 管理台看板**，以及安全默认值（密钥、脱敏、回放遮罩）写进文档而不是附录角落。

仓库总览见 [架构全景](/guide/architecture)。动手请走 [快速开始](/guide/getting-started)。
