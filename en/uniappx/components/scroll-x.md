---
title: Scroll X
demo: pages/demo/display/scroll-x
---

# Scroll X

横向滚动容器（`scroll-view direction="horizontal"`）+ 底部进度指示条。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-scroll-x`).
Demo route: `#/pages/demo/display/scroll-x`.

## Basic usage

```vue
<template>
  <ms-scroll-x>
    …
  </ms-scroll-x>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| indicator | `boolean` | `true` | — |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| inset | `boolean` | `false` | — |
| showScrollbar | `boolean` | `false` | — |
| scrollWithAnimation | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| scroll | scroll |
| scrolltoupper | scrolltoupper |
| scrolltolower | scrolltolower |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-scroll-x/`
- Demo: `#/pages/demo/display/scroll-x`
- Chinese docs: [/uniappx/components/scroll-x](/uniappx/components/scroll-x)
