---
title: Badge
demo: pages/demo/basic/badge
---

# Badge

`ms-badge` — Badge for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-badge`).
Demo route: `#/pages/demo/basic/badge`.

## Basic usage

```vue
<template>
  <ms-badge theme="danger" size="sm">
    …
  </ms-badge>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
