---
title: Text
demo: pages/demo/basic/text
---

# Text

语义化文字。`variant` / `size` / `bold` / `align` / `lines` / `selectable`。行高 1.7（对齐 x-text）。高亮/正则为二期。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-text`).
Demo route: `#/pages/demo/basic/text`.

## Basic usage

```vue
<template>
  <ms-text variant="default" size="sm">
    …
  </ms-text>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'secondary' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| bold | `boolean` | `false` | — |
| lines | `number` | `0` | — |
| selectable | `boolean` | `false` | — |
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

- Component: `uni_modules/ms-ui/components/ms-text/`
- Demo: `#/pages/demo/basic/text`
- Chinese docs: [/uniappx/components/text](/uniappx/components/text)
