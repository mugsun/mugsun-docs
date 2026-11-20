---
title: Divider 分割线
demo: pages/demo/basic/divider
---

# Divider 分割线

`ms-divider` 是分割线，可以水平或垂直放置，线条可以改成虚线。

分割线中间可以带文字，文字位置可设为靠左、居中或靠右，也可以用默认插槽放自定义内容。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 纯分割 -->
  <ms-divider />
  <!-- 对齐 -->
  <ms-divider text="左对齐" align="left" />
  <ms-divider text="居中" align="center" />
  <ms-divider text="右对齐" align="right" />
  <!-- 垂直 -->
  <ms-divider layout="vertical" />
  <ms-divider layout="vertical" />
  <!-- 虚线 -->
  <ms-divider dashed />
  <ms-divider dashed text="文字信息" align="left" />
  <ms-divider dashed text="文字信息" align="center" />
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| layout | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向：水平或垂直 |
| align | `'left' \| 'center' \| 'right'` | `'center'` | 文字位置 |
| dashed | `boolean` | `false` | 是否虚线 |
| text | `string` | `''` | 分割线上的文字 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 自定义分割线上的内容，默认显示 `text` |
