---
title: Money
demo: pages/demo/display/money
---

# Money

`ms-money` — Money for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-money` (repository not yet public).
Demo route: `#/pages/demo/display/money`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/money.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-money :value="0.01" />
  <ms-money :value="15568.398" :digit="3" thousand size="lg" />
  <ms-money :value="1568" symbol="$" />
  <!-- 组件状态 -->
  <ms-money :value="moneyValue" :digit="4" show-cn />
  <!-- 组件深度 -->
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
