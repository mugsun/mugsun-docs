---
title: Qrcode 二维码
demo: pages/demo/display/qrcode
---

# Qrcode 二维码

`ms-qrcode` 把文本生成二维码，可以在中间放 Logo，并用遮罩表示已过期、加载中或已扫描。

编码和绘制都由组件自己完成，不依赖 canvas 和第三方库。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-qrcode :value="demoValue" />
  <ms-qrcode :value="demoValue" logo="/static/logo.png" level="H" />
  <!-- 纠错等级 -->
  <ms-qrcode :value="demoValue" level="L" size="sm" />
  <ms-qrcode :value="demoValue" level="M" size="sm" />
  <ms-qrcode :value="demoValue" level="Q" size="sm" />
  <!-- 组件状态 -->
  <ms-qrcode :value="demoValue" status="expired" size="sm" />
  <ms-qrcode :value="demoValue" status="loading" size="sm" />
  <ms-qrcode :value="demoValue" status="scanned" size="sm" />
  <!-- 组件尺寸 -->
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

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | 要编码的文本 |
| size | `string` | `'md'` | 尺寸：sm / md / lg |
| level | `string` | `'M'` | 纠错级别：L / M / Q / H |
| logo | `string` | `''` | 中心 Logo 的图片地址 |
| status | `string` | `'active'` | 状态：active 正常 / expired 已过期 / loading 加载中 / scanned 已扫描 |
| statusText | `string` | `''` | 状态遮罩上的文字，留空使用内置文字 |
| margin | `boolean` | `true` | 是否保留四周的空白边 |
