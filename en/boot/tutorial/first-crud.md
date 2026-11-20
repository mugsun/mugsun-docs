# Your first CRUD

This section builds a notes table with the five create, read, update and delete endpoints.

Persistence uses MyBatis-Flex, and the entity extends `BaseEntity` from mugsun-core. The code goes in the `note` package from the [previous section](./first-api).

## Write the code

<div class="ms-steps">

### Create the table

Schema changes go through Flyway. Migration scripts live in `mugsun-boot-core/src/main/resources/db/migration/`.

Take the highest version and add one; Java migrations count too. At the time of writing the highest is the Java migration `V17`, so the example uses `V18`.

```sql
-- V18__demo_note.sql
CREATE TABLE demo_note (
    id          BIGINT PRIMARY KEY,
    title       VARCHAR(100) NOT NULL,
    content     TEXT,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    is_deleted  INT NOT NULL DEFAULT 0
);
```

`id` and the last three columns map to fields of `BaseEntity`. Released migration scripts must not be edited.

To support Dameng or openGauss, add a script with the same version under `db/migration-dm` and `db/migration-og`.

### Write the entity and mapper

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

`BaseEntity` provides the primary key `id`, two time fields and the logical delete field `isDeleted`. The database fills the create and update times with `now()`.

The application class already scans `com.mugsun.boot.**.mapper`, so the mapper needs no registration.

### Write the service

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

### Write the controller

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
			throw new ServiceException("Note not found");
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
			throw new ServiceException("Note not found");
		}
		note.sanitizeForUpdate();
		noteService.edit(note);
		return R.success("Saved");
	}

	@DeleteMapping("/{id}")
	@SaCheckPermission("demo:note:remove")
	public R<Void> remove(@PathVariable Long id) {
		noteService.remove(id);
		return R.success("Deleted");
	}
}
```

`sanitizeForInsert()` and `sanitizeForUpdate()` clear the time fields and the delete flag from the request body. Only the server writes those fields.

</div>

## Grant access

Administrators hold every permission code and can call the endpoints right away.

Other roles must be granted the `demo:note:*` codes first; see [Permissions & attachments](/en/boot/permissions).

## Call the endpoints

Rebuild and restart the backend. The commands and the way to get a token are in the [previous section](./first-api). The commands below reuse `$TOKEN`.

Create a note. The `data` field of the response is the new id:

```bash
curl -s -X POST http://localhost:8080/demo/note \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"My first note","content":"hello"}'
```

```json
{"code":200,"success":true,"data":"112171937707000102","msg":"操作成功","dataType":null}
```

The id exceeds the JavaScript safe integer range, so it is returned as a string and the frontend keeps full precision.

Use the id to read, update and page:

```bash
ID=112171937707000102
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
curl -s -X PUT http://localhost:8080/demo/note -H "Authorization: $TOKEN" \
  -H 'Content-Type: application/json' -d "{\"id\":\"$ID\",\"title\":\"Edited title\"}"
curl -s "http://localhost:8080/demo/note/page?pageNum=1&pageSize=10" -H "Authorization: $TOKEN"
```

The `data` of the page response has five fields:

- `records`: the records on the current page
- `pageNumber` and `pageSize`: the page number and the page size
- `totalPage` and `totalRow`: the total pages and the total records

After a delete, reading the note returns "Note not found":

```bash
curl -s -X DELETE http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
curl -s http://localhost:8080/demo/note/$ID -H "Authorization: $TOKEN"
```

## Next steps

<div class="ms-cards">

- [Your first cache](./first-cache) Add a method cache to the note detail.
- [Code generation](/en/boot/codegen/) The code written by hand here can be generated from a table.

</div>
