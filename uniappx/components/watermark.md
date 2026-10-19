---
title: Watermark 水印
demo: pages/demo/display/watermark
---

# Watermark 水印

`ms-watermark` 在指定区域内显示文字水印，水印由 view 平铺生成，不使用 canvas。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-watermark`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/display/watermark`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/watermark.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
