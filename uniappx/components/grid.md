---
title: Grid 宫格
demo: pages/demo/nav/grid
---

# Grid 宫格

`ms-grid`：宫格容器 + `ms-grid-item` 子项；`column`/`border`/`theme`；子项 `icon`+`text`/`description`/`disabled`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-grid`）。
演示路由：`#/pages/demo/nav/grid`。

## 基础用法

```vue
<template>
  <ms-grid theme="default">
    …
  </ms-grid>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| column | `3 \| 4 \| 5` | `4` | 列数 |
| border | `boolean` | `false` | 是否显示边框 |
| theme | `'default' \| 'card'` | `'default'` | 主题 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-grid/`
- 演示: `#/pages/demo/nav/grid`
