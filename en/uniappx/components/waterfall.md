---
title: Waterfall
demo: pages/demo/display/waterfall
---

# Waterfall

`ms-waterfall` — Waterfall for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-waterfall`).
Demo route: `#/pages/demo/display/waterfall`.

## Basic usage

```vue
<template>
  <ms-waterfall>
    …
  </ms-waterfall>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Entries |
| column | `number` | `2` | Column count |
| balance | `boolean` | `true` | Whether to equalize column heights when possible |
| itemHeight | `number` | `120` | Item height (px) |
| titleKey | `string` | `'title'` | Title field name |
| descKey | `string` | `'desc'` | Description field name |
| heightKey | `string` | `'height'` | Height field name |
| imageKey | `string` | `'image'` | Image field name |
| coverHeightKey | `string` | `'coverHeight'` | Cover height field name |
| keyField | `string` | `'id'` | Primary key field name |
| emptyText | `string` | `'暂无数据'` | Empty-state text |
| coverHeight | `number` | `88` | Default cover height when image is set |

## Events

| Event | Description |
| --- | --- |
| item-click | Item click |

## See also

- Component: `uni_modules/ms-ui/components/ms-waterfall/`
- Demo: `#/pages/demo/display/waterfall`
- Chinese docs: [/uniappx/components/waterfall](/uniappx/components/waterfall)
