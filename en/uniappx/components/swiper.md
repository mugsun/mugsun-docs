---
title: Swiper
demo: pages/demo/display/swiper
---

# Swiper

`ms-swiper` — Swiper for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-swiper` (commercial edition; source not public).
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

<script setup lang="uts">
const imageSlides = [
  { image: '/static/demo-cover.png', label: '封面一' } as UTSJSONObject,
  { image: '/static/logo.png', label: '封面二' } as UTSJSONObject,
] as UTSJSONObject[]

const slides = [
  { label: '第一屏', tone: 'brand' } as UTSJSONObject,
  { label: '第二屏', tone: 'success' } as UTSJSONObject,
  { label: '第三屏', tone: 'warning' } as UTSJSONObject,
] as UTSJSONObject[]

function onDotsChange(current: number) : void {
  console.log('onDotsChange')
}

function onBarChange(current: number) : void {
  console.log('onBarChange')
}

function onFractionChange(current: number) : void {
  console.log('onFractionChange')
}

function onAutoChange(current: number) : void {
  console.log('onAutoChange')
}

function onVerticalChange(current: number) : void {
  console.log('onVerticalChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
