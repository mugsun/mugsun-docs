---
title: Swiper Fx
demo: pages/demo/display/swiper-fx
---

# Swiper Fx

`ms-swiper-fx` — Swiper Fx for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-swiper-fx`).
Demo route: `#/pages/demo/display/swiper-fx`.

## Basic usage

```vue
<template>
  <ms-swiper-fx>
    …
  </ms-swiper-fx>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| effect | `'fade' \| 'slide' \| 'zoom' \| 'scale-slide'` | `'fade'` | Transition effect: fade / slide / zoom / scale-slide |
| current | `number` | `0` | Current index |
| height | `number` | `160` | Height (px) |
| autoplay | `boolean` | `true` | Whether to autoplay |
| interval | `number` | `3500` | Interval (ms) |
| duration | `number` | `600` | Duration (ms) |
| loop | `boolean` | `true` | Whether to loop |
| showDots | `boolean` | `true` | Whether to show dots |

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
