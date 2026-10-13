---
title: Money
demo: pages/demo/display/money
---

# Money

`ms-money` — Money for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-money`).
Demo route: `#/pages/demo/display/money`.

## Basic usage

```vue
<template>
  <ms-money size="sm">
    …
  </ms-money>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Current value |
| digit | `number` | `2` | Digit / decimal-related |
| thousand | `boolean` | `false` | Whether to use thousands separators |
| thousandLen | `number` | `3` | Thousands grouping size |
| thousandUnit | `string` | `','` | Thousands separator |
| symbol | `string` | `'¥'` | Currency symbol |
| symbolPosition | `'left' \| 'right'` | `'left'` | Symbol position: left / right |
| showCn | `boolean` | `false` | Whether to show Chinese uppercase amount |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| tone | `'default' \| 'primary' \| 'success' \| 'danger'` | `'default'` | Semantic color (income/expense, etc.) |

## See also

- Component: `uni_modules/ms-ui/components/ms-money/`
- Demo: `#/pages/demo/display/money`
- Chinese docs: [/uniappx/components/money](/uniappx/components/money)
