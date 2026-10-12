---
title: Pagination
demo: pages/demo/nav/pagination
---

# Pagination

页码：完整窗口 / 简易上一页下一页；`showPrevNext` / `showJumper`；`v-model:value`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-pagination`).
Demo route: `#/pages/demo/nav/pagination`.

## Basic usage

```vue
<template>
  <ms-pagination :disabled="true">
    …
  </ms-pagination>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `1` | — |
| total | `number` | `0` | — |
| pageSize | `number` | `10` | — |
| maxButtons | `number` | `3` | — |
| minButtons | `number` | `5` | — |
| simple | `boolean` | `false` | — |
| showTotal | `boolean` | `true` | — |
| disabled | `boolean` | `false` | — |
| showPrevNext | `boolean` | `false` | 完整模式两侧上一页/下一页 |
| showJumper | `boolean` | `false` | 跳转到指定页 |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-pagination/`
- Demo: `#/pages/demo/nav/pagination`
- Chinese docs: [/uniappx/components/pagination](/uniappx/components/pagination)
