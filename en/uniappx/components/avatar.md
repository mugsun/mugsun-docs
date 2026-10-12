---
title: Avatar
demo: pages/demo/display/avatar
---

# Avatar

`ms-avatar`: Avatar. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-avatar`).
Demo route: `#/pages/demo/display/avatar`.

## Basic usage

```vue
<template>
  <ms-avatar size="sm" text="…">
    …
  </ms-avatar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | — |
| text | `string` | `''` | — |
| icon | `string` | `''` | — |
| shape | `'circle' \| 'round'` | `'circle'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| mode | `string` | `'aspectFill'` | — |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| error | Error |

## See also

- Component: `uni_modules/ms-ui/components/ms-avatar/`
- Demo: `#/pages/demo/display/avatar`
- Chinese docs: [/uniappx/components/avatar](/uniappx/components/avatar)
