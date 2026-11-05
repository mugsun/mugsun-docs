# Designers

## AI app orchestration (workflow / text / chat flow)

- **Connecting nodes**: drag from a node's output handle on the right to another node's input handle on the left. Edges have arrows. A node cannot connect to itself, and the same pair of nodes is never connected twice.
- **One start and one end node**: the canvas allows only one Start and one End node; dropping another one shows a warning and is ignored.
- **Validation on save**: saving checks that the flow has exactly one Start and one End node, that every node except Start has an incoming edge, and every node except End has an outgoing edge. Otherwise the reason is shown and nothing is saved.
- **Chat assistants are not checked**: a "Chat assistant" app has no canvas, only a model settings form, so saving skips the checks above. "Chat flow" apps have a canvas and are checked as usual.

When an app is embedded in an approval flow, its DSL is also subject to the hard capability blocklist — see [Workflow · AI pre-check](/en/boot/features/workflow#ai-approval).

## Flow definition designer

- Flow code and flow name are required. Clicking "Publish Flow" with them empty marks the fields in red and shows a summary message.
- The former "Deploy Flow" button is now "Publish Flow", and the success message is "Flow published".
- The "+ Candidate" and "Delete" buttons on approval nodes now have a light background so they stay readable on the blue node.
- You can add an **AI pre-check** node (`type=ai`): bind a same-tenant enabled workflow / chatflow app (`aiFlowId`).
- `inputMap` is required; an empty list stores as `{}` (zero injection). `outputMap` **value (write-back key)** must be `ai_summary` / `ai_pass` / `ai_reason` / `ai_run_id` or `ai_ext_*`.
- `timeoutMs` defaults to 120000 (cap 300000); `onFailure` defaults to `rejectLast`, or `stay` / `transfer:role:<roleCode>`.
- The instance drawer shows history `aiTrace` and AI write-back vars. Full contract: [Workflow](/en/boot/features/workflow#ai-approval).
