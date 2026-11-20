---
title: Input 输入
demo: pages/demo/form/input
---

# Input 输入

`ms-input` 是单行输入框，用 `v-model` 绑定文本，可以带标签、前后缀图标和清空按钮。

`status` 显示校验状态，`tips` 是输入框下方的提示文字，`type="password"` 用于输入密码。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 基础 -->
  <ms-input v-model="baseValue" label="标签文字" placeholder="请输入文字" />
  <!-- 前置图标 -->
  <ms-input v-model="searchValue" label="搜索" placeholder="请输入关键字" prefix-icon="search" />
  <!-- 可清空 -->
  <ms-input v-model="clearValue" label="可清空" placeholder="输入后点右侧清空" clearable />
  <!-- 状态 -->
  <ms-input model-value="禁用文案" label="禁用" placeholder="不可编辑" disabled />
  <ms-input
    v-model="errorValue"
    label="错误"
    placeholder="请输入"
    status="error"
    tips="错误提示"
    clearable
  />
</template>

<script setup lang="uts">
const baseValue = ref('')

const clearValue = ref('可清空')

const errorValue = ref('')

const searchValue = ref('')
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| label | `string` | `''` | 标签文案 |
| placeholder | `string` | `''` | 占位文案 |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | 输入类型：text 文本 / number 整数 / digit 带小数点的数字 / password 密码 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 输入区对齐：left / center / right |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | 状态：default / success / warning / error |
| tips | `string` | `''` | 输入框下方的提示文字 |
| prefixIcon | `string` | `''` | 前缀图标名 |
| suffixIcon | `string` | `''` | 后缀图标名 |
| clearable | `boolean` | `false` | 是否显示清空按钮 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度，`-1` 表示不限制 |
| showCount | `boolean` | `false` | 是否显示字数统计，需要同时设置 `maxlength` |
| bordered | `boolean` | `true` | 是否显示底边框 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 输入内容变化时触发，用于 `v-model` |
| input | `value: string` | 输入时触发，`value` 是当前内容 |
| focus | `e: UniInputFocusEvent` | 获得焦点时触发 |
| blur | `e: UniInputBlurEvent` | 失去焦点时触发 |
| clear | — | 点击清空按钮时触发 |
| confirm | `value: string` | 点击键盘的完成键时触发，`value` 是当前内容 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| label | 自定义标签 |
| prefix | 自定义输入框前面的内容，默认显示前缀图标 |
| suffix | 自定义输入框后面的内容，默认显示后缀图标 |
| tips | 自定义底部提示区，默认显示 `tips` 和字数统计 |
