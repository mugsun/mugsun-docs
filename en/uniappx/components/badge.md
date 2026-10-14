---
title: Badge
demo: pages/demo/basic/badge
---

# Badge

`ms-badge` wraps the default slot and shows a dot, a number or text in the top-right corner. `label` takes precedence over `count` and `dot`; with `standalone` the badge is shown on its own. The component has no style props such as color or fontSize.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-badge`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/badge`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/badge.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Dot -->
  <ms-badge dot>
    <view />
  </ms-badge>
  <ms-badge dot>
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
  <!-- Count -->
  <ms-badge :count="8">
    <view />
  </ms-badge>
  <ms-badge :count="100" :max="99">
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
  <!-- Custom -->
  <ms-badge label="NEW">
    <ms-button size="sm" variant="outline" theme="default">Button</ms-button>
  </ms-badge>
  <!-- Shapes -->
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
