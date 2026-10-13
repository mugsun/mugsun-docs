---
title: Sticky
demo: pages/demo/nav/sticky
---

# Sticky

`ms-sticky` — Sticky for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-sticky` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/sticky`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/sticky.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Types -->
  <ms-sticky :scroll-top="baseScrollTop" :anchor-top="80" @change="onBaseStuck">
    <view>
      <text>Basic sticky bar</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="boxScrollTop" :anchor-top="80">
    <view>
      <text>Sticky bar in container</text>
    </view>
  </ms-sticky>
  <!-- States -->
  <ms-sticky :scroll-top="disabledScrollTop" :anchor-top="80" :disabled="true">
    <view>
      <text>Disabled sticky bar</text>
    </view>
  </ms-sticky>
  <!-- Offset top -->
  <ms-sticky :scroll-top="offsetScrollTop" :anchor-top="80" :offset-top="40">
    <view>
      <text>Sticky bar 40px from top</text>
    </view>
  </ms-sticky>
  <!-- Advanced -->
  <ms-sticky
    :scroll-top="depthScrollTop"
    :anchor-top="80"
    :z-index="100"
    :height="44"
    @change="onDepthStuck"
  >
    <view>
      <text>Higher z-index sticky bar</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="stackScrollTop" :anchor-top="80" :height="40" :z-index="20">
    <view>
      <text>Upper bar</text>
    </view>
  </ms-sticky>
  <ms-sticky
    :scroll-top="stackScrollTop"
    :anchor-top="160"
    :offset-top="40"
    :height="40"
    :z-index="19"
  >
    <view>
      <text>Lower bar, offset 40</text>
    </view>
  </ms-sticky>
</template>

<script setup lang="uts">
const baseScrollTop = ref(0)

const boxScrollTop = ref(0)

const depthScrollTop = ref(0)

const disabledScrollTop = ref(0)

const offsetScrollTop = ref(0)

const stackScrollTop = ref(0)

function onBaseStuck(next: boolean) : void {
  console.log('onBaseStuck')
}

function onDepthStuck(next: boolean) : void {
  console.log('onDepthStuck')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | scrollTop from host scroll-view @scroll detail |
| offsetTop | `number` | `0` | Offset from container top when stuck (px) |
| height | `number` | `0` | When >0, skip measurement and use this fixed height |
| zIndex | `number` | `10` | Sticky z-index (well below overlay) |
| disabled | `boolean` | `false` | Disable sticky; always in normal flow |
| anchorTop | `number` | `0` | Anchor offset in scroll content; >0 skips measurement (most stable cross-end) |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| scroll | Scroll |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sticky/`
- Demo: `#/pages/demo/nav/sticky`
- Chinese docs: [/uniappx/components/sticky](/uniappx/components/sticky)
