---
title: Tree Flat 思维导图
demo: pages/demo/display/tree-flat
---

# Tree Flat 思维导图

`ms-tree-flat`：平面树 / 思维导图：canvas 绘制节点与连线，点父节点展开收起。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| height | `number` | `320` | 高度（px） |
| direction | `string` | `'horizontal'` | 方向 |
| lineType | `string` | `'straight'` | 连线样式：straight / curve |
| fontSize | `number` | `13` | 字号（px） |
| collapsible | `boolean` | `true` | 是否可折叠 |

## 事件

| 事件 | 说明 |
| --- | --- |
| node-click | 点击节点 |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tree-flat/`
- 演示: `#/pages/demo/display/tree-flat`
