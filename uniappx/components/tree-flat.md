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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 树数据，每项 `title` +（可选）`children`、`opened` |
| height | `number` | `320` | 组件高度 px |
| direction | `string` | `'horizontal'` | `horizontal` / `vertical` |
| lineType | `string` | `'straight'` | `straight` 折线 / `curve` 曲线 |
| fontSize | `number` | `13` | 节点文字字号 px |
| collapsible | `boolean` | `true` | 点父节点是否可展开收起 |

## 事件

| 事件 | 说明 |
| --- | --- |
| node-click | 点击节点 |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tree-flat/`
- 演示: `#/pages/demo/display/tree-flat`
