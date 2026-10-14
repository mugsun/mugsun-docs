---
title: Barcode
demo: pages/demo/display/barcode
---

# Barcode

`ms-barcode` renders text as a one-dimensional barcode. The code tables are implemented in-house to the standard, and the bars are drawn with views.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-barcode`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/barcode`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/barcode.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-barcode value="6970980210024" encode="ean13" />
  <ms-barcode value="abc125698" encode="code128" />
  <!-- Other formats -->
  <ms-barcode value="96385074" encode="ean8" size="sm" />
  <ms-barcode value="012345678905" encode="upca" size="sm" />
  <ms-barcode value="CODE39" encode="code39" size="sm" />
  <!-- Sizes -->
  <ms-barcode value="6970980210024" encode="ean13" size="sm" />
  <ms-barcode value="6970980210024" encode="ean13" size="md" />
  <ms-barcode value="6970980210024" encode="ean13" size="lg" />
  <!-- Advanced -->
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
