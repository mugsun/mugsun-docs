---
title: Watermark
demo: pages/demo/display/watermark
---

# Watermark

`ms-watermark` — Watermark for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-watermark`).
Demo route: `#/pages/demo/display/watermark`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/watermark.uvue`; see them running in the phone frame.

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

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `'Mugsun'` | Content text |
| density | `string` | `'md'` | Density |
| layout | `string` | `'rectangular'` | Layout |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-watermark/`
- Demo: `#/pages/demo/display/watermark`
- Chinese docs: [/uniappx/components/watermark](/uniappx/components/watermark)
