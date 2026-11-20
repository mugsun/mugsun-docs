---
title: Row 栅格行
demo: pages/demo/nav/row
---

# Row 栅格行

`ms-row` 是栅格的行，里面放 [`ms-col`](./col)，可以设置列间距、对齐方式和是否换行。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 基础 -->
  <ms-row>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
  </ms-row>
  <ms-row>
    <ms-col :span="4">
      <view>
        <text>4</text>
      </view>
    </ms-col>
    <ms-col :span="16">
      <view>
        <text>16</text>
      </view>
    </ms-col>
    <ms-col :span="4">
      <view>
        <text>4</text>
      </view>
    </ms-col>
  </ms-row>
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| gutter | `0 \| 8 \| 16 \| 24` | `0` | 列间距（px） |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around'` | `'start'` | 水平对齐方式 |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | 垂直对齐方式 |
| wrap | `boolean` | `true` | 放不下时是否换行 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 放置 `ms-col` |
