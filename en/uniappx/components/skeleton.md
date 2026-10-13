---
title: Skeleton
demo: pages/demo/display/skeleton
---

# Skeleton

`ms-skeleton` — Skeleton for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-skeleton`).
Demo route: `#/pages/demo/display/skeleton`.

## Basic usage

```vue
<template>
  <ms-skeleton theme="avatar">
    …
  </ms-skeleton>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| loading | `boolean` | `true` | Whether loading |
| delay | `number` | `0` | Delay (ms) |
| theme | `'avatar' \| 'image' \| 'text' \| 'paragraph' \| 'card'` | `'text'` | Theme color |
| animation | `'none' \| 'flashed'` | `'none'` | Animation: none / flashed |
| row | `number` | `0` | Paragraph/text line count (2–6) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-skeleton/`
- Demo: `#/pages/demo/display/skeleton`
- Chinese docs: [/uniappx/components/skeleton](/uniappx/components/skeleton)
