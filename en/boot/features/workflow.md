# Workflow

Workflow is built on the Warm-Flow engine and handles multi-level approvals such as leave requests and expense claims.

You can insert an **AI pre-check node** (`type=ai`): when the node is created, an enabled AI app runs, writes agreed variables back, then hands off to a human node.

## What it does

- Draw flows in Flow Designer, with approval nodes, conditional branches, parallel branches, countersigning, and **AI pre-check**.
- Publish, suspend, copy to a new version and delete flows in Flow Definitions.
- Users start flows in Approval Center and handle tasks in Todo Workbench.
- A task can be approved, returned, withdrawn, transferred, delegated, given extra or fewer signers, voided or copied to others.
- A flow node can be bound to a [form](./form), with each field set to read-only, writable or hidden on that node.

## How to turn it on

Workflow starts with the backend and needs no extra configuration. Its tables are created by Flyway migrations.

AI pre-check needs the AI module enabled and a tenant-local AiApp with `status==1` and type `workflow` or `chatflow`.

## How to use it

1. The platform super admin opens System Settings → Flow Designer, creates a flow, sets its code, name and the approver role of each node, then saves and publishes it.
2. A user opens Approval Center, picks the flow and starts it.
3. The approver sees the task in Todo Workbench, opens it and handles it.
4. Running Flows lists unfinished instances. Users with `sys:flow:running:terminate` can terminate an instance.

To start a flow from backend code, call `POST /system/flow/start-by/{flowCode}/{businessId}`.

## AI pre-check node (AI × approval) {#ai-approval}

Designer node type is `ai`. On publish it becomes a Warm-Flow **BETWEEN** node with a `create` listener
`com.mugsun.boot.ai.flow.AiApprovalNodeListener`.

On create it validates and runs the bound AiApp, then `skip PASS` on success, or follows `onFailure` on failure.

**Out of scope for this cut**: AI starting an approval, formal AiApp publish/version, new permission codes, issue #59.

### Bind an app

| Item | Detail |
| --- | --- |
| Config key | `aiFlowId` (AiApp primary key) |
| Allowed types | `workflow` and `chatflow` only |
| Status | Same-tenant `status==1` (enabled) only |
| Cross-tenant | Rejected (`AI_TENANT_DENIED`) |
| App missing tenant | Fail-closed, also rejected |

The designer dropdown lists only those apps. Real API by default; local mock only when DEV and `VITE_FLOW_AI_MOCK=true`.

### Input `inputMap` (required)

The field **must be present**. An empty object `{}` means **explicit zero injection** (no flow variables are passed into the AI).

There is no “omit map → shallow-copy all flow variables”. Missing field fails designer validation; runtime empty map also injects nothing.

Mapping: `flowVar → aiInputName` (blank value keeps the same name).

Only keys declared in the map and present in flow variables are copied. `inputSummary` redacts keys whose names look like password / token / secret.

### Output `outputMap` (allow-listed write-back)

`from → to`: `key` is the AI output source; `value` is the flow **target key** (allow-list applies to the value).

| Agreed target | Meaning |
| --- | --- |
| `ai_summary` | Summary |
| `ai_pass` | Suggested pass (boolean) |
| `ai_reason` | Reason |
| `ai_run_id` | AiAppRun id (also set by the listener on success) |

Also allowed: `ai_ext_[A-Za-z0-9_]+`. Illegal targets: blocked in the designer before publish; dropped silently at runtime.

With no `outputMap`, runtime copies the three agreed keys if present in AI output, and always adds `ai_run_id`.

### Timeout and failure policy

| Item | Detail |
| --- | --- |
| `timeoutMs` | Default `120000`; hard cap `≤300000` (designer and runtime) |
| `onFailure` | Default `rejectLast` (reject to previous node) |
| Other values | `stay` (leave todo for initiator); `transfer:role:<roleCode>` (transfer to that role; empty roster falls back to rejectLast) |

Failures also set flow vars `ai_error_code` / `ai_error_msg` (and optional `ai_run_id`).

Common codes:

| Code | Meaning |
| --- | --- |
| `AI_APP_MISSING` | Not bound / missing |
| `AI_APP_DISABLED` | Not enabled |
| `AI_APP_TYPE_DENIED` | Not workflow/chatflow |
| `AI_TENANT_DENIED` | Cross-tenant or missing tenant |
| `AI_CAPABILITY_DENIED` | DSL hits hard blocklist |
| `AI_TIMEOUT` | Timed out |
| `AI_EXECUTE_ERROR` | Run or write-back failed |

### Hard-blocked DSL capabilities

If the bound AiApp DSL contains any of these node types (lowercase and synonyms), embedded run is denied (`AI_CAPABILITY_DENIED`):

| Category | Types (incl. synonyms) |
| --- | --- |
| Database | `db` / `sql` / `jdbc` |
| Outbound HTTP | `http` / `https` / `rest` / `fetch` / `webhook` |
| Tools | `mcp` / `tool` |
| Scripts | `code` / `js` / `javascript` / `groovy` / `script` |
| Notice | `notice` / `notify` / `notification` / `channel` / `webhook_notice` |

Embedded approval allows safe orchestration only (for example updateVar).

No DB, outbound HTTP, MCP, scripts, or notice channels.

### Instance trace `history.aiTrace`

Each AI node completion (success or failure) writes JSON into the history task extension (`hisTaskExt`).

The console instance drawer can show `aiTrace` and the written-back `ai_summary` / `ai_pass` / `ai_reason`.

Typical fields:

| Field | Meaning |
| --- | --- |
| `aiFlowId` | Bound app id |
| `runId` | Run id |
| `inputSummary` | Input summary (redacted) |
| `output` | Written-back summary/pass/reason |
| `errorCode` / `errorMsg` | Set on failure |
| `durationMs` | Duration |

### Demo seed (lab)

With `mugsun.lab.seed-fronttest=true` (same as fronttest; keep off in production), an idempotent seed creates:

- AiApp named “AI预审演示” (`workflow`; DSL only updateVar for the three keys; no LLM)
- Flow code **`ai-preaudit`**: start → AI pre-check → human review → end; published for Approval Center


## AiFlow control nodes (foreach / parallel) {#ai-flow-control}

`foreach` / `parallel` are scheduled by the **AiFlow graph engine**, not Warm-Flow approval gateways.

There is **no** `loop` alias; node types are only `foreach` | `parallel`.

They can combine with [AI pre-check](#ai-approval): the app DSL may contain control nodes; approval still reads `ai_pass`.

### Node overview

| type | Role |
| --- | --- |
| `foreach` | Walk an array **serially** over `bodyNodeIds`, then continue on the main edge |
| `parallel` | Same-layer branches with **waitAll**; failures `continue` and do not cancel others |

### foreach config (`data`)

| Field | Default / hard cap | Notes |
| --- | --- | --- |
| `inputPath` | **required** | vars key or dotted path; value must be an **array** |
| `itemVar` | `item` | current element written into vars |
| `indexVar` | `index` | current index (from 0) |
| `maxIterations` | default 20; hard cap 100 | runtime clamps; oversize arrays below |
| `timeoutMs` | default 120000; hard cap 300000 | wall clock for the whole node |
| `aggregate` | `array` | also `last` / `none` |
| `outputVar` | `foreachResults` | aggregated result in vars |
| `onItemFailure` | `continue` | or `abort` (stop on item error) |
| `bodyMode` | `nodeIds` | fixed in P0 |
| `bodyNodeIds` | ordered id list | linear body in the same graph; **no nested** foreach/parallel |

Semantics:

- **P0 serial**: for each element, run `bodyNodeIds` in order, then the next element.
- Array longer than `maxIterations`: node still **success** with `truncated=true`; only the first N items run.
- Outer path counts 1 step; hard cap 50 body steps per round.
- Vars are **not** deep-isolated between rounds (`item`/`index` overwrite; other keys accumulate).
- Body is attached via `bodyNodeIds` (edges optional); designer does not treat those nodes as loose.

### parallel config (`data`)

| Field | Default / hard cap | Notes |
| --- | --- | --- |
| `waitAll` | always `true` | only join mode in P0; panel locked on |
| `onBranchFailure` | `continue` | does not cancel other branches; panel locked |
| `maxBranches` | default 8; hard cap 16 | config and branch-count ceiling |
| `timeoutMs` | default 120000; hard cap 300000 | wall clock for the whole node |
| `branches[]` | at least 2 | at most `maxBranches` (≤16) |
| `branches[].id` | required, unique in the node | branch id |
| `branches[].bodyNodeIds` | required | no nested foreach/parallel |
| `branches[].outputVar` | `branch_{id}` | successful branch output written here |

Semantics:

- Branches run on a bounded pool with `TenantContext` carrying the tenant.
- Any failed/timed-out branch → node still **success** with `partial=true`.
- Aggregate into `parallelResults` (by branch id) and each `outputVar`.
- If wall clock is exhausted and a branch is still `timeout` → raise `AI_PARALLEL_TIMEOUT`.

### Designer P0 (app orchestration)

- Palette includes **Array iteration** and **Parallel branches**.
- Property panel picks ordered **nodeId** lists for body; **no** canvas sub-frame.
- Body candidates exclude self and other foreach/parallel nodes.
- Save validation aligns with boot error codes; `waitAll` / `onBranchFailure` locked.
- Run detail shows `iterations[]` / `branches[]`, `truncated` / `partial`.

See [Designers](/en/pc/designer#ai-flow-control) for UI behavior.

### Error codes

| Code | When |
| --- | --- |
| `AI_FOREACH_INPUT_NOT_ARRAY` | missing `inputPath` or value not an array |
| `AI_FOREACH_MAX_ITERATIONS` | designer: config above hard cap 100 |
| `AI_FOREACH_TIMEOUT` | foreach wall-clock timeout |
| `AI_FOREACH_BODY_INVALID` | empty/missing/nested body, or >50 steps/round |
| `AI_FOREACH_ITEM_ERROR` | item failed under `onItemFailure=abort` |
| `AI_PARALLEL_BRANCH_INVALID` | illegal branch count / id / body |
| `AI_PARALLEL_TIMEOUT` | parallel wall clock or escalated branch timeout |
| `AI_PARALLEL_BRANCH_FAILED` | one branch failed (recorded; node may still success+partial) |
| `EXECUTE_ERROR` | unclassified execute error |

### With approval

- **`FORBIDDEN_NODE_TYPES` is unchanged**.
- Whole-graph scan of `nodes[]`: body nodes in the graph are covered; do not put db/http/mcp/code/notice (etc.) in body.
- foreach / parallel **themselves** may appear in embedded approval DSL.
- Approval still reads written-back `ai_pass` (and `ai_summary` / `ai_reason`).
- Combine with `type=ai` pre-check: the bound app DSL may include control nodes.

### Lab seeds

With `mugsun.lab.seed-fronttest=true` (keep off in production), an idempotent seed creates:

| Name | Purpose |
| --- | --- |
| Array iteration demo | direct foreach + text |
| Two-way parallel demo | direct parallel with two branches |
| Iteration pre-check demo | approval flow `ai-foreach-preaudit`: foreach → write three keys |

### Out of scope for this cut

Tenant concurrency Redis gate, per-element parallel inside foreach, `failFast`, `loop` alias, canvas sub-frame nesting UI.

## Notes

- Only the platform super admin can design, publish and manage flow definitions. Starting and handling flows is open to everyone.
- A published flow cannot be edited directly. Copy it to a new version, edit that, and publish it.
- AI nodes default the candidate to the initiator placeholder so `onFailure=stay` can surface in Todo.
- For how to use the designer, see [Designers](/en/pc/designer).

## See it work

After starting a flow, look at its instance and pending tasks:

```sql
SELECT id, flow_status, node_name, create_time FROM flow_instance ORDER BY create_time DESC LIMIT 5;
SELECT id, instance_id, node_name, create_time FROM flow_task ORDER BY create_time DESC LIMIT 5;
```

The tasks an approver sees in Todo Workbench match the rows in `flow_task` one to one.

Previous: [Features](./) · Next: [Forms](./form)
