---
title: Slider
demo: pages/demo/form/slider
---

# Slider

`ms-slider` — Slider for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-slider`).
Demo route: `#/pages/demo/form/slider`.

## Basic usage

```vue
<template>
  <ms-slider theme="default" v-model="value">
    …
  </ms-slider>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
