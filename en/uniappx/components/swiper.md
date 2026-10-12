---
title: Swiper
demo: pages/demo/display/swiper
---

# Swiper

`ms-swiper` — Swiper for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-swiper`).
Demo route: `#/pages/demo/display/swiper`.

## Basic usage

```vue
<template>
  <ms-swiper>
    …
  </ms-swiper>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Each item: label / image / tone (brand / success / warning / muted) |
| current | `number` | `0` | Current item index |
| height | `number` | `160` | Swiper height (px; vapor forbids %) |
| autoplay | `boolean` | `false` | Autoplay |
| interval | `number` | `3000` | Autoplay interval (ms) |
| duration | `number` | `300` | Switch animation duration (ms) |
| loop | `boolean` | `true` | Circular/loop swipe |
| vertical | `boolean` | `false` | Vertical swipe |
| navigation | `string` | `'dots'` | Indicator: dots / dots-bar / fraction / controls / none |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-swiper/`
- Demo: `#/pages/demo/display/swiper`
- Chinese docs: [/uniappx/components/swiper](/uniappx/components/swiper)
