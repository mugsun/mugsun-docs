---
title: Animation
demo: pages/demo/feedback/animation
---

# Animation

`ms-animation` — Animation for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-animation` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/animation`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/animation.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Types -->
  <ms-animation :name="animName" v-model:playing="playing" :duration="400">
    <view>
      <text>{{ effectLabel }}</text>
    </view>
  </ms-animation>
  <!-- Styles -->
  <ms-animation name="fade-in" :auto-play="true" :duration="500">
    <view>
      <text>Fades in on mount</text>
    </view>
  </ms-animation>
  <ms-animation name="left-in" :auto-play="true" :duration="500" :delay="80">
    <view>
      <text>Item 1</text>
      <text>Item 2</text>
      <text>Item 3</text>
    </view>
  </ms-animation>
  <!-- Advanced -->
  <ms-animation name="up-in" :auto-play="true" :duration="450">
    <view>
      <text>Slide-up example</text>
    </view>
  </ms-animation>
  <ms-animation name="fade-out" v-model:playing="outPlaying" :duration="600" :delay="200">
    <view>
      <text>Delayed fade-out example</text>
    </view>
  </ms-animation>
  <ms-animation name="down-in" :auto-play="true" :duration="420">
    <view>
      <text>Slide-down example</text>
    </view>
  </ms-animation>
</template>

<script setup lang="uts">
type AnimName =

const animName = ref('fade-in' as AnimName)

const outPlaying = ref(false)

const playing = ref(false)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `\| 'fade-in'` | `'fade-in'` | Name / field name |
| duration | `number` | `300` | Duration (ms) |
| delay | `number` | `0` | Delay (ms) |
| autoPlay | `boolean` | `false` | Whether to autoplay |
| playing | `boolean` | `false` | Whether playing (supports v-model:playing) |

## Events

| Event | Description |
| --- | --- |
| before-play | before-play |
| complete | complete |
| update:playing | update:playing |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-animation/`
- Demo: `#/pages/demo/feedback/animation`
- Chinese docs: [/uniappx/components/animation](/uniappx/components/animation)
