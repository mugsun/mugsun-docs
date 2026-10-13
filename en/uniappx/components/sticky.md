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
  <!-- 组件类型 -->
  <ms-sticky :scroll-top="baseScrollTop" :anchor-top="80" @change="onBaseStuck">
    <view>
      <text>基础吸顶条</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="boxScrollTop" :anchor-top="80">
    <view>
      <text>容器内吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 组件状态 -->
  <ms-sticky :scroll-top="disabledScrollTop" :anchor-top="80" :disabled="true">
    <view>
      <text>禁用吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 吸顶距离 -->
  <ms-sticky :scroll-top="offsetScrollTop" :anchor-top="80" :offset-top="40">
    <view>
      <text>距顶 40px 的吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 组件深度 -->
  <ms-sticky
    :scroll-top="depthScrollTop"
    :anchor-top="80"
    :z-index="100"
    :height="44"
    @change="onDepthStuck"
  >
    <view>
      <text>高层吸顶条</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="stackScrollTop" :anchor-top="80" :height="40" :z-index="20">
    <view>
      <text>上层条</text>
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
      <text>下层偏 40</text>
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
