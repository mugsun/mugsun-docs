---
title: Skeleton
demo: pages/demo/display/skeleton
---

# Skeleton

`ms-skeleton` — Skeleton for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-skeleton` (commercial edition; source not public).
Demo route: `#/pages/demo/display/skeleton`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/skeleton.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 骨架屏类型 -->
  <ms-skeleton theme="avatar" />
  <ms-skeleton theme="image" />
  <ms-skeleton theme="text" />
  <!-- 组合布局 -->
  <ms-skeleton theme="paragraph" />
  <!-- 组件动效 -->
  <ms-skeleton theme="paragraph" animation="none" />
  <ms-skeleton theme="paragraph" animation="flashed" />
  <!-- 组件深度 -->
  <ms-skeleton theme="card" :row="3" animation="flashed" />
  <ms-skeleton theme="paragraph" :row="5" />
  <ms-skeleton theme="text" :row="2" :delay="400" :loading="true" />
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| loading | `boolean` | `true` | Whether loading |
| delay | `number` | `0` | Delay (ms) |
| theme | `'avatar' \| 'image' \| 'text' \| 'paragraph' \| 'card'` | `'text'` | Theme color |
| animation | `'none' \| 'flashed'` | `'none'` | Animation: none / flashed |
| row | `number` | `0` | Paragraph/text line count (2–6) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-skeleton/`
- Demo: `#/pages/demo/display/skeleton`
- Chinese docs: [/uniappx/components/skeleton](/uniappx/components/skeleton)
