# 第一个缓存

这一节给笔记详情加上方法缓存，再用日志确认缓存生效。

mugsun-boot 用 JetCache 做方法缓存，启动类已经开启 `@EnableMethodCache`，在 Service 的方法上加注解就行。

<div class="ms-steps">

### 加注解

修改[上一节](./first-crud)的 `NoteService`，加一个日志对象和三个注解：

```java
private static final Logger log = LoggerFactory.getLogger(NoteService.class);

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

- `@Cached` 缓存方法的返回值。`name` 是缓存名，`key` 用 SpEL 取参数。
- `@CacheInvalidate` 在修改和删除之后清掉对应的键。
- `expire` 是过期时间。不写时，本地缓存默认一小时过期。

### 重启并新建一条笔记

重新构建并启动后端。上一节末尾把笔记删掉了，先新建一条并记下 id：

```bash
ID=$(curl -s -X POST http://localhost:8080/demo/note \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"缓存测试","content":"hello"}' | jq -r .data)
```

### 连续查询三次

```bash
for i in 1 2 3; do
  curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN" > /dev/null
done
```

后端日志里只出现一次 `查询数据库 note id=...`，后两次直接命中缓存。

### 修改后再查询

```bash
curl -s -X PUT http://localhost:8080/demo/note -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' -d "{\"id\":\"$ID\",\"title\":\"再改一次\"}"
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
```

修改会清掉缓存，所以日志里再出现一次 `查询数据库`，返回的是新标题。

</div>

## 缓存键按租户隔离

缓存键会自动带上当前租户的编号，不同租户的数据不会串用。

这由全局配置的 `tenantKeyConvertor` 完成，不用写进 `key`。

## 选缓存类型

| 类型 | 数据放在哪 | 平台里的用法 |
| --- | --- | --- |
| `CacheType.LOCAL` | 当前实例的内存 | 字典、埋点统计的查询 |
| `CacheType.BOTH` | 实例内存和 Redis 各一份 | 系统参数 |

这个教程用 `LOCAL`，方便在本机看效果。

::: warning 部署多个实例时
本地缓存只在当前实例内有效。一个实例上的 `@CacheInvalidate` 清不掉其他实例的缓存。

这种情况要把过期时间设短，或者改用其他方式通知各个实例。
:::

系统参数不受这个限制。`ParamService` 用 `CacheType.BOTH` 加 `syncLocal = true`。

写入或删除参数时，Redis 广播会清掉各个实例的本地缓存，多个实例马上一致。广播用到两项配置：

- `jetcache.remote.default.broadcastChannel` 是广播频道，默认值是 `mugsun`。
- 覆盖 `jetcache.remote.default` 时，要同时保留 `type: redis.lettuce` 和 `broadcastChannel`。

## 下一步

<div class="ms-cards">

- [第一个定时任务](./first-job) 写一个每分钟统计笔记总数的任务。
- [常见问题](/guide/faq) 覆盖缓存配置后启动报错的排查方法。

</div>
