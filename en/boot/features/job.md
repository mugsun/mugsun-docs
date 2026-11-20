# Scheduled tasks

Scheduled tasks are built on PowerJob. The admin console maintains tasks, the PowerJob Server schedules them, and they run inside the backend process.

## What it does

- Create a task on the Scheduled Tasks page: pick a processor, set a CRON expression or manual trigger, and fill in task parameters.
- Enable, disable, run once and delete tasks.
- View recent run instances and their status.
- Register several PowerJob Server addresses on the Job Servers page.

The backend ships with three processors:

- the sample `DemoProcessor`
- the log cleaner `LogCleanProcessor`
- the cache cleaner `CacheEvictProcessor` The tracking module adds its own statistics and maintenance tasks.

## Enable it

The PowerJob Server is not part of the default Docker setup; deploy it yourself. Then set these environment variables on the backend:

```bash
POWERJOB_ENABLED=true
POWERJOB_SERVER=127.0.0.1:7700
POWERJOB_APP_NAME=mugsun
POWERJOB_OPENAPI_PASSWORD=your-app-password
```

| Variable | Meaning |
| --- | --- |
| `POWERJOB_ENABLED` | The backend connects to the PowerJob Server only when this is `true`. Default `false` |
| `POWERJOB_SERVER` | Address of the PowerJob Server, as `host:port` |
| `POWERJOB_APP_NAME` | App name registered on the server. Default `mugsun` |
| `POWERJOB_OPENAPI_PASSWORD` | Password of that app on the server. The backend uses it to manage tasks |

In `application.yml`, `powerjob.worker.enabled` defaults to false. Set it to true for local development when needed.

## Use it

1. Write a processor: implement PowerJob's `BasicProcessor` and register it as a Spring bean.
2. Restart the backend. The processor appears in the dropdown on the Scheduled Tasks page.
3. Create a task, pick the processor and the time expression, save it and enable it.

For simple tasks that run in one process and need no admin console management, use Spring `@Scheduled` instead. See [Your first scheduled job](/en/boot/tutorial/first-job).

## Notes

- Saving a task checks that the processor is registered, so a task cannot point to a class that does not exist.
- The Scheduled Tasks and Job Servers pages are open only to the platform super admin.

## Verify

If the PowerJob Server is not running, the Scheduled Tasks page says the task service cannot be reached. After you start the server and register its address, the list shows normally.

Click Run on a task and a new instance appears in its run history. Status 5 means success, 4 means failure and 3 means running. The instance is also in the PowerJob Server database:

```sql
SELECT instance_id, job_id, status, actual_trigger_time
FROM instance_info
ORDER BY id DESC
LIMIT 5;
```

`instance_id` is the instance number shown in the run history. `actual_trigger_time` is a timestamp in milliseconds.

The table and column names come from PowerJob's `InstanceInfoDO`. Go by the PowerJob version the backend depends on.

If the server sets `oms.table-prefix`, add that prefix to the table name.

## Next steps

<div class="ms-cards">

- [Your first scheduled job](/en/boot/tutorial/first-job) For a simple job that needs no admin console, a `@Scheduled` method is enough.
- [Configuration](/en/boot/configuration) Environment variables and settings the backend reads.

</div>
