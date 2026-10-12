---
title: Drag Item
demo: pages/demo/media/drag
---

# Drag Item

`ms-drag-item`: Drag Item. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-drag-item`).
Demo route: `#/pages/demo/media/drag`.

## Basic usage

```vue
<template>
  <ms-drag-item :disabled="true">
    …
  </ms-drag-item>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| order | `number` | `0` | — |
| disabled | `boolean` | `false` | — |

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
