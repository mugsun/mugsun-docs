---
title: Qrcode
demo: pages/demo/display/qrcode
---

# Qrcode

`ms-qrcode` renders text as a QR code. It can show a logo in the center and an overlay for the expired, loading and scanned states.

Encoding and drawing are done by the component itself, with no canvas and no third-party library.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-qrcode :value="demoValue" />
  <ms-qrcode :value="demoValue" logo="/static/logo.png" level="H" />
  <!-- Error correction level -->
  <ms-qrcode :value="demoValue" level="L" size="sm" />
  <ms-qrcode :value="demoValue" level="M" size="sm" />
  <ms-qrcode :value="demoValue" level="Q" size="sm" />
  <!-- States -->
  <ms-qrcode :value="demoValue" status="expired" size="sm" />
  <ms-qrcode :value="demoValue" status="loading" size="sm" />
  <ms-qrcode :value="demoValue" status="scanned" size="sm" />
  <!-- Sizes -->
  <ms-qrcode :value="demoValue" size="sm" />
  <ms-qrcode :value="demoValue" size="md" />
  <ms-qrcode :value="demoValue" size="lg" />
</template>

<script setup lang="uts">
const demoValue = 'https://mugsun.example/qr'
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Text to encode |
| size | `string` | `'md'` | Size: sm / md / lg |
| level | `string` | `'M'` | Error correction level: L / M / Q / H |
| logo | `string` | `''` | Image URL of the center logo |
| status | `string` | `'active'` | Status: active / expired / loading / scanned |
| statusText | `string` | `''` | Text on the status overlay; empty uses the built-in text |
| margin | `boolean` | `true` | Whether to keep the blank border around the code |
