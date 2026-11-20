---
title: Money
demo: pages/demo/display/money
---

# Money

`ms-money` displays an amount with configurable decimal places, thousands separator and currency symbol, and can also show the amount in Chinese uppercase numerals. `tone` sets the color.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Amount |
| digit | `number` | `2` | Decimal places; extra digits are truncated, not rounded |
| thousand | `boolean` | `false` | Whether to use thousands separators |
| thousandLen | `number` | `3` | Thousands grouping size |
| thousandUnit | `string` | `','` | Thousands separator |
| symbol | `string` | `'¥'` | Currency symbol |
| symbolPosition | `'left' \| 'right'` | `'left'` | Symbol position: left / right |
| showCn | `boolean` | `false` | Whether to show Chinese uppercase amount |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| tone | `'default' \| 'primary' \| 'success' \| 'danger'` | `'default'` | Color: default / primary / success / danger |
