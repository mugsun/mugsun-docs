---
title: Qrcode 二维码
demo: pages/demo/display/qrcode
---

# Qrcode 二维码

`ms-qrcode`：文本 → 二维码点阵渲染（Nayuki 思路自写矩阵 + view 模块）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-qrcode`）。
演示路由：`#/pages/demo/display/qrcode`。

## 基础用法

```vue
<template>
  <ms-qrcode size="…" value="…">
    …
  </ms-qrcode>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | 当前值 |
| size | `string` | `'md'` | 'lg'` |
| level | `string` | `'M'` | 'Q' \ |
| logo | `string` | `''` | logo 文案/取值 |
| status | `string` | `'active'` | 'loading' \ |
| statusText | `string` | `''` | statusText 文案/取值 |
| margin | `boolean` | `true` | 是否开启 margin |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-qrcode/`
- 演示: `#/pages/demo/display/qrcode`
