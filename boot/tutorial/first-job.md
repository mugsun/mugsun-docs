# 第一个定时任务

这一节写一个任务，每分钟统计一次笔记总数。

启动类已经开启 `@EnableScheduling`。平台自带的日志清理和通知重试任务也是这样写的。

<div class="ms-steps">

### 新建任务

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

cron 有六位，依次是秒、分、时、日、月、周。`0 * * * * *` 表示每分钟的第 0 秒执行。

### 重启后看日志

重新构建并启动后端。等到下一个整分钟，日志里会出现：

```text
INFO ... com.mugsun.boot.note.NoteStatJob : 笔记总数：1
```

新增或删除笔记后，下一分钟的数字会跟着变。

</div>

## 写任务时要注意

- 调度线程池默认只有 2 个线程，由 `spring.task.scheduling.pool.size` 控制。任务里不要做长时间阻塞的操作。
- 任务在后台线程里执行，没有登录会话。
- 访问带租户字段的表时，用 `TenantContext.execute` 指定租户，或用 `TenantContext.ignore` 显式跨租户。
- 部署多个实例时，每个实例都会执行一次。只能执行一次的任务要自己加分布式锁。

## 下一步

<div class="ms-cards">

- [定时任务](/boot/features/job) 要在管理后台里维护和启停的任务，用 PowerJob 来调度。
- [在代码里切换租户](/boot/tenant/context) `TenantContext` 在后台线程里的用法。
- [功能特性](/boot/features/) 看看后端自带了哪些功能。

</div>
