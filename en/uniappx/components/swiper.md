---
title: Swiper
demo: pages/demo/display/swiper
---

# Swiper

轮播：dots/fraction/controls；`v-model:current`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-swiper`).
Demo route: `#/pages/demo/display/swiper`.

## Basic usage

```vue
<template>
  <ms-swiper>
    …
  </ms-swiper>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / image / tone（brand / success / warning / muted） |
| current | `number` | `0` | 当前项下标 |
| height | `number` | `160` | 轮播高度（px），蒸汽禁百分比高度 |
| autoplay | `boolean` | `false` | 自动播放 |
| interval | `number` | `3000` | 自动播放间隔 ms |
| duration | `number` | `300` | 切换动画时长 ms |
| loop | `boolean` | `true` | 衔接滑动 |
| vertical | `boolean` | `false` | 纵向滑动 |
| navigation | `string` | `'dots'` | 导航器：dots / dots-bar / fraction / controls / none |

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
