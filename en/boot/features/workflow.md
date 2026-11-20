# Workflow

Workflow is built on the Warm-Flow engine and handles multi-level approvals such as leave requests and expense claims.

A flow can include an AI pre-check node: an AI app reviews the request first, then a person approves it.

![Flow Definitions page: one row per flow, with a Start button on the right](/screenshots/pc/workflow-definitions.png)

## What it does

- Draw flows in Flow Designer, with approval, condition, parallel, countersign and AI pre-check nodes.
- Suspend, activate and delete flows in Flow Designer, or copy one as a new version.
- Browse flows in Flow Definitions and click Start to submit a request.
- Handle to-dos in Approval Center, and see the flows you started, handled or were copied on.
- A task can be approved, returned, withdrawn, transferred, delegated, given extra or fewer signers, voided or copied to others.
- A flow node can be bound to a [form](./form), with each field set to read-only, writable or hidden on that node.

## Enable it

Workflow starts with the backend and needs no extra configuration. Its tables are created by Flyway migrations.

The AI pre-check node has two more requirements:

- The AI module is enabled.
- The tenant has an enabled AI app of type `workflow` or `chatflow`.

## Use it

<div class="ms-steps">

### Design and publish a flow

The platform super admin opens System Settings → Flow Designer, creates a flow, sets its code, name and the approver role of each node, then publishes it.

### Start a flow

A user opens Flow Definitions and clicks Start on the row of the flow to use.

### Handle the task

The approver sees the task in the to-do tab of Approval Center, opens it and handles it. Todo Workbench works too.

![To-do list in Approval Center, with a Handle button on each task](/screenshots/pc/workflow-approval-center.png)

### Watch running flows

Running Flows lists the flows that have not finished. Users with `sys:flow:running:terminate` can terminate one.

</div>

To start a flow from backend code, call `POST /system/flow/start-by/{flowCode}/{businessId}`.

Who approves each node is decided by the flow design alone. The request cannot name approvers.

## AI pre-check node {#ai-approval}

When a flow reaches an AI pre-check node, it runs the AI app bound to the node and writes the verdict into flow variables.

- On success, the node passes by itself and the flow moves to the next node.
- On failure, the node follows its [failure strategy](#ai-approval-failure).

The next approver opens the task and sees the AI summary, whether it suggests approval, and the reason.

### Bind an app

The node names one AI app with `aiFlowId`. The app must meet every condition below, or the node fails.

| Condition | Failure code when not met |
| --- | --- |
| The app exists | `AI_APP_MISSING` |
| The app and the flow belong to the same tenant | `AI_TENANT_DENIED` |
| The app is enabled | `AI_APP_DISABLED` |
| The app type is `workflow` or `chatflow` | `AI_APP_TYPE_DENIED` |
| The app contains no [forbidden node](#ai-approval-forbidden) | `AI_CAPABILITY_DENIED` |

An app or a flow instance without tenant information also fails with `AI_TENANT_DENIED`.

The dropdown in the designer lists only enabled apps of these two types in the current tenant.

When you develop the admin console locally, set `VITE_FLOW_AI_MOCK` to `true` to fill the dropdown with local sample data. The switch works in development mode only.

### Input: `inputMap`

`inputMap` decides which flow variables are passed to the AI. The designer requires it.

Each entry maps a flow variable name to an AI input name. A blank input name means the same name as the flow variable.

- Only keys that are listed in the map and present in the flow variables are passed.
- An empty object `{}` passes nothing.
- Without a map, the flow variables are not passed to the AI as a whole.

The approval history keeps a summary of the input. Values of keys whose names contain words like `password`, `token` or `secret` are shown as `***`.

### Output: `outputMap`

`outputMap` decides which AI outputs are written back to flow variables. Each entry maps an AI output name to a flow variable name.

Only these flow variable names are allowed:

| Flow variable | Meaning |
| --- | --- |
| `ai_summary` | Summary |
| `ai_pass` | Whether the AI suggests approval, a boolean |
| `ai_reason` | Reason |
| `ai_run_id` | The id of this run. The system writes it on success |
| Keys starting with `ai_ext_` | Custom extensions. Only letters, digits and underscores may follow the prefix |

A name outside the list is rejected when you publish the flow, and is not written back at runtime either. This keeps AI output from changing other variables in the flow.

Without `outputMap`, `ai_summary`, `ai_pass` and `ai_reason` in the AI output are written back under the same names.

If there is still no `ai_summary` after that, the value of the app variable `output` is used as the summary.

### Timeout and failure strategy {#ai-approval-failure}

| Setting | Default | Notes |
| --- | --- | --- |
| `timeoutMs` | `120000` | Timeout of the AI run in milliseconds, at most `300000` |
| `onFailure` | `rejectLast` | What to do on failure. Values are listed below |

| `onFailure` value | Effect |
| --- | --- |
| `rejectLast` | Return to the previous node |
| `stay` | Keep the task at the AI node. The initiator handles it by hand from the to-do list |
| `transfer:role:<role code>` | Transfer to the people in that role. If the role has nobody, return to the previous node |

On failure, the system writes the failure code to the flow variable `ai_error_code` and the reason to `ai_error_msg`.

| Failure code | Cause |
| --- | --- |
| `AI_APP_MISSING` | The node has no app bound, or the app does not exist |
| `AI_APP_DISABLED` | The app is not enabled |
| `AI_APP_TYPE_DENIED` | The app type is not `workflow` or `chatflow` |
| `AI_TENANT_DENIED` | The app belongs to another tenant, or tenant information is missing |
| `AI_CAPABILITY_DENIED` | The app contains a forbidden node |
| `AI_TIMEOUT` | The run timed out |
| `AI_EXECUTE_ERROR` | The run failed, or writing the result back to the flow failed |

### Forbidden nodes {#ai-approval-forbidden}

An AI app bound to an approval flow must not contain nodes of the types below. If it contains any of them, the node fails with `AI_CAPABILITY_DENIED`.

| Category | Node types |
| --- | --- |
| Database | `db`, `sql`, `jdbc` |
| Outbound HTTP | `http`, `https`, `rest`, `fetch`, `webhook` |
| Tools | `mcp`, `tool` |
| Scripts | `code`, `js`, `javascript`, `groovy`, `script` |
| Notifications | `notice`, `notify`, `notification`, `channel`, `webhook_notice` |

In other words, an AI app inside an approval flow cannot reach the database, call external APIs, call tools, run scripts or send notifications.

Nodes such as LLM (`llm`), knowledge base retrieval (`rag`) and variable assignment (`updateVar`) are not affected.

### Run record: `aiTrace`

Whenever the AI node passes, returns or transfers the task by itself, it leaves an `aiTrace` in the approval history. Open the history of the flow in Approval Center to see it.

| Field | Meaning |
| --- | --- |
| `aiFlowId` | Id of the bound app |
| `runId` | Id of this run |
| `inputSummary` | Input summary, with sensitive values hidden |
| `output` | The `ai_summary`, `ai_pass` and `ai_reason` written back |
| `errorCode`, `errorMsg` | Failure code and cause, empty on success |
| `durationMs` | Duration in milliseconds |

With the `stay` strategy the task is not finished yet, so read the flow variables `ai_error_code` and `ai_error_msg` instead.

### Demo data for the pre-check

Start the backend with `mugsun.lab.seed-fronttest` set to `true` and it writes a set of demo data. The switch is for local trials only. Keep it off in production.

- An AI app named “AI预审演示”, of type `workflow`.
- The flow `ai-preaudit`: start → AI pre-check → human review → end.

The demo app calls no LLM. It only uses variable assignment to produce the summary, the verdict and the reason.

After startup, start `ai-preaudit` in Flow Definitions to walk through the whole process.

### Limits of the pre-check node

- An AI app cannot start an approval flow the other way round.
- AI apps have no publishing or versioning yet. After an app changes, the next pre-check runs the new content.

## Array iteration and parallel branches {#ai-flow-control}

AI app orchestration has two control nodes: `foreach` handles the elements of an array one by one, and `parallel` runs several branches at the same time.

They are scheduled by the AI app's own execution engine and are unrelated to the parallel node of approval flows. For how to use them in the designer, see [Designers](/en/pc/designer#ai-flow-control).

| Node type | Name in the designer | What it does |
| --- | --- | --- |
| `foreach` | Array iteration | Runs the loop body once for each element of an array, in order |
| `parallel` | Parallel branches | Runs several branches at the same time and continues after all of them end |

All fields below go in the node's `data`.

### Array iteration: `foreach`

| Field | Default | Notes |
| --- | --- | --- |
| `inputPath` | None, required | Variable name or dotted path of the array. The value must be an array |
| `bodyNodeIds` | None, required | The loop body: ids of the nodes to run in each round, in order |
| `itemVar` | `item` | The current element is written to this variable |
| `indexVar` | `index` | The current index is written to this variable, starting from 0 |
| `maxIterations` | `20` | Maximum number of rounds, capped at `100` |
| `timeoutMs` | `120000` | Timeout of the whole node in milliseconds, capped at `300000` |
| `aggregate` | `array` | How results are aggregated. Values are listed below |
| `outputVar` | `foreachResults` | The aggregated result is written to this variable |
| `onItemFailure` | `continue` | What to do when a round fails. Values are listed below |

Values of `aggregate`:

- `array`: collect the output of every round into an array. Failed rounds are left out.
- `last`: keep only the output of the last round.
- `none`: write no aggregated result.

Values of `onItemFailure`:

- `continue`: record the error of this round and go on with the next one.
- `abort`: fail the whole node with `AI_FOREACH_ITEM_ERROR`.

How it runs:

- Rounds run one after another. The next round starts after the previous one ends.
- When the array is longer than `maxIterations`, only the leading elements are handled. The node still succeeds, with `truncated` set to `true` in the result.
- All rounds share one set of variables. `item` and `index` are overwritten every round, and changes to other variables carry over to the next round.
- The loop body holds at most 50 nodes and cannot contain another `foreach` or `parallel`.
- Body nodes are attached through `bodyNodeIds` and need no edges on the canvas.
- The whole node counts as one step in the app's total step count.

The designer also saves `bodyMode: nodeIds`. This is the only value for now.

### Parallel branches: `parallel`

| Field | Default | Notes |
| --- | --- | --- |
| `branches` | None, required | The list of branches: at least 2, at most `maxBranches` |
| `branches[].id` | None, required | Branch id, unique within the node |
| `branches[].bodyNodeIds` | None, required | Ids of the nodes this branch runs, in order |
| `branches[].outputVar` | `branch_<branch id>` | When the branch succeeds, its output is written to this variable |
| `maxBranches` | `8` | Upper limit of branches, at most `16` |
| `timeoutMs` | `120000` | Timeout of the whole node in milliseconds, capped at `300000` |

How it runs:

- Branches run at the same time. The node ends after all of them end.
- Each branch gets a copy of the variables as they were on entering the node, so branches do not affect each other.
- A failed branch does not cancel the others. The node still succeeds, with `partial` set to `true` in the result.
- The status and output of every branch are collected in the variable `parallelResults`, keyed by branch id.
- If a branch is still running when the timeout is reached, the node fails with `AI_PARALLEL_TIMEOUT`.
- A branch cannot contain another `foreach` or `parallel`.
- Every branch runs under the tenant of the current run.

The designer also saves `waitAll: true` and `onBranchFailure: continue`. These are the only values for now, and the panel locks them.

### Read the result in the run detail

In the run detail of an app, these two nodes carry a few more items:

- A `foreach` node: the record of every round in `iterations`, and whether the array was cut short in `truncated`.
- A `parallel` node: the record of every branch in `branches`, and whether only some branches succeeded in `partial`.

### Error codes

| Error code | When it appears |
| --- | --- |
| `AI_FOREACH_INPUT_NOT_ARRAY` | `inputPath` is missing, or the value is not an array |
| `AI_FOREACH_MAX_ITERATIONS` | `maxIterations` is set above 100 in the designer |
| `AI_FOREACH_TIMEOUT` | The `foreach` node timed out |
| `AI_FOREACH_BODY_INVALID` | The loop body is empty, names a missing node, is nested, or holds more than 50 nodes |
| `AI_FOREACH_ITEM_ERROR` | A round failed |
| `AI_PARALLEL_BRANCH_INVALID` | The branch count, a branch id or a branch body is invalid |
| `AI_PARALLEL_TIMEOUT` | The `parallel` node or one of its branches timed out |
| `AI_PARALLEL_BRANCH_FAILED` | A branch failed. Recorded only in the result of that branch |
| `EXECUTE_ERROR` | Any other unclassified run error |

### Use them with the AI pre-check

The app bound to an [AI pre-check node](#ai-approval) can use `foreach` and `parallel`.

- The list of [forbidden nodes](#ai-approval-forbidden) still applies, and the nodes in loop bodies and branches are checked too.
- The approver still sees the `ai_pass`, `ai_summary` and `ai_reason` written back.

### Demo data for control nodes

With `mugsun.lab.seed-fronttest` on (keep it off in production), three more demo apps are written:

| App | Content |
| --- | --- |
| Array iteration demo | Runs directly: `foreach` plus a text node |
| Two-way parallel demo | Runs directly: `parallel` with two branches |
| Iteration pre-check demo | Works with the approval flow `ai-foreach-preaudit`: iterate first, then produce the summary, the verdict and the reason |

### Limits of control nodes

- A loop body or a branch can only be a chain of nodes that run in order. Nesting is not supported.
- The rounds of `foreach` only run one after another. Handling several elements at the same time is not supported.
- `parallel` cannot end as soon as one branch fails (`failFast`).
- There is no per-tenant limit on how many run at the same time.
- The node types are only `foreach` and `parallel`. There is no `loop` alias.
- The canvas does not draw frames around loop bodies and branches. Configure them with the node list in the property panel.

## Notes

- Only the platform super admin can design, publish and manage flow definitions.
- Starting a flow needs no permission code. Only the assigned approvers can handle a task.
- A published flow cannot be edited directly. Copy it as a new version, edit that, and publish it.
- The handler of an AI pre-check node defaults to the initiator of the flow. With the `stay` strategy, the task shows up in the initiator's to-do list.

## Verify

After starting a flow, look at its instance and pending tasks:

```sql
SELECT id, flow_status, node_name, create_time FROM flow_instance ORDER BY create_time DESC LIMIT 5;
SELECT id, instance_id, node_name, create_time FROM flow_task ORDER BY create_time DESC LIMIT 5;
```

The tasks an approver sees in Todo Workbench match the rows in `flow_task` one to one.

## Next steps

<div class="ms-cards">

- [Forms](./form) Bind a form to a flow node and control field access per node.
- [Designers](/en/pc/designer) How to use the flow designer and AI app orchestration.

</div>
