---
title: Col 栅格列
demo: pages/demo/nav/col
---

# Col 栅格列

`ms-col` 是栅格列，放在 [`ms-row`](./row) 里使用。一行分为 24 格，`span` 是列宽，`offset` 是左侧空出的格数。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 占比 -->
  <ms-col :span="8">
    <view>
      <text>八栏</text>
    </view>
  </ms-col>
  <ms-col :span="16">
    <view>
      <text>十六栏</text>
    </view>
  </ms-col>
  <ms-col :span="24">
    <view>
      <text>全宽</text>
    </view>
  </ms-col>
  <!-- 偏移 -->
  <ms-col :span="8" :offset="4">
    <view>
      <text>偏移四</text>
    </view>
  </ms-col>
  <ms-col :span="12" :offset="12">
    <view>
      <text>偏移十二</text>
    </view>
  </ms-col>
  <!-- 间距 -->
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
    </view>
  </ms-col>
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| span | `number` | `24` | 列宽，占 24 格中的几格 |
| offset | `number` | `0` | 左侧空出的格数 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击列时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 列内容 |
