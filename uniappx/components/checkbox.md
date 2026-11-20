---
title: Checkbox 多选
demo: pages/demo/form/checkbox
---

# Checkbox 多选

`ms-checkbox` 是多选框，可以单独用 `v-model` 绑定，也可以放在 [`ms-checkbox-group`](./checkbox-group) 中成组使用。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-checkbox v-model="vSquare" label="方形" block />
  <ms-checkbox v-model="vCircle" label="圆形" icon="circle" block />
  <ms-checkbox v-model="vLine" label="描边" icon="line" block />
  <!-- 组件状态 -->
  <ms-checkbox :model-value="false" indeterminate label="半选" block />
  <ms-checkbox :model-value="false" disabled label="禁用" block />
  <ms-checkbox :model-value="true" disabled label="禁用已选" block />
  <!-- 组件分组 -->
  <ms-checkbox value="a" label="选项 A" block />
  <ms-checkbox value="b" label="选项 B" block />
  <ms-checkbox value="c" label="选项 C" block />
  <!-- 组件深度 -->
  <ms-checkbox value="1" label="禁用组甲" block />
  <ms-checkbox value="2" label="禁用组乙" block />
  <ms-checkbox
    :model-value="parentChecked"
    :indeterminate="parentIndeterminate"
    label="全选"
    block
    @change="onParentChange"
  />
</template>

<script setup lang="uts">
const parentChecked = computed((): boolean => {
  return childValue.value.length == 2
})

const parentIndeterminate = computed((): boolean => {
  return childValue.value.length == 1
})

const vCircle = ref(true)

const vLine = ref(true)

const vSquare = ref(true)

function onParentChange(on: boolean) : void {
  console.log('onParentChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 绑定值（v-model） |
| value | `string` | `''` | 在 checkbox-group 中的选项值 |
| label | `string` | `''` | 标签文案 |
| content | `string` | `''` | 次要说明文案 |
| contentDisabled | `boolean` | `false` | 点击文字区域不切换，只有点击图标才切换 |
| disabled | `boolean` | `false` | 是否禁用 |
| indeterminate | `boolean` | `false` | 半选状态 |
| icon | `'square' \| 'circle' \| 'line'` | `'square'` | 图标形状 |
| placement | `'left' \| 'right'` | `'left'` | 图标相对文案位置 |
| block | `boolean` | `false` | 是否通栏 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: boolean` | 单独使用时，勾选状态变化后触发，用于 `v-model` |
| change | `value: boolean` | 单独使用时，勾选状态变化后触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 标签文字之外的自定义内容 |
