---
title: Watermark 水印
demo: pages/demo/display/watermark
---

# Watermark 水印

`ms-watermark` 在一块区域上铺满文字水印。把内容放进默认插槽，水印会盖在内容上方，不影响点击。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-watermark content="仅内部使用" density="md">
    <view>
      <text>业务卡片</text>
      <text>水印覆盖内容区，不影响点击与滚动。</text>
    </view>
  </ms-watermark>
  <!-- 组件样式 -->
  <ms-watermark content="Mugsun" density="md">
    <view>
      <text>中等间距平铺</text>
    </view>
  </ms-watermark>
  <ms-watermark content="密" density="sm">
    <view>
      <text>更密的文字水印</text>
    </view>
  </ms-watermark>
  <ms-watermark content="错位" density="md" layout="stagger">
    <view>
      <text>奇数行错位布局</text>
    </view>
  </ms-watermark>
  <!-- 组件深度 -->
  <ms-watermark content="稀疏" density="lg">
    <view>
      <text>大间距平铺</text>
    </view>
  </ms-watermark>
  <ms-watermark content="交错" density="lg" layout="stagger">
    <view>
      <text>稀疏 + 奇数行错位</text>
    </view>
  </ms-watermark>
  <ms-watermark content="内部资料请勿外传" density="md">
    <view>
      <text>较长 content 仍按网格平铺</text>
    </view>
  </ms-watermark>
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `'Mugsun'` | 水印文字 |
| density | `string` | `'md'` | 疏密程度：sm 较密 / md / lg 较疏 |
| layout | `string` | `'rectangular'` | 排列方式：rectangular 对齐排列 / stagger 隔行错开 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 要加水印的内容 |
