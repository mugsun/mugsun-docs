# Your first scheduled job

This section writes a job that counts the notes once a minute.

The application class already enables `@EnableScheduling`. The built-in log cleanup and notification retry jobs are written the same way.

<div class="ms-steps">

### Create the job

```java
// note/NoteStatJob.java
@Component
public class NoteStatJob {

	private static final Logger log = LoggerFactory.getLogger(NoteStatJob.class);

	private final NoteMapper noteMapper;

	public NoteStatJob(NoteMapper noteMapper) {
		this.noteMapper = noteMapper;
	}

	@Scheduled(cron = "0 * * * * *")
	public void run() {
		long total = noteMapper.selectCountByQuery(QueryWrapper.create());
		log.info("Total notes: {}", total);
	}
}
```

The cron expression has six fields: second, minute, hour, day, month and weekday. `0 * * * * *` runs at second 0 of every minute.

### Restart and watch the log

Rebuild and restart the backend. At the next full minute the log prints:

```text
INFO ... com.mugsun.boot.note.NoteStatJob : Total notes: 1
```

After you create or delete a note, the number changes on the next minute.

</div>

## Things to watch when writing a job

- The scheduler pool has 2 threads by default, set by `spring.task.scheduling.pool.size`. Do not block for long inside a job.
- Jobs run on a background thread without a sign-in session.
- To read a table with a tenant column, set the tenant with `TenantContext.execute`, or cross tenants explicitly with `TenantContext.ignore`.
- With several instances, every instance runs the job. A job that must run once needs its own distributed lock.

## Next steps

<div class="ms-cards">

- [Scheduled tasks](/en/boot/features/job) Tasks you maintain, start and stop in the admin console are scheduled by PowerJob.
- [Switch tenants in code](/en/boot/tenant/context) How to use `TenantContext` on a background thread.
- [Features](/en/boot/features/) See what the backend ships with.

</div>
