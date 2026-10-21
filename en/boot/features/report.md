# Reports

Reports build charts from built-in datasets. The console renders them with ECharts; no report engine is involved.

## What it does

- Create reports under Reports. One report can hold several charts.
- Each chart picks a built-in dataset and a chart type.
- Preview a report, which fetches its data live.

There are two built-in datasets: `user_status` (users by status) and `tenant_user` (users per tenant).

## How to turn it on

Reports start with the backend and need no extra configuration.

## How to use it

1. Open System Settings → Reports, click New and enter a report name.
2. Add charts, pick a dataset and a chart type for each, and save.
3. Click Preview in the list.

To add a dataset, add a dataset key and its aggregate SQL in `SysReportController`, and add its display name to `DATASET_LABELS`.

## Notes

- Datasets are an allowlist. A report definition can only reference existing dataset keys and cannot contain arbitrary SQL.
- The Reports page is open only to the platform super admin.

## See it work

Fetch the users-by-status dataset:

```bash
curl -s "http://localhost:8080/system/report/preview-dataset?key=user_status" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":[{"name":"启用","key":"enabled","value":1}],"msg":"操作成功","dataType":null}
```

Each `value` matches the result of this query:

```sql
SELECT status, count(*) FROM sys_user WHERE is_deleted = 0 GROUP BY status;
```

Previous: [Scheduled tasks](./job) · Next: [Object storage](./storage)
