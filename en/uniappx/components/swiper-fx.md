---
title: Swiper Fx
demo: pages/demo/display/swiper-fx
---

# Swiper Fx

`ms-swiper-fx` is a data-driven carousel with transition effects. Each entry in `list` supports `image`, `color` and `label`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-swiper-fx`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/swiper-fx`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/swiper-fx.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
