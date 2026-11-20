---
pageClass: ms-first-col-nowrap
---

# 更新日志

本页按日期列出对使用者有影响的变更，新的在前。正式发布的版本以各仓库的 GitHub Releases 为准。

每个仓库根目录的 `CHANGELOG.md` 记得更细，链接在[各仓库的完整记录](#repos)。

## 升级时要处理的变更 {#breaking}

下面这些变更会影响已有的部署或接入，升级前请逐条核对。

| 日期 | 变更 | 要做什么 |
| --- | --- | --- |
| 2026-10-21 | 后端移除了旧的数字图形验证码 | 前端改用行为验证码，见[后端升级指南](/boot/upgrade#移除旧的数字图形验证码) |
| 2026-10-18 | 埋点 SDK 0.3.0 默认不再遮罩和过滤 | 靠默认遮罩满足合规的接入要显式打开，见[隐私与合规](/track/privacy#从-0-2-0-升级、保留原来的遮罩) |
| 2026-10-18 | 重复提交从 HTTP 500 改为 400 | 前端改为按 400 判断，见 [core 0.1.0 → 0.2.0](/guide/upgrade/core-0-2-0#duplicate-key) |
| 2026-10-18 | 模块开关只接受 `true` 和 `false` | 把 `MUGSUN_GIS_ENABLED` 这类变量里的其他写法改掉，见[选择要用的模块](/guide/architecture#模块装配-两层开关) |
| 2026-10-18 | 内置 MCP Server 暂时下线 | `/sse`、`/mcp` 和 `/mcp/message` 返回 404，调用外部 MCP 工具不受影响 |
| 2026-10-14 | 埋点看板改按租户的时区切日 | 同一天的数字会和以前不一样，时区用 `mugsun.track.timezone` 调整 |
| 2026-10-14 | 错误分组改按去掉查询串的脚本地址计算 | 首帧脚本地址带查询串的错误会归入新的分组，旧分组不会合并过来 |
| 2026-10-13 | 管理后台的登录状态改存 `sessionStorage` | 升级后所有人要重新登录一次 |
| 2026-10-13 | 开放接口默认不信任 `X-Forwarded-For` | 部署在反向代理后面时，把代理地址写进 `MUGSUN_OPENAPI_TRUSTED_PROXIES` |
| 2026-10-13 | 埋点 SDK 0.2.0 改了两个隐私默认值 | 见[埋点 SDK 0.1.0 → 0.2.0](/guide/upgrade/track-web-0-2-0) |

## 2026-11-05

| 范围 | 变更 |
| --- | --- |
| 工作流 | AiFlow 新增循环节点 `foreach` 和并行节点 `parallel`，见[工作流](/boot/features/workflow#ai-flow-control) |
| 工作流 | 审批流程里可以加 AI 预审节点，由 AI 流程先审一遍，见[工作流](/boot/features/workflow#ai-approval) |
| 埋点分析 | 新增[空间行为](/track/spatial)，把带精确坐标的事件画成热力格和明细点 |
| 埋点分析 | 新增[问数据](/track/ask)，用自然语言查询自己应用的埋点数据，只读 |
| 埋点分析 | 新增[错误问题单](/track/error-issues)，支持指派、解决和重开 |
| AI 中心 | 知识库资料支持 PDF、DOCX 和 PPTX，单个文件默认不超过 20MB，见 [AI 中心](/pc/ai-center) |
| 埋点 SDK | [安装与初始化](/track/install)补充了 `release` 的注入办法，配置后错误事件会带上版本号 |
| 文档 | [快速开始](/guide/getting-started)和后端、管理后台的 README 对齐，数据库镜像直接拉取，不用在本机构建 |

## 2026-11-04

| 范围 | 变更 |
| --- | --- |
| 验证码 | 图标点选的题目默认加上随机的网格形变，更难用模板匹配破解，见[配置参考](/boot/configuration#安全验证-行为验证码) |
| 地理信息 | 包住极点的面不再被拒绝，面积、缓冲和距离都能计算，见 [GIS 与地图](/pc/gis#metric-limits) |
| 地理信息 | 跨 180° 经线的查询加了专用索引。V17 迁移要求 Flyway 直连 PostgreSQL，或者 PgBouncer 用 session 模式 |
| 演示模式 | 访问日志的队列满了以后丢弃新日志并计数，见[只读演示模式](/boot/demo-mode#access-log) |

## 2026-11-03

| 范围 | 变更 |
| --- | --- |
| 后端 | Redis 口令里有特殊字符时不用自己编码，见[常见问题](/guide/faq#redis-口令里有特殊字符-要自己编码吗) |
| 演示模式 | 访问日志只记路由模板，不记原始地址，见[只读演示模式](/boot/demo-mode#access-log) |
| 文档 | [快速开始](/guide/getting-started)改为一条命令启动，不再要求复制配置文件 |

## 2026-10-21

| 范围 | 变更 |
| --- | --- |
| 后端 | 移除旧的数字图形验证码，`GET /auth/captcha` 不再存在，见[后端升级指南](/boot/upgrade#移除旧的数字图形验证码) |
| 后端 | 行为验证码默认启用五种题型，每次随机出一种。键盘模式只出滑块或旋转 |
| 管理后台 | 端到端测试改为在关闭验证码的后端上运行，另有一套用例针对开着验证码的后端，见[本地开发](/pc/development#e2e) |
| ms-ui | `ms-badge` 同时设置圆点和数字时显示圆点 |
| 文档 | 新增教程[开发入门](/boot/tutorial/first-api)和[代码生成](/boot/codegen/) |
| 文档 | 新增[多租户](/boot/tenant/)和[数据权限](/boot/datascope/)两组说明 |
| 文档 | 新增[功能特性](/boot/features/)索引、[升级指南](/guide/upgrade/)和[报错速查](/guide/errors) |

## 2026-10-19

| 范围 | 变更 |
| --- | --- |
| 地理信息 | 图层缓冲遇到走向不明的极冠时跳过，并在结果里标明。2026-11-04 起改为照常计算，不再跳过 |

## 2026-10-18

| 范围 | 变更 |
| --- | --- |
| 埋点 SDK | 0.3.0 的回放默认显示页面文字和输入值的原文，响应体默认不脱敏，错误全部上报。2026-10-22 发布到 npm |
| 埋点 SDK | 凭证类的键在响应体里始终替换为 `***`，登录、令牌和验证码这类接口不采集响应体，见[插件](/track/plugins#接口监控) |
| 埋点 SDK | 地址脱敏新增 `code` `sign` `signature` `ticket` `session` `otp` 六个参数，hash 里的参数也处理，见[隐私与合规](/track/privacy#url-敏感参数) |
| 埋点 SDK | 新增 `respectGpc` 选项，设为 `true` 后尊重浏览器的 Global Privacy Control |
| core | 唯一约束冲突返回 HTTP 400 和「数据已存在，请勿重复提交」，达梦同样处理，见 [core 0.1.0 → 0.2.0](/guide/upgrade/core-0-2-0#duplicate-key) |
| 后端 | `MUGSUN_GIS_ENABLED`、`MUGSUN_TRACK_ENABLED` 和 `MUGSUN_AI_ENABLED` 只接受 `true` 或 `false`，写错时启动失败 |
| 后端 | 系统参数 `gis.module.enabled` 和 `ai.module.enabled` 保存时校验取值，`1` 和 `0` 已弃用 |
| 后端 | 内置 MCP Server 暂时下线，加上鉴权后恢复。「MCP 工具箱」和工作流的 MCP 节点照常可用 |

## 2026-10-14

| 范围 | 变更 |
| --- | --- |
| 埋点 SDK | 错误堆栈里的脚本地址去掉查询串和 hash，保留行号和列号，见[插件](/track/plugins) |
| 埋点分析 | 看板按租户的时区切日，默认 `Asia/Shanghai`，可以按租户调整，见[埋点概述](/track/#看板趋势) |
| 埋点分析 | 按天的趋势图固定显示所选的每一天，没有数据的日子画 0 |
| 埋点分析 | 日趋势的 UV 按当地的一天去重。漏斗的时间窗口从第一天当地 0 点算起 |
| 埋点分析 | 留存接口返回 `zone` 和 `today`，`days` 超过 30 时按 30 查询并返回 `clamped: true` |

## 2026-10-13

| 范围 | 变更 |
| --- | --- |
| 后端 | `tika-core` 升级到 3.2.2，修复 CVE-2025-66516 |
| 后端 | 修复附件下载和删除的越权访问，新增权限码 `sys:file:manage` `sys:file:public` `sys:file:remove`，普通用户上传的附件一律私有 |
| 后端 | 新增 `POST /auth/avatar/upload`，头像只接受本人上传的本租户附件，不接受外链 |
| 后端 | 知识库抓取、渠道 Webhook 和 MCP 远程调用默认拒绝内网地址，放行用 `mugsun.ai.outbound.allow-hosts` |
| 后端 | 开放接口的 IP 白名单改为 CIDR 匹配，默认不信任 `X-Forwarded-For` |
| 后端 | 用户的新增、修改和删除加了事务，删除用户时一并清理角色关联 |
| 管理后台 | 登录状态改存 `sessionStorage`，新开标签页或重开浏览器要重新登录，见[本地开发](/pc/development#登录状态存在哪里) |
| 管理后台 | 错误提示优先显示后端返回的消息，Element Plus 改为按需加载 |
| 管理后台 | 个人中心的头像改为直接上传，限常见图片格式，不超过 2MB，见[本地开发](/pc/development#个人中心头像) |
| 埋点 SDK | 0.2.0 的回放默认遮罩页面文本，响应体默认脱敏，接口地址里的敏感参数替换为 `***`，见[埋点 SDK 0.1.0 → 0.2.0](/guide/upgrade/track-web-0-2-0) |
| 全部仓库 | 版权署名统一为「北京定旭晨信息科技工作室 (mugsun)」 |

## 0.1.0

首个公开版本。后端、管理后台和文档站在这一版公开，core 发布到 Maven Central，埋点 SDK 发布到 npm。

## 各仓库的完整记录 {#repos}

| 仓库 | 链接 |
| --- | --- |
| mugsun-boot | [Releases](https://github.com/mugsun/mugsun-boot/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-boot/blob/main/CHANGELOG.md) |
| mugsun-core | [Releases](https://github.com/mugsun/mugsun-core/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-core/blob/main/CHANGELOG.md) |
| mugsun-pc | [Releases](https://github.com/mugsun/mugsun-pc/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-pc/blob/main/CHANGELOG.md) |
| mugsun-track | [Releases](https://github.com/mugsun/mugsun-track/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-track/blob/main/CHANGELOG.md) |
| mugsun-docs | [CHANGELOG](https://github.com/mugsun/mugsun-docs/blob/main/CHANGELOG.md) |
