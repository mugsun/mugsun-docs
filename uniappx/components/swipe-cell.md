---
title: Swipe Cell 左滑
demo: pages/demo/feedback/swipe-cell
---

# Swipe Cell 左滑

`ms-swipe-cell`：动作面板绝对定位在左右两侧，内容层用 `left` 偏移露出 —— 不用 transform。右滑开左侧（`#left` + `openedLeft`），左滑开右侧（`#actions` + `opened`）。小程序端用 `translate3d` 位移易踩坑（见工程 LESSONS-LEARNED L14），本仓统一走 `left`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-swipe-cell`）。
演示路由：`#/pages/demo/feedback/swipe-cell`。

## 基础用法

```vue
<template>
  <ms-swipe-cell>
    …
  </ms-swipe-cell>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | 受控：右侧面板是否展开 |
| openedLeft | `boolean` | `false` | 受控：左侧面板是否展开 |
| disabled | `boolean` | `false` | 禁用手势 |
| threshold | `number` | `20` | 位移阈值，超过才吸附到位 |
| bordered | `boolean` | `true` | 底部分隔线 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:opened | update:opened |
| update:openedLeft | update:openedLeft |
| open | 打开 |
| close | 关闭 |
| click | 点击 |
| dragstart | dragstart |
| dragend | dragend |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| actions | `actions` 插槽 |
| left | `left` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-swipe-cell/`
- 演示: `#/pages/demo/feedback/swipe-cell`
