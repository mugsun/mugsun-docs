---
title: Rolling Number
demo: pages/demo/display/rolling-number
---

# Rolling Number

`ms-rolling-number` — Rolling Number for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-rolling-number` (repository not yet public).
Demo route: `#/pages/demo/display/rolling-number`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/rolling-number.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-rolling-number :value="decimalVal" />
  <ms-rolling-number :value="intVal" :duration="1100" :decimals="0" />
  <!-- 组件样式 -->
  <ms-rolling-number :value="moneyVal" :grouping="true" prefix="¥" :decimals="2" />
  <ms-rolling-number :value="bigVal" size="lg" :decimals="0" />
  <!-- 组件深度 -->
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
