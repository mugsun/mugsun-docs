---
title: Rolling Number
demo: pages/demo/display/rolling-number
---

# Rolling Number

`ms-rolling-number` displays a number with a rolling animation; when `value` changes it animates from the current value to the new one.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Target number |
| start | `number` | `0` | Number shown initially; after mount it rolls from this to `value` |
| duration | `number` | `400` | Animation duration (ms) |
| decimals | `number` | `-1` | Decimal places; `-1` follows the decimals of `value` |
| grouping | `boolean` | `false` | Whether to show thousands separators |
| prefix | `string` | `''` | Prefix text |
| suffix | `string` | `''` | Suffix text |
| animated | `boolean` | `true` | Whether to animate; `false` jumps straight to the new value |
| size | `'md' \| 'lg'` | `'md'` | Size |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| start | — | Fires when the animation starts |
| complete | — | Fires when the number reaches the target, also without animation |
| change | `value: number` | Fires on every update of the displayed number; `value` is the number currently shown |
