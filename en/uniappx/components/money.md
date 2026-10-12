---
title: Money
demo: pages/demo/display/money
---

# Money

`ms-money`: Money. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-money`).
Demo route: `#/pages/demo/display/money`.

## Basic usage

```vue
<template>
  <ms-money size="sm">
    …
  </ms-money>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | — |
| digit | `number` | `2` | — |
| thousand | `boolean` | `false` | — |
| thousandLen | `number` | `3` | — |
| thousandUnit | `string` | `','` | — |
| symbol | `string` | `'¥'` | — |
| symbolPosition | `'left' \| 'right'` | `'left'` | — |
| showCn | `boolean` | `false` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| tone | `'default' \| 'primary' \| 'success' \| 'danger'` | `'default'` | 语义色：收入/支出等 |

## See also

- Component: `uni_modules/ms-ui/components/ms-money/`
- Demo: `#/pages/demo/display/money`
- Chinese docs: [/uniappx/components/money](/uniappx/components/money)
