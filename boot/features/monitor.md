# 服务监控与缓存管理

服务监控页显示后端进程当前的内存、CPU 和请求量，还能导出业务库的表结构。缓存管理页按前缀查看 Redis 里的键，可以看值，也可以清除。

![服务监控页：五张指标卡片，右上角是数据库文档和刷新两个按钮](/screenshots/features/monitor.png)

## 能做什么

- 服务监控页用五张卡片显示后端进程的资源占用和请求量。
- 指标来自 Spring Boot Actuator，也能按 Prometheus 的格式读取。
- 「数据库文档」把业务库每张表的结构导出成一份 Markdown。
- 缓存管理页把 Redis 键按前缀分组，可以查看单个键，也可以整组清空。

## 启用

两个页面随后端一起启动。Actuator 开放哪些端点，写在 `application.yml` 里：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
```

`health` 和 `info` 不用登录，部署时用来探活。其余端点要求登录，并且账号有 `sys:monitor:list` 权限。

给角色勾选「服务监控」菜单，就有这个权限。

## 使用

### 查看指标

打开「系统管理 → 服务监控」，页面读取下面的指标。点「刷新」重新读取。

| 卡片 | 指标 | 说明 |
| --- | --- | --- |
| JVM 内存 | `jvm.memory.used` | 已用内存，上限取 `jvm.memory.max` |
| 进程 CPU | `process.cpu.usage` | 后端进程的 CPU 占用 |
| JVM 线程 | `jvm.threads.live` | 当前存活的线程数 |
| 运行时长 | `process.uptime` | 进程启动到现在的时间 |
| HTTP 请求 | `http.server.requests` | 启动以来的请求数和累计耗时 |

内存和 CPU 两张卡片带进度条，超过 90% 时变红。HTTP 请求卡片下面还有近期单次请求的最大耗时。

页面没有显示的指标，可以直接读 Actuator 的接口：

| 接口 | 返回什么 |
| --- | --- |
| `/actuator/metrics` | 全部指标名 |
| `/actuator/metrics/{指标名}` | 一个指标的值 |
| `/actuator/prometheus` | Prometheus 文本格式的全部指标 |

### 导出数据库文档

在服务监控页点「数据库文档」，弹窗里列出业务库的每一张表。点「下载 markdown」保存成文件。

每张表一节，每列一行，带类型、是否可空和注释。注释取自建表时写的 `COMMENT`，没写的留空。

这个按钮要求 `sys:monitor:db-doc` 权限。

### 查看和清除缓存

打开「系统管理 → 缓存管理」。左边是缓存分组和每组的键数，点一组，右边列出这一组的键。

![缓存管理页：左边是两个缓存分组，右边是 mugsun:serial 分组下的三个键](/screenshots/features/cache.png)

键按前两段分组，比如 `mugsun:serial:ORDER:20261121` 归在 `mugsun:serial` 下。

- 「查看」显示键的类型、剩余秒数和值。
- 「清除」删除一个键。
- 「清空该组」删除这一组的全部键。

剩余秒数是 `-1` 时，这个键不会过期。只有字符串类型的键能显示值。

## 注意事项

- 缓存管理和数据库文档的接口只有平台超管能访问。
- 缓存管理只列出 `mugsun:` 开头的键。登录会话以 `Authorization:` 开头，系统参数的缓存以 `param:` 开头，都不在列表里。
- 清除就是直接删掉 Redis 键，不能恢复。清除前先确认这个键的用途。
- 单号计数器在 `mugsun:serial` 下。清掉后不会重号，下次生成时从数据库记的末值接着算。
- 数据库文档只包含业务库的表，埋点库 `mugsun_track` 的表不在其中。
- 读取指标时，令牌要原样放在 `Authorization` 请求头里，加 `Bearer` 前缀会返回 401。

## 验证

探活端点不用登录：

```bash
curl -s http://localhost:8080/actuator/health
```

```json
{"status":"UP"}
```

读取一个指标：

```bash
curl -s http://localhost:8080/actuator/metrics/jvm.threads.live -H "Authorization: $TOKEN"
```

```json
{"name":"jvm.threads.live","description":"The current number of live threads including both daemon and non-daemon threads","baseUnit":"threads","measurements":[{"statistic":"VALUE","value":63.0}],"availableTags":[]}
```

不带令牌时返回 401：

```json
{"code":401,"success":false,"data":null,"msg":"请求未授权","dataType":null}
```

列出缓存分组：

```bash
curl -s http://localhost:8080/system/cache/groups -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":[{"name":"mugsun:serial","count":3},{"name":"mugsun:track","count":1548}],"msg":"操作成功","dataType":null}
```

## 下一步

<div class="ms-cards">

- [日志与审计](./log) 访问日志记录每个请求的耗时，错误日志记录没有被处理的异常。
- [单号规则](./serial-number) `mugsun:serial` 下的计数器由单号规则生成。
- [安全清单（上线前）](/boot/security-checklist) 上线前确认未登录时只能访问 `health` 和 `info`。
- [租户与套餐](/boot/tenant/manage#平台级接口) 哪些接口只给平台超管。

</div>
