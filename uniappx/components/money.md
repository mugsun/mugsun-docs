---
title: Money 金额
demo: pages/demo/display/money
---

# Money 金额

`ms-money` 用于显示金额，可以设置小数位数、千分位和货币符号，还可以显示中文大写金额。颜色用 `tone` 设置。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 金额 |
| digit | `number` | `2` | 小数位数，多出的位数直接截断，不四舍五入 |
| thousand | `boolean` | `false` | 是否千分位分隔 |
| thousandLen | `number` | `3` | 千分位分组长度 |
| thousandUnit | `string` | `','` | 千分位分隔符 |
| symbol | `string` | `'¥'` | 货币符号 |
| symbolPosition | `'left' \| 'right'` | `'left'` | 符号位置：left / right |
| showCn | `boolean` | `false` | 是否显示中文大写金额 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| tone | `'default' \| 'primary' \| 'success' \| 'danger'` | `'default'` | 颜色：default / primary / success / danger |
