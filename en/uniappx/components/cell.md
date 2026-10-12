---
title: Cell
demo: pages/demo/basic/cell
---

# Cell

`ms-cell` — Cell for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-cell`).
Demo route: `#/pages/demo/basic/cell`.

## Basic usage

```vue
<template>
  <ms-cell title="…">
    …
  </ms-cell>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | Title |
| description | `string` | `''` | Description text |
| note | `string` | `''` | Note |
| icon | `string` | `''` | Icon name (icons.uts) |
| image | `string` | `''` | Left image (preferred over icon) |
| arrow | `boolean` | `false` | Whether to show arrow |
| bordered | `boolean` | `true` | Whether bordered |
| required | `boolean` | `false` | Whether required |
| url | `string` | `''` | URL |
| disabled | `boolean` | `false` | Whether disabled |
| align | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Vertical alignment of the right area |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| note | `note` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-cell/`
- Demo: `#/pages/demo/basic/cell`
- Chinese docs: [/uniappx/components/cell](/uniappx/components/cell)
