---
title: Swiper
demo: pages/demo/display/swiper
---

# Swiper

`ms-swiper` is a carousel with dots, fraction or controls indicators; the current slide binds with `v-model:current`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-swiper`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/display/swiper`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/swiper.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
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
  <!-- States -->
  <ms-swiper
    :items="slides"
    :height="150"
    autoplay
    :interval="2000"
    @change="onAutoChange"
  />
  <ms-swiper :items="slides" :height="120" navigation="none" />
  <!-- Direction -->
  <ms-swiper
    :items="slides"
    :height="160"
    vertical
    @change="onVerticalChange"
  />
  <!-- Advanced -->
  <ms-swiper :items="slides" :height="120" :loop="false" navigation="fraction" />
  <ms-swiper :items="imageSlides" :height="120" navigation="dots" />
  <ms-swiper :items="slides" :height="120" :duration="200" navigation="dots" />
</template>

<script setup lang="uts">
const imageSlides = [
  { image: '/static/demo-cover.png', label: 'Cover 1' } as UTSJSONObject,
  { image: '/static/logo.png', label: 'Cover 2' } as UTSJSONObject,
] as UTSJSONObject[]

const slides = [
  { label: 'Slide 1', tone: 'brand' } as UTSJSONObject,
  { label: 'Slide 2', tone: 'success' } as UTSJSONObject,
  { label: 'Slide 3', tone: 'warning' } as UTSJSONObject,
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
| height | `number` | `160` | Swiper height (accepts numeric px values only) |
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
