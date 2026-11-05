# 工作流

工作流基于 Warm-Flow 引擎，用来做请假、报销这类多级审批。

可在流程里插入 **AI 预审节点**（`type=ai`）：节点创建时自动跑已启用的 AI 应用，写回约定变量，再交给人工节点。

## 能干什么

- 在「流程设计」里画流程，支持审批、条件、并行、会签和 **AI 预审**。
- 在「流程定义」里发布、停用、复制新版本和删除流程。
- 用户在「审批中心」发起流程，在「待办工作台」办理任务。
- 办理时可以通过、退回、撤回、转办、委派、加签、减签、作废和抄送。
- 流程节点可以绑定[表单](./form)，并按节点设置字段只读、可写或隐藏。

## 怎么开

工作流随后端一起启动，不需要额外配置。流程表由 Flyway 迁移创建。

AI 预审依赖 AI 模块已启用，且本租户有 `status==1` 的 workflow / chatflow 应用。

## 怎么用

1. 平台超管打开「系统管理 → 流程设计」，新建流程，设置编码、名称与审批角色，保存后发布。
2. 用户打开「审批中心」，选择这个流程发起。
3. 审批人在「待办工作台」看到任务，打开后办理。
4. 「运行中的流程」列出未结束实例；有 `sys:flow:running:terminate` 可终止。

后端代码里发起流程，调用 `POST /system/flow/start-by/{flowCode}/{businessId}`。

## AI 预审节点（AI×审批流） {#ai-approval}

设计器节点类型为 `ai`。发布时落成 warm-flow **BETWEEN** 节点。

并挂 `create` 监听器 `com.mugsun.boot.ai.flow.AiApprovalNodeListener`。

节点创建即触发：校验并执行绑定的 AiApp；成功后 `skip PASS`；失败按 `onFailure`。

本刀**不做**：AI 反向发起审批、正式 AiApp publish/version、新权限字、issue #59。

### 绑定应用

| 项 | 说明 |
| --- | --- |
| 配置键 | `aiFlowId`（AiApp 主键） |
| 可选类型 | 仅 `workflow`、`chatflow` |
| 状态 | 仅本租户 `status==1`（已启用） |
| 跨租户 | 拒绝（`AI_TENANT_DENIED`） |
| 应用缺租户 | fail-closed，同样拒绝 |

设计器下拉只展示上述应用。默认真 API。

仅 DEV 且 `VITE_FLOW_AI_MOCK=true` 时用本地 mock。

### 入参 `inputMap`（必填）

字段**必须存在**。空对象 `{}` 表示**显式零注入**（不向 AI 灌流程变量）。

禁止「缺省则浅拷贝全量流程变量」。

缺字段时设计器校验失败；运行期空 map 也只注入零输入。

映射：`流程变量名 → AI 入参名`（value 空则同名）。

只拷贝 map 里声明且流程变量里已有的键。

`inputSummary` 对 password / token / secret 等键名脱敏。

### 出参 `outputMap`（白名单写回）

`from → to`：`key` 为 AI 输出源，`value` 为写回目标键（白名单在 value）。

| 约定目标键 | 含义 |
| --- | --- |
| `ai_summary` | 摘要 |
| `ai_pass` | 是否建议通过（布尔） |
| `ai_reason` | 理由 |
| `ai_run_id` | 本次 AiAppRun id（成功时监听器也会写入） |

另允许 `ai_ext_[A-Za-z0-9_]+`。非法目标键：发布前拦截；运行期静默丢弃。

未配 `outputMap` 时，若 AI 输出已有约定三键则同名拷贝，并补 `ai_run_id`。

### 超时与失败策略

| 项 | 说明 |
| --- | --- |
| `timeoutMs` | 默认 `120000`；硬顶 `≤300000` |
| `onFailure` | 默认 `rejectLast`（退回上一节点） |
| 其它取值 | `stay`；`transfer:role:<角色码>`（无人则回落 rejectLast） |

失败写入 `ai_error_code` / `ai_error_msg`（及可选 `ai_run_id`）。

常见失败码见下表。

| 失败码 | 含义（摘要） |
| --- | --- |
| `AI_APP_MISSING` | 未绑定或不存在 |
| `AI_APP_DISABLED` | 未启用 |
| `AI_APP_TYPE_DENIED` | 非 workflow/chatflow |
| `AI_TENANT_DENIED` | 跨租户或缺租户 |
| `AI_CAPABILITY_DENIED` | DSL 命中硬禁 |
| `AI_TIMEOUT` | 超时 |
| `AI_EXECUTE_ERROR` | 执行或写回失败 |

### 硬禁 DSL 能力面

绑定 AiApp 的 DSL 若含下列节点 type（小写及同义），内嵌拒绝（`AI_CAPABILITY_DENIED`）：

| 类别 | type（含同义） |
| --- | --- |
| 数据库 | `db` / `sql` / `jdbc` |
| 出站 HTTP | `http` / `https` / `rest` / `fetch` / `webhook` |
| 工具 | `mcp` / `tool` |
| 脚本 | `code` / `js` / `javascript` / `groovy` / `script` |
| 通知 | `notice` / `notify` / `notification` / `channel` / `webhook_notice` |

审批内嵌只允许安全编排（如 updateVar）。

禁止直连库、出站 HTTP、MCP、脚本与通知渠道。

### 实例痕迹 `history.aiTrace`

每次 AI 节点办结（成功或失败）把 JSON 写入历史任务扩展（`hisTaskExt`）。

管理台实例抽屉可读 `aiTrace`，并展示写回的 `ai_summary` 等。

典型字段见下表。

| 字段 | 说明 |
| --- | --- |
| `aiFlowId` | 绑定的应用 id |
| `runId` | 运行 id |
| `inputSummary` | 入参摘要（已脱敏） |
| `output` | 写回摘要/pass/reason |
| `errorCode` / `errorMsg` | 失败时有值 |
| `durationMs` | 耗时 |

### 演示种子（实验室）

开启 `mugsun.lab.seed-fronttest=true`（同 fronttest，生产勿开）时幂等播种：

- AiApp「AI预审演示」（`workflow`；DSL 仅 updateVar 写出三键，无 LLM）
- 流程编码 **`ai-preaudit`**：开始 → AI预审 → 人工复核 → 结束

发布后可在审批中心发起。

## 注意点

- 流程设计、发布和定义管理只有平台超管能操作。发起和办理不受限制。
- 已发布的流程不能直接修改。要改时先复制为新版本，改完再发布。
- AI 节点候选人默认为发起人占位，便于 `onFailure=stay` 后人工处理。
- 设计器的操作说明见[设计器](/pc/designer)。

## 看效果

发起一个流程后，查看实例和待办任务：

```sql
SELECT id, flow_status, node_name, create_time FROM flow_instance ORDER BY create_time DESC LIMIT 5;
SELECT id, instance_id, node_name, create_time FROM flow_task ORDER BY create_time DESC LIMIT 5;
```

审批人在「待办工作台」看到的任务，与 `flow_task` 里的记录一一对应。

上一节：[功能特性](./) · 下一节：[表单](./form)
