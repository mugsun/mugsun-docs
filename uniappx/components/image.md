---
title: Image 图片
demo: pages/demo/basic/image
---

# Image 图片

`ms-image` 封装原生 `<image>`，在加载中和加载失败时显示占位内容。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 裁切 -->
  <ms-image :src="demoSrc" mode="aspectFill" />
  <ms-image :src="demoSrc" mode="heightFix" />
  <ms-image :src="demoSrc" mode="scaleToFill" />
  <!-- 形状 -->
  <ms-image :src="demoSrc" shape="square" />
  <ms-image :src="demoSrc" shape="round" />
  <ms-image :src="demoSrc" shape="circle" />
  <!-- 状态 -->
  <ms-image :src="demoSrc" />
  <ms-image src="https://invalid.ms-ui.example/error.png" />
  <!-- 组件深度 -->
  <ms-image :src="demoSrc" width="120px" height="80px" shape="round" />
  <ms-image :src="demoSrc" :lazy="true" />
  <ms-image :src="demoSrc" :show-menu-by-longpress="true" />
</template>

<script setup lang="uts">
const demoSrc = '/static/demo-crop.png'
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 图片地址 |
| mode | `string` | `'aspectFill'` | 缩放和裁剪模式，同原生 `image` 的 `mode` |
| shape | `'square' \| 'round' \| 'circle'` | `'square'` | 外形 |
| width | `string` | `'72px'` | 宽度，带单位的字符串 |
| height | `string` | `'72px'` | 高度，带单位的字符串 |
| lazy | `boolean` | `false` | 是否懒加载 |
| showMenuByLongpress | `boolean` | `false` | 长按图片是否弹出识别小程序码的菜单，仅微信小程序有效 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| load | `e: UniImageLoadEvent` | 图片加载成功时触发 |
| error | `e: UniImageErrorEvent` | 图片加载失败时触发 |
| click | — | 点击图片时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| loading | 自定义加载中的占位内容 |
| error | 自定义加载失败的占位内容 |
