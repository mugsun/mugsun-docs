---
title: Tabbar
demo: pages/demo/nav/tabbar
---

# Tabbar

底部导航：纯文字 / 图标 / 徽标；`v-model:value`；fixed + placeholder。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tabbar`).
Demo route: `#/pages/demo/nav/tabbar`.

## Basic usage

```vue
<template>
  <ms-tabbar theme="normal">
    …
  </ms-tabbar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / count / badge / dot / disabled |
| theme | `'normal' \| 'tag'` | `'normal'` | — |
| shape | `'normal' \| 'round'` | `'normal'` | — |
| bordered | `boolean` | `true` | 顶部外边框 |
| split | `boolean` | `false` | 项间分割线 |
| fixed | `boolean` | `true` | — |
| placeholder | `boolean` | `false` | fixed 时在文档流占位，避免压住页面底部内容 |
| safeAreaInsetBottom | `boolean` | `true` | — |
| zIndex | `number` | `400` | — |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-tabbar/`
- Demo: `#/pages/demo/nav/tabbar`
- Chinese docs: [/uniappx/components/tabbar](/uniappx/components/tabbar)
