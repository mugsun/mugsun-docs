---
title: Grid Item
demo: pages/demo/nav/grid
---

# Grid Item

`ms-grid-item` — Grid Item for uni-app x.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-grid-item`).
Demo route: `#/pages/demo/nav/grid`.

## Basic usage

```vue
<template>
  <ms-grid-item text="…" :disabled="true">
    …
  </ms-grid-item>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| icon | `string` | `'apps-line'` | — |
| text | `string` | `''` | — |
| description | `string` | `''` | 副文案（图标下方第二行） |
| disabled | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## See also

- Component: `uni_modules/ms-ui/components/ms-grid-item/`
- Demo: `#/pages/demo/nav/grid`
- Chinese docs: [/uniappx/components/grid-item](/uniappx/components/grid-item)
