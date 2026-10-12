---
title: Grid
demo: pages/demo/nav/grid
---

# Grid

宫格容器 + `ms-grid-item` 子项；`column`/`border`/`theme`；子项 `icon`+`text`/`description`/`disabled`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-grid`).
Demo route: `#/pages/demo/nav/grid`.

## Basic usage

```vue
<template>
  <ms-grid theme="default">
    …
  </ms-grid>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| column | `3 \| 4 \| 5` | `4` | — |
| border | `boolean` | `false` | — |
| theme | `'default' \| 'card'` | `'default'` | — |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-grid/`
- Demo: `#/pages/demo/nav/grid`
- Chinese docs: [/uniappx/components/grid](/uniappx/components/grid)
