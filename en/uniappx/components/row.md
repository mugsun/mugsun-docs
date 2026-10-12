---
title: Row
demo: pages/demo/nav/row
---

# Row

栅格行：flex 横排；`justify`/`align`/`wrap`；`gutter` 经 provide 注入给 `ms-col`，行侧负 margin 齐边。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-row`).
Demo route: `#/pages/demo/nav/row`.

## Basic usage

```vue
<template>
  <ms-row>
    …
  </ms-row>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| gutter | `0 \| 8 \| 16 \| 24` | `0` | — |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around'` | `'start'` | — |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | — |
| wrap | `boolean` | `true` | — |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-row/`
- Demo: `#/pages/demo/nav/row`
- Chinese docs: [/uniappx/components/row](/uniappx/components/row)
