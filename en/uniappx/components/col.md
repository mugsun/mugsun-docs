---
title: Col
demo: pages/demo/nav/col
---

# Col

`ms-col` — Col for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-col` (repository not yet public).
Demo route: `#/pages/demo/nav/col`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/col.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 占比 -->
  <ms-col :span="8">
    <view>
      <text>八栏</text>
    </view>
  </ms-col>
  <ms-col :span="16">
    <view>
      <text>十六栏</text>
    </view>
  </ms-col>
  <ms-col :span="24">
    <view>
      <text>全宽</text>
    </view>
  </ms-col>
  <!-- 偏移 -->
  <ms-col :span="8" :offset="4">
    <view>
      <text>偏移四</text>
    </view>
  </ms-col>
  <ms-col :span="12" :offset="12">
    <view>
      <text>偏移十二</text>
    </view>
  </ms-col>
  <!-- 间距 -->
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
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
