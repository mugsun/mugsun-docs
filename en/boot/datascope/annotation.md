# Enable it on an endpoint

Data permissions apply only inside methods annotated with `@DataScope`, and only to registered controlled tables.

## Annotate the method

Add `@DataScope` to a query method in a controller or service:

```java
@GetMapping("/page")
@SaCheckPermission("demo:note:query")
@DataScope
public R<Page<Note>> page(@RequestParam(defaultValue = "1") long pageNum,
		@RequestParam(defaultValue = "10") long pageSize) {
	return R.data(noteMapper.paginate(pageNum, pageSize, QueryWrapper.create()));
}
```

When the method starts, `DataScopeAspect` reads the data scopes of all the current user's roles. For queries on controlled tables inside the method, the data permission dialect adds the filter while generating SQL. You do not write it by hand.

Data permissions apply to queries only. Before an insert, update or delete, confirm with a `@DataScope` query that the target row is in scope. To read by id, query with `QueryWrapper`; `selectOneById` bypasses data permissions.

## Register a controlled table

The only built-in controlled table is `sys_user`, with `dept_id` as the department column and `id` as the owner column. A business table needs a department column and an owner column, such as `dept_id` and `create_by`, to take part. There are two ways to register it:

- add a rule on the Data Scope page of the console, see [Data permission rules](./rules);
- call `DataScopeTables.register("demo_note", "dept_id", "create_by")` at startup.

A table that is not registered is not filtered, even when it is queried inside a `@DataScope` method.

## Internal queries

`DataScopeContext.without` skips data permissions for a block of code, for internal queries such as totals and checks:

```java
long total = DataScopeContext.without(
	() -> noteMapper.selectCountByQuery(QueryWrapper.create()));
```

## See it work

Suppose `demo_note` has `dept_id` and `create_by` columns and is registered as a controlled table. A user whose data scope is "Own Data Only" calls the page endpoint and gets only the notes they created.

The count matches this query. Replace `1001` with the user's id:

```sql
SELECT count(*)
FROM demo_note
WHERE is_deleted = 0 AND create_by = 1001;
```

With the scope "Own department", the count matches this query. Replace `2001` with the id of the user's department:

```sql
SELECT count(*)
FROM demo_note
WHERE is_deleted = 0 AND dept_id = 2001;
```

The built-in user list endpoint already carries `@DataScope`, so you can also verify with the steps of the previous page.

Previous: [Data permissions](./) · Next: [Data permission rules](./rules)
