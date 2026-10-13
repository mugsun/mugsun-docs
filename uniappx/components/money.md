---
title: Money 金额
demo: pages/demo/display/money
---

# Money 金额

`ms-money`：金额栅格：小数位 / 千分位 / 符号 / 大写 / 语义色。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-money`（源码仓暂未公开）。
演示路由：`#/pages/demo/display/money`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/money.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
