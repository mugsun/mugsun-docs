# 工作流

工作流基于 Warm-Flow 引擎，用来做请假、报销这类多级审批。

流程里可以插入 AI 预审节点：先让 AI 应用看一遍申请，再交给人审批。

![流程定义页：每个流程一行，右侧是发起按钮](/screenshots/pc/workflow-definitions.png)

## 能做什么

- 在「流程设计」里画流程，可以用审批节点、条件分支、并行分支和 AI 节点。
- 在「流程设计」里停用、启用和删除流程，或者复制出一个新版本。
- 在「流程定义」里查看流程，点「发起」提交申请。
- 在「审批中心」办理待办，查看自己发起的、已办的和抄送给自己的流程。
- 办理时可以通过或退回，也可以转办、委派、加签和减签。流程还支持撤回、作废和抄送。
- 流程节点可以绑定[表单](./form)，并按节点设置字段只读、可写或隐藏。

## 启用

工作流随后端一起启动，不需要额外配置。流程表由 Flyway 迁移创建。

AI 预审节点另有两个前提：

- AI 模块已启用。
- 本租户有已启用的 AI 应用，类型是 `workflow` 或 `chatflow`。

## 使用

<div class="ms-steps">

### 设计并发布流程

平台超管打开「系统管理 → 流程设计」，新建流程，设置编码、名称和各节点的候选人，然后发布。

### 发起流程

用户打开「流程定义」，在要用的流程那一行点「发起」。

### 办理任务

审批人在「审批中心」的「待办」里看到任务，打开后办理。「待办工作台」里也能办理。

![审批中心的待办列表，每条任务右侧是办理按钮](/screenshots/pc/workflow-approval-center.png)

### 查看运行中的流程

「运行中的流程」列出还没结束的流程。有 `sys:flow:running:terminate` 权限的人可以终止流程。

</div>

后端代码里发起流程，调用 `POST /system/flow/start-by/{flowCode}/{businessId}`。

各节点由谁审批只按流程设计决定，请求里不能指定审批人。

## AI 预审节点 {#ai-approval}

流程走到 AI 预审节点时，会自动运行节点绑定的 AI 应用，把结论写进流程变量。

- 运行成功：节点自动通过，流程进入下一个节点。
- 运行失败：按节点上配置的[失败策略](#ai-approval-failure)处理。

后面的审批人打开任务，能看到 AI 给出的摘要、是否建议通过和理由。

### 绑定应用

节点用 `aiFlowId` 指定一个 AI 应用。应用要同时满足下面的条件，否则节点失败。

| 条件 | 不满足时的失败码 |
| --- | --- |
| 应用存在 | `AI_APP_MISSING` |
| 应用和流程属于同一个租户 | `AI_TENANT_DENIED` |
| 状态是已启用 | `AI_APP_DISABLED` |
| 类型是 `workflow` 或 `chatflow` | `AI_APP_TYPE_DENIED` |
| 应用里没有[不允许的节点](#ai-approval-forbidden) | `AI_CAPABILITY_DENIED` |

应用或流程实例上没有租户信息时，也按 `AI_TENANT_DENIED` 处理。

设计器的下拉框只列出本租户已启用的这两类应用。

本地开发管理后台时，把 `VITE_FLOW_AI_MOCK` 设为 `true`，下拉框改用本地示例数据。这个开关只在开发模式下生效。

### 入参 `inputMap`

`inputMap` 决定把哪些流程变量传给 AI，在设计器里必须填写。

写法是「流程变量名 → AI 入参名」，入参名留空时与流程变量名相同。

- 只传映射里写了、并且流程变量里已有的键。
- 填空对象 `{}` 表示什么都不传。
- 没有映射时，不会把全部流程变量传给 AI。

审批记录里会留一份入参摘要。键名里带 `password`、`token`、`secret` 这类字样的，值显示为 `***`。

### 出参 `outputMap`

`outputMap` 决定把 AI 的哪些输出写回流程变量，写法是「AI 输出名 → 流程变量名」。

流程变量名只能用下面这些：

| 流程变量 | 含义 |
| --- | --- |
| `ai_summary` | 摘要 |
| `ai_pass` | 是否建议通过，布尔值 |
| `ai_reason` | 理由 |
| `ai_run_id` | 这次运行的编号。运行成功时系统会自动写入 |
| `ai_ext_` 开头的键 | 自定义扩展，前缀后面只能用字母、数字和下划线 |

用了名单外的流程变量名，发布流程时会报错；运行时遇到也不会写回。这样 AI 的输出改不了流程里的其他变量。

不填 `outputMap` 时，AI 输出里的 `ai_summary`、`ai_pass` 和 `ai_reason` 会按同名写回。

写回后仍没有 `ai_summary` 时，用应用变量 `output` 的值作摘要。

### 超时和失败策略 {#ai-approval-failure}

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| `timeoutMs` | `120000` | AI 运行的超时时间，单位毫秒，最大 `300000` |
| `onFailure` | `rejectLast` | 失败后怎么处理，取值见下表 |

| `onFailure` 取值 | 效果 |
| --- | --- |
| `rejectLast` | 退回上一个节点 |
| `stay` | 任务留在 AI 节点，由发起人在待办里手工处理 |
| `transfer:role:<角色码>` | 转给这个角色下的人处理。角色下没有人时退回上一个节点 |

失败时，系统把失败码写入流程变量 `ai_error_code`，把原因写入 `ai_error_msg`。

| 失败码 | 原因 |
| --- | --- |
| `AI_APP_MISSING` | 节点没有绑定应用，或者应用不存在 |
| `AI_APP_DISABLED` | 应用没有启用 |
| `AI_APP_TYPE_DENIED` | 应用类型不是 `workflow` 或 `chatflow` |
| `AI_TENANT_DENIED` | 应用属于其他租户，或者缺少租户信息 |
| `AI_CAPABILITY_DENIED` | 应用里有不允许的节点 |
| `AI_TIMEOUT` | 运行超时 |
| `AI_EXECUTE_ERROR` | 运行出错，或者结果写回流程失败 |

### 不允许的节点 {#ai-approval-forbidden}

绑定到审批流的 AI 应用，不能包含下面这些类型的节点。包含任何一个，节点以 `AI_CAPABILITY_DENIED` 失败。

| 类别 | 节点类型 |
| --- | --- |
| 数据库 | `db`、`sql`、`jdbc` |
| 外部 HTTP 请求 | `http`、`https`、`rest`、`fetch`、`webhook` |
| 工具 | `mcp`、`tool` |
| 脚本 | `code`、`js`、`javascript`、`groovy`、`script` |
| 通知 | `notice`、`notify`、`notification`、`channel`、`webhook_notice` |

也就是说，审批流里的 AI 应用不能访问数据库和外部接口，也不能调用工具、执行脚本或发通知。

大模型（`llm`）、知识库检索（`rag`）和变量赋值（`updateVar`）这些节点不受影响。

### 运行记录 `aiTrace`

AI 节点自动通过、退回或转办时，都会在审批记录里留一份 `aiTrace`。在「审批中心」打开流程的审批记录就能看到。

| 字段 | 说明 |
| --- | --- |
| `aiFlowId` | 绑定的应用编号 |
| `runId` | 这次运行的编号 |
| `inputSummary` | 入参摘要，敏感键的值已隐去 |
| `output` | 写回的 `ai_summary`、`ai_pass` 和 `ai_reason` |
| `errorCode`、`errorMsg` | 失败码和原因，成功时为空 |
| `durationMs` | 耗时，单位毫秒 |

失败策略是 `stay` 时任务还没办结，这时看流程变量 `ai_error_code` 和 `ai_error_msg`。

### 预审演示数据

把 `mugsun.lab.seed-fronttest` 设为 `true` 后启动后端，会自动写入一套演示数据。这个开关只用于本地体验，生产环境不要打开。

- AI 应用「AI预审演示」，类型 `workflow`。
- 流程 `ai-preaudit`：开始 → AI预审 → 人工复核 → 结束。

这个演示应用不调用大模型，只用变量赋值写出摘要、是否通过和理由。

启动后在「流程定义」里发起 `ai-preaudit`，就能走一遍完整过程。

### 预审节点的限制

- AI 应用不能反过来发起审批流程。
- AI 应用还没有发布和版本管理。应用改动后，下一次预审就按新内容运行。

## 循环和并行节点 {#ai-flow-control}

AI 应用的编排里有两个控制节点：`foreach` 按数组逐个处理，`parallel` 同时运行几条分支。

它们由 AI 应用自己的执行引擎调度，和审批流里的「并行」节点没有关系。在设计器里的操作见[设计器](/pc/designer#ai-flow-control)。

| 节点类型 | 设计器里的名字 | 作用 |
| --- | --- | --- |
| `foreach` | 循环 | 对数组里的每个元素，依次运行一遍循环体 |
| `parallel` | 并行 | 同时运行多条分支，全部结束后再往下走 |

下面的字段都写在节点的 `data` 里。

### 循环 `foreach`

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `inputPath` | 无，必填 | 取数组的变量名或点分路径。取到的值必须是数组 |
| `bodyNodeIds` | 无，必填 | 循环体：按顺序列出每一轮要运行的节点编号 |
| `itemVar` | `item` | 当前元素写入这个变量 |
| `indexVar` | `index` | 当前下标写入这个变量，从 0 开始 |
| `maxIterations` | `20` | 最多运行多少轮，上限 `100` |
| `timeoutMs` | `120000` | 整个节点的超时时间，单位毫秒，上限 `300000` |
| `aggregate` | `array` | 结果怎么汇总，取值见下文 |
| `outputVar` | `foreachResults` | 汇总结果写入这个变量 |
| `onItemFailure` | `continue` | 某一轮失败后怎么办，取值见下文 |

`aggregate` 的取值：

- `array`：把每一轮的输出收集成数组，失败的轮不计入。
- `last`：只保留最后一轮的输出。
- `none`：不写汇总结果。

`onItemFailure` 的取值：

- `continue`：记下这一轮的错误，继续下一轮。
- `abort`：整个节点以 `AI_FOREACH_ITEM_ERROR` 失败。

运行规则：

- 各轮依次运行，前一轮结束才开始下一轮。
- 数组比 `maxIterations` 长时，只处理前面的元素。节点仍算成功，结果里 `truncated` 为 `true`。
- 各轮共用同一组变量。`item` 和 `index` 每轮覆盖，其他变量的改动会带到下一轮。
- 循环体最多 50 个节点，里面不能再放 `foreach` 或 `parallel`。
- 循环体里的节点靠 `bodyNodeIds` 关联，不用在画布上连线。
- 整个节点在应用的总步数里只算一步。

设计器保存时还会写入 `bodyMode: nodeIds`，目前只有这一种取值。

### 并行 `parallel`

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `branches` | 无，必填 | 分支列表，至少 2 条，最多 `maxBranches` 条 |
| `branches[].id` | 无，必填 | 分支编号，同一个节点里不能重复 |
| `branches[].bodyNodeIds` | 无，必填 | 这条分支要依次运行的节点编号 |
| `branches[].outputVar` | `branch_<分支编号>` | 分支成功后，输出写入这个变量 |
| `maxBranches` | `8` | 分支数上限，最大 `16` |
| `timeoutMs` | `120000` | 整个节点的超时时间，单位毫秒，上限 `300000` |

运行规则：

- 各分支同时运行，全部结束后节点才结束。
- 每条分支拿到的是进入节点时变量的一份副本，分支之间互不影响。
- 某条分支失败不会取消其他分支。节点仍算成功，结果里 `partial` 为 `true`。
- 所有分支的状态和输出，按分支编号汇总到变量 `parallelResults`。
- 到了超时时间还有分支没结束，节点以 `AI_PARALLEL_TIMEOUT` 失败。
- 分支里不能再放 `foreach` 或 `parallel`。
- 各分支都在这次运行所属的租户下执行。

设计器保存时还会写入 `waitAll: true` 和 `onBranchFailure: continue`。目前只有这一种取值，面板上是锁定的。

### 在运行详情里看结果

应用的运行详情里，这两种节点会多出几项内容：

- `foreach` 节点：每一轮的记录 `iterations`，以及是否被截断 `truncated`。
- `parallel` 节点：每条分支的记录 `branches`，以及是否只有部分成功 `partial`。

### 错误码

| 错误码 | 什么时候出现 |
| --- | --- |
| `AI_FOREACH_INPUT_NOT_ARRAY` | 没填 `inputPath`，或者取到的值不是数组 |
| `AI_FOREACH_MAX_ITERATIONS` | 在设计器里把 `maxIterations` 填得超过 100 |
| `AI_FOREACH_TIMEOUT` | `foreach` 节点超时 |
| `AI_FOREACH_BODY_INVALID` | 循环体为空、节点不存在、有嵌套，或者超过 50 个节点 |
| `AI_FOREACH_ITEM_ERROR` | 某一轮失败 |
| `AI_PARALLEL_BRANCH_INVALID` | 分支数、分支编号或分支内容不合规 |
| `AI_PARALLEL_TIMEOUT` | `parallel` 节点或某条分支超时 |
| `AI_PARALLEL_BRANCH_FAILED` | 某条分支失败，只记在这条分支的结果里 |
| `EXECUTE_ERROR` | 其他没有归类的运行错误 |

### 和 AI 预审一起用

[AI 预审节点](#ai-approval)绑定的应用里可以用 `foreach` 和 `parallel`。

- [不允许的节点](#ai-approval-forbidden)名单照常生效，循环体和分支里的节点也在检查范围内。
- 审批人看到的仍然是写回的 `ai_pass`、`ai_summary` 和 `ai_reason`。

### 控制节点演示数据

打开 `mugsun.lab.seed-fronttest`（生产环境不要打开）后，还会写入三个演示应用：

| 应用 | 内容 |
| --- | --- |
| 数组迭代演示 | 可以直接运行：`foreach` 加文本节点 |
| 两路并行演示 | 可以直接运行：`parallel` 两条分支 |
| 迭代预审演示 | 配合审批流 `ai-foreach-preaudit`：先迭代，再写出摘要、是否通过和理由 |

### 控制节点的限制

- 循环体和分支只能是一串顺序执行的节点，不能嵌套。
- `foreach` 的各轮只能依次运行，不支持同时处理多个元素。
- `parallel` 不支持「一条分支失败就立刻结束」（`failFast`）。
- 没有按租户限制同时运行的数量。
- 节点类型只有 `foreach` 和 `parallel`，没有 `loop` 这个别名。
- 画布上不显示循环体和分支的嵌套框，在属性面板里用节点列表配置。

## 注意事项

- 流程设计、发布和定义管理只有平台超管能操作。
- 发起流程不需要权限码。办理任务只有被指派的审批人能做。
- 已发布的流程不能直接修改。要改时用同一个编码重新画一遍再发布，原来的版本变成未发布。
- AI 预审节点的办理人默认是流程发起人。失败策略是 `stay` 时，任务会出现在发起人的待办里。

## 验证

发起一个流程后，查看实例和待办任务：

```sql
SELECT id, flow_status, node_name, create_time FROM flow_instance ORDER BY create_time DESC LIMIT 5;
SELECT id, instance_id, node_name, create_time FROM flow_task ORDER BY create_time DESC LIMIT 5;
```

审批人在「待办工作台」看到的任务，与 `flow_task` 里的记录一一对应。

## 下一步

<div class="ms-cards">

- [表单](./form) 给流程节点绑定表单，按节点控制字段读写。
- [设计器](/pc/designer) 流程设计器和 AI 应用编排的操作说明。

</div>
