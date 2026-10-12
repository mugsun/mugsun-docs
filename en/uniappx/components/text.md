---
title: Text
demo: pages/demo/basic/text
---

# Text

`ms-text` — Text for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-text`).
Demo route: `#/pages/demo/basic/text`.

## Basic usage

```vue
<template>
  <ms-text variant="default" size="sm">
    …
  </ms-text>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'secondary' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | Style variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| bold | `boolean` | `false` | Whether bold |
| lines | `number` | `0` | Row count |
| selectable | `boolean` | `false` | Whether text is selectable |
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

- Component: `uni_modules/ms-ui/components/ms-text/`
- Demo: `#/pages/demo/basic/text`
- Chinese docs: [/uniappx/components/text](/uniappx/components/text)
