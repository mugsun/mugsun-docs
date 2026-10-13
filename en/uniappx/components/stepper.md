---
title: Stepper
demo: pages/demo/form/stepper
---

# Stepper

`ms-stepper` — Stepper for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-stepper` (commercial edition; source not public).
Demo route: `#/pages/demo/form/stepper`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/stepper.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | Bound value (v-model) |
| min | `number` | `0` | Minimum |
| max | `number` | `100` | Maximum |
| step | `number` | `1` | Step |
| precision | `number` | `0` | Precision |
| theme | `'normal' \| 'filled' \| 'outline'` | `'normal'` | Theme color |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| disabled | `boolean` | `false` | Whether disabled |
| disableInput | `boolean` | `false` | Whether input is disabled |
| longPress | `boolean` | `true` | Long-press +/- for continuous step (on by default) |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| overlimit | overlimit |

## See also

- Component: `uni_modules/ms-ui/components/ms-stepper/`
- Demo: `#/pages/demo/form/stepper`
- Chinese docs: [/uniappx/components/stepper](/uniappx/components/stepper)
