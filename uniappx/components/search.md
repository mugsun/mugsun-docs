---
title: Search 搜索
demo: pages/demo/form/search
---

# Search 搜索

`ms-search` 是搜索栏，用 `v-model` 绑定关键词，有方形和圆角两种外形，右侧可以带一个操作按钮。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-search v-model="baseValue" placeholder="搜索预设文案" />
  <ms-search
    v-model="limitValue"
    placeholder="最多输入 10 个字符"
    :maxlength="10"
  />
  <ms-search
    v-model="actionValue"
    placeholder="输入后点右侧搜索"
    action="搜索"
    @action="onSearchAction"
  />
  <!-- 组件样式 -->
  <ms-search v-model="squareValue" placeholder="方形搜索框" shape="square" />
  <ms-search v-model="roundValue" placeholder="圆形搜索框" shape="round" />
  <!-- 组件状态 -->
  <ms-search v-model="centerValue" placeholder="居中占位" shape="round" center />
  <ms-search model-value="" placeholder="禁用状态" disabled />
  <!-- 组件深度 -->
  <ms-search model-value="只读关键字" readonly shape="round" />
  <ms-search v-model="noClearValue" placeholder="无清空按钮" :clearable="false" />
  <ms-search v-model="filterValue" placeholder="筛选关键字" left-icon="filter" />
</template>

<script setup lang="uts">
const actionValue = ref('关键词')

const baseValue = ref('')

const centerValue = ref('')

const filterValue = ref('')

const limitValue = ref('')

const noClearValue = ref('保留')

const roundValue = ref('')

const squareValue = ref('')

function onSearchAction() : void {
  console.log('onSearchAction')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| placeholder | `string` | `''` | 占位文案 |
| shape | `'square' \| 'round'` | `'square'` | 外形：square 方形 / round 圆角 |
| action | `string` | `''` | 右侧操作文字，留空不显示 |
| center | `boolean` | `false` | 未聚焦时内容是否居中 |
| clearable | `boolean` | `true` | 是否显示清空按钮 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度，`-1` 表示不限制 |
| leftIcon | `string` | `'search'` | 左侧图标名 |
| confirmType | `'return' \| 'search' \| 'send' \| 'next' \| 'go' \| 'done'` | `'search'` | 键盘确认键类型 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 输入内容变化时触发，用于 `v-model` |
| input | `value: string` | 输入时触发，`value` 是当前内容 |
| focus | `e: UniInputFocusEvent` | 获得焦点时触发 |
| blur | `e: UniInputBlurEvent` | 失去焦点时触发 |
| clear | — | 清空内容时触发 |
| confirm | `value: string` | 点击键盘的搜索键时触发，`value` 是当前内容 |
| action | `value: string` | 点击右侧操作文字时触发，`value` 是当前内容 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| left | 自定义左侧图标 |
| action | 自定义右侧操作区 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `focus()` | 让输入框获得焦点 |
| `blur()` | 让输入框失去焦点 |
| `clear()` | 清空内容 |
