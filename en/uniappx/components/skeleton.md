---
title: Skeleton
demo: pages/demo/display/skeleton
---

# Skeleton

骨架屏：`theme` 预设 + 可选 `flashed` opacity 闪烁；`loading=false` 出默认 slot。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-skeleton`).
Demo route: `#/pages/demo/display/skeleton`.

## Basic usage

```vue
<template>
  <ms-skeleton theme="avatar" :loading="true">
    …
  </ms-skeleton>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| loading | `boolean` | `true` | — |
| delay | `number` | `0` | — |
| theme | `'avatar' \| 'image' \| 'text' \| 'paragraph' \| 'card'` | `'text'` | — |
| animation | `'none' \| 'flashed'` | `'none'` | — |
| row | `number` | `0` | paragraph/text 行数（2–6） |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-skeleton/`
- Demo: `#/pages/demo/display/skeleton`
- Chinese docs: [/uniappx/components/skeleton](/uniappx/components/skeleton)
