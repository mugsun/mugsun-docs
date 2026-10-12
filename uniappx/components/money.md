---
title: Money 金额
demo: pages/demo/display/money
---

# Money 金额

`ms-money`：金额栅格：小数位 / 千分位 / 符号 / 大写 / 语义色。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 当前值 |
| digit | `number` | `2` | 是否数字 / 小数位相关 |
| thousand | `boolean` | `false` | 是否千分位分隔 |
| thousandLen | `number` | `3` | 千分位分组长度 |
| thousandUnit | `string` | `','` | 千分位分隔符 |
| symbol | `string` | `'¥'` | 货币符号 |
| symbolPosition | `'left' \| 'right'` | `'left'` | 符号位置：left / right |
| showCn | `boolean` | `false` | 是否显示中文大写金额 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| tone | `'default' \| 'primary' \| 'success' \| 'danger'` | `'default'` | 语义色：收入/支出等 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-money/`
- 演示: `#/pages/demo/display/money`
