---
title: Slider 滑块
demo: pages/demo/form/slider
---

# Slider 滑块

`ms-slider` 是滑块，支持单滑块和双滑块，轨道有细轨和胶囊轨两种样式。

单滑块用 `v-model` 绑定数值；双滑块需要开启 `range`，并用 `v-model:rangeValue` 绑定 `[小值, 大值]`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-slider v-model="vBase" />
  <ms-slider v-model="vCapsule" theme="capsule" />
  <!-- 组件状态 -->
  <ms-slider v-model="vLabel" label />
  <ms-slider :model-value="35" disabled />
  <!-- 组件刻度 -->
  <ms-slider v-model="vStep" :step="20" :marks="marks" />
  <ms-slider v-model="vExtreme" show-extreme-value />
  <ms-slider v-model="vRangeMin" :min="20" :max="100" :step="20" label />
  <!-- 组件深度 -->
  <ms-slider v-model="vDepthCap" theme="capsule" label show-extreme-value />
  <ms-slider v-model="vDecimal" :min="0" :max="1" :step="0.1" label />
  <ms-slider range v-model:range-value="vRange" label />
</template>

<script setup lang="uts">
const marks = ref<number[]>([0, 20, 40, 60, 80, 100] as number[])

const vBase = ref(23)

const vCapsule = ref(30)

const vDecimal = ref(0.3)

const vDepthCap = ref(55)

const vExtreme = ref(50)

const vLabel = ref(40)

const vRangeMin = ref(40)

const vStep = ref(60)
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | 绑定值（v-model） |
| rangeValue | `number[]` | `[]` | 双滑块时的区间 `[小值, 大值]`，可用 `v-model:rangeValue` |
| range | `boolean` | `false` | 是否使用双滑块选择区间 |
| min | `number` | `0` | 最小值 |
| max | `number` | `100` | 最大值 |
| step | `number` | `1` | 步长 |
| disabled | `boolean` | `false` | 是否禁用 |
| label | `boolean` | `false` | 是否在右侧显示当前值 |
| showExtremeValue | `boolean` | `false` | 是否显示两端最值 |
| marks | `number[]` | `[]` | 轨道上刻度标记对应的数值 |
| theme | `'default' \| 'capsule'` | `'default'` | 轨道样式：default 细轨 / capsule 胶囊轨 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: number` | 单滑块的值变化时触发，用于 `v-model` |
| update:rangeValue | `value: number[]` | 双滑块的区间变化时触发，用于 `v-model:rangeValue` |
| change | `value: number \| number[]` | 值变化时触发；单滑块是数值，双滑块是 `[小值, 大值]` |
| dragstart | `value: number \| number[]` | 开始拖动时触发，参数是当前值 |
| dragend | `value: number \| number[]` | 结束拖动时触发，参数是当前值 |
