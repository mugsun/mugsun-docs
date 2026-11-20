---
title: Barcode
demo: pages/demo/display/barcode
---

# Barcode

`ms-barcode` renders text as a one-dimensional barcode in seven encodings, including EAN-13 and Code 128.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Text to encode |
| encode | `string` | `'ean13'` | Encoding: ean13 / ean8 / upca / code128 / code39 / itf25 / codabar |
| size | `string` | `'md'` | Size: sm / md / lg |
| showText | `boolean` | `true` | Whether to show readable text under the barcode |
