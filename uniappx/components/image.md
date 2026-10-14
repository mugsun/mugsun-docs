---
title: Image 图片
demo: pages/demo/basic/image
---

# Image 图片

`ms-image` 封装原生 `<image>`，在加载中和加载失败时显示占位内容。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-image`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/basic/image`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/image.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 资源地址 |
| mode | `string` | `'aspectFill'` | 模式 |
| shape | `'square' \| 'round' \| 'circle'` | `'square'` | 外形 |
| width | `string` | `'72px'` | 宽度（px） |
| height | `string` | `'72px'` | 高度（px） |
| lazy | `boolean` | `false` | 是否懒加载 |
| showMenuByLongpress | `boolean` | `false` | 长按识别小程序码菜单（微信有效，见 image.md） |

## 事件

| 事件 | 说明 |
| --- | --- |
| load | 加载完成 |
| error | 错误 |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| error | `error` 插槽 |
| loading | `loading` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-image/`
- 演示: `#/pages/demo/basic/image`
