---
title: Title
demo: pages/demo/nav/title
---

# Title

`ms-title` — Title for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-title`).
Demo route: `#/pages/demo/nav/title`.

## Basic usage

```vue
<template>
  <ms-title>
    …
  </ms-title>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | Content text |
| level | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | Level count |
| lines | `number` | `0` | Row count |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Alignment |

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
