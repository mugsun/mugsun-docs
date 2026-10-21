# Your first scheduled job

This page adds a job that counts the notes once a minute. The application class already enables `@EnableScheduling`, and built-in jobs such as log cleanup and notification retry work the same way.

## Create the job

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
		log.info("笔记总数：{}", total);
	}
}
```

The cron expression has six fields: second, minute, hour, day, month and weekday. `0 * * * * *` runs at second 0 of every minute.

## Notes

- The scheduler pool has 2 threads by default, set by `spring.task.scheduling.pool.size`. Do not block for long inside a job.
- Jobs run on a background thread without a login session. To read a table with a tenant column, set the tenant with `TenantContext.execute`, or cross tenants explicitly with `TenantContext.ignore`.
- With several instances, every instance runs the job. A job that must run once needs its own distributed lock.

## See it work

Restart the backend and wait for the next full minute. The log prints the note count:

```text
INFO ... com.mugsun.boot.note.NoteStatJob : 笔记总数：1
```

After you create or delete a note, the number changes on the next minute.

Previous: [Your first cache](./first-cache)
