# Rule chains

Rule chains are built on LiteFlow. Several steps are written as one chain and run in sequence or in parallel as the chain defines.

## What it does

- Each step is a component, and components pass data through a context object.
- A chain is defined with a LiteFlow EL expression; for example, `THEN(a, b, c)` runs three components in order.
- The backend ships with a sample chain, `tenantInitChain`, which runs three components in order: create role, create department and create admin.

## How to turn it on

Rule chains start with the backend. Chain definitions are read from `classpath:flow/*.el.xml`, as set by `liteflow.rule-source` in `application.yml`.

## How to use it

1. Write a component: extend LiteFlow's `NodeComponent` and add `@LiteflowComponent("componentName")`.
2. Add an `.el.xml` file under `src/main/resources/flow/` and define the chain:

```xml
<flow>
	<chain name="orderChain">
		THEN(checkStock, createOrder, notifyUser);
	</chain>
</flow>
```

3. Inject `FlowExecutor` into your code and run the chain with `execute2Resp("orderChain", param, ContextClass.class)`.

## Notes

- The console has no page for rule chains. Chain definitions are released together with the code.
- When a chain fails, `LiteflowResponse.isSuccess()` returns false. Check it and handle the failure.

## See it work

Call the endpoint of the sample chain:

```bash
curl -s -X POST http://localhost:8080/system/rule/tenant-init -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":["初始化默认角色","初始化默认部门","初始化默认管理员"],"msg":"操作成功","dataType":null}
```

`data` lists the three components in the order they ran. The sample chain only records the steps and writes nothing to the database. You can confirm that the role count is the same before and after:

```sql
SELECT count(*) FROM sys_role WHERE is_deleted = 0;
```

Previous: [Forms](./form) · Next: [Scheduled tasks](./job)
