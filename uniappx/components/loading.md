---
title: Loading 加载
demo: pages/demo/basic/loading
---

# Loading 加载

`ms-loading` 是加载指示器，由转圈动画和一段文字组成，可以横向或纵向排列。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 纯图标 -->
  <ms-loading text="" />
  <!-- 横向 -->
  <ms-loading layout="horizontal" text="加载中…" />
  <!-- 竖向 -->
  <ms-loading layout="vertical" text="加载中…" />
  <!-- 纯文字 -->
  <ms-loading :indicator="false" text="加载中…" />
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `'加载中…'` | 提示文字 |
| layout | `'horizontal' \| 'vertical'` | `'vertical'` | 排列方向：horizontal 横向 / vertical 纵向 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| tone | `'default' \| 'primary' \| 'inverse'` | `'default'` | 色调：default / primary / inverse |
| indicator | `boolean` | `true` | 是否显示转圈动画 |
| paused | `boolean` | `false` | 是否暂停转圈动画 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 自定义文字区域，替换 `text` |
