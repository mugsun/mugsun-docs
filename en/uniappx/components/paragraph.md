---
title: Paragraph
demo: pages/demo/display/paragraph
---

# Paragraph

`ms-paragraph`: Paragraph. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-paragraph`).
Demo route: `#/pages/demo/display/paragraph`.

## Basic usage

```vue
<template>
  <ms-paragraph size="sm">
    …
  </ms-paragraph>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | — |
| tone | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | — |
| lines | `number` | `0` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-paragraph/`
- Demo: `#/pages/demo/display/paragraph`
- Chinese docs: [/uniappx/components/paragraph](/uniappx/components/paragraph)
