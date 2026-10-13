---
title: Paragraph
demo: pages/demo/display/paragraph
---

# Paragraph

`ms-paragraph` — Paragraph for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-paragraph`).
Demo route: `#/pages/demo/display/paragraph`.

## Basic usage

```vue
<template>
  <ms-paragraph size="sm">
    …
  </ms-paragraph>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | Content text |
| tone | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Text tone: default / secondary / success / warning / danger |
| lines | `number` | `0` | Row count |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

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
