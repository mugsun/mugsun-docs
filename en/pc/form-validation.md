# Form validation conventions

Create / edit dialogs in the admin console check required fields **in the browser** first. Clicking Save with an empty required field shows a red message under that field and sends no request. The backend's 400 validation stays in place as the last line of defence.

## Rules

| Case | Presentation | Message |
| --- | --- | --- |
| Required text input | Red text under the field, checked on blur; whitespace only counts as empty | "请输入" + field name, e.g. 「请输入名称」; in English, "Please enter Name" |
| Required select / radio | Red text under the field, checked on change | "请选择" + field name, e.g. 「请选择类型」; in English, "Please select Type" |
| Format check (code length, URL, …) | Red text under the field, shown only after the required check passes | Describes the expected format |

- An empty submit only says the field is required; it does not show the format hint first. For example, an empty region code shows "Enter the region code"; the "2 to 12 digits" hint appears only for a non-conforming value.
- Closing and reopening a dialog clears the previous red messages.
- When saving fails (for example a duplicate name), the backend message is shown once at the top and the dialog stays open so you can fix and save again. No uncaught error is left in the console.
- Conditions that span several fields (for example data scope requires table, department column and user column together) still use a top message.

## Pages covered

- AI center: apps, knowledge bases, datasets, models, prompts, MCP, vector stores, data sources, channels, secrets.
- System: top menus, API scopes, data scopes, regions, help docs (catalog and document dialogs), plus pages that already validated in-field such as users, roles, departments, serial numbers, notification templates and code generation. Chinese required-field messages all start with 「请输入」.

## Building a new page

The AI module can reuse `modules/ai/views/shared/formRules.ts`:

```ts
import { requiredRule } from '../shared/formRules'
```

```vue
<ElForm ref="formRef" :model="form">
  <ElFormItem :label="$t('aiForm.name')" prop="name" :rules="requiredRule($t('aiForm.name'))">
    <ElInput v-model="form.name" />
  </ElFormItem>
  <ElFormItem :label="$t('aiForm.type')" prop="type" :rules="requiredRule($t('aiForm.type'), true)">
    <ElSelect v-model="form.type" />
  </ElFormItem>
</ElForm>
```

Pass the field name through i18n as well (entries live under `aiForm` in `src/locales/langs/zh.json` / `en.json`). A hard-coded Chinese name would show up in English as "Please enter 名称".

Validate before saving and return on failure:

```ts
async function save() {
  if (!(await formRef.value?.validate().catch(() => false))) return
  // ...call the save API
}
```

`<ElFormItem required>` without a `prop` only draws the asterisk and never validates. That is why empty submits in the AI center used to reach the backend.
