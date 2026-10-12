---
title: Sticky
demo: pages/demo/nav/sticky
---

# Sticky

不是 CSS sticky。`reference/uni-app-x/docs/css/position.md` 明确 `position: sticky` 仅 Web 支持、App 全端 x，`css_diff_web.md` 有专节说明，本仓 `ms-uvue` 规则也直接禁用；官方 `sticky-header`/`sticky-section` 在 **微信小程序为 x** 且不可设 class/style，也不能当底座。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-sticky`).
Demo route: `#/pages/demo/nav/sticky`.

## Basic usage

```vue
<template>
  <ms-sticky :disabled="true">
    …
  </ms-sticky>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | 宿主 scroll-view @scroll 回传的 detail.scrollTop |
| offsetTop | `number` | `0` | 吸顶后距容器顶 px（多吸顶叠放时给前一个的高） |
| height | `number` | `0` | >0 时跳过测量直接用固定高 |
| zIndex | `number` | `10` | 吸顶层级，远低于 $ms-overlay-z-index |
| disabled | `boolean` | `false` | 禁用吸顶，恒为流内元素 |
| anchorTop | `number` | `0` | 锚点在滚动内容中的偏移；>0 时跳过测量，跨端最稳 |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| scroll | scroll |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sticky/`
- Demo: `#/pages/demo/nav/sticky`
- Chinese docs: [/uniappx/components/sticky](/uniappx/components/sticky)
