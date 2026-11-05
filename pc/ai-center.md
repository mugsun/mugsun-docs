# AI 中心页面说明

管理台 AI 模块（模型、对话、知识库、MCP 等）的页面约定。

知识库资料现支持 PDF / Word / PPT 解析上传。

本节写清接口、白名单与失败口径。

审批流可内嵌已启用的 workflow / chatflow 做 AI 预审。

契约见[工作流 · AI 预审](/boot/features/workflow#ai-approval)。

应用编排支持 `foreach` / `parallel` 控制节点（串行迭代、waitAll 并行）。

详见[设计器](/pc/designer#ai-flow-control)、[工作流 · AiFlow 控制节点](/boot/features/workflow#ai-flow-control)。

## 打开不存在的详情页

直接访问带编号的 AI 详情页（知识库详情、问数配置、问数对话、仪表盘设计），而这个编号不存在或已经删除时，页面只显示「××不存在或已删除」、编号和一个返回列表的按钮，不会再渲染一个可以编辑、上传或保存的空白页面，也不会弹出报错提示。

| 页面 | 地址 | 返回到 |
| --- | --- | --- |
| 知识库详情 | `/ai/knowledge/detail/:id` | 知识库列表 |
| 问数配置 | `/ai/dataset/config/:id` | 数据集列表 |
| 问数对话 | `/ai/dataset/run/:id` | 数据集列表 |
| 仪表盘设计 | `/ai/dashboard/design/:id` | 数据集列表 |

仪表盘设计页的编号既可以是仪表盘编号，也可以是数据集编号（从数据集列表点「仪表盘」进入时新建）。两者都查不到时才显示「不存在或已删除」。

## 知识库资料解析（PDF / DOCX / PPTX）

知识库详情页可上传办公文档。

服务端用 Apache Tika 抽纯文本，再走既有切段与向量化。

命中测试 / 对话检索仍按知识库的 `retrievalMode`。

取值：`vector` / `keyword` / `hybrid`（混合为 RRF）。

路径：`/ai/knowledge/detail/:id`。

### 上传接口

| 方式 | 方法 / 路径 | 说明 |
| --- | --- | --- |
| multipart（新） | `POST /system/ai/knowledge/asset/upload-file` | 字段：`knowledgeId`、`file`；可选分段参数 |
| JSON（仍在） | `POST /system/ai/knowledge/asset/upload` | 可贴 `contentText`，或 `fileUrl` 下载后走 Tika |

可选分段字段：`segmentLength` / `segmentOverlap` / `segmentType` / `segmentSymbol`。

网关常见前缀：`/api/system/ai/knowledge/asset/...`。

权限均为 `ai:kb-asset:upload`（须登录）。

Token 放 `Authorization` 头，勿放进 query。

`upload-file` 已列入 multipart 默认白名单。

配置键：`mugsun.security.multipart.allowed-paths`。

与附件、头像等并列；yml 整体替换时须把默认 6 条一起写上。

JSON `fileUrl` **不再**把二进制当 UTF-8 整串读。

下载后同样走 Tika。纯文本仍可走 `contentText`。

### 白名单与大小

| 项 | 口径 |
| --- | --- |
| 扩展名 | 仅 `pdf` / `docx` / `pptx`（大小写不敏感） |
| 校验 | 扩展名 + 合理 MIME + 文件头魔数；假后缀拒绝 |
| 默认上限 | 20MB（`20971520` 字节） |
| 配置键 | `mugsun.ai.kb.max-upload-bytes`（≤0 回落 20MB） |

管理台还接受文本类：`txt` / `md` / `csv` / `json` / `log` / `html`。

文本类走 JSON upload，不经 Tika 文档解析口。

### 成功与失败

1. **成功**：抽出正文 → 按分段参数切段落库 → 向量化。
2. 成功后资料 `vectorStatus=success`，`failReason` 清空。
3. **失败**：保留资料行，`vectorStatus=failed`，写入可读 `failReason`。
4. `failReason` 最长约 500 字；**不写假分段**。
5. 扫描件 / 空文档抽不出正文时提示不支持 OCR，并标 failed。
6. 列表可展示失败原因；`pending` 时管理台会轮询进度。
7. 分段列表可按资料筛选。

### 依赖与隔离

- AI 模块：`tika-core` + `tika-parsers-standard-package`（约 3.2.x）。
- 排除 `tika-parser-ocr-module` 与 `tess4j`；本刀不做 OCR。
- 知识库抽文用独立 `AutoDetectParser`。
- x-file-storage 的 MIME 探测固定为 MimeTypes（魔数 + 扩展名）。
- **不加载** parsers 的 Detector SPI。
- 避免 gzip 等流被 `DefaultZipContainerDetector` 打成 `ArchiveException`。
- 否则埋点等上传会在探测阶段 500。

### 本刀不做

- OCR（扫描 PDF 无文字层会 failed）
- RAG 评测集 / 自动评测流水线
- 引入 AGPL 依赖

### 相关提交

- boot 功能 [`50562334e2d941e9a888519ef8ab05dddb8b64b8`](https://github.com/mugsun/mugsun-boot/commit/50562334e2d941e9a888519ef8ab05dddb8b64b8)
- boot 修红 [`8c2851e17a26cdc10c71a39a1a1d56afd3087361`](https://github.com/mugsun/mugsun-boot/commit/8c2851e17a26cdc10c71a39a1a1d56afd3087361)
- pc [`8b123c5db7b75fa48c1c2f2d5f2736d911278df1`](https://github.com/mugsun/mugsun-pc/commit/8b123c5db7b75fa48c1c2f2d5f2736d911278df1)

## 相关页面

- [功能特性概览](/boot/features/)（AI 一行）
- [配置说明](/boot/configuration#ai-出站白名单)（出站 / 内网模型）
- [表单校验](/pc/form-validation)（AI 中心表单项）
