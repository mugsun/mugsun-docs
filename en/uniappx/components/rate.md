---
title: Rate
demo: pages/demo/form/rate
---

# Rate

`ms-rate` is a rating control. Tap a star to set the score, bound with `v-model`. Half stars and tap-again-to-clear are optional.

A text description or the numeric score can be shown beside the stars; with `placement` set, a brief tip appears above or below the stars on tap.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-rate v-model="vSolid" />
  <ms-rate v-model="vCustom" active-icon="heart-fill" void-icon="heart-line" />
  <ms-rate v-model="vCount" :count="3" />
  <!-- States -->
  <ms-rate v-model="vActive" />
  <ms-rate :model-value="4" readonly />
  <ms-rate :model-value="3" disabled />
  <!-- Sizes -->
  <ms-rate v-model="vSize" size="sm" />
  <ms-rate v-model="vSize" size="md" />
  <ms-rate v-model="vSize" size="lg" />
  <!-- Advanced -->
  <ms-rate v-model="vHalf" allow-half show-score />
  <ms-rate v-model="vClear" clearable show-text />
  <ms-rate v-model="vTexts" show-text :texts="customTexts" />
</template>

<script setup lang="uts">
const customTexts = ['Terrible', 'Poor', 'Okay', 'Good', 'Great'] as string[]

const vActive = ref(3)

const vClear = ref(4)

const vCount = ref(2)

const vCustom = ref(2)

const vHalf = ref(3.5)

const vSize = ref(3)

const vSolid = ref(3)

const vTexts = ref(3)
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | Bound value (v-model) |
| count | `number` | `5` | Total star count |
| readonly | `boolean` | `false` | Whether read-only |
| disabled | `boolean` | `false` | Whether disabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| activeIcon | `string` | `'star-fill'` | Icon name for a filled star |
| voidIcon | `string` | `'star-line'` | Icon name for an empty star |
| halfIcon | `string` | `'star-half-fill'` | Icon name for a half star |
| showText | `boolean` | `false` | Whether to show the text for the current score beside the stars |
| showScore | `boolean` | `false` | Whether to show the numeric score beside the stars; takes precedence over `showText` |
| allowHalf | `boolean` | `false` | Whether half stars are allowed |
| clearable | `boolean` | `false` | Whether tapping the current score again clears it |
| texts | `string[]` | `[]` | Text for each score; empty uses the built-in texts |
| placement | `'top' \| 'bottom' \| ''` | `''` | Where the tip appears on tap: top / bottom; empty shows no tip |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: number` | Fires when the score changes; used by `v-model` |
| change | `value: number` | Fires when the score changes; `value` is the new score |
