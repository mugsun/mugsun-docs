---
title: Grid Item 宫格项
demo: pages/demo/nav/grid
---

# Grid Item 宫格项

`ms-grid-item` 组件。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-grid-item`）。
演示路由：`#/pages/demo/nav/grid`。

## 基础用法

```vue
<template>
  <ms-grid-item text="…" :disabled="true">
    …
  </ms-grid-item>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| icon | `string` | `'apps-line'` | — |
| text | `string` | `''` | — |
| description | `string` | `''` | 副文案（图标下方第二行） |
| disabled | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-grid-item/`
- 演示：`#/pages/demo/nav/grid`
