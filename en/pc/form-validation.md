# Form validation

The add and edit dialogs of the admin console check required fields in the browser first. If you save with a field left empty, a red message appears under the field and no request is sent.

The backend still validates again and answers an invalid request with 400.

## Rules

| Case | When it is checked | Message |
| --- | --- | --- |
| Required input box | When the cursor leaves the box | "Please enter" plus the field name, for example "Please enter Name" |
| Required select or radio | When the selected value changes | "Please select" plus the field name, for example "Please select Type" |
| Wrong format, such as the length of a code or a URL | After the required check passes | States the correct format |

- The message appears in red under the field.
- Saving an empty form only shows the required messages. Format messages do not come first.
- For example, an empty region code shows "Enter the region code". Only an invalid value shows "Use 2 to 12 digits for the region code".
- Closing a dialog and opening it again clears the red messages from last time.
- When saving fails, for example because the name already exists, the message from the backend appears once at the top of the page and the dialog stays open.
- A condition that several fields must meet together still uses the message at the top. For example, a data scope rule needs the table, the dept column and the user column filled in together.

## Two ways to write it

| Way | Where it is used |
| --- | --- |
| The `requiredRule` function | Ten management pages in the AI center, such as apps, knowledge bases and models |
| A `rules` object on the form | Pages under system management, such as users, roles and regions |

- `requiredRule` is defined in `modules/ai/views/shared/formRules.ts`.
- A `rules` object lives in the file of its own page.
- Both ways behave the same. Pick either one for a new page.
- Every message goes through i18n, with one entry in Chinese and one in English.

## With requiredRule {#required-rule}

<div class="ms-steps">

### Import the function

```ts
import { requiredRule } from '../shared/formRules'
```

### Add prop and rules to the form item

```vue
<ElForm ref="formRef" :model="form">
  <ElFormItem
    :label="$t('aiForm.name')"
    prop="name"
    :rules="requiredRule($t('aiForm.name'))"
  >
    <ElInput v-model="form.name" />
  </ElFormItem>
  <ElFormItem
    :label="$t('aiForm.type')"
    prop="type"
    :rules="requiredRule($t('aiForm.type'), true)"
  >
    <ElSelect v-model="form.type" />
  </ElFormItem>
</ElForm>
```

Pass `true` as the second argument for a field the user selects. The message then starts with "Please select".

### Validate before saving

```ts
async function save() {
  if (!(await formRef.value?.validate().catch(() => false))) return
  // call the save API
}
```

### Clear old messages when the dialog opens

```ts
dialogVisible.value = true
nextTick(() => formRef.value?.clearValidate())
```

</div>

- Get the field name with `$t`. The entries live under `aiForm` in `zh.json` and `en.json`.
- If you pass a Chinese string directly, the English interface shows "Please enter" followed by the Chinese name.
- The entries for the message itself are `formRules.requiredInput` and `formRules.requiredSelect`.
- `requiredRule` also treats input that contains only spaces as empty.

## With a rules object {#rules-object}

Use a `rules` object when a format check goes together with the required check. Put the required rule first and the format rule after it.

```ts
const rules = computed<FormRules>(() => ({
  code: [
    {
      required: true,
      message: t('pages.system.region.codeRequired'),
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{2,12}$/,
      message: t('pages.system.region.codeRule'),
      trigger: 'blur'
    }
  ]
}))
```

- This snippet comes from the Regions page. When the field is empty, only the message of the first rule shows.
- `rules` is wrapped in `computed`, so the messages follow a language switch.
- To treat input that contains only spaces as empty, add `whitespace: true` to the required rule.

::: warning required alone does not validate
With `<ElFormItem required>` and no `prop`, Element Plus only draws the asterisk and does not validate. An empty form goes straight to the backend.
:::

## Next steps

<div class="ms-cards">

- [UI self-check](/en/pc/ui-check) Checks automatically that no validation message in a dialog is covered.
- [Empty states](/en/pc/empty-state) What a page shows when there is no data.

</div>
