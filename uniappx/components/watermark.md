---
title: Watermark 水印
demo: pages/demo/display/watermark
---

# Watermark 水印

`ms-watermark`：区域文字水印（view 平铺，无 canvas）。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-watermark`）。
演示路由：`#/pages/demo/display/watermark`。

## 基础用法

```vue
<template>
  <ms-watermark>
    …
  </ms-watermark>
</template>
```

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
