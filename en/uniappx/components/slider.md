---
title: Slider
demo: pages/demo/form/slider
---

# Slider

`ms-slider`: Slider. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-slider`).
Demo route: `#/pages/demo/form/slider`.

## Basic usage

```vue
<template>
  <ms-slider theme="default" v-model="value">
    …
  </ms-slider>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | — |
| rangeValue | `number[]` | `[]` | 双游标时的受控区间 [low, high] |
| range | `boolean` | `false` | 开启双游标区间模式 |
| min | `number` | `0` | — |
| max | `number` | `100` | — |
| step | `number` | `1` | — |
| disabled | `boolean` | `false` | — |
| label | `boolean` | `false` | — |
| showExtremeValue | `boolean` | `false` | — |
| marks | `number[]` | `[]` | — |
| theme | `'default' \| 'capsule'` | `'default'` | — |

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
