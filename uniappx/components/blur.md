---
title: Blur 磨砂
demo: pages/demo/media/blur
---

# Blur 磨砂

`ms-blur`：磨砂遮罩层：半透明底 + 明暗两档，用于浮层、工具条、图片说明条这类**功能性遮罩**（不做装饰性玻璃拟态）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-blur/components/ms-blur`）。
可选插件：需单独安装 `uni_modules/ms-blur`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/blur`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/blur.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-blur :blur="blur" tint="light" :radius="12">
    <text>工具条底衬</text>
    <text>半透明底 + 模糊，用于浮层与工具条</text>
  </ms-blur>
  <ms-blur :blur="blur" tint="dark" :radius="12" :opacity="0.7">
    <text>深色底衬</text>
    <text>用于图片上的说明条</text>
  </ms-blur>
  <!-- 组件样式 -->
  <ms-blur :blur="4" tint="light" :radius="8" :padding="8">
    <text>轻度模糊 4</text>
  </ms-blur>
  <ms-blur :blur="20" tint="light" :radius="8" :padding="8">
    <text>中度模糊 20</text>
  </ms-blur>
  <ms-blur :blur="12" tint="light" :radius="0" :padding="16">
    <text>直角 · 内边距 16</text>
  </ms-blur>
  <!-- 组件深度 -->
  <ms-blur :blur="16" tint="light" :opacity="0.4" :radius="12" :padding="12">
    <text>透明度 0.4</text>
  </ms-blur>
  <ms-blur :blur="12" tint="dark" :opacity="0.75" :radius="24" :padding="12">
    <text>圆角 24</text>
  </ms-blur>
  <ms-blur :blur="20" tint="light" :opacity="0.92" :radius="12" :padding="12">
    <text>透明度 0.92</text>
  </ms-blur>
</template>

<script setup lang="uts">
const blur = ref(12)
</script>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| blur | `number` | `12` | 模糊半径（px） |
| tint | `string` | `'light'` | 底色档位 |
| opacity | `number` | `0.85` | 不透明度 |
| radius | `number` | `0` | 圆角（px） |
| padding | `number` | `12` | 内边距（px） |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-blur/components/ms-blur/`
- 演示: `#/pages/demo/media/blur`
