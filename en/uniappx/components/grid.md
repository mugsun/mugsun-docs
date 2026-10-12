---
title: Grid
demo: pages/demo/nav/grid
---

# Grid

`ms-grid` — Grid for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-grid`).
Demo route: `#/pages/demo/nav/grid`.

## Basic usage

```vue
<template>
  <ms-grid theme="default">
    …
  </ms-grid>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| column | `3 \| 4 \| 5` | `4` | Column count |
| border | `boolean` | `false` | Whether to show border |
| theme | `'default' \| 'card'` | `'default'` | Theme color |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-grid/`
- Demo: `#/pages/demo/nav/grid`
- Chinese docs: [/uniappx/components/grid](/uniappx/components/grid)
