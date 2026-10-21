# 在接口上启用

数据权限只在标了 `@DataScope` 的方法里生效，而且只过滤已登记的受控表。

## 标注方法

在控制器或服务的查询方法上加 `@DataScope`：

```java
@GetMapping("/page")
@SaCheckPermission("demo:note:query")
@DataScope
public R<Page<Note>> page(@RequestParam(defaultValue = "1") long pageNum,
		@RequestParam(defaultValue = "10") long pageSize) {
	return R.data(noteMapper.paginate(pageNum, pageSize, QueryWrapper.create()));
}
```

方法开始时，`DataScopeAspect` 读出当前用户全部角色的数据范围。方法里对受控表的查询，由数据权限方言在生成 SQL 时加上过滤条件，不需要手写。

数据权限只作用于查询。

新增、修改和删除前，要先用带 `@DataScope` 的查询确认目标行在范围内。

按 id 读取时用 `QueryWrapper` 查询，`selectOneById` 不经过数据权限。

## 登记受控表

内置的受控表只有 `sys_user`，部门列是 `dept_id`，本人列是 `id`。

业务表要参与过滤，表里需要有部门列和本人列，例如 `dept_id` 和 `create_by`。登记有两种方式：

- 在管理台的「数据权限」页新增一条规则，见[数据权限规则](./rules)；
- 在启动时调用 `DataScopeTables.register("demo_note", "dept_id", "create_by")`。

没有登记的表，即使在 `@DataScope` 方法里查询，也不会被过滤。

## 内部查询不受限

`DataScopeContext.without` 在一段代码里跳过数据权限，用于统计、校验等内部查询：

```java
long total = DataScopeContext.without(
	() -> noteMapper.selectCountByQuery(QueryWrapper.create()));
```

## 看效果

假设 `demo_note` 加了 `dept_id` 和 `create_by` 两列，并已登记为受控表。

数据范围为「仅本人数据」的用户调用分页接口，只返回自己创建的笔记。

返回的条数与下面的语句相同，把 `1001` 换成这个用户的 id：

```sql
SELECT count(*)
FROM demo_note
WHERE is_deleted = 0 AND create_by = 1001;
```

数据范围为「本部门数据」时，返回的条数与下面的语句相同，把 `2001` 换成用户所在部门的 id：

```sql
SELECT count(*)
FROM demo_note
WHERE is_deleted = 0 AND dept_id = 2001;
```

内置的用户列表接口已经标了 `@DataScope`，可以直接按上一节的方法验证。

上一节：[数据权限](./) · 下一节：[数据权限规则](./rules)
