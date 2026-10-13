---
title: Navbar 顶栏
demo: pages/demo/nav/navbar
---

# Navbar 顶栏

`ms-navbar`：自定义顶栏。左侧返回/首页 + 中间标题 + 右侧操作，三插槽 `left` / `title` / `right`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-navbar`）。
演示路由：`#/pages/demo/nav/navbar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/navbar.uvue`，可在右侧手机框中查看运行效果。

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
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `''` | 标题 |
| titleAlign | `'center' \| 'left'` | `'center'` | 标题对齐：center / left |
| titleMaxLength | `number` | `0` | 标题最大字数，超出用 … 收尾；0 表示不截断 |
| leftArrow | `boolean` | `false` | 是否显示左侧返回箭头 |
| leftText | `string` | `''` | 左侧返回文案；空串只显示箭头 |
| homeIcon | `boolean` | `false` | 返回旁再放一个首页入口 |
| theme | `'light' \| 'brand'` | `'light'` | 主题色 |
| fixed | `boolean` | `true` | 是否固定定位 |
| placeholder | `boolean` | `false` | fixed 时是否在文档流里占位，避免内容被压住 |
| safeAreaInsetTop | `boolean` | `true` | 是否预留顶部安全区 |
| zIndex | `number` | `500` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| go-back | go-back |
| go-home | go-home |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| left | `left` 插槽 |
| right | `right` 插槽 |
| title | `title` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-navbar/`
- 演示: `#/pages/demo/nav/navbar`
