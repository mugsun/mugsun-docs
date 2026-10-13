---
title: Tree Select 树选择
demo: pages/demo/display/tree-select
---

# Tree Select 树选择

`ms-tree-select`：多列树形选择：按 `options` 实际深度渲染 2~3 列（最多 3 列），左栏导航 + 中间列下钻 + 末列单选/多选。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-tree-select`）。
演示路由：`#/pages/demo/display/tree-select`。

## 基础用法

```vue
<template>
  <ms-tree-select value="…">
    …
  </ms-tree-select>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 选项列表 |
| value | `string[]` | `[]` | 当前值 |
| leafValues | `string[]` | `[]` | 已选叶子值列表（v-model:leafValues） |
| multiple | `boolean` | `false` | 是否多选 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:value | v-model:value 更新 |
| update:leafValues | update:leafValues |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tree-select/`
- 演示: `#/pages/demo/display/tree-select`
