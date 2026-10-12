---
title: Scroll X 横滚
demo: pages/demo/display/scroll-x
---

# Scroll X 横滚

`ms-scroll-x`：横向滚动容器（`scroll-view direction="horizontal"`）+ 底部进度指示条。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| indicator | `boolean` | `true` | 是否显示指示器 |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` | 间距（px） |
| inset | `boolean` | `false` | 是否内嵌样式 |
| showScrollbar | `boolean` | `false` | 是否显示滚动条 |
| scrollWithAnimation | `boolean` | `false` | 滚动是否带动画 |

## 事件

| 事件 | 说明 |
| --- | --- |
| scroll | 滚动 |
| scrolltoupper | scrolltoupper |
| scrolltolower | 触底 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-scroll-x/`
- 演示: `#/pages/demo/display/scroll-x`
