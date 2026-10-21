# 第一个 CRUD

本节做一张笔记表，提供分页、详情、新增、修改、删除五个接口。持久层用 MyBatis-Flex，实体继承 mugsun-core 的 `BaseEntity`。

## 建表

数据库变更统一走 Flyway。

迁移放在 `mugsun-boot-core/src/main/resources/db/migration/`。版本号取当前最大值加一，示例是 `V12`。

```sql
-- V12__demo_note.sql
CREATE TABLE demo_note (
    id          BIGINT PRIMARY KEY,
    title       VARCHAR(100) NOT NULL,
    content     TEXT,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    is_deleted  INT NOT NULL DEFAULT 0
);
```

后四列对应 `BaseEntity` 的字段。已发布的迁移不能修改；要支持达梦或 openGauss 时，在对应方言目录里加同号脚本。

## 实体和 Mapper

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

`BaseEntity` 提供雪花主键 `id`、创建和更新时间（由数据库 `now()` 填充），以及逻辑删除字段 `isDeleted`。

启动类已扫描 `com.mugsun.boot.**.mapper`，Mapper 不需要再注册。

## Service

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

## 控制器

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

`sanitizeForInsert()` 和 `sanitizeForUpdate()` 会清掉请求体里的时间和删除标记，这些字段只能由服务端写入。

管理员持有全部权限码。其他角色要先被授予 `demo:note:*` 这几个权限码，说明见[权限与附件](/boot/permissions)。

## 看效果

接口需要登录。本地调试时，可以在 `config/application-local.yml` 里关掉登录验证码和国密传输，用明文密码换取令牌：

```yaml
mugsun:
  captcha:
    enabled: false
  crypto:
    gm-enabled: false
```

::: warning
这两项只用于本地调试，生产环境必须保持默认值。
:::

重启后端，然后登录并保存令牌：

```bash
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"123456"}' | jq -r .data.token)
```

新增一条笔记，响应里的 `data` 是新记录的 id：

```bash
curl -s -X POST http://localhost:8080/demo/note \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"第一条笔记","content":"hello"}'
```

```json
{"code":200,"success":true,"data":"112171937707000102","msg":"操作成功","dataType":null}
```

雪花 id 超出 JavaScript 的安全整数范围，响应里以字符串返回，前端不会丢精度。用这个 id 查询、修改和分页：

```bash
ID=112171937707000102
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
curl -s -X PUT http://localhost:8080/demo/note -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' -d "{\"id\":\"$ID\",\"title\":\"改过的标题\"}"
curl -s "http://localhost:8080/demo/note/page?pageNum=1&pageSize=10" -H "Authorization: $TOKEN"
```

分页响应的 `data` 包含 `records`、`pageNumber`、`pageSize`、`totalPage` 和 `totalRow`。

不带令牌访问时返回 `{"code":401,...,"msg":"请求未授权"}`。

删除后再查询，返回「笔记不存在」：

```bash
curl -s -X DELETE http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
```

上一节：[第一个接口](./first-api) · 下一节：[第一个缓存](./first-cache)
