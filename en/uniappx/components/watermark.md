---
title: Watermark
demo: pages/demo/display/watermark
---

# Watermark

`ms-watermark` shows a text watermark over an area, tiled with views rather than drawn on a canvas.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-watermark`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/watermark`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/watermark.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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
