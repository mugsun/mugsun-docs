---
title: Cell Group
demo: pages/demo/basic/cell
---

# Cell Group

单元格组容器。用 `theme`（default|card）、`title`；default 插槽放 ms-cell。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-cell-group`).
Demo route: `#/pages/demo/basic/cell`.

## Basic usage

```vue
<template>
  <ms-cell-group theme="default" title="…">
    …
  </ms-cell-group>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'card'` | `'default'` | — |
| title | `string` | `''` | — |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-cell-group/`
- Demo: `#/pages/demo/basic/cell`
- Chinese docs: [/uniappx/components/cell-group](/uniappx/components/cell-group)
