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
| items | `UTSJSONObject[]` | `[]` | Items list |
| column | `number` | `2` | Column count |
| balance | `boolean` | `true` | Whether balanced / justified |
| itemHeight | `number` | `120` | Item height (px) |
| titleKey | `string` | `'title'` | titleKey string value |
| descKey | `string` | `'desc'` | Description field key |
| heightKey | `string` | `'height'` | Height field key |
| imageKey | `string` | `'image'` | Image field key |
| coverHeightKey | `string` | `'coverHeight'` | Cover height field key |
| keyField | `string` | `'id'` | Key field name |
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
