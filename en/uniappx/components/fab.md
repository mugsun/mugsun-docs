---
title: Fab
demo: pages/demo/feedback/fab
---

# Fab

悬浮球：定位档 + expandable；`v-model:expanded`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-fab`).
Demo route: `#/pages/demo/feedback/fab`.

## Basic usage

```vue
<template>
  <ms-fab text="…" :disabled="true">
    …
  </ms-fab>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | — |
| text | `string` | `''` | — |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | — |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| expandable | `boolean` | `false` | — |
| expanded | `boolean` | `false` | 展开态（受控，配 update:expanded） |
| local | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| expand-change | expand-change |
| update:expanded | update:expanded |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-fab/`
- Demo: `#/pages/demo/feedback/fab`
- Chinese docs: [/uniappx/components/fab](/uniappx/components/fab)
