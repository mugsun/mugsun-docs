---
title: Tree Flat 思维导图
demo: pages/demo/display/tree-flat
---

# Tree Flat 思维导图

`ms-tree-flat`：平面树 / 思维导图：canvas 绘制节点与连线，点父节点展开收起。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-tree-flat`）。
演示路由：`#/pages/demo/display/tree-flat`。

## 基础用法

```vue
<template>
  <ms-tree-flat>
    …
  </ms-tree-flat>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| height | `number` | `320` | — |
| direction | `string` | `'horizontal'` | — |
| lineType | `string` | `'straight'` | — |
| fontSize | `number` | `13` | — |
| collapsible | `boolean` | `true` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| node-click | 点击节点 |
| change | 值变化 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-tree-flat/`
- 演示：`#/pages/demo/display/tree-flat`
