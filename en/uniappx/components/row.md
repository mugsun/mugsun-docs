---
title: Row
demo: pages/demo/nav/row
---

# Row

`ms-row` — Row for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-row`).
Demo route: `#/pages/demo/nav/row`.

## Basic usage

```vue
<template>
  <ms-row>
    …
  </ms-row>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| gutter | `0 \| 8 \| 16 \| 24` | `0` | Grid gutter (px) |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around'` | `'start'` | Main-axis alignment |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | Alignment |
| wrap | `boolean` | `true` | Whether to wrap |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-row/`
- Demo: `#/pages/demo/nav/row`
- Chinese docs: [/uniappx/components/row](/uniappx/components/row)
