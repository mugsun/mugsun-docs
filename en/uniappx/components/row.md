---
title: Row
demo: pages/demo/nav/row
---

# Row

`ms-row` is a grid row that holds [`ms-col`](./col) columns. It sets the gutter between columns, the alignment and wrapping.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Basic -->
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| gutter | `0 \| 8 \| 16 \| 24` | `0` | Gutter between columns (px) |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around'` | `'start'` | Horizontal alignment |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | Vertical alignment |
| wrap | `boolean` | `true` | Whether columns wrap when they do not fit |

## Slots

| Slot | Description |
| --- | --- |
| default | Place `ms-col` columns here |
