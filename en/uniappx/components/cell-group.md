---
title: Cell Group
demo: pages/demo/basic/cell
---

# Cell Group

`ms-cell-group` is a container for cells. Set `theme` (default or card) and `title`, and place ms-cell items in the default slot.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-cell-group`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/cell`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/cell.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <ms-cell-group theme="card">
    <ms-cell title="Single-line title" icon="customer-service-line" arrow />
    <ms-cell title="Single-line title" icon="global-line" arrow />
    <ms-cell title="Single-line title" icon="lock-line" arrow :bordered="false" />
  </ms-cell-group>
  <ms-cell-group>
    <ms-cell title="Common features" icon="apps-line" description="High-quality component library" arrow />
    <ms-cell title="Pricing" icon="price-tag-3-line" note="+￥32" arrow />
    <ms-cell title="Message notifications" icon="customer-service-line" note="Test" arrow />
    <ms-cell title="Tag page" icon="gift-line" note="Test" arrow :bordered="false" />
  </ms-cell-group>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'card'` | `'default'` | Theme color |
| title | `string` | `''` | Title |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-cell-group/`
- Demo: `#/pages/demo/basic/cell`
- Chinese docs: [/uniappx/components/cell-group](/uniappx/components/cell-group)
