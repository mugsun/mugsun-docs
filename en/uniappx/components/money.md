---
title: Money
demo: pages/demo/display/money
---

# Money

`ms-money` displays amounts with configurable decimal places, thousands separators, currency symbols, Chinese uppercase numerals and semantic colors.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-money`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/money`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/money.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-money :value="0.01" />
  <ms-money :value="15568.398" :digit="3" thousand size="lg" />
  <ms-money :value="1568" symbol="$" />
  <!-- States -->
  <ms-money :value="moneyValue" :digit="4" show-cn />
  <!-- Advanced -->
  <ms-money :value="1288.5" thousand tone="success" size="lg" />
  <ms-money :value="-86.2" thousand tone="danger" />
  <ms-money :value="9.9" size="sm" tone="primary" />
</template>

<script setup lang="uts">
const moneyValue = ref(1568.3984)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
