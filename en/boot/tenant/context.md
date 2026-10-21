# Switch tenants in code

In a request thread, the current tenant comes from the login session and usually needs no handling. Scheduled jobs, startup tasks, cross-tenant reports and other code without a session must set the tenant in code.

## Set a tenant

`TenantContext.execute` switches to the given tenant for a block of code and restores the previous tenant afterwards:

```java
long count = TenantContext.execute("226994",
	() -> userMapper.selectCountByQuery(QueryWrapper.create()));
```

## Ignore the tenant

`TenantContext.ignore` runs a block of code without the tenant condition, for platform-level reads across tenants:

```java
List<SysTenant> all = TenantContext.ignore(
	() -> tenantMapper.selectListByQuery(QueryWrapper.create()));
```

`ignore` is the only way to skip the tenant condition. Do not call MyBatis-Flex `withoutTenantCondition` directly. Ignoring the tenant does not turn off data permissions.

## Async tasks

`@Async` methods run on virtual threads. `AsyncConfig` gives the executor a `TenantTaskDecorator`, which records the current tenant and the log traceId when a task is submitted, restores them on the worker thread, and clears them when the task ends.

Thread pools you create yourself do not carry the tenant. Give them the same decorator when needed:

```java
executor.setTaskDecorator(new TenantTaskDecorator());
```

## Cache

`tenantKeyConvertor` prefixes every JetCache key with the current tenant, so one `@Cached` method keeps a separate cache for each tenant. Without a tenant context, the prefix is `-`.

## See it work

Query the user table directly in a scheduled job, which has no session:

```java
@Scheduled(fixedDelay = 60000)
public void count() {
	userMapper.selectCountByQuery(QueryWrapper.create());
}
```

The log shows a `TenantException` saying the tenant context is missing. Wrap the call in `TenantContext.execute("226994", ...)` and the count matches this query:

```sql
SELECT count(*) FROM sys_user WHERE tenant_id = '226994' AND is_deleted = 0;
```

Wrap it in `TenantContext.ignore(...)` instead and the count matches this query:

```sql
SELECT count(*) FROM sys_user WHERE is_deleted = 0;
```

Previous: [Tenants and plans](./manage)
