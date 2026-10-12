---
title: Graph 关系图
demo: pages/demo/media/graph
---

# Graph 关系图

`ms-graph`：原生 canvas 关系图子集：树 / 力导 / 层次 DAG。学 F6 常用布局语义，**不** npm 嵌入 `@antv/f6`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-graph/components/ms-graph`）。
可选插件：需单独安装 `uni_modules/ms-graph`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/graph`。

## 基础用法

```vue
<template>
  <ms-graph>
    …
  </ms-graph>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| layout | `string` | `'tree'` | 布局 |
| nodes | `UTSJSONObject[]` | `[]` | 节点列表 |
| edges | `UTSJSONObject[]` | `[]` | 边列表 |
| height | `number` | `320` | 高度（px） |
| fitView | `boolean` | `true` | 是否适配视口 |

## 事件

| 事件 | 说明 |
| --- | --- |
| node-click | 点击节点 |
| ready | 就绪 |

## 相关

- 组件目录: `uni_modules/ms-graph/components/ms-graph/`
- 演示: `#/pages/demo/media/graph`
