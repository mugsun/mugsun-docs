---
title: Sticky 吸顶
demo: pages/demo/nav/sticky
---

# Sticky 吸顶

`ms-sticky`：不是 CSS sticky。`reference/uni-app-x/docs/css/position.md` 明确 `position: sticky` 仅 Web 支持、App 全端 x，`css_diff_web.md` 有专节说明，本仓 `ms-uvue` 规则也直接禁用；官方 `sticky-header`/`sticky-section` 在 **微信小程序为 x** 且不可设 class/style，也不能当底座。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-sticky`）。
演示路由：`#/pages/demo/nav/sticky`。

## 基础用法

```vue
<template>
  <ms-sticky>
    …
  </ms-sticky>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | 宿主 scroll-view @scroll 回传的 detail.scrollTop |
| offsetTop | `number` | `0` | 吸顶后距容器顶 px（多吸顶叠放时给前一个的高） |
| height | `number` | `0` | >0 时跳过测量直接用固定高 |
| zIndex | `number` | `10` | 吸顶层级，远低于 $ms-overlay-z-index |
| disabled | `boolean` | `false` | 禁用吸顶，恒为流内元素 |
| anchorTop | `number` | `0` | 锚点在滚动内容中的偏移；>0 时跳过测量，跨端最稳 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| scroll | 滚动 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-sticky/`
- 演示: `#/pages/demo/nav/sticky`
