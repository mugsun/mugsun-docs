---
title: Tabbar
demo: pages/demo/nav/tabbar
---

# Tabbar

`ms-tabbar` — Tabbar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tabbar`).
Demo route: `#/pages/demo/nav/tabbar`.

## Basic usage

```vue
<template>
  <ms-tabbar theme="normal">
    …
  </ms-tabbar>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| items | `UTSJSONObject[]` | `[]` | Each item: label / icon / count / badge / dot / disabled |
| theme | `'normal' \| 'tag'` | `'normal'` | Theme color |
| shape | `'normal' \| 'round'` | `'normal'` | Shape |
| bordered | `boolean` | `true` | Top border |
| split | `boolean` | `false` | Divider between items |
| fixed | `boolean` | `true` | Whether fixed positioned |
| placeholder | `boolean` | `false` | When fixed, reserve flow space so content is not covered |
| safeAreaInsetBottom | `boolean` | `true` | Whether to reserve bottom safe area |
| zIndex | `number` | `400` | z-index |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-tabbar/`
- Demo: `#/pages/demo/nav/tabbar`
- Chinese docs: [/uniappx/components/tabbar](/uniappx/components/tabbar)
