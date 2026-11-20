# Your first cache

This section adds a method cache to the note detail, then uses the log to confirm the cache works.

mugsun-boot uses JetCache for method caching. The application class already enables `@EnableMethodCache`, so annotating a service method is enough.

<div class="ms-steps">

### Add the annotations

Update `NoteService` from the [previous section](./first-crud). Add a logger and three annotations:

```java
private static final Logger log = LoggerFactory.getLogger(NoteService.class);

@Cached(name = "demo:note:", key = "#id", cacheType = CacheType.LOCAL,
		expire = 10, timeUnit = TimeUnit.MINUTES)
public Note get(Long id) {
	log.info("Query database note id={}", id);
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

- `@Cached` caches the return value. `name` is the cache name, and `key` reads the arguments with SpEL.
- `@CacheInvalidate` removes the matching key after an update or delete.
- `expire` is the expiry time. Without it, a local cache entry expires after one hour by default.

### Restart and create a note

Rebuild and restart the backend. The previous section ended by deleting the note, so create a new one and keep its id:

```bash
ID=$(curl -s -X POST http://localhost:8080/demo/note \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"Cache test","content":"hello"}' | jq -r .data)
```

### Read it three times

```bash
for i in 1 2 3; do
  curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN" > /dev/null
done
```

The backend log shows `Query database note id=...` only once. The other two reads hit the cache.

### Update it and read again

```bash
curl -s -X PUT http://localhost:8080/demo/note -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' -d "{\"id\":\"$ID\",\"title\":\"Edited again\"}"
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
```

The update clears the cache, so `Query database` appears once more and the response has the new title.

</div>

## Cache keys are isolated by tenant

Cache keys get the current tenant code as a prefix, so tenants never share entries.

The globally configured `tenantKeyConvertor` does this. You do not add it to `key`.

## Choose a cache type

| Type | Where the data lives | Used in the platform for |
| --- | --- | --- |
| `CacheType.LOCAL` | Memory of the current instance | Dictionaries and analytics queries |
| `CacheType.BOTH` | Instance memory plus a copy in Redis | System parameters |

This tutorial uses `LOCAL` so you can see the effect on your machine.

::: warning With several instances
A local cache only lives in the current instance. `@CacheInvalidate` on one instance does not clear the others.

In that case keep the expiry short, or notify the instances another way.
:::

System parameters do not have this limit. `ParamService` uses `CacheType.BOTH` with `syncLocal = true`.

When a parameter is written or deleted, a Redis broadcast clears the local cache of every instance, so all instances agree right away. The broadcast relies on two settings:

- `jetcache.remote.default.broadcastChannel` is the broadcast channel. The default is `mugsun`.
- If you override `jetcache.remote.default`, keep both `type: redis.lettuce` and `broadcastChannel`.

## Next steps

<div class="ms-cards">

- [Your first scheduled job](./first-job) Write a job that counts the notes once a minute.
- [FAQ](/en/guide/faq) How to debug startup errors after overriding the cache settings.

</div>
