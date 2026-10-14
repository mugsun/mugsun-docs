---
title: View To Full
demo: pages/demo/media/view-tofull
---

# View To Full

`ms-view-tofull` expands an area to full screen when tapped and returns it to its original position when closed.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-view-tofull`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/media/view-tofull`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/view-tofull.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-view-tofull v-model:opened="openedA" @opened="onOpened">
    <view :class="openedA ? 'demo-full-card--open' : ''">
      <text>Tap to expand</text>
      <text>Tap the card to go full screen</text>
      <view v-if="openedA">
        <text>Extra content: details and lists visible after expanding.</text>
        <text>Useful for videos or details without opening a new page.</text>
      </view>
    </view>
  </ms-view-tofull>
  <!-- Styles -->
  <ms-view-tofull v-model:opened="openedB">
    <view :class="openedB ? 'demo-full-card--open' : ''">
      <text>Card A</text>
      <text v-if="openedB">Extra content for A</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedC">
    <view :class="openedC ? 'demo-full-card--open' : ''">
      <text>Card B</text>
      <text v-if="openedC">Extra content for B</text>
    </view>
  </ms-view-tofull>
  <!-- Advanced -->
  <ms-view-tofull v-model:opened="openedSlow" :duration="600">
    <view :class="openedSlow ? 'demo-full-card--open' : ''">
      <text>Slow expand 600ms</text>
      <text v-if="openedSlow">Slow animation extra content</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedNoClose" :show-close="false" :duration="280">
    <view :class="openedNoClose ? 'demo-full-card--open' : ''" @click.stop="toggleNoClose">
      <text>No close button · tap again to collapse</text>
      <text v-if="openedNoClose">Tap here to close</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedFast" :duration="120">
    <view :class="openedFast ? 'demo-full-card--open' : ''">
      <text>Fast expand 120ms</text>
      <text v-if="openedFast">Short transition</text>
    </view>
  </ms-view-tofull>
</template>

<script setup lang="uts">
const openedA = ref(false)

const openedB = ref(false)

const openedC = ref(false)

const openedFast = ref(false)

const openedNoClose = ref(false)

const openedSlow = ref(false)

function onOpened() : void {
  console.log('onOpened')
}

function toggleNoClose() : void {
  console.log('toggleNoClose')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| duration | `number` | `300` | Duration (ms) |
| showClose | `boolean` | `true` | Whether to show close when fullscreen |
| opened | `boolean` | `false` | Whether to open fullscreen |

## Events

| Event | Description |
| --- | --- |
| open | Opened |
| close | Closed |
| opened | opened |
| closed | closed |
| update:opened | update:opened |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-view-tofull/`
- Demo: `#/pages/demo/media/view-tofull`
- Chinese docs: [/uniappx/components/view-tofull](/uniappx/components/view-tofull)
