# Your first cache

This page caches the note detail. mugsun-boot uses JetCache for method caching. The application class already enables `@EnableMethodCache`, so annotating a service method is enough.

## Add the annotations

Update `NoteService` from the previous page:

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

`@Cached` caches the return value, and `@CacheInvalidate` removes the matching key after an update or delete. `name` is the cache name, and `key` reads the arguments with SpEL.

Cache keys get the current tenant code as a prefix, so tenants never share entries. The globally configured `tenantKeyConvertor` does this; you do not add it to `key`.

## Cache type

`CacheType.LOCAL` is an in-process cache. The tutorial example uses it so you can see the effect locally.

The built-in dictionary and analytics caches use the same type.

System parameters are not LOCAL: `ParamService` uses `CacheType.BOTH` with `syncLocal=true`.

On write or delete, a Redis broadcast clears each machine's local cache so multi-server deployments stay in sync right away.

That needs `jetcache.remote.default.broadcastChannel` (default `mugsun`).

If you override `jetcache.remote.default`, keep `type: redis.lettuce` at the same level.

Also keep `broadcastChannel`.

::: warning
A local cache only lives in the current instance. With several instances, `@CacheInvalidate` on one instance does not clear the others, so keep the expiry short or notify the instances another way.

System parameter caches already use BOTH + syncLocal, so that limit does not apply to them.
:::

## See it work

Restart the backend and read the same note three times:

```bash
for i in 1 2 3; do
  curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN" > /dev/null
done
```

The database log line from `get` appears only once. The other two reads hit the cache.

Update the note and read it again. The log line appears once more, and the response has the new title:

```bash
curl -s -X PUT http://localhost:8080/demo/note -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' -d "{\"id\":\"$ID\",\"title\":\"再改一次\"}"
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
```

Previous: [Your first CRUD](./first-crud) · Next: [Your first scheduled job](./first-job)
