---
title: Watermark
demo: pages/demo/display/watermark
---

# Watermark

`ms-watermark` tiles a text watermark over an area. Put the content in the default slot; the watermark sits on top of it and does not block taps.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `'Mugsun'` | Watermark text |
| density | `string` | `'md'` | Density: sm (dense) / md / lg (sparse) |
| layout | `string` | `'rectangular'` | Layout: rectangular (aligned) / stagger (every other row shifted) |

## Slots

| Slot | Description |
| --- | --- |
| default | Content to watermark |
