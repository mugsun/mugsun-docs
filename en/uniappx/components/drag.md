---
title: Drag
demo: pages/demo/media/drag
---

# Drag

`ms-drag` — Drag for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-drag`).
Demo route: `#/pages/demo/media/drag`.

## Basic usage

```vue
<template>
  <ms-drag>
    …
  </ms-drag>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| col | `number` | `1` | Column span |
| scrollDiff | `number` | `25` | Pixels to scroll each time when dragged near an edge |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| start | Started |
| end | end |
| move | move |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-drag/`
- Demo: `#/pages/demo/media/drag`
- Chinese docs: [/uniappx/components/drag](/uniappx/components/drag)
