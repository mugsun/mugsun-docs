---
title: Drag Item
demo: pages/demo/media/drag
---

# Drag Item

`ms-drag-item` — Drag Item for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-drag-item`).
Demo route: `#/pages/demo/media/drag`.

## Basic usage

```vue
<template>
  <ms-drag-item>
    …
  </ms-drag-item>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| order | `number` | `0` | Sort order (smaller comes first) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-drag-item/`
- Demo: `#/pages/demo/media/drag`
- Chinese docs: [/uniappx/components/drag-item](/uniappx/components/drag-item)
