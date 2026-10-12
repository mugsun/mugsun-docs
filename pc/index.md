# 管理台概述

[mugsun-pc](https://github.com/mugsun/mugsun-pc) 是 Vue 3 + TypeScript + Vite + Element Plus 管理端，对接 boot 的系统管理、埋点看板、GIS / AI 等模块页面。

- 菜单与权限来自后端，不是再摆一张功能墙。
- 可选模块（`modules/gis` · `modules/track` · `modules/ai`）由 `VITE_ENABLE_*` 控制。
- UI 基座衍生自 [art-design-pro](https://github.com/Daymychen/art-design-pro)（MIT）；对外分发须保留原 NOTICE / 署名。

本地开发与 OpenAPI 代码生成见 [本地开发](/pc/development)。跑通后端请先看 [快速开始](/guide/getting-started)。
