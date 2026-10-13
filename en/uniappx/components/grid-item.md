---
title: Grid Item
demo: pages/demo/nav/grid
---

# Grid Item

`ms-grid-item` — Grid Item for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-grid-item`).
Demo route: `#/pages/demo/nav/grid`.

## Basic usage

```vue
<template>
  <ms-grid-item text="…">
    …
  </ms-grid-item>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| icon | `string` | `'apps-line'` | Icon name (icons.uts) |
| text | `string` | `''` | Display text |
| description | `string` | `''` | Secondary text under the icon |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## See also

- Component: `uni_modules/ms-ui/components/ms-grid-item/`
- Demo: `#/pages/demo/nav/grid`
- Chinese docs: [/uniappx/components/grid-item](/uniappx/components/grid-item)
