---
title: Col
demo: pages/demo/nav/col
---

# Col

`ms-col` is a grid column used inside [`ms-row`](./row). A row has 24 units: `span` is the column width and `offset` is the number of units left empty on the left.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Span -->
  <ms-col :span="8">
    <view>
      <text>8 columns</text>
    </view>
  </ms-col>
  <ms-col :span="16">
    <view>
      <text>16 columns</text>
    </view>
  </ms-col>
  <ms-col :span="24">
    <view>
      <text>Full width</text>
    </view>
  </ms-col>
  <!-- Offset -->
  <ms-col :span="8" :offset="4">
    <view>
      <text>Offset 4</text>
    </view>
  </ms-col>
  <ms-col :span="12" :offset="12">
    <view>
      <text>Offset 12</text>
    </view>
  </ms-col>
  <!-- Gutter -->
  <ms-col :span="8">
    <view>
      <text>Column with gutter</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>Column with gutter</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>Column with gutter</text>
    </view>
  </ms-col>
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| span | `number` | `24` | Column width in units out of 24 |
| offset | `number` | `0` | Units left empty on the left |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the column is tapped |

## Slots

| Slot | Description |
| --- | --- |
| default | Column content |
