---
title: Row
demo: pages/demo/nav/row
---

# Row

`ms-row` — Row for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-row` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/row`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/row.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 基础 -->
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
