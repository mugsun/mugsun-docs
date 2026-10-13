---
title: Popup 弹层
demo: pages/demo/feedback/popup
---

# Popup 弹层

`ms-popup`：弹出层容器：`placement` 支持 `bottom/top/left/right/center`，可带标题栏与关闭按钮，`round` 按位置自动圆角。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` | 弹出/摆放位置 |
| title | `string` | `''` | 标题 |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnOverlayClick | `boolean` | `true` | 点击遮罩是否关闭 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| round | `boolean` | `true` | 是否圆角 |
| zIndex | `number` | `1000` | 层级 z-index |

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

- 组件目录: `uni_modules/ms-ui/components/ms-popup/`
- 演示: `#/pages/demo/feedback/popup`
