# 单号规则

单号规则按格式生成订单号、合同号这类业务编号，可以按年、月或日重新计数。

## 能干什么

- 格式里用 `[yyyy]`、`[mm]`、`[dd]` 表示年月日，用 `[nnnnn]` 表示序号，`n` 的个数就是序号位数。
- 周期规则可选不重置、按年、按月或按日重置。
- 可以设置初始值，以及每次递增的随机步长上限。
- 按规则和日期记录最后一个序号和生成数量。

内置两条规则：`ORDER`（格式 `DK[yyyy][mm][dd]NO[nnnnn]`，按日重置）和 `CONTRACT`（格式 `HT[yyyy][nnnnnn]`，按年重置）。

## 怎么开

单号规则随后端一起启动。序号默认用 Redis 自增，也可以改为数据库行锁：

```yaml
mugsun:
  serial-number:
    provider: db
```

## 怎么用

1. 打开「系统管理 → 单号规则」，新增规则，填写编码、名称、格式和周期。
2. 业务代码注入 `SerialNumberService`，调用 `generate("ORDER")` 取一个单号。
3. 调用 `generate("ORDER", 10)` 可以一次取多个。

## 注意点

- 一次最多生成 1000 个单号。
- 生成接口 `POST /system/serial-number/generate` 需要 `sys:serial:generate`。

## 看效果

用内置规则生成两个订单号：

```bash
curl -s -X POST "http://localhost:8080/system/serial-number/generate?code=ORDER&count=2" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":["DK20261021NO01001","DK20261021NO01002"],"msg":"已生成 2 个单号。列表里的当前序号会跟着更新","dataType":null}
```

`ORDER` 的初始值是 1000，所以当天第一个号的序号是 01001。

生成记录可以用下面的语句查看，`ORDER` 这一行的 `last_number` 是 1002，`gen_count` 是 2：

```sql
SELECT serial_code, record_date, last_number, gen_count
FROM sys_serial_number_record
WHERE is_deleted = 0
ORDER BY create_time DESC;
```

![单号规则](/screenshots/features/serial-number.png)

上一节：[站内信与公告](./message) · 下一节：[全局搜索](./search)
