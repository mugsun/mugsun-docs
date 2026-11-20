---
title: Slider
demo: pages/demo/form/slider
---

# Slider

`ms-slider` is a single- or dual-handle slider with two track styles, thin and capsule.

A single handle binds a number with `v-model`. For two handles, turn on `range` and bind `[low, high]` with `v-model:rangeValue`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-slider v-model="vBase" />
  <ms-slider v-model="vCapsule" theme="capsule" />
  <!-- States -->
  <ms-slider v-model="vLabel" label />
  <ms-slider :model-value="35" disabled />
  <!-- Marks -->
  <ms-slider v-model="vStep" :step="20" :marks="marks" />
  <ms-slider v-model="vExtreme" show-extreme-value />
  <ms-slider v-model="vRangeMin" :min="20" :max="100" :step="20" label />
  <!-- Advanced -->
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | Bound value (v-model) |
| rangeValue | `number[]` | `[]` | The `[low, high]` range in dual-handle mode. Works with `v-model:rangeValue` |
| range | `boolean` | `false` | Whether to use two handles to select a range |
| min | `number` | `0` | Minimum |
| max | `number` | `100` | Maximum |
| step | `number` | `1` | Step |
| disabled | `boolean` | `false` | Whether disabled |
| label | `boolean` | `false` | Whether to show the current value on the right |
| showExtremeValue | `boolean` | `false` | Whether to show min/max at both ends |
| marks | `number[]` | `[]` | Values at which tick marks are drawn on the track |
| theme | `'default' \| 'capsule'` | `'default'` | Track style: default (thin) / capsule |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: number` | Fires when the single-handle value changes; used by `v-model` |
| update:rangeValue | `value: number[]` | Fires when the range changes; used by `v-model:rangeValue` |
| change | `value: number \| number[]` | Fires when the value changes: a number for a single handle, `[low, high]` for two |
| dragstart | `value: number \| number[]` | Fires when dragging starts, with the current value |
| dragend | `value: number \| number[]` | Fires when dragging ends, with the current value |
