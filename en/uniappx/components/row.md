---
title: Row
demo: pages/demo/nav/row
---

# Row

`ms-row` is a grid row laid out with flex. It supports `justify`, `align` and `wrap`. `gutter` is provided to `ms-col`, and the row uses negative margins so the edges stay aligned.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-row`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/nav/row`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/row.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Basic -->
  <ms-row>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
  </ms-row>
  <ms-row>
    <ms-col :span="4">
      <view>
        <text>4</text>
      </view>
    </ms-col>
    <ms-col :span="16">
      <view>
        <text>16</text>
      </view>
    </ms-col>
    <ms-col :span="4">
      <view>
        <text>4</text>
      </view>
    </ms-col>
  </ms-row>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| gutter | `0 \| 8 \| 16 \| 24` | `0` | Grid gutter (px) |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around'` | `'start'` | Main-axis alignment |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | Alignment |
| wrap | `boolean` | `true` | Whether to wrap |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-row/`
- Demo: `#/pages/demo/nav/row`
- Chinese docs: [/uniappx/components/row](/uniappx/components/row)
