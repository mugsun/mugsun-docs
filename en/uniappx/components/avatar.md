---
title: Avatar
demo: pages/demo/display/avatar
---

# Avatar

`ms-avatar` — Avatar for uni-app x.

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
| src | `string` | `''` | Resource URL |
| text | `string` | `''` | Display text |
| icon | `string` | `''` | Icon name (icons.uts) |
| shape | `'circle' \| 'round'` | `'circle'` | Shape |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| mode | `string` | `'aspectFill'` | Mode |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| error | Error |

## See also

- Component: `uni_modules/ms-ui/components/ms-avatar/`
- Demo: `#/pages/demo/display/avatar`
- Chinese docs: [/uniappx/components/avatar](/uniappx/components/avatar)
