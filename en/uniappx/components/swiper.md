---
title: Swiper
demo: pages/demo/display/swiper
---

# Swiper

`ms-swiper` — Swiper for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-swiper`).
Demo route: `#/pages/demo/display/swiper`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/swiper.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-swiper :items="slides" :height="150" @change="onDotsChange" />
  <ms-swiper
    :items="slides"
    :height="150"
    navigation="dots-bar"
    @change="onBarChange"
  />
  <ms-swiper
    :items="slides"
    :height="150"
    navigation="fraction"
    @change="onFractionChange"
  />
  <!-- 组件状态 -->
  <ms-swiper
    :items="slides"
    :height="150"
    autoplay
    :interval="2000"
    @change="onAutoChange"
  />
  <ms-swiper :items="slides" :height="120" navigation="none" />
  <!-- 方向 -->
  <ms-swiper
    :items="slides"
    :height="160"
    vertical
    @change="onVerticalChange"
  />
  <!-- 组件深度 -->
  <ms-swiper :items="slides" :height="120" :loop="false" navigation="fraction" />
  <ms-swiper :items="imageSlides" :height="120" navigation="dots" />
  <ms-swiper :items="slides" :height="120" :duration="200" navigation="dots" />
</template>
```
<!-- demo-snippets:end -->

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
