# 更新日志

本文件记录 [mugsun-docs](https://github.com/mugsun/mugsun-docs) 仓库与文档站的重要变更。
站点入口：[docs.mugsun.com](https://docs.mugsun.com/)。
面向使用者的变更摘要见站内 [更新日志](https://docs.mugsun.com/guide/changelog)，
源文件是 `guide/changelog.md`。

## [Unreleased]

### 变更

- 埋点分析补全五页（中英）：管理后台里的每个埋点页面都有了说明
  - 新增「数据概览与事件分析」：每个指标怎么算，数据多久更新
  - 新增「漏斗与留存」：人怎么算，转化窗口怎么限，新客怎么认
  - 新增「性能分析与错误监控」：评级的两条线，还原堆栈，错误告警的两条规则
  - 新增「会话回放与用户细查」：播放和打点条，录制的保留期和存储额度
  - 新增「接入管理」：应用表单的每一项，另外四个页签和系统参数
  - 每页都列出权限码，以及接口的参数和返回字段
  - 新增 5 张界面截图，埋点概述页的页面表加上到各页的链接
- 首页和介绍页的措辞（中英）：不再用「部署在自己服务器上」介绍产品
  - 首页标题改成「开源免费的中后台系统」，站点描述和介绍页开头同步改
  - 常见问题和「适合与不适合」去掉「私有化部署」「私有化交付」
  - 埋点概述和隐私页写明数据发到哪里：只发到 `endpoint` 指向的后端
- 后端迁移并成每套库一个基线（中英）：升级相关的页面按新做法改写
  - 后端升级指南新增「迁移并成一个基线」：旧库不能原地更新，要重建
  - 写清启动时的报错原文、重建步骤和 openGauss 执行基线的命令
  - V7、V11 两节标明只适用于合并基线之前的主干
  - 常见问题的校验和一条重写，删掉手改迁移历史校验和的命令
  - 升级指南首页的「数据库迁移」改成基线的说明，新脚本从 V18、T5 起
  - 埋点模块升级页开头标明：已有的埋点库要重建
  - 验证码、GIS 和第一个 CRUD 教程里的旧脚本名、版本号一并改正
  - 更新日志页加上这条变更
- 后端功能特性补全（中英）：新增四页，界面截图全部换成 2 倍清晰度
  - 新增「日志与审计」：六种日志各记什么，操作日志怎么验出删改
  - 新增「字典与参数」：字典在页面和后端怎么用，参数改完何时生效
  - 新增「在线会话与登录客户端」：强制下线，按客户端设令牌有效期和在线上限
  - 新增「服务监控与缓存管理」：读指标，导出数据库文档，查看和清除缓存键
  - 功能列表新增「运维」一组，放在线会话和服务监控两页
  - 正文引用的 32 张界面截图按当前界面重截，输出 2880×1800
  - 地图页和热力图示例换成天地图影像底图
  - 「报表」「对象存储」两页补上截图，13 张图的替代文字写清画面内容
  - 删除 30 张不再引用的 1 倍旧截图
  - 配置参考的操作日志默认排除路径补上 `/csp-report`
  - 埋点插件页写清回放的文字遮罩不覆盖 `placeholder` 这类属性
  - 写作规范新增「截图」一节，写明功能页的固定结构
- 文档站改版第四批（中英）：移动端 119 个组件页重写
  - 每页去掉重复的说明和「相关」一节，开头只留组件简介
  - 事件表加上「参数」一列，事件和插槽按源码补全
  - 新增「方法」一节，41 个组件列出可以通过 `ref` 调用的方法
  - 英文页里默认值是中文的属性，说明里注明意思
  - 可选插件页写清依赖：`ms-blur` 不依赖 `ms-ui`，`ms-editor` 的预览要用 `ms-markdown`
  - 网页组件页重写「外链白名单」和「微信小程序的域名限制」两节
  - 按源码改正：文本域的 `height` 取 sm / md / lg，上传组件只能选图片
  - 概述页新增「调用组件的方法」和「内置文案」，写清组件和插件的目录
  - `scripts/sync-demo-snippets.py` 不再在示例代码前加说明句
- 文档站改版第三批（中英）：指南各页和在线演示页重写
  - 在线演示拆成两页：演示页讲怎么看，新增「只读演示模式」讲怎么部署
  - 常见问题按主题分成五组，过时的回答按源码改正
  - 报错速查按现在的报错原文核对，改正五条，新增三组
  - 升级指南首页的版本表按 tag 和已发布的版本重新核对
  - core 升级页先列谁受影响；解密失败的提示改正为「加密报文解密失败」
  - 埋点 SDK 升级页补全十个脱敏参数，提示 0.3.0 又改了默认值
  - 品牌规范列出七个标志文件并配预览，新增「其他素材」一节
  - 更新日志页重写：开头列出升级时要处理的变更，其余按日期列成表
  - 表格第一列可以设成不换行，页面类名是 `ms-first-col-nowrap`
  - 快速开始的示例变量改成 `tracker`，和埋点各页一致
- 文档站改版第三批（中英）：埋点各页重写
  - 安装与初始化的配置项按用途分表，写清后台配置和本地配置谁优先
  - 第一个事件补上接入自检和接入健康，列出事件被拒时的原因代码
  - 插件页开头列出全部插件，写清回放录了不一定上传、哪些响应体不采集
  - 隐私与合规新增「查看权限与保留期」一节，默认行为列成一张表
  - 错误问题单写清状态和版本标记，补上接口的参数和返回字段
  - 问数据列出能问的十类问题；页面上选的时间范围优先于问题里的天数
  - 空间行为先讲怎么让事件带上坐标；漏斗相关的筛选项还没有生效
  - 升级指南开头列出要做的三件事，回填历史 UV 改成步骤版式
  - 概述页的示例变量改成 `tracker`，和其他各页一致
- AI 中心页改正：向量模型调用失败时「向量状态」显示「失败」并给出原因
- 工作流页补上规则：同一个流程编码和业务单号已有流程在办时不能再发起
- 文档站改版第三批（中英）：管理后台各页重写
  - AI 中心按「配模型、第一次对话、让模型按资料回答」重排，配界面截图
  - 设计器页分开讲流程设计器、图形流程设计器和 AI 应用编排
  - 验证码页按五种题型重写，加「给租户单独设置」一节
  - 地图三页按源码改正：默认就有 OpenStreetMap 底图，不用先配置
  - 瓦片失败时返回错误码和原因头，原来写成「返回空白瓦片」
  - 底图排障按原因代码列成表，每条给出处理办法
  - UI 自检列出实际会跑的测试文件，失败示例换成现在的格式
  - 表单校验补上系统管理页面在用的 `rules` 对象写法
  - 空状态补上请求失败时的错误状态
  - 工作台、本地开发、Docker 部署和 CSP 四页重排
  - 后端配置参考补知识库分段上限；权限页的 multipart 路径改成 7 个
  - 更新日志和埋点空间分析页指向旧标题的链接改到新锚点
- 文档站改版第二批（中英）：后端各页重写
  - 配置参考拆成三页：配置参考、密钥与加密、行为验证码
  - 配置参考按主题分节，开头加「按场景找配置」；网址和锚点不变
  - 密钥与加密补上 `scripts/gen-keys.sh` 的用法
  - 英文配置参考补上「自助注册」一节
  - 安全清单改成可勾选的清单，勾选状态存在浏览器本地
  - 开放平台按三种凭据重写，先带读者调通第一个开放接口
  - 权限页补上派生权限码规则和前端直传三步
  - 升级指南开头列出「先看哪些变更影响你」
  - 工作流页按管理后台源码改正菜单位置，配上界面截图
  - 代码生成写明后端文件要移到 `mugsun-boot-core` 才会编译
  - 代码生成、租户管理、数据权限各页补上「验证」一节
  - 入门教程四篇按源码改正，换成步骤版式
  - 文档里的登录命令不再写口令，改成运行时输入
  - 英文页 console 统一成 admin console，提示框补英文标题
- 文档站改版（中英）：首页、导航和各模块的概述页重写
  - 首页改成落地页：阅读路线、界面截图、功能、快速开始和仓库
  - 顶部导航按模块分区，侧边栏按分区切换
  - 重写介绍、快速开始和架构三页
  - 重写 boot、pc、track、core、start、uniappx 的概述页
  - 新增链接卡片、步骤、流程三种版式和 `ArchDiagram` 组件
  - 架构页改正埋点 SDK 的发送顺序，和源码一致
  - 埋点概述补回「看板怎么统计」一节，更新日志里的链接指向它
  - 在线演示页的启动命令改成和快速开始一致的 Docker 命令
  - `docs/STYLE.md` 的首页和版式规则按新设计改写
- README 重写；新增 `public/readme/` 存放各仓库 README 用的截图
  - 截图共 11 张，2 倍清晰度，各仓库通过 docs.mugsun.com/readme/ 引用
  - `public/brand/banners/repos/README.md` 同步重写
- 文档同步 AiFlow foreach/parallel P0（中英）
  - workflow：串行迭代、waitAll、截断/partial、错误码
  - 设计器：有序 bodyNodeIds、waitAll 锁定；AI 中心互链
  - 审批：FORBIDDEN 不变；可与 type=ai 联用；种子说明
  - 不做：租户闸、元素并行、failFast、loop 别名

- 文档同步 AI×审批流 P0（中英）
  - workflow：type=ai、aiFlowId、inputMap/outputMap、onFailure
  - 硬禁 db/http/mcp/code/tool/notice；history.aiTrace
  - 实验室种子 ai-preaudit；设计器 / AI 中心互链
  - 不做反向发起、#59、正式 publish/version、新权限字


- 文档同步埋点空间行为 P0（中英）
  - 新增 track/spatial：坐标接入、管理台、API、硬顶
  - 权限 sys:track-spatial:list（V20）；限流 60/分/用户
  - mode=agg|points；zoom→p；旧 /geo 不动；converted 恒 false
  - 演示 ak_lab_spatial_demo；概述/侧栏/插件/GIS 埋点地理互链

- 文档同步知识库 PDF/DOCX/PPTX 解析（中英）
  - pc/ai-center：upload-file、白名单、failed+failReason、Tika
  - 配置键 mugsun.ai.kb.max-upload-bytes；multipart 默认白名单
  - FileStorage MIME 与 parsers SPI 隔离；不做 OCR/RAG 评测/AGPL
  - 侧栏补 AI 中心；configuration 补上传上限

- 文档同步埋点问数据 P0（中英）
  - 新增 track/ask：意图表、二次权限、API、resultType、回放
  - 数字只走分析/漏斗/留存；LLM 只抽意图；不做 NL2SQL
  - 管理台默认真接口；DEV 且 VITE_TRACK_ASK_MOCK=true 才 mock
  - V19 入口权 sys:track-ask:list；概述与侧栏对齐

- 文档同步错误问题单 P0（中英）
  - 新增 track/error-issues：状态、releaseFlag、API、权限、appKey 防 IDOR
  - 管理台跳回放 / 用户细查；T5 表与 V18 写权；无工作流自动建单
  - install 半句对齐 release 与问题单筛选；站内 changelog 记一笔

- 文档同步 track：`release` 构建注入口径（中英 install）
  - 可用 Vite `import.meta.env.VITE_APP_VERSION` / CI
  - 变量须应用自行注入构建；未配置不上报

- 文档同步 boot #77：ICON_CLICK 默认 seed-warp（中英）
  - `mugsun.captcha.click.seed-warp-strength` 默认 0.14；
    `0`=关；有效钳位约 [0, 0.35]
  - 仍为辅助题型，勿单独作为唯一防线（#35）
  - 模板匹配全解表述为约 0–1/200，勿写死 0

- 文档同步 boot CSP 收集端（中英 demo / pc CSP）
  - demo：白名单补 `POST /csp-report`（Nginx 即 `/api/csp-report`）与限流说明
  - pc/csp：注明 demo 装配收集端、去 query、按 IP 限流、不入库

- 文档同步 boot #103 / #70 合后跟（中英 FAQ + deploy-docker）
  - FAQ：#70 改为「已修」；补 EPP 合成 / 百分号编码 / 显式 uri 旁路
  - FAQ：覆盖 `jetcache.remote.default` 须同级保留 `type`
  - deploy-docker / configuration：写清 EPP、空白口令、port/db 可选
  - configuration：显式 uri 与合成优先级表述对齐

- 文档同步 boot #80：访问日志路径改为路由模板（中英 demo）
  - 记 Spring `BEST_MATCHING_PATTERN`（如 `/share/{token}`），不记原始 URL
  - 无模板时记 `(unmatched)`；去掉 `;jsessionid=` / `:redacted` 旧说明

- 文档同步 boot #81：初始口令改为一次性随机口令
  - 重置 / 新建租户管理员不再复用 `MUGSUN_INIT_PASSWORD`
  - 首次登录强制改密；管理端需展示接口返回的 `initialPassword`
- 快速开始构建命令改为 `./mvnw`（与 boot Maven Wrapper 对齐）
- 快速开始对齐零配置：去掉复制 local yml；口令走 init show
  - 本地开发段删除 `cp application-local.yml.example`
  - Docker 试用补充 `logs ready` 登录提示；统一 127.0.0.1:8088
  - 本地开发不再写明文初始口令；改为配置键 / 环境变量说明
  - 补未注入口令说明：非 prod 有内置缺省；prod 必须注入

- 接口密钥、审计签名密钥改为「开箱即用、可选覆盖」（中英）
  - boot 配置页：没配自动生成到 `~/.mugsun`，重启复用；`MUGSUN_HOME` 可改
  - 新增前端取钥说明：`GET /crypto/bootstrap` 与 dev 自动写 `.env.local`
  - 写明 Docker 不挂卷、多实例必须配密钥或挂共享卷；不能替代 HTTPS
  - 升级指南 core 0.1.0 → 0.2.0、报错速查、常见问题同步改写
  - 去掉 `allow-ephemeral-keys` 的说明
  - pc 部署页 `MUGSUN_API_KEY`、`MUGSUN_SM4_KEY` 格式分开写；补 401/403/429

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
