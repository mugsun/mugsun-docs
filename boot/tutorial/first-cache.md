# 第一个缓存

本节给笔记详情加缓存。

mugsun-boot 用 JetCache 做方法缓存，启动类已开启 `@EnableMethodCache`，在 Service 方法上加注解即可。

## 加注解

修改上一节的 `NoteService`：

```java
@Cached(name = "demo:note:", key = "#id", cacheType = CacheType.LOCAL,
		expire = 10, timeUnit = TimeUnit.MINUTES)
public Note get(Long id) {
	log.info("查询数据库 note id={}", id);
	return noteMapper.selectOneById(id);
}

@CacheInvalidate(name = "demo:note:", key = "#note.id")
public void edit(Note note) {
	noteMapper.update(note);
}

@CacheInvalidate(name = "demo:note:", key = "#id")
public void remove(Long id) {
	noteMapper.deleteById(id);
}
```

`@Cached` 缓存方法返回值，`@CacheInvalidate` 在修改和删除后清掉对应的键。`name` 是缓存名，`key` 用 SpEL 取参数。

缓存键会自动加上当前租户编号，不同租户的数据不会串用。这由全局配置的 `tenantKeyConvertor` 完成，不需要写进 `key`。

## 缓存类型

`CacheType.LOCAL` 是进程内缓存，平台自带的字典、参数和埋点统计也都用这种类型。

::: warning
本地缓存只在当前实例内有效。部署多个实例时，一个实例上的 `@CacheInvalidate` 清不掉其他实例的缓存。

这种情况要把过期时间设短，或改用其他方式通知各实例。
:::

## 看效果

重启后端，连续查询同一条笔记三次：

```bash
for i in 1 2 3; do
  curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN" > /dev/null
done
```

后端日志里只出现一次 `查询数据库 note id=...`，后两次直接命中缓存。

修改这条笔记后再查询，日志里会再出现一次 `查询数据库`，返回的是新标题：

```bash
curl -s -X PUT http://localhost:8080/demo/note -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' -d "{\"id\":\"$ID\",\"title\":\"再改一次\"}"
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
```

上一节：[第一个 CRUD](./first-crud) · 下一节：[第一个定时任务](./first-job)
