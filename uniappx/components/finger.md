---
title: Finger 手势
demo: pages/demo/media/finger
---

# Finger 手势

`ms-finger`：手势识别容器：单击 / 双击 / 长按 / 滑动 / 捏合 / 旋转。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-finger`）。
演示路由：`#/pages/demo/media/finger`。

## 基础用法

```vue
<template>
  <ms-finger :disabled="true">
    …
  </ms-finger>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| swipeThreshold | `number` | `40` | — |
| doubleTapInterval | `number` | `280` | — |
| longPressDelay | `number` | `500` | — |
| disabled | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| start | 开始 |
| move | move |
| end | end |
| tap | tap |
| click | 点击 |
| doubletap | doubletap |
| longpress | longpress |
| swipe | swipe |
| pinch | pinch |
| rotate | rotate |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-finger/`
- 演示：`#/pages/demo/media/finger`
