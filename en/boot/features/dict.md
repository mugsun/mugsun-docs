# Dictionaries and parameters

Dictionaries keep fixed options such as statuses and types in one place, and pages fetch them by code. Parameters are key-value settings that can be changed in the admin console at any time, and the backend reads them by key.

![Dictionary page: each dictionary type lists its items with key, sort order and colored tag](/screenshots/features/dict.png)

## What it does

| Page | What it stores | Scope | Table |
| --- | --- | --- | --- |
| Dictionary | Dictionary types and the items under them | Shared by the whole platform | `sys_dict` |
| Business Dictionary | A second set of dictionaries with the same structure | One copy per tenant | `sys_dict_biz` |
| Parameters | Key-value settings | Shared by the whole platform | `sys_param` |

- A dictionary item can have a tag color, and lists in the admin console show the tag in that color.
- Dictionary items are cached by code, and a page can fetch several codes in one request.
- A changed parameter needs no restart, and takes effect on every instance at once in a multi-instance deployment.
- Parameters whose key contains words such as `password` or `secret` never have their value returned by the list or the API.

Seven dictionaries are built in:

| Code | Name |
| --- | --- |
| `user_status` | User status (用户状态) |
| `user_sex` | User gender (用户性别) |
| `login_result` | Login result (登录结果) |
| `notice_category` | Announcement category (通知公告分类) |
| `feedback_status` | Feedback handling status (反馈处理状态) |
| `flow_status` | Process instance status (流程实例状态) |
| `error_log_status` | Error log handling status (错误日志处理状态) |

## Enable it

Dictionaries and parameters start with the backend and need no configuration.

## Use it

### Maintain a dictionary

1. Open System Settings → Dictionary, click Add Dictionary, and fill in Dictionary Code and Dictionary Name; this row is the dictionary type.
2. Click Add Child on that row; the code is already filled in, so enter Dictionary Name and Dictionary Key. The key is stored in business tables, and the name is shown to users.
3. To show a colored tag in lists, pick a Tag Color for the item.

### Use a dictionary in a page

The admin console fetches items by code with `useDict`, and shows a value as a tag with `ArtDictTag`:

```ts
import { useDict } from '@/hooks'
import { DICT_CODE } from '@/utils/constants'
import ArtDictTag from '@/components/core/base/art-dict-tag/index.vue'

const { user_sex: sexOptions } = useDict(DICT_CODE.USER_SEX)
```

```vue
<ElSelect v-model="formData.sex">
  <ElOption
    v-for="opt in sexOptions"
    :key="opt.dictKey"
    :label="opt.dictValue"
    :value="Number(opt.dictKey)"
  />
</ElSelect>

<ArtDictTag :code="DICT_CODE.USER_STATUS" :value="row.status" />
```

A dictionary key arrives as a string, so convert it as shown above when the business field is a number. `ArtDictTag` shows the raw value when no item matches.

Several components using the same code at the same time send only one request. Register a new code in `DICT_CODE` in `src/utils/constants/dict.ts`.

Business dictionaries have no ready-made frontend helper; call `GET /system/dict-biz/dictionary` with the code to fetch the items.

### Use a dictionary in the backend

Inject `DictService` to fetch items by code, or to translate a key into its name:

```java
List<SysDict> items = dictService.listItems("user_status");
String label = dictService.translate("user_status", "1");
```

`translate` returns the value it was given when no key matches.

### Read and write parameters

Open System Settings → Parameters, click Add Parameter, and fill in Parameter Name, Parameter Key and Parameter Value. In the backend, inject `ParamService` and read by key:

```java
String slowMs = paramService.getValue("monitor.access-log.slow-ms");
```

It returns `null` when the parameter does not exist, so the caller decides the default. To write a parameter from code, call `setValue`; an existing key is updated and a missing one is added.

![Parameters page: one parameter per row, and the value of one row is shown as hidden](/screenshots/features/param.png)

When a parameter key contains any of the words below, the list and the API do not return the value, and leaving it blank while editing keeps it unchanged:

```text
password  secret  token  accesskey  apikey  security  auth
```

Keys such as `security.login.fail-max` match as well, so their values are shown as hidden too.

## Notes

- Dictionaries and parameters are shared by the whole platform; only the platform super admin can change them, and other tenants can only read. Each tenant maintains its own business dictionaries.
- The permission codes for saving and deleting are not attached to any menu, so only accounts with the `admin` role (wildcard `*`) can use them.
- A dictionary code, a dictionary key and a parameter key cannot be changed after creation. A dictionary that is sealed or still has children cannot be deleted.
- Dictionary items are cached in the memory of each instance. In a multi-instance deployment, other instances see a change after up to one hour.
- A page that is already open keeps dictionary items in memory, so refresh it to see a dictionary change.

## Verify

Read the value of one parameter:

```bash
curl -s "http://localhost:8080/system/param/value?paramKey=monitor.access-log.slow-ms" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":"1000","msg":"操作成功","dataType":null}
```

Dictionary items can be checked with the statement below; `user_status` returns two rows:

```sql
SELECT dict_key, dict_value, color
FROM sys_dict
WHERE code = 'user_status' AND parent_id <> 0 AND is_deleted = 0
ORDER BY sort;
```

## Next steps

<div class="ms-cards">

- [Import an existing table](/en/boot/codegen/import) Pick a dictionary code for a field and the generated page uses `useDict` by itself.
- [Logs and auditing](./log) The system parameters behind log sampling and retention days.
- [Tenants and plans](/en/boot/tenant/manage#platform-endpoints) Which endpoints are for the platform super admin only, and which settings tenants can only read.
- [Your first cache](/en/boot/tutorial/first-cache) How a local cache differs from a two-level cache.

</div>
