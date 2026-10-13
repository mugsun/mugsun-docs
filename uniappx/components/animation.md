---
title: Animation 动画
demo: pages/demo/feedback/animation
---

# Animation 动画

`ms-animation`：预设名一次播放动画容器（命令式），与 `ms-transition`（`visible` 进出场）分工。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| name | `\| 'fade-in'` | `'fade-in'` | 名称 / 字段名 |
| duration | `number` | `300` | 时长（ms） |
| delay | `number` | `0` | 延迟（ms） |
| autoPlay | `boolean` | `false` | 是否自动播放 |
| playing | `boolean` | `false` | 是否播放中（可 v-model:playing） |

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

- 组件目录: `uni_modules/ms-ui/components/ms-animation/`
- 演示: `#/pages/demo/feedback/animation`
