---
title: Divider
demo: pages/demo/basic/divider
---

# Divider

`ms-divider` — Divider for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-divider`).
Demo route: `#/pages/demo/basic/divider`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/divider.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 纯分割 -->
  <ms-divider />
  <!-- 对齐 -->
  <ms-divider text="左对齐" align="left" />
  <ms-divider text="居中" align="center" />
  <ms-divider text="右对齐" align="right" />
  <!-- 垂直 -->
  <ms-divider layout="vertical" />
  <ms-divider layout="vertical" />
  <!-- 虚线 -->
  <ms-divider dashed />
  <ms-divider dashed text="文字信息" align="left" />
  <ms-divider dashed text="文字信息" align="center" />
</template>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| layout | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| align | `'left' \| 'center' \| 'right'` | `'center'` | Alignment |
| dashed | `boolean` | `false` | Whether dashed |
| text | `string` | `''` | Display text |

## See also

- Component: `uni_modules/ms-ui/components/ms-divider/`
- Demo: `#/pages/demo/basic/divider`
- Chinese docs: [/uniappx/components/divider](/uniappx/components/divider)
