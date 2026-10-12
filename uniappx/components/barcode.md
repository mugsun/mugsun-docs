---
title: Barcode 条码
demo: pages/demo/display/barcode
---

# Barcode 条码

`ms-barcode`：文本 → 一维条码（标准码表自写 + view 竖条）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-barcode`）。
演示路由：`#/pages/demo/display/barcode`。

## 基础用法

```vue
<template>
  <ms-barcode size="…">
    …
  </ms-barcode>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | — |
| encode | `string` | `'ean13'` | — |
| size | `string` | `'md'` | — |
| showText | `boolean` | `true` | — |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-barcode/`
- 演示：`#/pages/demo/display/barcode`
