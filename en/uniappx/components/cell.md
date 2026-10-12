---
title: Cell
demo: pages/demo/basic/cell
---

# Cell

列表单元格。用 `title` / `description` / `note` / `icon` / `arrow` / `bordered` / `required` / `url` / `disabled`；右侧自定义放 `note` 插槽。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-cell`).
Demo route: `#/pages/demo/basic/cell`.

## Basic usage

```vue
<template>
  <ms-cell title="…" :disabled="true">
    …
  </ms-cell>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | — |
| description | `string` | `''` | — |
| note | `string` | `''` | — |
| icon | `string` | `''` | — |
| image | `string` | `''` | 左侧图片（优先于 icon） |
| arrow | `boolean` | `false` | — |
| bordered | `boolean` | `true` | — |
| required | `boolean` | `false` | — |
| url | `string` | `''` | — |
| disabled | `boolean` | `false` | — |
| align | `'top' \| 'middle' \| 'bottom'` | `'middle'` | 右侧区垂直对齐 |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| note | `note` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-cell/`
- Demo: `#/pages/demo/basic/cell`
- Chinese docs: [/uniappx/components/cell](/uniappx/components/cell)
