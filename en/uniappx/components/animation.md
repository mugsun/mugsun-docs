---
title: Animation
demo: pages/demo/feedback/animation
---

# Animation

`ms-animation` is an imperative animation container that plays a preset animation once by name. For enter and leave transitions, use `ms-transition` (controlled by `visible`).

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `'fade-in' \| 'fade-out' \| 'zoom-in' \| 'zoom-out' \| 'left-in' \| 'left-out' \| 'right-in' \| 'right-out' \| 'up-in' \| 'up-out' \| 'down-in' \| 'down-out'` | `'fade-in'` | Animation preset name |
| duration | `number` | `300` | Duration (ms) |
| delay | `number` | `0` | Delay (ms) |
| autoPlay | `boolean` | `false` | Whether to autoplay |
| playing | `boolean` | `false` | Whether playing (supports v-model:playing) |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| before-play | — | Fires right before each playback starts |
| complete | — | Fires when the animation finishes |
| update:playing | `value: boolean` | Fires with `false` when playback ends; used by `v-model:playing` |

## Slots

| Slot | Description |
| --- | --- |
| default | Content to animate |
