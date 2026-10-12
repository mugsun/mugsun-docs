---
title: Fab
demo: pages/demo/feedback/fab
---

# Fab

`ms-fab` — Fab for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-fab`).
Demo route: `#/pages/demo/feedback/fab`.

## Basic usage

```vue
<template>
  <ms-fab text="…">
    …
  </ms-fab>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | Icon name (icons.uts) |
| text | `string` | `''` | Label beside the primary button; empty = icon only |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | Position |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | Whether inset style |
| expandable | `boolean` | `false` | Whether sub-actions can expand |
| expanded | `boolean` | `false` | Expanded state (controlled; pairs with update:expanded) |
| local | `boolean` | `false` | Relative to parent; false = fixed to the edge |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| expand-change | expand-change |
| update:expanded | update:expanded |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-fab/`
- Demo: `#/pages/demo/feedback/fab`
- Chinese docs: [/uniappx/components/fab](/uniappx/components/fab)
