---
title: Badge
demo: pages/demo/basic/badge
---

# Badge

`ms-badge`: Badge. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-badge`).
Demo route: `#/pages/demo/basic/badge`.

## Basic usage

```vue
<template>
  <ms-badge theme="danger" size="sm">
    …
  </ms-badge>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| count | `number` | `0` | — |
| label | `string` | `''` | — |
| dot | `boolean` | `false` | — |
| max | `number` | `99` | — |
| showZero | `boolean` | `false` | — |
| theme | `'danger' \| 'primary' \| 'success' \| 'warning'` | `'danger'` | — |
| shape | `'circle' \| 'square'` | `'circle'` | — |
| size | `'sm' \| 'md'` | `'md'` | — |
| offset | `number[]` | `[]` | — |
| standalone | `boolean` | `false` | 独立展示徽标（不包裹锚点） |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-badge/`
- Demo: `#/pages/demo/basic/badge`
- Chinese docs: [/uniappx/components/badge](/uniappx/components/badge)
