---
title: Animation 动画
demo: pages/demo/feedback/animation
---

# Animation 动画

`ms-animation`：预设名一次播放动画容器（命令式），与 `ms-transition`（`visible` 进出场）分工。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-animation`）。
演示路由：`#/pages/demo/feedback/animation`。

## 基础用法

```vue
<template>
  <ms-animation name="fade-in">
    …
  </ms-animation>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| name | `\| 'fade-in'` | `'fade-in'` | — |
| duration | `number` | `300` | — |
| delay | `number` | `0` | — |
| autoPlay | `boolean` | `false` | — |
| playing | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| before-play | before-play |
| complete | complete |
| update:playing | update:playing |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-animation/`
- 演示：`#/pages/demo/feedback/animation`
