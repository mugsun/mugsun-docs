# 规则编排

规则编排基于 LiteFlow，把多个步骤写成一条链，按链的定义依次或并行执行。

## 能做什么

- 每个步骤是一个组件，组件之间通过上下文对象传递数据。
- 链用 LiteFlow 的 EL 表达式定义，例如 `THEN(a, b, c)` 表示依次执行。
- 后端自带一条示例链 `tenantInitChain`，依次执行建角色、建部门、建管理员三个组件。

## 启用

规则编排随后端一起启动。

链定义从 `classpath:flow/*.el.xml` 读取。

这个路径由 `application.yml` 里的 `liteflow.rule-source` 指定。

## 使用

1. 写组件：继承 LiteFlow 的 `NodeComponent`，加 `@LiteflowComponent("组件名")`。
2. 在 `src/main/resources/flow/` 下新建 `.el.xml` 文件，定义链：

```xml
<flow>
	<chain name="orderChain">
		THEN(checkStock, createOrder, notifyUser);
	</chain>
</flow>
```

3. 在业务代码里注入 `FlowExecutor`，调用 `execute2Resp("orderChain", 参数, 上下文类)` 执行。

## 注意事项

- 管理后台没有规则编排的页面，链定义随代码一起发布。
- 链执行失败时，`LiteflowResponse.isSuccess()` 返回 false，要检查并处理。

## 验证

调用示例链的接口：

```bash
curl -s -X POST http://localhost:8080/system/rule/tenant-init -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":["初始化默认角色","初始化默认部门","初始化默认管理员"],"msg":"操作成功","dataType":null}
```

`data` 按执行顺序列出了三个组件。示例链只记录步骤，不写数据库，执行前后可以用下面的语句确认角色数没有变化：

```sql
SELECT count(*) FROM sys_role WHERE is_deleted = 0;
```

## 下一步

<div class="ms-cards">

- [工作流](./workflow) 需要人工审批的多级流程，用工作流来做。
- [功能特性](./) 回到功能列表，看看后端还自带了什么。

</div>
