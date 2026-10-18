---
title: Rolling Number 翻滚数字
demo: pages/demo/display/rolling-number
---

# Rolling Number 翻滚数字

`ms-rolling-number` 以滚动动画显示数值，`value` 变化时从当前值过渡到目标值。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-rolling-number`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/display/rolling-number`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/rolling-number.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 当前值 |
| start | `number` | `0` | 起始值 |
| duration | `number` | `400` | 时长（ms） |
| decimals | `number` | `-1` | 小数位数 |
| grouping | `boolean` | `false` | 是否分组 |
| prefix | `string` | `''` | 前缀 |
| suffix | `string` | `''` | 后缀 |
| animated | `boolean` | `true` | 是否开启动画 |
| size | `'md' \| 'lg'` | `'md'` | 尺寸 |

## 事件

| 事件 | 说明 |
| --- | --- |
| start | 开始 |
| complete | complete |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-rolling-number/`
- 演示: `#/pages/demo/display/rolling-number`
