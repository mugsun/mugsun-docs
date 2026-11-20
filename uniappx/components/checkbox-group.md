---
title: Checkbox Group 多选组
demo: pages/demo/form/checkbox
---

# Checkbox Group 多选组

`ms-checkbox-group` 是多选框组，`v-model` 绑定已选项的值，类型为 `string[]`。

可以整组禁用、用 `max` 限制最多选几项，也可以横向排列并自动换行。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件分组 -->
  <ms-checkbox-group v-model="groupValue" :max="2" @change="onGroupChange">
    <ms-checkbox value="a" label="选项 A" block />
    <ms-checkbox value="b" label="选项 B" block />
    <ms-checkbox value="c" label="选项 C" block />
  </ms-checkbox-group>
  <ms-checkbox-group v-model="rowValue" horizontal>
    <view>
      <ms-checkbox value="x" label="横排一" />
    </view>
    <view>
      <ms-checkbox value="y" label="横排二" />
    </view>
  </ms-checkbox-group>
  <!-- 组件深度 -->
  <ms-checkbox-group v-model="disabledGroup" disabled>
    <ms-checkbox value="1" label="禁用组甲" block />
    <ms-checkbox value="2" label="禁用组乙" block />
  </ms-checkbox-group>
  <ms-checkbox-group v-model="childValue" @change="onChildChange">
    <ms-checkbox value="a" label="子项 A" block />
    <ms-checkbox value="b" label="子项 B" block />
  </ms-checkbox-group>
</template>

<script setup lang="uts">
const childValue = ref(['a'] as string[])

const disabledGroup = ref(['1'] as string[])

const groupValue = ref(['a'] as string[])

const rowValue = ref(['x'] as string[])

function onGroupChange(values: string[]) : void {
  console.log('onGroupChange')
}

function onChildChange(values: string[]) : void {
  console.log('onChildChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | 绑定值（v-model） |
| disabled | `boolean` | `false` | 是否禁用整组 |
| max | `number` | `-1` | 最多可选数量，`-1` 表示不限制；达到上限后未选项自动禁用 |
| horizontal | `boolean` | `false` | 是否横向排列 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `values: string[]` | 已选项变化时触发，用于 `v-model` |
| change | `values: string[]` | 已选项变化时触发，`values` 是当前已选项的值 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 放置 `ms-checkbox` |
