---
title: Title
demo: pages/demo/nav/title
---

# Title

`ms-title`: Title. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-title`).
Demo route: `#/pages/demo/nav/title`.

## Basic usage

```vue
<template>
  <ms-title>
    …
  </ms-title>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | — |
| level | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | — |
| lines | `number` | `0` | — |
| align | `'left' \| 'center' \| 'right'` | `'left'` | — |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-title/`
- Demo: `#/pages/demo/nav/title`
- Chinese docs: [/uniappx/components/title](/uniappx/components/title)
