---
title: Row 栅格行
demo: pages/demo/nav/row
---

# Row 栅格行

`ms-row`：栅格行：flex 横排；`justify`/`align`/`wrap`；`gutter` 经 provide 注入给 `ms-col`，行侧负 margin 齐边。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-row`）。
演示路由：`#/pages/demo/nav/row`。

## 基础用法

```vue
<template>
  <ms-row>
    …
  </ms-row>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| gutter | `0 \| 8 \| 16 \| 24` | `0` | — |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around'` | `'start'` | — |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | — |
| wrap | `boolean` | `true` | — |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-row/`
- 演示：`#/pages/demo/nav/row`
