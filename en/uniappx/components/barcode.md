---
title: Barcode
demo: pages/demo/display/barcode
---

# Barcode

`ms-barcode` — Barcode for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-barcode` (commercial edition; source not public).
Demo route: `#/pages/demo/display/barcode`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/barcode.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Current value |
| encode | `string` | `'ean13'` | Encoding |
| size | `string` | `'md'` | Size |
| showText | `boolean` | `true` | Whether to show readable text under the barcode |

## See also

- Component: `uni_modules/ms-ui/components/ms-barcode/`
- Demo: `#/pages/demo/display/barcode`
- Chinese docs: [/uniappx/components/barcode](/uniappx/components/barcode)
