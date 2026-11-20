# 字典与参数

字典把状态、类型这类固定选项集中维护，页面按编码取用。参数是可以在管理后台随时修改的键值配置，后端按键读取。

![字典管理页：字典类型下面列出字典项，每项有键值、排序和带颜色的标签](/screenshots/features/dict.png)

## 能做什么

| 页面 | 存什么 | 范围 | 数据表 |
| --- | --- | --- | --- |
| 字典管理 | 字典类型和下面的字典项 | 全平台共用 | `sys_dict` |
| 业务字典 | 结构相同的另一套字典 | 每个租户各一份 | `sys_dict_biz` |
| 参数管理 | 键值配置 | 全平台共用 | `sys_param` |

- 字典项可以选标签颜色，管理后台的列表按这个颜色显示标签。
- 字典项按编码缓存，页面一次请求可以取多个编码。
- 参数改完不用重启，多实例部署时各实例同时生效。
- 键里带 `password`、`secret` 这类词的参数，列表和接口都不返回原值。

内置七个字典：

| 编码 | 名称 |
| --- | --- |
| `user_status` | 用户状态 |
| `user_sex` | 用户性别 |
| `login_result` | 登录结果 |
| `notice_category` | 通知公告分类 |
| `feedback_status` | 反馈处理状态 |
| `flow_status` | 流程实例状态 |
| `error_log_status` | 错误日志处理状态 |

## 启用

字典和参数随后端一起启动，不需要配置。

## 使用

### 维护字典

1. 打开「系统管理 → 字典管理」，点「新增字典」，填写字典编码和字典名称，这一行是字典类型。
2. 在这一行点「新增下级」，编码已经填好，再填字典名称和字典键值。键值存进业务表，名称显示给用户。
3. 想让列表显示成彩色标签，就给字典项选「标签颜色」。

### 在页面里用字典

管理后台用 `useDict` 按编码取字典项，用 `ArtDictTag` 把值显示成标签：

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

字典键值取回来是字符串，业务字段是数字时要像上面那样转一次。`ArtDictTag` 找不到对应的字典项时显示原值。

多个组件同时用同一个编码时只发一次请求。新增的编码登记到 `src/utils/constants/dict.ts` 的 `DICT_CODE` 里。

业务字典没有现成的前端用法，按编码调用 `GET /system/dict-biz/dictionary` 取字典项。

### 在后端用字典

注入 `DictService`，按编码取字典项，或者把键值翻译成名称：

```java
List<SysDict> items = dictService.listItems("user_status");
String label = dictService.translate("user_status", "1");
```

`translate` 找不到键值时原样返回传入的值。

### 读写参数

打开「系统管理 → 参数管理」，点「新增参数」，填写参数名称、参数键和参数值。后端注入 `ParamService` 按键读取：

```java
String slowMs = paramService.getValue("monitor.access-log.slow-ms");
```

参数不存在时返回 `null`，默认值由调用方决定。代码里要写参数时调用 `setValue`，已有的键更新，没有的键新增。

![参数管理页：每个参数一行，其中一行的参数值显示为已隐藏](/screenshots/features/param.png)

参数键里含下面任何一个词，列表和接口就不返回原值，编辑时留空表示不改：

```text
password  secret  token  accesskey  apikey  security  auth
```

`security.login.fail-max` 这类键也在其中，值同样显示「已隐藏」。

## 注意事项

- 字典和参数全平台共用，只有平台超管能改，其他租户只能读。业务字典由各租户自己维护。
- 保存和删除用的权限码没有挂在菜单上，只有持 `admin` 角色的账号（通配 `*`）能用。
- 字典编码、字典键值和参数键创建后不能修改。已封存或还有下级的字典不能删除。
- 字典项缓存在每个实例的内存里。多实例部署时，其他实例最长一小时后才看到改动。
- 已打开的页面把字典项留在内存里，字典改动后要刷新页面才更新。

## 验证

读取一个参数的值：

```bash
curl -s "http://localhost:8080/system/param/value?paramKey=monitor.access-log.slow-ms" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":"1000","msg":"操作成功","dataType":null}
```

字典项可以用下面的语句查看，`user_status` 有「正常」和「停用」两项：

```sql
SELECT dict_key, dict_value, color
FROM sys_dict
WHERE code = 'user_status' AND parent_id <> 0 AND is_deleted = 0
ORDER BY sort;
```

## 下一步

<div class="ms-cards">

- [导入已有表](/boot/codegen/import) 给字段选了字典码，生成的页面会自动用上 `useDict`。
- [日志与审计](./log) 日志采样和保留天数用到的几个系统参数。
- [租户与套餐](/boot/tenant/manage#平台级接口) 哪些接口只给平台超管，哪些配置租户只能读。
- [第一个缓存](/boot/tutorial/first-cache) 本地缓存和两级缓存有什么区别。

</div>
