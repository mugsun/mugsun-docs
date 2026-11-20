---
title: Editor Markdown 编辑器
demo: pages/demo/media/editor
---

# Editor Markdown 编辑器

`ms-editor` 是 Markdown 源码编辑器，由插入标记的工具栏、源码输入区和 [`ms-markdown`](./markdown) 实时预览三部分组成。

这是可选插件，需要单独安装 `uni_modules/ms-editor`。它依赖 `ms-ui`，预览还要用到 [`ms-markdown`](./markdown) 插件。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-editor v-model="draft" @command="onCommand" @change="onChange" />
  <ms-editor :model-value="draft" read-only :height="120" />
  <!-- 组件样式 -->
  <ms-editor v-model="notes" :show-preview="false" :height="120" />
  <ms-editor v-model="notes" :toolbar="slimToolbar" :height="120" />
  <!-- 组件深度 -->
  <ms-editor
    ref="richEditor"
    v-model="rich"
    :toolbar="richToolbar"
    show-count
    :maxlength="800"
    :height="160"
    placeholder="在此输入 Markdown…"
    @command="onCommand"
    @clear="onClear"
  />
</template>

<script setup lang="uts">
const draft = ref(
  '## 发布说明\n\n本次新增 **图表** 与 *Markdown* 渲染。\n\n- 支持折线与柱状\n- 支持饼图与环形\n',
)

const notes = ref('- 待办一\n- 待办二\n')

const rich = ref('### 深度编辑\n\n可插入图片、任务与表格。\n')

const richToolbar = ref(
  ['bold', 'h3', 'task', 'image', 'table', 'hr', 'clear'] as string[],
)

const slimToolbar = ref(['bold', 'list', 'link'] as string[])

function onCommand(payload: UTSJSONObject) : void {
  console.log('onCommand')
}

function onChange(payload: UTSJSONObject) : void {
  console.log('onChange')
}

function onClear() : void {
  console.log('onClear')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Markdown 源码，用 `v-model` 绑定 |
| height | `number` | `220` | 源码区高度（px） |
| placeholder | `string` | `'输入 Markdown…'` | 占位文案 |
| readOnly | `boolean` | `false` | 是否只读；只读时隐藏工具栏 |
| showPreview | `boolean` | `true` | 是否显示预览 |
| toolbar | `string[]` | `['bold', 'italic', 'strike', 'code', 'h2', 'quote', 'list', 'link']` | 工具栏按钮，可选 bold / italic / strike / code / h2 / h3 / quote / list / task / link / image / table / hr / clear |
| maxlength | `number` | `20000` | 源码最大长度；-1 不限制（仍受平台 textarea 上限约束） |
| showCount | `boolean` | `false` | 是否显示字数统计 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 源码变化时触发，用于 `v-model` |
| command | `payload: UTSJSONObject` | 点击工具栏按钮时触发，`payload.name` 是按钮名 |
| change | `payload: UTSJSONObject` | 源码变化时触发，`payload.length` 是当前字数 |
| clear | — | 内容被清空时触发，来自工具栏的清空按钮或 `clear()` 方法 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `insertText(text: string)` | 在光标位置插入文本 |
| `getValue(): string` | 返回当前源码 |
| `clear()` | 清空内容 |
