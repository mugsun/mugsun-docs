# Your first CRUD

This page builds a notes table with five endpoints: page, detail, create, update and delete. Persistence uses MyBatis-Flex, and the entity extends `BaseEntity` from mugsun-core.

## Create the table

Schema changes go through Flyway. Add a migration under `mugsun-boot-core/src/main/resources/db/migration/` and take the next version number. The example uses `V12`.

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

The last four columns map to fields of `BaseEntity`. Released migrations must not be edited. To support Dameng or openGauss, add a script with the same version in the matching dialect directory.

## Entity and mapper

```java
// note/entity/Note.java
@Table("demo_note")
public class Note extends BaseEntity {

	private String title;
	private String content;

	// getters and setters omitted
}
```

```java
// note/mapper/NoteMapper.java
public interface NoteMapper extends BaseMapper<Note> {
}
```

`BaseEntity` provides a snowflake `id`, create and update times filled by the database with `now()`, and the logical delete field `isDeleted`. The application class already scans `com.mugsun.boot.**.mapper`, so the mapper needs no registration.

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

## Controller

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

`sanitizeForInsert()` and `sanitizeForUpdate()` clear the time fields and the delete flag from the request body. Only the server writes those fields.

Administrators hold every permission code. Other roles must be granted the `demo:note:*` codes first; see [Permissions & attachments](/en/boot/permissions).

## See it work

The endpoints require login. For local debugging, you can turn off the login captcha and SM2 transport in `config/application-local.yml`, then exchange a plain-text password for a token:

```yaml
mugsun:
  captcha:
    enabled: false
  crypto:
    gm-enabled: false
```

::: warning
Use these two settings only for local debugging. Production must keep the defaults.
:::

Restart the backend, then log in and keep the token:

```bash
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"123456"}' | jq -r .data.token)
```

Create a note. The `data` field of the response is the new id:

```bash
curl -s -X POST http://localhost:8080/demo/note \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"第一条笔记","content":"hello"}'
```

```json
{"code":200,"success":true,"data":"112171937707000102","msg":"操作成功","dataType":null}
```

A snowflake id exceeds the JavaScript safe integer range, so it is returned as a string and the frontend keeps full precision. Use it to read, update and page:

```bash
ID=112171937707000102
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
curl -s -X PUT http://localhost:8080/demo/note -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' -d "{\"id\":\"$ID\",\"title\":\"改过的标题\"}"
curl -s "http://localhost:8080/demo/note/page?pageNum=1&pageSize=10" -H "Authorization: $TOKEN"
```

The `data` of the page response contains `records`, `pageNumber`, `pageSize`, `totalPage` and `totalRow`. A request without a token returns code 401.

After a delete, reading the note returns code 400 with a "note not found" message:

```bash
curl -s -X DELETE http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
```

Previous: [Your first API](./first-api) · Next: [Your first cache](./first-cache)
