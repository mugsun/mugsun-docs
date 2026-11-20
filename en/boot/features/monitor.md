# Server monitor and cache

The Server Monitor page shows the backend process's current memory, CPU and request volume, and can export the table structure of the business database. The Cache page browses Redis keys by prefix; you can read a value or clear keys.

![Server Monitor page: five metric cards, with the Database Doc and Refresh buttons at the top right](/screenshots/features/monitor.png)

## What it does

- The Server Monitor page shows the backend process's resource usage and request volume on five cards.
- The metrics come from Spring Boot Actuator and can also be read in the Prometheus format.
- Database Doc exports the structure of every table in the business database as one Markdown file.
- The Cache page groups Redis keys by prefix; you can inspect a single key or clear a whole group.

## Enable it

Both pages start with the backend. Which Actuator endpoints are exposed is set in `application.yml`:

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
```

`health` and `info` need no sign-in and serve as liveness probes in deployment. The other endpoints require sign-in and an account with the `sys:monitor:list` permission.

A role gets this permission when the Server Monitor menu is checked for it.

## Use it

### Read the metrics

Open System Settings → Server Monitor; the page reads the metrics below. Click Refresh to read them again.

| Card | Metric | Description |
| --- | --- | --- |
| JVM Memory | `jvm.memory.used` | Used memory (limit: `jvm.memory.max`) |
| Process CPU | `process.cpu.usage` | CPU usage of the backend process |
| JVM Threads | `jvm.threads.live` | Threads currently alive |
| Uptime | `process.uptime` | Time since the process started |
| HTTP Requests | `http.server.requests` | Requests and total time since startup |

The memory and CPU cards have a progress bar that turns red above 90%. The HTTP Requests card also shows the recent maximum time of a single request.

Metrics that the page does not show can be read straight from the Actuator endpoints:

| Endpoint | Returns |
| --- | --- |
| `/actuator/metrics` | The names of all metrics |
| `/actuator/metrics/{name}` | The value of one metric |
| `/actuator/prometheus` | All metrics in the Prometheus text format |

### Export the database doc

Click Database Doc on the Server Monitor page; the dialog lists every table in the business database. Click Download Markdown to save it as a file.

Each table has its own section with one row per column, giving the type, nullability and comment. Comments come from the `COMMENT` written when the table was created and are empty where none was written.

This button requires the `sys:monitor:db-doc` permission.

### Inspect and clear keys

Open System Settings → Cache. The left side lists the cache groups with the number of keys in each; click a group and the right side lists its keys.

![Cache page: two cache groups on the left, and the three keys of the mugsun:serial group on the right](/screenshots/features/cache.png)

Keys are grouped by their first two segments; for example, `mugsun:serial:ORDER:20261121` belongs to `mugsun:serial`.

- View shows the key's type, remaining seconds and value.
- Clear deletes one key.
- Clear This Group deletes every key in the group.

When the remaining seconds are `-1`, the key never expires. Only keys of the string type can show their value.

## Notes

- Only the platform super admin can call the endpoints behind the Cache page and Database Doc.
- The Cache page lists only keys that start with `mugsun:`. Login sessions start with `Authorization:` and the system parameter cache starts with `param:`, so neither is listed.
- Clearing deletes the Redis key directly and cannot be undone. Check what a key is used for before clearing it.
- Serial number counters are under `mugsun:serial`. Clearing one does not produce duplicate numbers; the next number continues from the last value recorded in the database.
- The database document covers only the tables of the business database; the tables of the tracking database `mugsun_track` are not included.
- When reading metrics, put the token in the `Authorization` header as it is; adding a `Bearer` prefix returns 401.

## Verify

The liveness endpoint needs no sign-in:

```bash
curl -s http://localhost:8080/actuator/health
```

```json
{"status":"UP"}
```

Read one metric:

```bash
curl -s http://localhost:8080/actuator/metrics/jvm.threads.live -H "Authorization: $TOKEN"
```

```json
{"name":"jvm.threads.live","description":"The current number of live threads including both daemon and non-daemon threads","baseUnit":"threads","measurements":[{"statistic":"VALUE","value":63.0}],"availableTags":[]}
```

Without a token the response is 401:

```json
{"code":401,"success":false,"data":null,"msg":"请求未授权","dataType":null}
```

List the cache groups:

```bash
curl -s http://localhost:8080/system/cache/groups -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":[{"name":"mugsun:serial","count":3},{"name":"mugsun:track","count":1548}],"msg":"操作成功","dataType":null}
```

## Next steps

<div class="ms-cards">

- [Logs and auditing](./log) Access logs record how long each request took, and error logs record unhandled exceptions.
- [Serial numbers](./serial-number) The counters under `mugsun:serial` are produced by serial number rules.
- [Security checklist](/en/boot/security-checklist) Before going live, confirm that only `health` and `info` are reachable without signing in.
- [Tenants and plans](/en/boot/tenant/manage#platform-endpoints) Which endpoints are for the platform super admin only.

</div>
