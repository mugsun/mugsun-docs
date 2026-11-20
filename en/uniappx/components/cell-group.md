---
title: Cell Group
demo: pages/demo/basic/cell
---

# Cell Group

`ms-cell-group` groups several [`ms-cell`](./cell) items, with an optional group title and a choice between full-width and card styles.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'card'` | `'default'` | Style: `default` is full-width, `card` is a card |
| title | `string` | `''` | Group title |

## Slots

| Slot | Description |
| --- | --- |
| default | Place `ms-cell` items here |
