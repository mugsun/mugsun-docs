---
title: Badge
demo: pages/demo/basic/badge
---

# Badge

`ms-badge` — Badge for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-badge` (commercial edition; source not public).
Demo route: `#/pages/demo/basic/badge`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/badge.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 红点 -->
  <ms-badge dot>
    <view />
  </ms-badge>
  <ms-badge dot>
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
  <!-- 数字 -->
  <ms-badge :count="8">
    <view />
  </ms-badge>
  <ms-badge :count="100" :max="99">
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
  <!-- 自定义 -->
  <ms-badge label="NEW">
    <ms-button size="sm" variant="outline" theme="default">按钮</ms-button>
  </ms-badge>
  <!-- 形状 -->
  <ms-badge :count="2" shape="circle">
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
  <ms-badge :count="6" shape="square">
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| count | `number` | `0` | Numeric badge; preferred over label |
| label | `string` | `''` | Text badge (when not numeric) |
| dot | `boolean` | `false` | Whether to show a dot badge (ignores numeric count) |
| max | `number` | `99` | Numeric cap; shows max+ when exceeded |
| showZero | `boolean` | `false` | Whether to still show when count is 0 |
| theme | `'danger' \| 'primary' \| 'success' \| 'warning'` | `'danger'` | Theme color |
| shape | `'circle' \| 'square'` | `'circle'` | Shape |
| size | `'sm' \| 'md'` | `'md'` | Size |
| offset | `number[]` | `[]` | [x,y] offset from the anchor (px) |
| standalone | `boolean` | `false` | Standalone badge (does not wrap an anchor) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-badge/`
- Demo: `#/pages/demo/basic/badge`
- Chinese docs: [/uniappx/components/badge](/uniappx/components/badge)
