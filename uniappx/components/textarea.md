---
title: Textarea 多行输入
demo: pages/demo/form/textarea
---

# Textarea 多行输入

`ms-textarea` 是多行输入框，用 `v-model` 绑定文本，可以带标签和字数统计，高度可以随内容自动增加。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-textarea v-model="baseValue" placeholder="请输入文字" />
  <ms-textarea v-model="labelValue" label="标签文字" placeholder="请输入文字" />
  <ms-textarea
    v-model="autoValue"
    label="自动增高"
    placeholder="输入多行后高度跟随"
    auto-height
  />
  <!-- 组件状态 -->
  <ms-textarea
    model-value="不可编辑文字"
    label="禁用"
    placeholder="请输入文字"
    disabled
  />
  <!-- 组件样式 -->
  <ms-textarea
    v-model="borderValue"
    label="描边"
    placeholder="请输入文字"
    :maxlength="100"
    indicator
    bordered
  />
  <ms-textarea
    v-model="plainValue"
    label="无边框"
    placeholder="嵌入列表时去掉描边"
    :bordered="false"
    height="sm"
  />
</template>

<script setup lang="uts">
const autoValue = ref('')

const baseValue = ref('')

const borderValue = ref('')

const labelValue = ref('')

const plainValue = ref('')
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| label | `string` | `''` | 标签文案 |
| placeholder | `string` | `''` | 占位文案 |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | 状态：default / success / warning / error |
| tips | `string` | `''` | 输入框下方的提示文字 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度，`-1` 表示不限制 |
| indicator | `boolean` | `false` | 是否显示字数统计 |
| autoHeight | `boolean` | `false` | 高度是否随内容增加 |
| maxHeight | `number` | `0` | `autoHeight` 时的最大高度（px），`0` 表示不限制 |
| height | `'sm' \| 'md' \| 'lg'` | `'md'` | 高度：sm / md / lg；`autoHeight` 时作为最小高度 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 文字对齐 |
| bordered | `boolean` | `true` | 是否显示边框 |
| confirmType | `'return' \| 'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'return'` | 键盘确认键类型 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 输入内容变化时触发，用于 `v-model` |
| input | `value: string` | 输入时触发，`value` 是当前内容 |
| focus | `e: UniTextareaFocusEvent` | 获得焦点时触发 |
| blur | `e: UniTextareaBlurEvent` | 失去焦点时触发 |
| confirm | `value: string` | 点击键盘的确认键时触发，`value` 是当前内容 |
| linechange | `e: UniTextareaLineChangeEvent` | 行数变化时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| label | 自定义标签 |
| tips | 自定义提示文字，默认显示 `tips` |
