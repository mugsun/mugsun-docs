# Boot 概述

[mugsun-boot](https://github.com/mugsun/mugsun-boot) 是 mugsun 的后端单体入口：JDK 21、Spring Boot 3.5，按模块拆分可选能力。

| 模块 | 内容 |
| --- | --- |
| core | 系统域、鉴权、租户等底座能力 |
| track | 埋点采集、回放、分析 API |
| gis | 地图 / 空间相关能力 |
| ai | AI 编排与相关接口（可选） |
| server | 可运行的启动模块 |

免费开源。微服务版见站点首页「cloud · 规划中」。

最短路径见 [快速开始](/guide/getting-started)。配置项与模块开关见 [配置](/boot/configuration)；上线前请过一遍 [安全清单](/boot/security-checklist)。
