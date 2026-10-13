---
title: Avatar
demo: pages/demo/display/avatar
---

# Avatar

`ms-avatar` — Avatar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-avatar`).
Demo route: `#/pages/demo/display/avatar`.

## Basic usage

```vue
<template>
  <ms-avatar size="sm" text="…">
    …
  </ms-avatar>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Avatar image URL |
| text | `string` | `''` | Text when there is no image |
| icon | `string` | `''` | Icon when there is no image and no text |
| shape | `'circle' \| 'round'` | `'circle'` | Shape: circle / round / square |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size tier |
| mode | `string` | `'aspectFill'` | Image mode (e.g. aspectFill) |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| error | Error |

## See also

- Component: `uni_modules/ms-ui/components/ms-avatar/`
- Demo: `#/pages/demo/display/avatar`
- Chinese docs: [/uniappx/components/avatar](/uniappx/components/avatar)
