# 更新日志

本文件记录 [mugsun-docs](https://github.com/mugsun/mugsun-docs) 仓库与文档站的重要变更。
站点入口：[docs.mugsun.com](https://docs.mugsun.com/)。
面向使用者的变更摘要见站内 [更新日志](https://docs.mugsun.com/guide/changelog)，
源文件是 `guide/changelog.md`。

## [Unreleased]

### 变更

- 新增 repo-checks workflow（ci-checklist 3.19），照 mugsun-start 的写法
  - 全量检查 CHANGELOG.md 行宽、gitleaks 扫当前分支历史、CLAUDE.md 软链
  - 新增 CLAUDE.md，软链到 AGENTS.md；CHANGELOG 两处超长行改为分行
  - 站点 srcExclude 加上 CLAUDE.md，软链不作为页面发布
  - gitleaks 分支推送扫 HEAD，main 推送和手动触发扫 --all
  - 新增 .gitleaks.toml，repo-checks 和 Security 都显式带 --config
  - AGENTS.md 新增「合入流程」一节
  - 写明 .gitleaks* 与 workflow 改动须安全官审，以及 allowlist 规矩
- 新增「报错速查」，报错原文取自 boot、core、pc 源码；常见问题新增「部署与运行」八问
- 新增「升级指南」章：版本总览、core 0.1.0 → 0.2.0、埋点 SDK 0.1.0 → 0.2.0
- 定时任务页的验证 SQL 对照 PowerJob 5.1.2 核实，改查 instance_id
- 新增后端「功能特性」索引与十页功能说明，已有专章的功能直接链接
- 新增后端「多租户」「数据权限」两章，各三节，每节附验证 SQL，截图来自本地实测
- 新增后端「代码生成」四节：概述、AI 辅助建模、导入已有表、预览和下载产物，截图来自本地实测
- 新增后端「开发入门」四节：第一个接口、CRUD、缓存、定时任务，示例均在本地实测；复核后改正 id 以字符串返回的条件
- 管理台开发页写明锁屏不是安全边界：密码只以加盐 hash 存在内存，刷新即解锁
- boot 配置页补「接口加密与字段加密密钥」一节，标注不兼容变更（中英文）
  - `MUGSUN_API_KEY` 新格式与升级步骤；只是传输混淆，不能代替 TLS
  - dev 的 `allow-ephemeral-keys` 与本地密钥文件
  - 曾用公开回落密钥运行过的部署要重新加密的字段清单
  - `MUGSUN_SM4_KEY` 只认三种写法；迁移改用离线工具，新旧密钥走环境变量
  - 迁移前先备份；核对标准是「SM4 解密失败」日志 0 条；中英步骤编号对齐
  - 旧版配的 32 位 hex / base64 密钥也要按 LEGACY_PADDED 迁移
  - 补启动自检、Docker 跑迁移工具示例、多 schema 说明
  - 启动自检每个字段抽 3 行；生产环境下跳过开关不生效
  - 写明 ECB 只留给 `sys_user.id_card` 的例外与局限
- boot 配置参考新增「启动守卫与豁免开关」（中英），安全清单和开放平台同步
  - 非 dev/test/local 一律按生产，没配 profile 也会被拦；自测请显式开 `dev`
  - 写明签名、国密两个豁免开关，以及关闭国密后密码完全靠 TLS 保护
- ms-badge：dot 优先于 count（不再出空气泡）；优先级文档改为 label > dot > count
- 管理台 e2e：移除数字验证码后，用例不再从 Redis 读图形码
  - 改为要求后端关闭验证码：`mugsun.captcha.enabled=false` 或平台租户开关
  - 新增 `pnpm test:e2e:captcha-on`，在验证码开启的后端上运行
  - 断言不带令牌的登录、注册、忘记密码发码都返回 `40013`
- 埋点文档对齐 npm `@mugsun/track-web@0.2.0`：安装示例、更新日志、隐私默认值；安装页补「版本与发布」流程
- 首页、指南与信息架构重写；各产品线补齐概览、快速开始、配置参考与 FAQ
- ms-ui 组件「基础用法」改为摘自演示源码的可运行片段（`scripts/sync-demo-snippets.py`）
- 快速开始实测修正：boot 改为 `package` + `java -jar` 启动
- 新增管理台与埋点看板真实截图（`public/screenshots/`，演示数据）
- 站内更新日志迁至 `/guide/changelog`，解决与本文件的大小写冲突
- 快速开始改为可执行短路径；首页与演示空态表述收紧
- 主题与 IA：中英对齐，补充 core / pc 等薄页
- 品牌资产：`public/brand/banners/repos/` 八仓差异化顶图（1280×320）
- 账号级社区健康文件见 [mugsun/.github](https://github.com/mugsun/.github)

### 计划

- 文档内容继续打磨（示例、截图、FAQ）

[Unreleased]: https://github.com/mugsun/mugsun-docs/commits/main
