---
title: Barcode 条码
demo: pages/demo/display/barcode
---

# Barcode 条码

`ms-barcode`：文本 → 一维条码（标准码表自写 + view 竖条）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-barcode`）。
演示路由：`#/pages/demo/display/barcode`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/barcode.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-barcode value="6970980210024" encode="ean13" />
  <ms-barcode value="abc125698" encode="code128" />
  <!-- 其它制式 -->
  <ms-barcode value="96385074" encode="ean8" size="sm" />
  <ms-barcode value="012345678905" encode="upca" size="sm" />
  <ms-barcode value="CODE39" encode="code39" size="sm" />
  <!-- 组件尺寸 -->
  <ms-barcode value="6970980210024" encode="ean13" size="sm" />
  <ms-barcode value="6970980210024" encode="ean13" size="md" />
  <ms-barcode value="6970980210024" encode="ean13" size="lg" />
  <!-- 组件深度 -->
  <ms-barcode value="6970980210024" encode="ean13" :show-text="false" size="sm" />
  <ms-barcode value="MS2026" encode="code128" size="lg" />
  <ms-barcode value="CODE39" encode="code39" :show-text="false" size="md" />
</template>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | 当前值 |
| encode | `string` | `'ean13'` | 编码方式 |
| size | `string` | `'md'` | 尺寸 |
| showText | `boolean` | `true` | 是否在条码下方显示可读文案 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-barcode/`
- 演示: `#/pages/demo/display/barcode`
