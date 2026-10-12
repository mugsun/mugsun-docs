---
title: Cell Group
demo: pages/demo/basic/cell
---

# Cell Group

`ms-cell-group` — Cell Group for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-cell-group`).
Demo route: `#/pages/demo/basic/cell`.

## Basic usage

```vue
<template>
  <ms-cell-group theme="default" title="…">
    …
  </ms-cell-group>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
