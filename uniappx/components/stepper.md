---
title: Stepper 步进
demo: pages/demo/form/stepper
---

# Stepper 步进

`ms-stepper` 是数字步进器，有填充、描边和朴素三种样式及三种尺寸，支持步长、上下限和小数位数。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-stepper v-model="vFilled" theme="filled" />
  <ms-stepper v-model="vOutline" theme="outline" />
  <ms-stepper v-model="vNormal" />
  <!-- 组件状态 -->
  <ms-stepper v-model="vMin" theme="filled" :min="0" :max="9" />
  <ms-stepper v-model="vMax" theme="filled" :min="5" :max="9" />
  <ms-stepper :model-value="3" theme="filled" disabled />
  <!-- 组件尺寸 -->
  <ms-stepper v-model="vSize" theme="filled" size="sm" />
  <ms-stepper v-model="vSize" theme="filled" size="md" />
  <ms-stepper v-model="vSize" theme="filled" size="lg" />
  <!-- 组件深度 -->
  <ms-stepper v-model="vDecimal" theme="filled" :step="0.1" :precision="1" :min="0" :max="10" />
  <ms-stepper v-model="vDepth" theme="outline" size="lg" :min="1" :max="99" />
  <ms-stepper v-model="vHold" theme="filled" :long-press="true" :min="0" :max="99" />
</template>

<script setup lang="uts">
const vDecimal = ref(1.5)

const vDepth = ref(5)

const vFilled = ref(3)

const vHold = ref(1)

const vMax = ref(9)

const vMin = ref(0)

const vNormal = ref(3)

const vOutline = ref(3)

const vSize = ref(3)
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | 绑定值（v-model） |
| min | `number` | `0` | 最小值 |
| max | `number` | `100` | 最大值 |
| step | `number` | `1` | 步长 |
| precision | `number` | `0` | 小数位数 |
| theme | `'normal' \| 'filled' \| 'outline'` | `'normal'` | 样式：normal 朴素 / filled 填充 / outline 描边 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| disableInput | `boolean` | `false` | 是否禁止在输入框里输入，加减按钮仍然可用 |
| longPress | `boolean` | `true` | 长按加减按钮是否连续加减 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: number` | 数值变化时触发，用于 `v-model` |
| change | `value: number` | 数值变化时触发，`value` 是新的数值 |
| overlimit | `type: string` | 已到上限或下限时继续加减会触发，`type` 为 `minus` 或 `plus` |
