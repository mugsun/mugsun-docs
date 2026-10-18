---
title: Rolling Number
demo: pages/demo/display/rolling-number
---

# Rolling Number

`ms-rolling-number` displays a number with a rolling animation; when `value` changes it animates from the current value to the new one.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-rolling-number`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/display/rolling-number`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/rolling-number.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-rolling-number :value="decimalVal" />
  <ms-rolling-number :value="intVal" :duration="1100" :decimals="0" />
  <!-- Styles -->
  <ms-rolling-number :value="moneyVal" :grouping="true" prefix="¥" :decimals="2" />
  <ms-rolling-number :value="bigVal" size="lg" :decimals="0" />
  <!-- Advanced -->
  <ms-rolling-number :value="suffixVal" suffix="%" :decimals="1" />
  <ms-rolling-number :value="staticVal" :animated="false" :decimals="0" />
  <ms-rolling-number :value="startVal" :start="10" :decimals="0" />
</template>

<script setup lang="uts">
const bigVal = ref(9600)

const decimalVal = ref(2023.2)

const intVal = ref(1998)

const moneyVal = ref(12880.5)

const startVal = ref(88)

const staticVal = ref(100)

const suffixVal = ref(68.5)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Current value |
| start | `number` | `0` | Start value |
| duration | `number` | `400` | Duration (ms) |
| decimals | `number` | `-1` | Decimal places |
| grouping | `boolean` | `false` | Whether grouped |
| prefix | `string` | `''` | Prefix |
| suffix | `string` | `''` | Suffix |
| animated | `boolean` | `true` | Whether animation is enabled |
| size | `'md' \| 'lg'` | `'md'` | Size |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| complete | complete |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-rolling-number/`
- Demo: `#/pages/demo/display/rolling-number`
- Chinese docs: [/uniappx/components/rolling-number](/uniappx/components/rolling-number)
