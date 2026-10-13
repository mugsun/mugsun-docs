---
title: Watermark
demo: pages/demo/display/watermark
---

# Watermark

`ms-watermark` — Watermark for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-watermark` (commercial edition; source not public).
Demo route: `#/pages/demo/display/watermark`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/watermark.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Types -->
  <ms-watermark content="Internal use only" density="md">
    <view>
      <text>Business card</text>
      <text>The watermark covers the content without affecting taps or scrolling.</text>
    </view>
  </ms-watermark>
  <!-- Styles -->
  <ms-watermark content="Mugsun" density="md">
    <view>
      <text>Medium-spaced tiling</text>
    </view>
  </ms-watermark>
  <ms-watermark content="Dense" density="sm">
    <view>
      <text>Denser text watermark</text>
    </view>
  </ms-watermark>
  <ms-watermark content="Stagger" density="md" layout="stagger">
    <view>
      <text>Odd rows staggered</text>
    </view>
  </ms-watermark>
  <!-- Advanced -->
  <ms-watermark content="Sparse" density="lg">
    <view>
      <text>Wide-spaced tiling</text>
    </view>
  </ms-watermark>
  <ms-watermark content="Staggered" density="lg" layout="stagger">
    <view>
      <text>Sparse + odd rows staggered</text>
    </view>
  </ms-watermark>
  <ms-watermark content="Confidential: do not share" density="md">
    <view>
      <text>Longer content still tiles on the grid</text>
    </view>
  </ms-watermark>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `'Mugsun'` | Content text |
| density | `string` | `'md'` | Density |
| layout | `string` | `'rectangular'` | Layout |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-watermark/`
- Demo: `#/pages/demo/display/watermark`
- Chinese docs: [/uniappx/components/watermark](/uniappx/components/watermark)
