---
title: Drag Item 拖拽项
demo: pages/demo/media/drag
---

# Drag Item 拖拽项

`ms-drag` 的可排序子项。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-drag-item`）。
演示路由：`#/pages/demo/media/drag`。

## 基础用法

```vue
<template>
  <ms-drag-item :disabled="true">
    …
  </ms-drag-item>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| order | `number` | `0` | — |
| disabled | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-drag-item/`
- 演示：`#/pages/demo/media/drag`
