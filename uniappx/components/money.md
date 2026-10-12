---
title: Money 金额
demo: pages/demo/display/money
---

# Money 金额

`ms-money`：金额栅格：小数位 / 千分位 / 符号 / 大写 / 语义色。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-money`）。
演示路由：`#/pages/demo/display/money`。

## 基础用法

```vue
<template>
  <ms-money size="sm">
    …
  </ms-money>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
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

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-money/`
- 演示：`#/pages/demo/display/money`
