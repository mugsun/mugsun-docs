---
title: Skeleton 骨架
demo: pages/demo/display/skeleton
---

# Skeleton 骨架

`ms-skeleton` 是骨架屏，加载时显示占位图形，`loading` 为 `false` 时显示默认插槽里的内容。

占位图形用 `theme` 选择，可以加上闪烁效果。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| loading | `boolean` | `true` | 是否加载中 |
| delay | `number` | `0` | 延迟显示骨架屏的时间（ms），避免加载很快时闪一下 |
| theme | `'avatar' \| 'image' \| 'text' \| 'paragraph' \| 'card'` | `'text'` | 占位图形：avatar 头像 / image 图片 / text 文本 / paragraph 段落 / card 卡片 |
| animation | `'none' \| 'flashed'` | `'none'` | 动画：none 无 / flashed 闪烁 |
| row | `number` | `0` | 文本和段落的行数，`0` 时使用默认行数 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 加载完成后显示的内容 |
