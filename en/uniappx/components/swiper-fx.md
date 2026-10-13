---
title: Swiper Fx
demo: pages/demo/display/swiper-fx
---

# Swiper Fx

`ms-swiper-fx` — Swiper Fx for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-swiper-fx` (repository not yet public).
Demo route: `#/pages/demo/display/swiper-fx`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/swiper-fx.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-swiper-fx
    :list="list"
    :effect="effectName"
    :height="160"
    :autoplay="true"
    :interval="4000"
    @change="onChange"
    @click="onClick"
  />
  <!-- 组件样式 -->
  <ms-swiper-fx :list="list" effect="slide" :show-dots="true" :autoplay="false" :height="140" />
  <!-- 组件深度 -->
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
const effectName = ref('fade' as FxEffect)
const list = ref([
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
