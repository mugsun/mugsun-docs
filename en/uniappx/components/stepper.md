---
title: Stepper
demo: pages/demo/form/stepper
---

# Stepper

`ms-stepper` is a numeric stepper with filled, outlined and plain styles in three sizes. It supports step, minimum and maximum values, and decimal places.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-stepper v-model="vFilled" theme="filled" />
  <ms-stepper v-model="vOutline" theme="outline" />
  <ms-stepper v-model="vNormal" />
  <!-- States -->
  <ms-stepper v-model="vMin" theme="filled" :min="0" :max="9" />
  <ms-stepper v-model="vMax" theme="filled" :min="5" :max="9" />
  <ms-stepper :model-value="3" theme="filled" disabled />
  <!-- Sizes -->
  <ms-stepper v-model="vSize" theme="filled" size="sm" />
  <ms-stepper v-model="vSize" theme="filled" size="md" />
  <ms-stepper v-model="vSize" theme="filled" size="lg" />
  <!-- Advanced -->
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | Bound value (v-model) |
| min | `number` | `0` | Minimum |
| max | `number` | `100` | Maximum |
| step | `number` | `1` | Step |
| precision | `number` | `0` | Decimal places |
| theme | `'normal' \| 'filled' \| 'outline'` | `'normal'` | Style: normal (plain) / filled / outline |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| disabled | `boolean` | `false` | Whether disabled |
| disableInput | `boolean` | `false` | Whether typing in the input is disabled; the buttons still work |
| longPress | `boolean` | `true` | Whether holding a button keeps stepping |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: number` | Fires when the value changes; used by `v-model` |
| change | `value: number` | Fires when the value changes; `value` is the new value |
| overlimit | `type: string` | Fires on an attempt to step past the minimum or maximum; `type` is `minus` or `plus` |
