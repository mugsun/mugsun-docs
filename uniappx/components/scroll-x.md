---
title: Scroll X 横滚
demo: pages/demo/display/scroll-x
---

# Scroll X 横滚

`ms-scroll-x`：横向滚动容器（`scroll-view direction="horizontal"`）+ 底部进度指示条。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-scroll-x`）。
演示路由：`#/pages/demo/display/scroll-x`。

## 基础用法

```vue
<template>
  <ms-scroll-x>
    …
  </ms-scroll-x>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| indicator | `boolean` | `true` | — |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| inset | `boolean` | `false` | — |
| showScrollbar | `boolean` | `false` | — |
| scrollWithAnimation | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| scroll | scroll |
| scrolltoupper | scrolltoupper |
| scrolltolower | scrolltolower |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-scroll-x/`
- 演示：`#/pages/demo/display/scroll-x`
