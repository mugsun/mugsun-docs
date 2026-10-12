---
title: Watermark
demo: pages/demo/display/watermark
---

# Watermark

`ms-watermark` — Watermark for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-watermark`).
Demo route: `#/pages/demo/display/watermark`.

## Basic usage

```vue
<template>
  <ms-watermark>
    …
  </ms-watermark>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `'Mugsun'` | Content text |
| density | `string` | `'md'` | Density |
| layout | `string` | `'rectangular'` | Layout |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-watermark/`
- Demo: `#/pages/demo/display/watermark`
- Chinese docs: [/uniappx/components/watermark](/uniappx/components/watermark)
