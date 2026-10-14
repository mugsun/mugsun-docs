---
title: Rate
demo: pages/demo/form/rate
---

# Rate

`ms-rate` is a rating control. Tap to set a score; it supports read-only, disabled, half stars, clearing, a description and score on the right, and a brief tip above or below on tap (`placement`).

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-rate`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/rate`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/rate.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | Bound value (v-model) |
| count | `number` | `5` | Total star count |
| readonly | `boolean` | `false` | Whether read-only |
| disabled | `boolean` | `false` | Whether disabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| activeIcon | `string` | `'star-fill'` | Active icon name |
| voidIcon | `string` | `'star-line'` | Inactive icon name |
| halfIcon | `string` | `'star-half-fill'` | Half-star icon name |
| showText | `boolean` | `false` | Whether to show rating text |
| showScore | `boolean` | `false` | Show numeric score |
| allowHalf | `boolean` | `false` | Allow half stars |
| clearable | `boolean` | `false` | Tapping the current value again clears it |
| texts | `string[]` | `[]` | Per-level labels; empty uses built-in |
| placement | `'top' \| 'bottom' \| ''` | `''` | Brief score popover position on tap. Empty hides it; top/bottom relative to the stars. |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-rate/`
- Demo: `#/pages/demo/form/rate`
- Chinese docs: [/uniappx/components/rate](/uniappx/components/rate)
