---
title: Waterfall
demo: pages/demo/display/waterfall
---

# Waterfall

`ms-waterfall`: Waterfall. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-waterfall`).
Demo route: `#/pages/demo/display/waterfall`.

## Basic usage

```vue
<template>
  <ms-waterfall>
    …
  </ms-waterfall>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | — |
| column | `number` | `2` | — |
| balance | `boolean` | `true` | — |
| itemHeight | `number` | `120` | — |
| titleKey | `string` | `'title'` | — |
| descKey | `string` | `'desc'` | — |
| heightKey | `string` | `'height'` | — |
| imageKey | `string` | `'image'` | — |
| coverHeightKey | `string` | `'coverHeight'` | — |
| keyField | `string` | `'id'` | — |
| emptyText | `string` | `'暂无数据'` | — |
| coverHeight | `number` | `88` | 缺省封面高（有 image 时） |

## Events

| Event | Description |
| --- | --- |
| item-click | Menu item click |

## See also

- Component: `uni_modules/ms-ui/components/ms-waterfall/`
- Demo: `#/pages/demo/display/waterfall`
- Chinese docs: [/uniappx/components/waterfall](/uniappx/components/waterfall)
