---
title: Sheet
demo: pages/demo/basic/sheet
---

# Sheet

`ms-sheet` — Sheet for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-sheet`).
Demo route: `#/pages/demo/basic/sheet`.

## Basic usage

```vue
<template>
  <ms-sheet variant="default">
    …
  </ms-sheet>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'muted' \| 'primary'` | `'default'` | Style variant |
| radius | `'md' \| 'lg'` | `'lg'` | Border radius (px) |
| padding | `'none' \| 'md' \| 'lg'` | `'md'` | Padding (px) |
| margin | `'none' \| 'page'` | `'none'` | Outer margin: none / page |
| bordered | `boolean` | `false` | Whether to show border |
| shadow | `boolean` | `false` | Whether shadowed |
| loading | `boolean` | `false` | Whether loading |
| url | `string` | `''` | Navigation URL |
| pressable | `boolean` | `false` | Press feedback; treated as clickable when url is set |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sheet/`
- Demo: `#/pages/demo/basic/sheet`
- Chinese docs: [/uniappx/components/sheet](/uniappx/components/sheet)
