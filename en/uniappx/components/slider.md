---
title: Slider
demo: pages/demo/form/slider
---

# Slider

`ms-slider` — Slider for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-slider` (repository not yet public).
Demo route: `#/pages/demo/form/slider`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/slider.uvue`; see them running in the phone frame.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | Bound value (v-model) |
| rangeValue | `number[]` | `[]` | Controlled range [low, high] in dual-thumb mode |
| range | `boolean` | `false` | Enable dual-thumb range mode |
| min | `number` | `0` | Minimum |
| max | `number` | `100` | Maximum |
| step | `number` | `1` | Step |
| disabled | `boolean` | `false` | Whether disabled |
| label | `boolean` | `false` | Label text |
| showExtremeValue | `boolean` | `false` | Whether to show min/max at both ends |
| marks | `number[]` | `[]` | Date marker list |
| theme | `'default' \| 'capsule'` | `'default'` | Theme color |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| update:rangeValue | update:rangeValue |
| change | Value changed |
| dragstart | dragstart |
| dragend | dragend |

## See also

- Component: `uni_modules/ms-ui/components/ms-slider/`
- Demo: `#/pages/demo/form/slider`
- Chinese docs: [/uniappx/components/slider](/uniappx/components/slider)
