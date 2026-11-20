# 表单校验

管理后台的新建和编辑弹窗，都先在浏览器里做必填校验。没填就点保存时，字段下面出现红字提示，不发请求。

后端仍然会再校验一遍，不合规的请求返回 400。

## 规则

| 场景 | 什么时候校验 | 提示文字 |
| --- | --- | --- |
| 输入框必填 | 光标离开输入框时 | 「请输入」加字段名，例如「请输入名称」 |
| 下拉框和单选必填 | 选的值变化时 | 「请选择」加字段名，例如「请选择类型」 |
| 格式不对，例如编码位数或网址 | 必填通过以后 | 说明正确的格式 |

- 提示用红字显示在字段下面。
- 空着提交时只提示必填，不会先出现格式提示。
- 例如区划编码空着时提示「请输入区划编码」，填了不合规的值才提示「区划编码请填写 2 到 12 位数字」。
- 关掉弹窗再打开，上一次的红字会清掉。
- 保存失败时，例如名称重复，后端返回的提示在页面顶部显示一次，弹窗保持打开。
- 要几个字段一起满足的条件，仍然用顶部提示。例如数据权限要求受控表、部门列和本人列同时填写。

## 两种写法

| 写法 | 用在哪 |
| --- | --- |
| `requiredRule` 函数 | AI 中心的十个管理页面，例如应用、知识库和模型 |
| 表单上的 `rules` 对象 | 系统管理的页面，例如用户、角色和行政区划 |

- `requiredRule` 定义在 `modules/ai/views/shared/formRules.ts`。
- `rules` 对象写在各个页面自己的文件里。
- 两种写法的效果一样，新页面任选一种。
- 提示文字都要走 i18n，中文和英文各写一份。

## 用 requiredRule 写 {#required-rule}

<div class="ms-steps">

### 引入函数

```ts
import { requiredRule } from '../shared/formRules'
```

### 给表单项加 prop 和 rules

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

第二个参数传 `true` 表示这是选择类的字段，提示变成「请选择」。

### 保存前先校验

```ts
async function save() {
  if (!(await formRef.value?.validate().catch(() => false))) return
  // 调用保存接口
}
```

### 打开弹窗时清掉旧提示

```ts
dialogVisible.value = true
nextTick(() => formRef.value?.clearValidate())
```

</div>

- 字段名要用 `$t` 取，词条放在 `zh.json` 和 `en.json` 的 `aiForm` 下。
- 直接传中文的话，英文界面会显示成「Please enter 名称」。
- 提示本身的词条是 `formRules.requiredInput` 和 `formRules.requiredSelect`。
- `requiredRule` 把只填了空格的输入也算成没填。

## 用 rules 对象写 {#rules-object}

格式校验要和必填一起写时，用 `rules` 对象。必填规则放在前面，格式规则放在后面。

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

- 这段来自行政区划页。空着时只显示第一条规则的提示。
- `rules` 包在 `computed` 里，切换语言后提示跟着变。
- 要把只填了空格也算成没填，给必填规则加上 `whitespace: true`。

::: warning 只写 required 不会校验
只写 `<ElFormItem required>`、不写 `prop` 时，Element Plus 只画星号，不做校验。空着提交会直接发到后端。
:::

## 下一步

<div class="ms-cards">

- [UI 自检](/pc/ui-check) 自动检查每个弹窗的校验提示有没有被挡住。
- [空状态](/pc/empty-state) 没有数据时页面显示什么。

</div>
