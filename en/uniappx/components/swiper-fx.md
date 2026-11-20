---
title: Swiper Fx
demo: pages/demo/display/swiper-fx
---

# Swiper Fx

`ms-swiper-fx` is a data-driven carousel with transition effects. Each entry in `list` supports `image`, `color` and `label`.

Pick the transition with `effect`, and bind the current slide with `v-model:current`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-swiper-fx
    :list="list"
    :effect="effectName"
    :height="160"
    :autoplay="true"
    :interval="4000"
    @change="onChange"
    @click="onClick"
  />
  <!-- Styles -->
  <ms-swiper-fx :list="list" effect="slide" :show-dots="true" :autoplay="false" :height="140" />
  <!-- Advanced -->
  <ms-swiper-fx
    :list="list"
    effect="fade"
    :loop="false"
    :autoplay="false"
    :height="140"
  />
  <ms-swiper-fx
    :list="list"
    effect="slide"
    :duration="200"
    :interval="2000"
    :height="140"
  />
  <ms-swiper-fx
    :list="list"
    effect="slide"
    :current="1"
    :autoplay="false"
    :height="140"
  />
</template>

<script setup lang="uts">
type FxEffect = 'fade' | 'slide' | 'zoom' | 'scale-slide'

const effectName = ref('fade' as FxEffect)

const list = ref([
  { color: '#64748b', label: 'Card 1' } as UTSJSONObject,
  { color: '#0f766e', label: 'Card 2' } as UTSJSONObject,
  { color: '#b45309', label: 'Card 3' } as UTSJSONObject,
] as UTSJSONObject[])

function onChange(i: number) : void {
  console.log('onChange')
}

function onClick(i: number) : void {
  console.log('onClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Slides; each item can have `image`, `color` and `label` |
| effect | `'fade' \| 'slide' \| 'zoom' \| 'scale-slide'` | `'fade'` | Transition effect: fade / slide / zoom / scale-slide |
| current | `number` | `0` | Index of the current slide. Works with `v-model:current` |
| height | `number` | `160` | Height (px) |
| autoplay | `boolean` | `true` | Whether to autoplay |
| interval | `number` | `3500` | Autoplay interval (ms) |
| duration | `number` | `600` | Duration of the transition (ms) |
| loop | `boolean` | `true` | Whether to loop |
| showDots | `boolean` | `true` | Whether to show indicator dots; tapping a dot switches to that slide |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `index: number` | Fires when the current slide changes; `index` is the new index |
| click | `index: number` | Fires when a slide is tapped; `index` is the tapped slide |
| update:current | `value: number` | Fires when the current slide changes; used by `v-model:current` |
