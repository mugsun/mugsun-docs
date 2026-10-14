---
title: Skeleton 骨架
demo: pages/demo/display/skeleton
---

# Skeleton 骨架

`ms-skeleton` 是骨架屏，提供 `theme` 预设，可选 `flashed` 透明度闪烁效果；`loading=false` 时显示默认插槽内容。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-skeleton`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/display/skeleton`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/skeleton.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 骨架屏类型 -->
  <ms-skeleton theme="avatar" />
  <ms-skeleton theme="image" />
  <ms-skeleton theme="text" />
  <!-- 组合布局 -->
  <ms-skeleton theme="paragraph" />
  <!-- 组件动效 -->
  <ms-skeleton theme="paragraph" animation="none" />
  <ms-skeleton theme="paragraph" animation="flashed" />
  <!-- 组件深度 -->
  <ms-skeleton theme="card" :row="3" animation="flashed" />
  <ms-skeleton theme="paragraph" :row="5" />
  <ms-skeleton theme="text" :row="2" :delay="400" :loading="true" />
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| loading | `boolean` | `true` | 是否加载中 |
| delay | `number` | `0` | 延迟（ms） |
| theme | `'avatar' \| 'image' \| 'text' \| 'paragraph' \| 'card'` | `'text'` | 主题色 |
| animation | `'none' \| 'flashed'` | `'none'` | 动画：none / flashed |
| row | `number` | `0` | paragraph/text 行数（2–6） |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-skeleton/`
- 演示: `#/pages/demo/display/skeleton`
