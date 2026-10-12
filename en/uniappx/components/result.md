---
title: Result
demo: pages/demo/display/result
---

# Result

`ms-result`: Result. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-result`).
Demo route: `#/pages/demo/display/result`.

## Basic usage

```vue
<template>
  <ms-result theme="default" title="…">
    …
  </ms-result>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | — |
| title | `string` | `''` | — |
| description | `string` | `''` | — |
| icon | `string` | `''` | 覆盖主题默认图标；'none' 表示不显示图标 |
| image | `string` | `''` | 图片地址，有值时优先于图标 |
| showActions | `boolean` | `false` | 是否渲染操作区（默认插槽） |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| description | `description` slot |
| title | `title` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-result/`
- Demo: `#/pages/demo/display/result`
- Chinese docs: [/uniappx/components/result](/uniappx/components/result)
