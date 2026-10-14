# 表单校验约定

管理台的新建 / 编辑弹窗统一在**前端**先做必填校验：不填就点保存时，字段下方显示红字提示，不发请求。后端的 400 校验仍然保留，作为最后一道防线。

## 规则

| 场景 | 呈现 | 文案 |
| --- | --- | --- |
| 输入框必填 | 字段下方红字，失焦时校验；只填空格也算没填 | 请输入 + 字段名，例如「请输入名称」 |
| 下拉 / 单选必填 | 字段下方红字，选值变化时校验 | 请选择 + 字段名，例如「请选择类型」 |
| 格式校验（编码位数、URL 等） | 字段下方红字，必填通过后才出现 | 说明正确格式 |

- 空提交只提示「必填」，不会先冒出格式提示。例如行政区划编码为空时显示「请输入区划编码」，填了不合规的值才显示「区划编码请填写 2 到 12 位数字」。
- 关掉弹窗再打开，上一次的红字会被清掉。
- 保存失败（如名称重复）时，后端返回的提示在顶部显示一次，弹窗保持打开，方便改完再存；不会再在控制台留下未捕获的错误。
- 涉及多个字段的组合条件（如数据权限要求「表名、部门列、用户列」同时填写）仍用顶部提示。

## 适用页面

- AI 中心：应用、知识库、数据集、模型、提示词、MCP、向量库、数据源、渠道、密钥。
- 系统管理：顶部菜单、接口权限、数据权限、行政区划、帮助文档（目录与文档弹窗），以及原本就用字段内校验的用户、角色、部门、单号规则、通知模板、代码生成等页面。必填提示一律以「请输入」开头。

## 开发新页面

AI 模块可直接复用 `modules/ai/views/shared/formRules.ts`：

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

字段名也要走 i18n（词条放在 `src/locales/langs/zh.json` / `en.json` 的 `aiForm` 下），不要直接传中文，否则英文界面会显示「Please enter 名称」。

保存前先校验，失败直接返回：

```ts
async function save() {
  if (!(await formRef.value?.validate().catch(() => false))) return
  // ...调用保存接口
}
```

只写 `<ElFormItem required>` 而不写 `prop` 时，Element Plus 只画星号、不会校验，这是之前 AI 中心空提交直达后端的原因。
