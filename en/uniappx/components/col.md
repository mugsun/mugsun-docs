---
title: Col
demo: pages/demo/nav/col
---

# Col

`ms-col` is a grid column. `span` and `offset` set its width and left margin, and `gutter` is injected by the parent `ms-row`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-col`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/nav/col`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/col.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Span -->
  <ms-col :span="8">
    <view>
      <text>8 columns</text>
    </view>
  </ms-col>
  <ms-col :span="16">
    <view>
      <text>16 columns</text>
    </view>
  </ms-col>
  <ms-col :span="24">
    <view>
      <text>Full width</text>
    </view>
  </ms-col>
  <!-- Offset -->
  <ms-col :span="8" :offset="4">
    <view>
      <text>Offset 4</text>
    </view>
  </ms-col>
  <ms-col :span="12" :offset="12">
    <view>
      <text>Offset 12</text>
    </view>
  </ms-col>
  <!-- Gutter -->
  <ms-col :span="8">
    <view>
      <text>Column with gutter</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>Column with gutter</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>Column with gutter</text>
    </view>
  </ms-col>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| span | `number` | `24` | Grid span |
| offset | `number` | `0` | Offset |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-col/`
- Demo: `#/pages/demo/nav/col`
- Chinese docs: [/uniappx/components/col](/uniappx/components/col)
