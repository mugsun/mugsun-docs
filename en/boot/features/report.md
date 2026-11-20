# Reports

Reports build charts from built-in datasets. The admin console renders them with ECharts; no report engine is involved.

![Report preview dialog: a pie chart of users by status and a bar chart of users per tenant](/screenshots/features/report.png)

## What it does

- Create reports under Reports. One report can hold several charts.
- Each chart picks a built-in dataset and a chart type.
- Preview a report, which fetches its data live.

There are two built-in datasets: `user_status` (users by status) and `tenant_user` (users per tenant).

## Enable it

Reports start with the backend and need no extra configuration.

## Use it

1. Open System Settings → Reports, click New and enter a report name.
2. Add charts, pick a dataset and a chart type for each, and save.
3. Click Preview in the list.

To add a dataset, add a dataset key and its aggregate SQL in `SysReportController`, and add its display name to `DATASET_LABELS`.

## Notes

- Datasets are an allowlist. A report definition can only reference existing dataset keys and cannot contain arbitrary SQL.
- The Reports page is open only to the platform super admin.

## Verify

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

## Next steps

<div class="ms-cards">

- [Permissions & attachments](/en/boot/permissions) How endpoint permissions are checked, and who the platform super admin is.
- [Features](./) Back to the list of built-in features.

</div>
