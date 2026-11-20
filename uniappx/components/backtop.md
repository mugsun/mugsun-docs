---
title: Backtop 返回顶部
demo: pages/demo/nav/backtop
---

# Backtop 返回顶部

`ms-backtop` 是返回顶部按钮，仅在 `scrollTop` 大于或等于 `visibilityHeight` 时显示。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 主题样式 -->
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round"
    text="顶部"
  />
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="half-round"
    text="返回"
  />
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round-dark"
  />
  <!-- 内容 -->
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round"
  />
  <!-- 局部滚动 -->
  <ms-backtop
    :scroll-top="localScrollY"
    :visibility-height="40"
    local
    theme="round-dark"
    @to-top="onLocalToTop"
  />
</template>

<script setup lang="uts">
const localScrollY = ref(0)

function onLocalToTop() : void {
  console.log('onLocalToTop')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | 页面滚动距离（px） |
| visibilityHeight | `number` | `200` | 滚动超过该距离才显示（px） |
| theme | `'round' \| 'half-round' \| 'round-dark' \| 'half-round-dark'` | `'round'` | 按钮样式 |
| text | `string` | `''` | 按钮文字，可选 |
| icon | `string` | `'skip-up-fill'` | 图标名（icons.uts） |
| fixed | `boolean` | `true` | 是否固定定位 |
| local | `boolean` | `false` | 相对父级定位；开启后点击只触发事件，需要自行滚动容器 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| to-top | — | 点击按钮时触发；未开启 `local` 时页面同时滚回顶部 |
| click | — | 点击按钮时触发，紧跟在 `to-top` 之后 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 自定义按钮内容，默认显示图标 |
