---
title: Swiper Fx
demo: pages/demo/display/swiper-fx
---

# Swiper Fx

`ms-swiper-fx`: Swiper Fx. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-swiper-fx`).
Demo route: `#/pages/demo/display/swiper-fx`.

## Basic usage

```vue
<template>
  <ms-swiper-fx>
    …
  </ms-swiper-fx>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| effect | `'fade' \| 'slide' \| 'zoom' \| 'scale-slide'` | `'fade'` | — |
| current | `number` | `0` | — |
| height | `number` | `160` | — |
| autoplay | `boolean` | `true` | — |
| interval | `number` | `3500` | — |
| duration | `number` | `600` | — |
| loop | `boolean` | `true` | — |
| showDots | `boolean` | `true` | — |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-swiper-fx/`
- Demo: `#/pages/demo/display/swiper-fx`
- Chinese docs: [/uniappx/components/swiper-fx](/uniappx/components/swiper-fx)
