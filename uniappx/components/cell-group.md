---
title: Cell Group 单元格组
demo: pages/demo/basic/cell
---

# Cell Group 单元格组

`ms-cell-group`：单元格组容器。用 `theme`（default|card）、`title`；default 插槽放 ms-cell。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-cell-group`）。
演示路由：`#/pages/demo/basic/cell`。

## 基础用法

```vue
<template>
  <ms-cell-group theme="default" title="…">
    …
  </ms-cell-group>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'card'` | `'default'` | 主题 |
| title | `string` | `''` | 标题 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-cell-group/`
- 演示: `#/pages/demo/basic/cell`
