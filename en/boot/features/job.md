# Scheduled tasks

Scheduled tasks are built on PowerJob. The console maintains tasks, the PowerJob Server schedules them, and they run inside the backend process.

## What it does

- Create a task on the Scheduled Tasks page: pick a processor, set a CRON expression or manual trigger, and fill in task parameters.
- Enable, disable, run once and delete tasks.
- View recent run instances and their status.
- Register several PowerJob Server addresses on the Job Servers page.

The backend ships with three processors:

- the sample `DemoProcessor`
- the log cleaner `LogCleanProcessor`
- the cache cleaner `CacheEvictProcessor` The tracking module adds its own statistics and maintenance tasks.

## How to turn it on

The PowerJob Server is not part of the default Docker setup; deploy it yourself. Then set these environment variables on the backend:

```bash
POWERJOB_ENABLED=true
POWERJOB_SERVER=127.0.0.1:7700
POWERJOB_APP_NAME=mugsun
POWERJOB_OPENAPI_PASSWORD=your-app-password
```

In `application.yml`, `powerjob.worker.enabled` defaults to false. Set it to true for local development when needed.

## How to use it

1. Write a processor: implement PowerJob's `BasicProcessor` and register it as a Spring bean.
2. Restart the backend. The processor appears in the dropdown on the Scheduled Tasks page.
3. Create a task, pick the processor and the time expression, save it and enable it.

For simple tasks that run in one process and need no console management, use Spring `@Scheduled` instead. See [Your first scheduled job](/en/boot/tutorial/first-job).

## Notes

- Saving a task checks that the processor is registered, so a task cannot point to a class that does not exist.
- The Scheduled Tasks and Job Servers pages are open only to the platform super admin.

## See it work

If the PowerJob Server is not running, the Scheduled Tasks page says the task service cannot be reached. After you start the server and register its address, the list shows normally.

Click Run on a task and a new instance appears in its run history. Status 5 means success, 4 means failure and 3 means running. The instance is also in the PowerJob Server database:

```sql
SELECT id, job_id, status, actual_trigger_time FROM instance_info ORDER BY id DESC LIMIT 5;
```

Previous: [Rule chains](./rule) · Next: [Reports](./report)
