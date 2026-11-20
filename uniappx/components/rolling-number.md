---
title: Rolling Number 翻滚数字
demo: pages/demo/display/rolling-number
---

# Rolling Number 翻滚数字

`ms-rolling-number` 以滚动动画显示数值，`value` 变化时从当前值过渡到目标值。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-rolling-number :value="decimalVal" />
  <ms-rolling-number :value="intVal" :duration="1100" :decimals="0" />
  <!-- 组件样式 -->
  <ms-rolling-number :value="moneyVal" :grouping="true" prefix="¥" :decimals="2" />
  <ms-rolling-number :value="bigVal" size="lg" :decimals="0" />
  <!-- 组件深度 -->
  <ms-rolling-number :value="suffixVal" suffix="%" :decimals="1" />
  <ms-rolling-number :value="staticVal" :animated="false" :decimals="0" />
  <ms-rolling-number :value="startVal" :start="10" :decimals="0" />
</template>

<script setup lang="uts">
const bigVal = ref(9600)

const decimalVal = ref(2023.2)

const intVal = ref(1998)

const moneyVal = ref(12880.5)

const startVal = ref(88)

const staticVal = ref(100)

const suffixVal = ref(68.5)
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 目标数值 |
| start | `number` | `0` | 初始显示的数值，挂载后从它滚动到 `value` |
| duration | `number` | `400` | 动画时长（ms） |
| decimals | `number` | `-1` | 小数位数，`-1` 时按 `value` 的小数位数 |
| grouping | `boolean` | `false` | 是否显示千分位分隔符 |
| prefix | `string` | `''` | 前缀文字 |
| suffix | `string` | `''` | 后缀文字 |
| animated | `boolean` | `true` | 是否使用动画，`false` 时直接显示新值 |
| size | `'md' \| 'lg'` | `'md'` | 尺寸 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| start | — | 动画开始时触发 |
| complete | — | 数值到达目标值时触发，不使用动画时也会触发 |
| change | `value: number` | 显示的数值每次更新时触发，`value` 是当前显示的数值 |
