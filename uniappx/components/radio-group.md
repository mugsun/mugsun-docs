---
title: Radio Group 单选组
demo: pages/demo/form/radio
---

# Radio Group 单选组

`ms-radio-group` 是单选框组，里面放 [`ms-radio`](./radio)，同组选项互斥。`v-model` 的值是选中项的 `value`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件分组 -->
  <ms-radio-group v-model="groupValue">
    <ms-radio value="a" label="选项 A" block />
    <ms-radio value="b" label="选项 B" block />
    <ms-radio value="c" label="选项 C" block />
  </ms-radio-group>
  <ms-radio-group v-model="rowValue" horizontal>
    <view>
      <ms-radio value="x" label="横排一" />
    </view>
    <view>
      <ms-radio value="y" label="横排二" />
    </view>
  </ms-radio-group>
  <!-- 组件深度 -->
  <ms-radio-group v-model="disabledGroup" disabled>
    <ms-radio value="1" label="禁用组甲" block />
    <ms-radio value="2" label="禁用组乙" block />
  </ms-radio-group>
  <ms-radio-group v-model="uncheckGroup" allow-uncheck>
    <ms-radio value="a" label="组内 A" block />
    <ms-radio value="b" label="组内 B" block />
  </ms-radio-group>
</template>

<script setup lang="uts">
const disabledGroup = ref('1')

const groupValue = ref('a')

const rowValue = ref('x')

const uncheckGroup = ref('a')
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 选中项的 `value`，用 `v-model` 绑定 |
| disabled | `boolean` | `false` | 是否禁用整组 |
| horizontal | `boolean` | `false` | 是否横向排列，放不下时自动换行 |
| allowUncheck | `boolean` | `false` | 再次点击已选中的项是否取消选中 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 选中项变化时触发，用于 `v-model` |
| change | `value: string` | 选中项变化时触发，`value` 是选中项的值，取消选中时为空字符串 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 放置 `ms-radio` |
