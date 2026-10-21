# 在代码里切换租户

请求线程里的当前租户来自登录会话，一般不需要处理。定时任务、启动任务、跨租户统计等没有会话的场景，要在代码里指定租户。

## 指定租户

`TenantContext.execute` 在一段代码里临时切到指定租户，结束后恢复原来的租户：

```java
long count = TenantContext.execute("226994",
	() -> userMapper.selectCountByQuery(QueryWrapper.create()));
```

## 忽略租户

`TenantContext.ignore` 在一段代码里不加租户条件，用于平台级的跨租户读取：

```java
List<SysTenant> all = TenantContext.ignore(
	() -> tenantMapper.selectListByQuery(QueryWrapper.create()));
```

`ignore` 是唯一的忽略入口，不要直接调用 MyBatis-Flex 的 `withoutTenantCondition`。忽略租户不会关闭数据权限。

## 异步任务

`@Async` 方法运行在虚拟线程上。`AsyncConfig` 给执行器设置了 `TenantTaskDecorator`。

提交任务时，装饰器记下当前租户和日志的 traceId，在工作线程里恢复，任务结束后清除。

自己创建的线程池不会自动带上租户。需要时给它设置同一个装饰器：

```java
executor.setTaskDecorator(new TenantTaskDecorator());
```

## 缓存

JetCache 的键由 `tenantKeyConvertor` 统一加上当前租户前缀，同一个 `@Cached` 方法在不同租户下各有一份缓存。

没有租户上下文时前缀为 `-`。

## 看效果

在一个没有会话的定时任务里直接查询用户表：

```java
@Scheduled(fixedDelay = 60000)
public void count() {
	userMapper.selectCountByQuery(QueryWrapper.create());
}
```

日志里出现 `TenantException`，提示缺少租户上下文。

改成用 `TenantContext.execute("226994", ...)` 包起来后，返回的条数与下面这条语句一致：

```sql
SELECT count(*) FROM sys_user WHERE tenant_id = '226994' AND is_deleted = 0;
```

改成用 `TenantContext.ignore(...)` 包起来后，返回的条数与下面这条语句一致：

```sql
SELECT count(*) FROM sys_user WHERE is_deleted = 0;
```

上一节：[租户与套餐](./manage)
