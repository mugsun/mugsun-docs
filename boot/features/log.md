# 日志与审计

后端自带六种日志，登录、写操作和接口访问都自动记录，不用写代码。操作日志带哈希链和签名，记录被删除或篡改时能验出来。

![操作日志页：点「完整性验签」后弹出结果，提示审计链完整和验签条数](/screenshots/features/log-oper-verify.png)

## 能做什么

| 日志 | 记录什么 | 数据表 |
| --- | --- | --- |
| 登录日志 | 每次登录的结果、IP 和登录方式 | `sys_login_log` |
| 操作日志 | 每个写请求的参数、操作人和结果 | `sys_oper_log` |
| 访问日志 | 接口请求的状态码、耗时和链路号 | `sys_api_log` |
| 错误日志 | 没有被处理的异常，带出错位置和堆栈 | `sys_error_log` |
| 通用日志 | 业务代码主动写入的事件 | `sys_usual_log` |
| 变更记录 | 一条数据修改前后的快照和字段差异 | `sys_data_audit` |

- 操作日志逐条签名并串成哈希链，「完整性验签」能指出第一条有问题的记录。
- 请求参数里的密码、令牌和手机号这类字段，写入前替换成 `***`。
- 访问日志和错误日志带同一个链路号，响应头 `X-Trace-Id` 里也有，可以互相对照。
- 访问日志、错误日志和操作日志到期自动清理，保留天数可以改。

## 启用

六种日志随后端一起启动，不需要配置。下面四个系统参数在「系统管理 → 参数管理」里改，保存后不用重启：

| 参数键 | 默认值 | 作用 |
| --- | --- | --- |
| `monitor.access-log.sample-rate` | 100 | GET 请求记入访问日志的百分比，取 0 到 100 |
| `monitor.access-log.slow-ms` | 1000 | 耗时达到这个毫秒数的请求标为慢接口 |
| `monitor.log.retention-days` | 30 | 访问日志和错误日志保留的天数 |
| `monitor.oper-log.retention-days` | 180 | 操作日志保留的天数 |

前三个参数已经在列表里。最后一个要按这个键新增，不新增就用默认值。

采样只对 GET 请求生效，慢接口不受采样影响。文件上传下载、埋点接口和接口文档这几类请求不记访问日志。

保留天数取 1 到 3650，超出范围时按默认值清理。清理在后端启动时执行一次，之后每天一次，过期的记录直接删除。

## 使用

六个页面都在「系统管理」下。

### 给操作起标题

写请求会自动记进操作日志，标题是「自动留痕」。给接口方法加 `@OperationLog` 就改用你写的标题，GET 接口加了也会记：

```java
@OperationLog("导出行政区划")
@GetMapping("/export")
public void export(HttpServletResponse response) {
    // ...
}
```

不想自动记录的路径写进 `mugsun.oper-log.exclude-paths`，见[操作日志排除](/boot/configuration#操作日志排除)。

### 验证操作日志没被改过

打开「系统管理 → 操作日志」，点「完整性验签」。后端按顺序核对每条记录的哈希和签名，全部通过时提示「审计链完整」。

发现问题时提示「检测到篡改」，并给出第一条有问题的记录和原因：

| 原因 | 含义 |
| --- | --- |
| 哈希链断裂（记录被删除或插入） | 这条记录接不上前一条 |
| 记录内容被篡改 | 内容和写入时算出的哈希对不上 |
| 签名无效（记录被伪造） | 哈希对得上，签名验不过 |

### 记录数据改了什么

变更记录由业务代码写入。先给实体里要跟踪的字段加 `@AuditField`，`dict` 填字典编码时，值按字典标签显示：

```java
@AuditField("昵称")
private String nickname;

@AuditField(value = "状态", dict = "user_status")
private Integer status;
```

保存前后各取一份实体，交给 `AuditService`：

```java
auditService.record("sys_user", user.getId().toString(), before, after, operator);
```

`before` 传 `null` 记为新增，`after` 传 `null` 记为删除，两个都传记为修改。

详情里的「字段变更」只列带 `@AuditField` 的字段，「快照对比」显示两份完整快照。快照按传入的对象原样保存，密码这类字段要在调用前清掉。

### 处理错误日志

没有被处理的异常进入「错误日志」，状态是「未处理」，业务报错不会进来。点行尾的编辑按钮，在「认领处理」里选「已处理」或「已忽略」，还可以填写处理备注。

### 写通用日志

前面几种日志都不合适的业务事件，用 `UsualLogService` 写入：

```java
usualLogService.record("warn", "order-sync", "同步订单失败：" + reason, null);
```

前两个参数是级别和业务编号，页面按这两项筛选。级别填 `info`、`debug`、`warn` 或 `error`。

第三个参数是内容，超过 1000 字会截断。最后一个是租户编号，传 `null` 表示当前租户。

### 解锁账号

账号连续登录失败被锁定后，「登录日志」里它的行尾会出现「解锁」，点击并确认后解除锁定。

锁定规则由两个系统参数决定：

- `security.login.fail-max` 是失败多少次后锁定，默认 5。
- `security.login.lock-minutes` 是锁定多少分钟，默认 10。

## 注意事项

- 登录日志和操作日志的权限码没有挂在菜单上，这两个页面只有持 `admin` 角色的账号（通配 `*`）能用。
- 变更记录只有平台超管能看。内置功能里只有编辑用户会写入变更记录。
- 脱敏按字段名匹配，名单里有 `code`。业务字段叫 `code` 时，操作日志里只显示 `***`。
- 更换审计签名密钥后，旧记录验签会失败，见[审计签名密钥对](/boot/crypto-keys#审计签名密钥对)。
- 登录日志、通用日志和变更记录不会自动清理。

## 验证

对最近 100 条操作日志验签：

```bash
curl -s "http://localhost:8080/system/oper-log/verify?limit=100" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":{"valid":true,"verified":100,"message":"审计链完整，共验签 100 条记录"},"msg":"操作成功","dataType":null}
```

不带 `limit` 时核对全部记录。

每条记录的 `prev_hash` 等于上一条的 `record_hash`，可以用下面的语句对照：

```sql
SELECT id, title, request_uri, prev_hash, record_hash
FROM sys_oper_log
ORDER BY id DESC
LIMIT 3;
```

## 下一步

<div class="ms-cards">

- [配置参考](/boot/configuration#审计日志) 未登录请求的日志排队上限，以及操作日志的排除路径。
- [密钥与加密](/boot/crypto-keys) 审计签名密钥对怎样生成，放在哪里。
- [定时任务](./job) 用内置的 `LogCleanProcessor` 立刻清理一次过期日志。
- [报错速查](/guide/errors) 按报错信息查原因和处理办法。

</div>
