# Designers

The admin console has four designers. This page covers the two flow designers and AI app orchestration; for the form designer, see [Forms](/en/boot/features/form).

## Which designers there are

| Designer | Where to open it | What it is for |
| --- | --- | --- |
| Flow designer | "Design Flow" in "System Settings → Flow Definitions" | Line up approval nodes in order; can bind a form |
| Graphical flow designer | "Design Flow Graphically" in "System Settings → Flow Designer" | Draw approval flows with branches and AI nodes |
| App orchestration | "Orchestrate" on an app card in "AI Center → Apps" | Connect LLM, knowledge base and other nodes into an AI app |
| Form designer | "System Settings → Form Designer" | Build a form by drag and drop |

- Use the flow designer when a flow binds a form or controls field access per node.
- Use the graphical flow designer when a flow has condition branches, parallel branches or an AI pre-check.
- Flows published by either flow designer share one list, shown on both the "Flow Definitions" and "Flow Designer" pages.
- Only the platform super admin can use the two flow designers.

## Flow designer

Open "System Settings → Flow Definitions" and click "Design Flow". The button needs the `sys:flow:design` permission.

<div class="ms-steps">

### Enter the code and name

"Flow Code" is an English identifier such as `purchase`. "Flow Name" is the name people see. Both are required.

### Bind a form

"Bind Form" is optional. With a form bound, the starter fills it in when starting the flow, and approvers see it when they handle a task.

### Add approval nodes

The dialog starts with one "Department Approval" node. Click "+ Add Approval Node" to add more; the flow moves through the nodes in the order they are listed.

Each node needs a name and at least one candidate.

### Publish

Click "Publish Flow". On success the message "Flow published" appears, the flow shows up in the list, and "Start" starts it.

</div>

For starting and approving, see [Workflow](/en/boot/features/workflow).

### Choosing candidates {#candidates}

Both flow designers offer the same candidate types.

| Type | Who approves |
| --- | --- |
| Role | Users who have this role |
| Department | Users in this department |
| Specific User | The selected user; search by username or nickname |
| Initiator | The person who started the flow |
| Department Leader | The leader of the initiator's department |

A node can have several candidates; click "+ Candidate" to add one.

### Field permissions

Once a flow has a form bound, each node gets a "Field Permissions" button.

- Each form field can be "Writable", "Read-only" or "Hidden"; the default is "Writable".
- When an approver handles this node, the form follows these settings.
- Binding a different form clears the field permissions already set.

## Graphical flow designer

![A leave approval flow in the graphical flow designer](/screenshots/pc/flow-graph-designer.png)

Open "System Settings → Flow Designer" and click "Design Flow Graphically". The button needs the `sys:flow:design-graph` permission.

The designer is a full-screen dialog. Enter "Flow Code" and "Flow Name" first; "Category" is optional.

The canvas starts as "Start → Approval → End". Click the "+" between two nodes and choose the node to insert.

### Node types

| Node | What it does | What to set |
| --- | --- | --- |
| Approval Node | Waits for candidates to approve | Node name, candidates and sign mode |
| Condition Branch | Takes one branch based on flow variables | Name and conditions of each branch |
| Parallel Branch | Runs several branches at once and continues after all finish | At least two branches |
| AI node | Runs an AI app and writes the verdict into flow variables | App, timeout, failure handling and variable maps |

An approval node has three sign modes. For candidates, see [Choosing candidates](#candidates).

| Sign mode | Meaning |
| --- | --- |
| Any-sign | The node passes when any one candidate approves |
| All-sign | The node passes only when all candidates approve |
| Majority-sign | The node passes when more than half of the candidates approve |

### Condition branch

A new condition branch comes with two branches: "Branch One" and "Otherwise". Click "+ Branch" to add more.

- A branch can have several conditions; click "+ Condition" to add one.
- A condition has a variable, a comparison and a value; the variable is the name of a flow variable.
- With more than one condition, choose "AND" or "OR" to combine them.
- A branch with "Otherwise (default branch)" ticked needs no condition. The flow takes it when no other branch matches.
- A variable name starts with a letter or underscore and contains only letters, digits and underscores.
- A value cannot contain `|`, `@@` or a line break.

| Comparison | Used for |
| --- | --- |
| Equals / Not equals | Whether two values are the same |
| Greater than / Greater than or equal / Less than / Less than or equal | Comparing sizes |
| Contains / Does not contain | Whether a text includes a fragment |

### AI node

When a flow reaches an AI node, it runs an AI app automatically; this is commonly used for a pre-check.

| Setting | Description |
| --- | --- |
| "AI app" | An enabled workflow or chat flow app in the current tenant. Click "Refresh" if the list looks wrong |
| "Timeout" | 1000 to 300000 ms; the default is 120000 |
| "On failure" | "Reject to previous" or "Stay on this node", or transfer to a role |
| "Input map" | Which flow variables are passed to the app. The map is required but may have no rows |
| "Output map" | Which flow variables the app's outputs are written back to |

- Prompts are maintained in the AI app; here you only choose the app and the variable maps.
- A new app is enabled by default. The dropdown lists at most 100 apps of each type.
- For the meaning of each field and what happens after a failure, see [AI pre-check in Workflow](/en/boot/features/workflow#ai-approval).

### Publish the flow

Click "Publish Flow". The designer checks the flow first and tells you which node to fix:

- The flow code or name is missing.
- There is no node at all.
- An approval node has no candidate.
- A branch of a condition branch has neither a condition nor "Otherwise" ticked.
- A parallel branch has fewer than two branches.
- An AI node has no app selected.

After the checks pass, the flow is published right away and the message "Flow published" appears. The designer keeps no draft: click "Cancel" or close the dialog and what you drew is gone.

### Manage published flows

In the list on the "Flow Designer" page, each version takes one row.

| Action | What it does |
| --- | --- |
| "Disabled" | The flow can no longer start new instances. Click "Enabled" to restore it |
| "Copy as New Version" | Copies the flow as a version one higher, in the "Unpublished" state |
| "Delete" | Deletes this one version. A flow that someone has started cannot be deleted; disable it instead |

- These three actions need the `sys:flow:definition` permission.
- Publishing again with the same code adds a new version, and the previous version becomes "Unpublished".
- The designer always opens with a new flow; it cannot open an existing flow for editing.
- To change a flow, draw it again with the same code and publish.

## AI app orchestration

![The app orchestration canvas with node properties on the right](/screenshots/pc/ai-app-orchestration.png)

Open "AI Center → Apps", click "New app" and enter a name, type and description, then click "Orchestrate" on the app card.

| App type | What the orchestration page shows |
| --- | --- |
| Workflow | A canvas. A new app already has "Start → LLM → End" connected |
| Chat flow | A canvas. A new app already has "Start → LLM → End" connected |
| Text generation | A canvas. A new app already has "Start → Text → End" connected |
| Chat assistant | No canvas, only a form for model parameters, the system prompt, the opening message and preset questions |

### Working on the canvas

- Drag a node from the left onto the canvas.
- Drag from the dot on the right of one node to the dot on the left of another to draw a line with an arrow.
- Click a node to change its name and settings under "Node properties" on the right.
- Select a node or a line and press Backspace to delete it. A node can also be deleted with "Delete node" under "Node properties".
- A flow can have only one "Start" and one "End".
- A node cannot connect to itself, and two nodes can have only one line in the same direction.

### Nodes

| Node | Type | What it does | What "Node properties" lets you set |
| --- | --- | --- | --- |
| Start | `start` | Entry of the flow | Name |
| End | `end` | Exit of the flow; gives the final result | Name |
| Branch | `switch` | Evaluates an expression and decides which node comes next | Expression and expected value |
| For each | `foreach` | Runs the loop body once for each element of an array | See [For each and Parallel nodes](#ai-flow-control) |
| Parallel | `parallel` | Runs several branches at the same time | See [For each and Parallel nodes](#ai-flow-control) |
| LLM | `llm` | Sends the prompt to a large language model | Prompt |
| Knowledge base | `rag` | Searches a knowledge base | Knowledge base ID |
| Question classifier | `question` | Puts the input into a category | Name only |
| Information extraction | `extract` | Extracts fields from text | Prompt |
| Content optimization | `optimize` | Polishes, rewrites, translates or summarizes | Prompt |
| Database | `db` | Runs one read-only query | SQL |
| Code | `code` | Does not run code for now | Name only |
| Text | `text` | Builds a text from a template | Template |
| Update variable | `updateVar` | Changes the value of variables | Name only |
| HTTP | `http` | Requests a URL | URL |
| MCP | `mcp` | Calls an MCP tool | Name only |
| Notification | `notice` | Sends a notification through a message channel | Name only |

- Every node except "Start" and "End" has an "Output variable" that stores the node's result in a variable.
- Prompts and templates refer to variables as <code v-pre>{{name}}</code>.
- The user's input is in the variable `input`, and the previous node's result is in the variable `output`.

### Save, run and share

| Button | What it does | Permission needed |
| --- | --- | --- |
| "Save" | Saves what is on the canvas after the checks pass | `ai:app:design` |
| "Run" | Runs once with a fixed greeting as the input; the result appears below the canvas | `ai:app:run` |
| "Share" | Creates a share link | `ai:app:publish` |
| "Export DSL" | Downloads what is on the canvas as `ai-app-<app id>.json` | None |

Saving checks three things:

- There is exactly one "Start" and one "End".
- Every node is connected. Nodes selected in a loop body or a parallel branch need no lines.
- "For each" and "Parallel" nodes are fully configured.

::: warning Save before you run, and save before you leave
"Run" uses the content saved last; unsaved changes on the canvas are not included. The page does not warn you when you leave, and unsaved changes are lost.
:::

## For each and Parallel nodes {#ai-flow-control}

"For each" and "Parallel" are two control nodes. The nodes they run are chosen under "Node properties", not by lines.

Drag the nodes you need onto the canvas first, then click the control node and select them on the right. The selected nodes need no lines.

### For each

| Setting | Description |
| --- | --- |
| "Input path" | Required. The variable name or dotted path of the array, such as `items` or `data.list` |
| "Item variable" and "Index variable" | The variables that receive the current element and index; the defaults are `item` and `index` |
| "Max iterations" | The most rounds to run, 1 to 100; the default is 20 |
| "Timeout (ms)" | The timeout of the whole node, 1000 to 300000; the default is 120000 |
| "Aggregate" | How the results of the rounds are combined: "Array", "Last" or "None" |
| "On item failure" | Whether to "Continue" or "Abort" after a round fails |
| "Body nodes" | The nodes to run in each round, selected in running order |
| "Output variable" | The variable that receives the combined result; the default is `foreachResults` |

### Parallel

| Setting | Description |
| --- | --- |
| "Parallel branches" | At least two. Click "Add branch" and "Remove branch" to change the number |
| "Branch ID" | The identifier of a branch, unique within the node; the defaults are `b1` and `b2` |
| "Branch label" | The name people see |
| "Branch nodes" | The nodes this branch runs, in order |
| "Output variable" | The variable that receives this branch's result; the default is `branch_<branch ID>` |
| "Max branches" | The most branches allowed, 2 to 16; the default is 8 |
| "Timeout (ms)" | The timeout of the whole node, 1000 to 300000; the default is 120000 |
| "Wait for all" and "On branch failure" | Locked. The flow continues after all branches end, and one failed branch does not affect the others |

### Rules for both nodes

- A loop body or a branch cannot contain another "For each" or "Parallel".
- After you click "Run", "Control node results" appears below the result and lists each round and each branch.
- "Truncated" means the array is longer than "Max iterations" and only the leading elements were processed.
- "Partial success" means a branch of a Parallel node failed.

For field defaults, running rules and error codes, see [Workflow](/en/boot/features/workflow#ai-flow-control).

## Current limits of app orchestration

An app runs from "Start" and follows the lines one node at a time, for at most 200 steps.

- When a node has several outgoing lines, only the first is followed. Only the "Branch" node picks the next node by its result.
- The "Code" node does not run code; it only returns a notice.
- "Information extraction" and "Content optimization" do not read the prompt under "Node properties" when they run.
- Some nodes need fields at run time that "Node properties" does not offer yet; see the table below.

| Node | Fields missing from "Node properties" |
| --- | --- |
| Database | `datasourceId`: the data source ID, required |
| MCP | `mcpToolId`: the MCP tool ID, required |
| Notification | `channelId`: the message channel ID, required |
| Question classifier | `categories`: the list of categories |
| Update variable | `operations`: the changes to make |
| Branch | `case` on downstream nodes: the node that matches the result is chosen |

Write these fields into the DSL directly:

1. Build the flow on the canvas, save it, and click "Export DSL".
2. In the exported file, add the fields to the `data` of the node.
3. Submit the edited content as the `dsl` string to the save endpoint; this needs the `ai:app:design` permission.

```http
POST /system/ai/app/dsl/save?id=<app id>
Content-Type: application/json

{ "dsl": "<the edited DSL as a JSON string>" }
```

The fields are kept when you save on the canvas again.

## Next steps

<div class="ms-cards">

- [Workflow](/en/boot/features/workflow) Start and approve flows, with the full rules for AI pre-check and control nodes.
- [Forms](/en/boot/features/form) Design a form, then bind it to a flow.
- [AI center](/en/pc/ai-center) Configure models and knowledge bases, and manage AI apps.

</div>
