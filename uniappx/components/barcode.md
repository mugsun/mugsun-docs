---
title: Barcode 条码
demo: pages/demo/display/barcode
---

# Barcode 条码

`ms-barcode` 把文本画成一维条码，支持 EAN-13、Code 128 等七种编码。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | 要编码的文本 |
| encode | `string` | `'ean13'` | 编码方式：ean13 / ean8 / upca / code128 / code39 / itf25 / codabar |
| size | `string` | `'md'` | 尺寸：sm / md / lg |
| showText | `boolean` | `true` | 是否在条码下方显示可读文案 |
