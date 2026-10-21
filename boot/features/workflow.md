# 工作流

工作流基于 Warm-Flow 引擎，用来做请假、报销这类多级审批。

## 能干什么

- 在「流程设计」里画流程，支持审批节点、条件分支、并行分支和会签。
- 在「流程定义」里发布、停用、复制新版本和删除流程。
- 用户在「审批中心」发起流程，在「待办工作台」办理任务。
- 办理时可以通过、退回、撤回、转办、委派、加签、减签、作废和抄送。
- 流程节点可以绑定[表单](./form)，并按节点设置字段只读、可写或隐藏。

## 怎么开

工作流随后端一起启动，不需要额外配置。流程表由 Flyway 迁移创建。

## 怎么用

1. 平台超管打开「系统管理 → 流程设计」，新建流程，设置流程编码、名称和各节点的审批角色，保存后发布。
2. 用户打开「审批中心」，选择这个流程发起。
3. 审批人在「待办工作台」看到任务，打开后办理。
4. 「运行中的流程」列出未结束的实例，持有 `sys:flow:running:terminate` 的用户可以终止实例。

后端代码里发起流程，调用 `POST /system/flow/start-by/{flowCode}/{businessId}`。

## 注意点

- 流程设计、发布和定义管理只有平台超管能操作。发起和办理不受限制。
- 已发布的流程不能直接修改。要改时先复制为新版本，改完再发布。
- 设计器的操作说明见[设计器](/pc/designer)。

## 看效果

发起一个流程后，查看实例和待办任务：

```sql
SELECT id, flow_status, node_name, create_time FROM flow_instance ORDER BY create_time DESC LIMIT 5;
SELECT id, instance_id, node_name, create_time FROM flow_task ORDER BY create_time DESC LIMIT 5;
```

审批人在「待办工作台」看到的任务，与 `flow_task` 里的记录一一对应。

上一节：[功能特性](./) · 下一节：[表单](./form)
