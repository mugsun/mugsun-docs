---
title: Watermark
demo: pages/demo/display/watermark
---

# Watermark

`ms-watermark`: Watermark. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-watermark`).
Demo route: `#/pages/demo/display/watermark`.

## Basic usage

```vue
<template>
  <ms-watermark>
    …
  </ms-watermark>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `'Mugsun'` | — |
| density | `string` | `'md'` | — |
| layout | `string` | `'rectangular'` | — |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-watermark/`
- Demo: `#/pages/demo/display/watermark`
- Chinese docs: [/uniappx/components/watermark](/uniappx/components/watermark)
