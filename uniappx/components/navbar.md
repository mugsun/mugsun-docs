---
title: Navbar 顶栏
demo: pages/demo/nav/navbar
---

# Navbar 顶栏

`ms-navbar` 是自定义顶部导航栏，左侧是返回和首页按钮，中间是标题，右侧是操作区。

点击返回或首页按钮只触发事件，跳转需要在 `go-back` 和 `go-home` 里自行处理。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-navbar title="纯标题" :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="带返回"
    left-arrow
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
  />
  <ms-navbar
    title="返回加首页"
    left-arrow
    home-icon
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
    @go-home="onHome"
  />
  <ms-navbar title="标题居中" left-arrow :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="标题左对齐"
    title-align="left"
    left-arrow
    :fixed="false"
    :safe-area-inset-top="false"
  />
  <ms-navbar
    left-arrow
    left-text="返回带文案"
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
  />
  <ms-navbar title="浅色" left-arrow theme="light" :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="品牌色"
    left-arrow
    theme="brand"
    :fixed="false"
    :safe-area-inset-top="false"
  />
</template>

<script setup lang="uts">
function onBack() : void {
  console.log('onBack')
}

function onHome() : void {
  console.log('onHome')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `''` | 标题 |
| titleAlign | `'center' \| 'left'` | `'center'` | 标题对齐：center / left |
| titleMaxLength | `number` | `0` | 标题最大字数，超出用 … 收尾；0 表示不截断 |
| leftArrow | `boolean` | `false` | 是否显示左侧返回箭头 |
| leftText | `string` | `''` | 返回箭头旁的文字，留空时只显示箭头 |
| homeIcon | `boolean` | `false` | 是否在返回按钮旁显示首页按钮 |
| theme | `'light' \| 'brand'` | `'light'` | 配色：light 浅色 / brand 品牌色 |
| fixed | `boolean` | `true` | 是否固定在页面顶部 |
| placeholder | `boolean` | `false` | 固定时是否在页面里留出同样的高度，避免内容被挡住 |
| safeAreaInsetTop | `boolean` | `true` | 是否预留顶部安全区 |
| zIndex | `number` | `500` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| go-back | — | 点击返回按钮时触发 |
| go-home | — | 点击首页按钮时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| left | 左侧的附加内容，显示在返回和首页按钮后面 |
| title | 自定义标题 |
| right | 右侧操作区 |
