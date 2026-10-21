# Workflow

Workflow is built on the Warm-Flow engine and handles multi-level approvals such as leave requests and expense claims.

## What it does

- Draw flows in Flow Designer, with approval nodes, conditional branches, parallel branches and countersigning.
- Publish, suspend, copy to a new version and delete flows in Flow Definitions.
- Users start flows in Approval Center and handle tasks in Todo Workbench.
- A task can be approved, returned, withdrawn, transferred, delegated, given extra or fewer signers, voided or copied to others.
- A flow node can be bound to a [form](./form), with each field set to read-only, writable or hidden on that node.

## How to turn it on

Workflow starts with the backend and needs no extra configuration. Its tables are created by Flyway migrations.

## How to use it

1. The platform super admin opens System Settings → Flow Designer, creates a flow, sets its code, name and the approver role of each node, then saves and publishes it.
2. A user opens Approval Center, picks the flow and starts it.
3. The approver sees the task in Todo Workbench, opens it and handles it.
4. Running Flows lists unfinished instances. Users with `sys:flow:running:terminate` can terminate an instance.

To start a flow from backend code, call `POST /system/flow/start-by/{flowCode}/{businessId}`.

## Notes

- Only the platform super admin can design, publish and manage flow definitions. Starting and handling flows is open to everyone.
- A published flow cannot be edited directly. Copy it to a new version, edit that, and publish it.
- For how to use the designer, see [Designers](/en/pc/designer).

## See it work

After starting a flow, look at its instance and pending tasks:

```sql
SELECT id, flow_status, node_name, create_time FROM flow_instance ORDER BY create_time DESC LIMIT 5;
SELECT id, instance_id, node_name, create_time FROM flow_task ORDER BY create_time DESC LIMIT 5;
```

The tasks an approver sees in Todo Workbench match the rows in `flow_task` one to one.

Previous: [Features](./) · Next: [Forms](./form)
