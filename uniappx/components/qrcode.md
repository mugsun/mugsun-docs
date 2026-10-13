---
title: Qrcode 二维码
demo: pages/demo/display/qrcode
---

# Qrcode 二维码

`ms-qrcode`：文本 → 二维码点阵渲染（Nayuki 思路自写矩阵 + view 模块）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-qrcode`（商业版，源码不公开）。
演示路由：`#/pages/demo/display/qrcode`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/qrcode.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | 当前值 |
| size | `string` | `'md'` | 尺寸 |
| level | `string` | `'M'` | 纠错级别 |
| logo | `string` | `''` | 中心 Logo 图地址 |
| status | `string` | `'active'` | 状态 |
| statusText | `string` | `''` | 非 active 时覆盖层文案；空则用内置 |
| margin | `boolean` | `true` | 是否保留静区（quiet zone） |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-qrcode/`
- 演示: `#/pages/demo/display/qrcode`
