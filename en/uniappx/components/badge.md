---
title: Badge
demo: pages/demo/basic/badge
---

# Badge

`ms-badge` wraps the content in its default slot and shows a dot, a number or text in the top-right corner.

When more than one is set, `label` wins over `dot`, and `dot` over `count`. With `standalone`, the badge is shown on its own.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| count | `number` | `0` | Numeric badge; the number is not shown when label or dot is set |
| label | `string` | `''` | Text badge; when not empty, it takes priority over dot and count |
| dot | `boolean` | `false` | Dot badge; takes priority over count, ignored when label is not empty |
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
| default | Content the badge is attached to |
