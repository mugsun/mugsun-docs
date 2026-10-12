---
title: Snackbar
demo: pages/demo/feedback/snackbar
---

# Snackbar

`ms-snackbar`: Snackbar. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-snackbar`).
Demo route: `#/pages/demo/feedback/snackbar`.

## Basic usage

```vue
<template>
  <ms-snackbar theme="info" v-model:visible="open">
    …
  </ms-snackbar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| content | `string` | `''` | — |
| theme | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | — |
| showIcon | `boolean` | `true` | 是否显示主题默认图标 |
| icon | `string` | `''` | 自定义图标名（icons.uts）；空串时用 theme 默认 |
| closeBtn | `boolean` | `false` | — |
| actionText | `string` | `''` | 右侧操作文案；空串不显示 |
| placement | `'top' \| 'bottom'` | `'top'` | — |
| align | `'left' \| 'center'` | `'left'` | 文案对齐：left / center |
| block | `boolean` | `false` | 通栏：去掉 max-width，横条贴边铺满 |
| duration | `number` | `3000` | 毫秒；0 表示不自动关闭 |
| zIndex | `number` | `1200` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |
| action | Action button |
| duration-end | duration-end |

## See also

- Component: `uni_modules/ms-ui/components/ms-snackbar/`
- Demo: `#/pages/demo/feedback/snackbar`
- Chinese docs: [/uniappx/components/snackbar](/uniappx/components/snackbar)
