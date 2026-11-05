# Designers

## AI app orchestration (workflow / text / chat flow)

- **Connecting nodes**: drag from a node's output handle on the right to another node's input handle on the left. Edges have arrows. A node cannot connect to itself, and the same pair of nodes is never connected twice.
- **One start and one end node**: the canvas allows only one Start and one End node; dropping another one shows a warning and is ignored.
- **Validation on save**: saving checks that the flow has exactly one Start and one End node, that every node except Start has an incoming edge, and every node except End has an outgoing edge. Otherwise the reason is shown and nothing is saved.
- **Chat assistants are not checked**: a "Chat assistant" app has no canvas, only a model settings form, so saving skips the checks above. "Chat flow" apps have a canvas and are checked as usual.

When an app is embedded in an approval flow, its DSL is also subject to the hard capability blocklist — see [Workflow · AI pre-check](/en/boot/features/workflow#ai-approval).

You can drop foreach / parallel control nodes; see the section below.


## Array iteration / parallel (foreach · parallel) {#ai-flow-control}

The app-orchestration palette includes **Array iteration** (`foreach`) and **Parallel branches** (`parallel`).

They run on the AiFlow engine, not the approval-canvas gateways. There is no `loop` alias.

### Property panel (P0)

- Body is an ordered multi-select of **nodeId** (`bodyMode=nodeIds`); no canvas sub-frame.
- foreach: `inputPath` required; `itemVar`/`indexVar` default to item/index.
- `maxIterations` default 20, hard cap 100; `timeoutMs` default 120s, hard cap 300s.
- `aggregate` defaults to `array`; `onItemFailure` defaults to `continue`.
- parallel: `waitAll` locked true; `onBranchFailure` locked to `continue`.
- `branches` at least 2, configurable up to 8 by default, hard cap 16; each has `bodyNodeIds` + `outputVar`.
- Body candidates exclude self and other control nodes; nesting foreach/parallel is forbidden.
- Validation exemption: nodes only referenced by `bodyNodeIds` (no edges) are not treated as loose.

### Run detail

- foreach: `iterations[]`, `truncated` (oversize array still success).
- parallel: `branches[]` / `parallelResults`, `partial` (failed branch still success).
- Error-code prefixes: `AI_FOREACH_*` / `AI_PARALLEL_*`.

Full contract and approval use: [Workflow · AiFlow control nodes](/en/boot/features/workflow#ai-flow-control).

## Flow definition designer

- Flow code and flow name are required. Clicking "Publish Flow" with them empty marks the fields in red and shows a summary message.
- The former "Deploy Flow" button is now "Publish Flow", and the success message is "Flow published".
- The "+ Candidate" and "Delete" buttons on approval nodes now have a light background so they stay readable on the blue node.
- You can add an **AI pre-check** node (`type=ai`): bind a same-tenant enabled workflow / chatflow app (`aiFlowId`).
- `inputMap` is required; an empty list stores as `{}` (zero injection). `outputMap` **value (write-back key)** must be `ai_summary` / `ai_pass` / `ai_reason` / `ai_run_id` or `ai_ext_*`.
- `timeoutMs` defaults to 120000 (cap 300000); `onFailure` defaults to `rejectLast`, or `stay` / `transfer:role:<roleCode>`.
- The instance drawer shows history `aiTrace` and AI write-back vars. Full contract: [Workflow](/en/boot/features/workflow#ai-approval).
