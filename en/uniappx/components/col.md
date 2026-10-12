---
title: Col
demo: pages/demo/nav/col
---

# Col

栅格列：`span`/`offset` → BEM 宽与 margin；`gutter` 来自行 inject。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-col`).
Demo route: `#/pages/demo/nav/col`.

## Basic usage

```vue
<template>
  <ms-col>
    …
  </ms-col>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| span | `number` | `24` | — |
| offset | `number` | `0` | — |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-col/`
- Demo: `#/pages/demo/nav/col`
- Chinese docs: [/uniappx/components/col](/uniappx/components/col)
