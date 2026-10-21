# Serial numbers

Serial number rules generate business numbers such as order and contract numbers from a format, and can restart counting each year, month or day.

## What it does

- In the format, `[yyyy]`, `[mm]` and `[dd]` stand for year, month and day, and `[nnnnn]` for the sequence; the number of `n` sets its width.
- The reset period can be never, yearly, monthly or daily.
- You can set an initial value and an upper limit for a random step.
- The last sequence and the count generated are recorded per rule and date.

Two rules are built in: `ORDER` (format `DK[yyyy][mm][dd]NO[nnnnn]`, reset daily) and `CONTRACT` (format `HT[yyyy][nnnnnn]`, reset yearly).

## How to turn it on

Serial numbers start with the backend. Sequences use a Redis counter by default; you can switch to database row locks:

```yaml
mugsun:
  serial-number:
    provider: db
```

## How to use it

1. Open System Settings → Serial Numbers and add a rule with its code, name, format and reset period.
2. Inject `SerialNumberService` and call `generate("ORDER")` for one number.
3. Call `generate("ORDER", 10)` to get several at once.

## Notes

- At most 1000 numbers can be generated in one call.
- The endpoint `POST /system/serial-number/generate` needs `sys:serial:generate`.

## See it work

Generate two order numbers from the built-in rule:

```bash
curl -s -X POST "http://localhost:8080/system/serial-number/generate?code=ORDER&count=2" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":["DK20261021NO01001","DK20261021NO01002"],"msg":"已生成 2 个单号。列表里的当前序号会跟着更新","dataType":null}
```

The initial value of `ORDER` is 1000, so the first number of the day has sequence 01001. Check the records with this query; the `ORDER` row has `last_number` 1002 and `gen_count` 2:

```sql
SELECT serial_code, record_date, last_number, gen_count
FROM sys_serial_number_record
WHERE is_deleted = 0
ORDER BY create_time DESC;
```

![Serial numbers](/screenshots/features/serial-number.png)

Previous: [Messages and announcements](./message) · Next: [Global search](./search)
