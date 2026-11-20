# 第一个 CRUD

这一节做一张笔记表，写出增删改查的五个接口。

持久层用 MyBatis-Flex，实体继承 mugsun-core 的 `BaseEntity`。代码放在[上一节](./first-api)的 `note` 包下。

## 写代码

<div class="ms-steps">

### 建表

数据库变更统一走 Flyway，迁移脚本放在 `mugsun-boot-core/src/main/resources/db/migration/`。

版本号取目录里当前最大值加一。写这篇文档时最大是 `V22`，所以示例用 `V23`。

```sql
-- V23__demo_note.sql
CREATE TABLE demo_note (
    id          BIGINT PRIMARY KEY,
    title       VARCHAR(100) NOT NULL,
    content     TEXT,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    is_deleted  INT NOT NULL DEFAULT 0
);
```

`id` 和最后三列对应 `BaseEntity` 的字段。已经发布的迁移脚本不能再修改。

要支持达梦或 openGauss 时，在 `db/migration-dm` 和 `db/migration-og` 里加同号脚本。

### 写实体和 Mapper

```java
// note/entity/Note.java
@Table("demo_note")
public class Note extends BaseEntity {

	private String title;
	private String content;

	// getter / setter 省略
}
```

```java
// note/mapper/NoteMapper.java
public interface NoteMapper extends BaseMapper<Note> {
}
```

`BaseEntity` 提供主键 `id`、两个时间字段和逻辑删除字段 `isDeleted`。创建和更新时间由数据库的 `now()` 填充。

启动类已经扫描 `com.mugsun.boot.**.mapper`，Mapper 不需要再注册。

### 写 Service

```java
// note/NoteService.java
@Service
public class NoteService {

	private final NoteMapper noteMapper;

	public NoteService(NoteMapper noteMapper) {
		this.noteMapper = noteMapper;
	}

	public Page<Note> page(long pageNum, long pageSize, QueryWrapper query) {
		return noteMapper.paginate(pageNum, pageSize, query);
	}

	public Note get(Long id) {
		return noteMapper.selectOneById(id);
	}

	public void add(Note note) {
		noteMapper.insertSelective(note);
	}

	public void edit(Note note) {
		noteMapper.update(note);
	}

	public void remove(Long id) {
		noteMapper.deleteById(id);
	}
}
```

### 写控制器

```java
// note/NoteController.java
@RestController
@RequestMapping("/demo/note")
@SaCheckLogin
public class NoteController {

	private final NoteService noteService;

	public NoteController(NoteService noteService) {
		this.noteService = noteService;
	}

	@GetMapping("/page")
	@SaCheckPermission("demo:note:query")
	public R<Page<Note>> page(@RequestParam(defaultValue = "1") long pageNum,
							  @RequestParam(defaultValue = "10") long pageSize) {
		QueryWrapper query = QueryWrapper.create().orderBy("id", false);
		return R.data(noteService.page(pageNum, Math.min(pageSize, 100), query));
	}

	@GetMapping("/{id}")
	@SaCheckPermission("demo:note:query")
	public R<Note> detail(@PathVariable Long id) {
		Note note = noteService.get(id);
		if (note == null) {
			throw new ServiceException("笔记不存在");
		}
		return R.data(note);
	}

	@PostMapping
	@SaCheckPermission("demo:note:add")
	public R<Long> add(@RequestBody Note note) {
		note.setId(null);
		note.sanitizeForInsert();
		noteService.add(note);
		return R.data(note.getId());
	}

	@PutMapping
	@SaCheckPermission("demo:note:edit")
	public R<Void> edit(@RequestBody Note note) {
		if (note.getId() == null || noteService.get(note.getId()) == null) {
			throw new ServiceException("笔记不存在");
		}
		note.sanitizeForUpdate();
		noteService.edit(note);
		return R.success("已保存");
	}

	@DeleteMapping("/{id}")
	@SaCheckPermission("demo:note:remove")
	public R<Void> remove(@PathVariable Long id) {
		noteService.remove(id);
		return R.success("已删除");
	}
}
```

`sanitizeForInsert()` 和 `sanitizeForUpdate()` 会清掉请求体里的时间和删除标记。这些字段只能由服务端写入。

</div>

## 授权

管理员持有全部权限码，可以直接调用。

其他角色要先被授予 `demo:note:*` 这几个权限码，说明见[权限与附件](/boot/permissions)。

## 调用接口

重新构建并启动后端，命令和取令牌的方法都在[上一节](./first-api)。下面的命令沿用 `$TOKEN`。

新增一条笔记，响应里的 `data` 是新记录的 id：

```bash
curl -s -X POST http://localhost:8080/demo/note \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"第一条笔记","content":"hello"}'
```

```json
{"code":200,"success":true,"data":"112171937707000102","msg":"操作成功","dataType":null}
```

id 超出了 JavaScript 的安全整数范围，响应里以字符串返回，前端不会丢精度。

用这个 id 查询、修改和分页：

```bash
ID=112171937707000102
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
curl -s -X PUT http://localhost:8080/demo/note -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' -d "{\"id\":\"$ID\",\"title\":\"改过的标题\"}"
curl -s "http://localhost:8080/demo/note/page?pageNum=1&pageSize=10" -H "Authorization: $TOKEN"
```

分页响应的 `data` 有五个字段：

- `records`：当前页的记录
- `pageNumber` 和 `pageSize`：页码和每页条数
- `totalPage` 和 `totalRow`：总页数和总条数

删除后再查询，返回「笔记不存在」：

```bash
curl -s -X DELETE http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
```

## 下一步

<div class="ms-cards">

- [第一个缓存](./first-cache) 给笔记详情加上方法缓存。
- [代码生成](/boot/codegen/) 这一节手写的代码，可以从表结构直接生成。

</div>
