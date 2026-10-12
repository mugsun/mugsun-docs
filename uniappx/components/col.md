---
title: Col 栅格列
demo: pages/demo/nav/col
---

# Col 栅格列

`ms-col`：栅格列：`span`/`offset` → BEM 宽与 margin；`gutter` 来自行 inject。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-col`）。
演示路由：`#/pages/demo/nav/col`。

## 基础用法

```vue
<template>
  <ms-col>
    …
  </ms-col>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| span | `number` | `24` | — |
| offset | `number` | `0` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-col/`
- 演示：`#/pages/demo/nav/col`
