---
title: Transition
demo: pages/demo/basic/transition
---

# Transition

`ms-transition` is an enter and leave transition container. When `visible` changes it animates the content in its slot.

Pick the effect with `name`: fade, zoom, or a slide from one of four directions.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-transition :visible="fadeVisible">
    <view>
      <text>Fade in/out content</text>
    </view>
  </ms-transition>
  <ms-transition :visible="slideVisible" name="slide-right" :duration="300">
    <view>
      <text>Slide in from right</text>
    </view>
  </ms-transition>
  <!-- Styles -->
  <ms-transition :visible="true" :appear="true" name="zoom">
    <view>
      <text>Zooms in when opened</text>
    </view>
  </ms-transition>
  <ms-transition
    :visible="destroyVisible"
    :destroy-on-hide="true"
    name="slide-up"
    @after-leave="onDestroyed"
  >
    <view>
      <text>Leaves no content when hidden</text>
    </view>
  </ms-transition>
  <!-- Advanced -->
  <ms-transition :visible="leftVisible" name="slide-left" :duration="300">
    <view>
      <text>Slide in from left</text>
    </view>
  </ms-transition>
  <ms-transition :visible="downVisible" name="slide-down" :duration="300">
    <view>
      <text>Slide down content</text>
    </view>
  </ms-transition>
  <ms-transition :visible="zoomVisible" name="zoom" :duration="300">
    <view>
      <text>Zoom transition content</text>
    </view>
  </ms-transition>
</template>

<script setup lang="uts">
const destroyVisible = ref(true)

const downVisible = ref(true)

const fadeVisible = ref(true)

const leftVisible = ref(true)

const slideVisible = ref(true)

const zoomVisible = ref(true)

function onDestroyed() : void {
  console.log('onDestroyed')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| name | `'fade' \| 'zoom' \| 'slide-left' \| 'slide-right' \| 'slide-up' \| 'slide-down'` | `'fade'` | Effect: fade / zoom / slide-left / slide-right / slide-up / slide-down |
| duration | `number` | `300` | Transition duration (ms) |
| appear | `boolean` | `false` | Whether to play the enter transition on first render |
| destroyOnHide | `boolean` | `false` | Whether to remove the slot content after it is hidden |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| before-enter | — | Fires before the enter transition starts |
| after-enter | — | Fires after the enter transition ends |
| before-leave | — | Fires before the leave transition starts |
| after-leave | — | Fires after the leave transition ends |

## Slots

| Slot | Description |
| --- | --- |
| default | Content to animate |
