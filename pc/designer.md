# 设计器

## AI 应用编排（工作流 / 文本 / 对话流程）

- **连线**：从节点右侧输出点拖到另一节点左侧输入点；连线带箭头。
- 不能连到自己，同一对节点不会重复连线。
- **开始 / 结束节点唯一**：画布上只能各有 1 个；再拖入会提示并忽略。
- **保存前校验**：须恰好 1 个开始与 1 个结束；中间节点出入边齐全，否则不保存。
- **对话助手不校验**：无画布，只有模型参数表单；「对话流程」有画布，照常校验。

内嵌审批流时，DSL 还受能力面硬禁约束。

可拖入 foreach / parallel 控制节点；详见下文与[工作流 · AI 预审](/boot/features/workflow#ai-approval)。


## 数组迭代 / 并行（foreach · parallel） {#ai-flow-control}

应用编排 palette 提供 **数组迭代**（`foreach`）与 **并行分支**（`parallel`）。

由 AiFlow 自有引擎执行，不是审批图画布网关。无 `loop` 别名。

### 属性面板（P0）

- body 用多选有序 **nodeId**（`bodyMode=nodeIds`）；不做画布子框。
- foreach：`inputPath` 必填；`itemVar`/`indexVar` 默认 item/index。
- `maxIterations` 默认 20、硬顶 100；`timeoutMs` 默认 120s、硬顶 300s。
- `aggregate` 默认 `array`；`onItemFailure` 默认 `continue`。
- parallel：`waitAll` 锁定 true；`onBranchFailure` 锁定 `continue`。
- `branches` 至少 2、默认可配到 8、硬顶 16；每支 `bodyNodeIds` + `outputVar`。
- body 候选排除自身与其它控制节点；禁嵌套 foreach/parallel。
- 校验豁免：仅被 `bodyNodeIds` 引用、无边的节点不算孤立。

### 运行详情

- foreach：`iterations[]`、`truncated`（数组超长仍 success）。
- parallel：`branches[]` / `parallelResults`、`partial`（有失败支仍 success）。
- 错误码前缀：`AI_FOREACH_*` / `AI_PARALLEL_*`。

完整契约与审批联用见[工作流 · AiFlow 控制节点](/boot/features/workflow#ai-flow-control)。

## 流程定义设计器

- 「流程编码」「流程名称」必填；留空点「发布流程」会标红并汇总提示。
- 原「部署流程」改称「发布流程」，成功提示为「流程已发布」。
- 审批节点「+候选人」「删除」加了浅色底，蓝色节点上也看得清。
- 可添加 **AI 预审**节点（`type=ai`）。
- 须选本租户已启用的 workflow / chatflow（`aiFlowId`）。
- `inputMap` 字段必填；可空表（存为 `{}`，零注入）。
- `outputMap` 的 **value（写回键）** 须为约定四键或 `ai_ext_*`。
- 约定四键：`ai_summary` / `ai_pass` / `ai_reason` / `ai_run_id`。
- `timeoutMs` 默认 120000、上限 300000。
- `onFailure` 默认 `rejectLast`，也可 `stay` 或 `transfer:role:<角色码>`。
- 实例抽屉可看 `aiTrace` 与 AI 写回变量。

完整契约见[工作流](/boot/features/workflow#ai-approval)。
