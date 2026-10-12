---
title: Overlay
demo: pages/demo/basic/overlay
---

# Overlay

`ms-overlay`: Overlay. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-overlay`).
Demo route: `#/pages/demo/basic/overlay`.

## Basic usage

```vue
<template>
  <ms-overlay v-model:visible="open">
    …
  </ms-overlay>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| closable | `boolean` | `true` | — |
| zIndex | `number` | `1000` | — |
| dim | `'light' \| 'normal' \| 'heavy'` | `'normal'` | 遮罩浓度：浅 / 常规 / 深（语义档，非任意颜色字符串） |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| open | Opened |
| update:visible | v-model:visible update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-overlay/`
- Demo: `#/pages/demo/basic/overlay`
- Chinese docs: [/uniappx/components/overlay](/uniappx/components/overlay)
