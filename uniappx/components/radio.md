---
title: Radio 单选
demo: pages/demo/form/radio
---

# Radio 单选

`ms-radio` 是单选项，选框有填充、描边和圆点三种样式，可以放在文字左侧或右侧。

单独使用时用 `v-model` 绑定是否选中。放在 [`ms-radio-group`](./radio-group) 里时用 `value` 标识选项，选中状态由组管理。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-radio :model-value="true" label="填充" block />
  <ms-radio :model-value="true" label="描边" icon="line" block />
  <ms-radio :model-value="true" label="圆点" icon="dot" block />
  <!-- 组件状态 -->
  <ms-radio :model-value="false" disabled label="禁用" block />
  <ms-radio :model-value="true" disabled label="禁用已选" block />
  <ms-radio v-model="vUncheck" allow-uncheck label="可取消" block />
  <!-- 组件分组 -->
  <ms-radio value="a" label="选项 A" block />
  <ms-radio value="b" label="选项 B" block />
  <ms-radio value="c" label="选项 C" block />
  <!-- 组件深度 -->
  <ms-radio value="1" label="禁用组甲" block />
  <ms-radio value="2" label="禁用组乙" block />
  <ms-radio v-model="vDepth" label="描边右侧" icon="line" placement="right" block />
</template>

<script setup lang="uts">
const vDepth = ref(true)

const vUncheck = ref(true)
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 是否选中，单独使用时用 `v-model` 绑定 |
| value | `string` | `''` | 在 `ms-radio-group` 中的选项值 |
| label | `string` | `''` | 标签文字 |
| content | `string` | `''` | 标签下方的说明文字 |
| contentDisabled | `boolean` | `false` | 点击说明文字时是否不切换 |
| disabled | `boolean` | `false` | 是否禁用 |
| icon | `'circle' \| 'line' \| 'dot'` | `'circle'` | 选框样式：circle / line / dot |
| placement | `'left' \| 'right'` | `'left'` | 选框在文字的左侧还是右侧 |
| block | `boolean` | `false` | 是否占满整行 |
| allowUncheck | `boolean` | `false` | 再次点击已选中的项是否取消选中 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: boolean` | 单独使用时选中状态变化触发，用于 `v-model` |
| change | `value: boolean` | 单独使用时选中状态变化触发；在 `ms-radio-group` 里不触发，请监听组的 `change` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 自定义内容，显示在标签和说明文字下方 |
