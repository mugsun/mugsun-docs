---
title: Watermark 水印
demo: pages/demo/display/watermark
---

# Watermark 水印

`ms-watermark`：区域文字水印（view 平铺，无 canvas）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-watermark`）。
演示路由：`#/pages/demo/display/watermark`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/watermark.uvue`，可在右侧手机框中查看运行效果。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `'Mugsun'` | 内容文案 |
| density | `string` | `'md'` | 密度 |
| layout | `string` | `'rectangular'` | 布局 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-watermark/`
- 演示: `#/pages/demo/display/watermark`
