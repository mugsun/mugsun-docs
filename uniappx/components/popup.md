---
title: Popup 弹层
demo: pages/demo/feedback/popup
---

# Popup 弹层

`ms-popup`：弹出层容器：`placement` 支持 `bottom/top/left/right/center`，可带标题栏与关闭按钮，`round` 按位置自动圆角。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-popup`）。
演示路由：`#/pages/demo/feedback/popup`。

## 基础用法

```vue
<template>
  <ms-popup title="…" v-model:visible="open">
    …
  </ms-popup>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` | — |
| title | `string` | `''` | — |
| showOverlay | `boolean` | `true` | — |
| closeOnOverlayClick | `boolean` | `true` | — |
| closeBtn | `boolean` | `false` | — |
| round | `boolean` | `true` | — |
| zIndex | `number` | `1000` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |
| overlay-click | 点击遮罩 |
| open | 打开 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-popup/`
- 演示：`#/pages/demo/feedback/popup`
