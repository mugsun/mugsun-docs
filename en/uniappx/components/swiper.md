---
title: Swiper
demo: pages/demo/display/swiper
---

# Swiper

`ms-swiper` is a carousel built from `items`; each slide is an image or a colored card with a label.

Bind the current slide with `v-model:current`. Indicators come as dots, a page fraction or previous/next controls.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Slides; each item can have `label`, `image` and `tone` (brand / success / warning / muted) |
| current | `number` | `0` | Index of the current slide. Works with `v-model:current` |
| height | `number` | `160` | Height (px) |
| autoplay | `boolean` | `false` | Whether to play automatically |
| interval | `number` | `3000` | Autoplay interval (ms) |
| duration | `number` | `300` | Duration of the slide animation (ms) |
| loop | `boolean` | `true` | Whether to loop |
| vertical | `boolean` | `false` | Whether to slide vertically |
| navigation | `string` | `'dots'` | Indicator style: dots / dots-bar / fraction / controls / none |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `current: number` | Fires when the current slide changes; `current` is the new index |
| click | `index: number` | Fires when a slide is tapped; `index` is the tapped slide |
| update:current | `value: number` | Fires when the current slide changes; used by `v-model:current` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getCurrent(): number` | Returns the index of the current slide |
| `next()` | Goes to the next slide |
| `prev()` | Goes to the previous slide |
