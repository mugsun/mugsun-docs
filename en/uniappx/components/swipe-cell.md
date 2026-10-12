---
title: Swipe Cell
demo: pages/demo/feedback/swipe-cell
---

# Swipe Cell

`ms-swipe-cell`: Swipe Cell. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-swipe-cell`).
Demo route: `#/pages/demo/feedback/swipe-cell`.

## Basic usage

```vue
<template>
  <ms-swipe-cell :disabled="true">
    …
  </ms-swipe-cell>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | 受控：右侧面板是否展开 |
| openedLeft | `boolean` | `false` | 受控：左侧面板是否展开 |
| disabled | `boolean` | `false` | 禁用手势 |
| threshold | `number` | `20` | 位移阈值，超过才吸附到位 |
| bordered | `boolean` | `true` | 底部分隔线 |

## Events

| Event | Description |
| --- | --- |
| update:opened | update:opened |
| update:openedLeft | update:openedLeft |
| open | Opened |
| close | Closed |
| click | Click |
| dragstart | dragstart |
| dragend | dragend |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| actions | `actions` slot |
| left | `left` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-swipe-cell/`
- Demo: `#/pages/demo/feedback/swipe-cell`
- Chinese docs: [/uniappx/components/swipe-cell](/uniappx/components/swipe-cell)
