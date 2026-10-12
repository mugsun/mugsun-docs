---
title: Badge 徽标
demo: pages/demo/basic/badge
---

# Badge 徽标

`ms-badge`：角标：包裹 default 插槽，右上角展示红点 / 数字 / 文案。`label` 优先于 `count` / `dot`；`standalone` 可独立展示。禁止 color / fontSize 等样式 props。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-badge`）。
演示路由：`#/pages/demo/basic/badge`。

## 基础用法

```vue
<template>
  <ms-badge theme="danger" size="sm">
    …
  </ms-badge>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| count | `number` | `0` | 数字徽标；优先于 label |
| label | `string` | `''` | 文案徽标（非数字时） |
| dot | `boolean` | `false` | 是否圆点徽标（忽略数字） |
| max | `number` | `99` | 数字封顶；超出显示 max+ |
| showZero | `boolean` | `false` | count 为 0 时是否仍显示 |
| theme | `'danger' \| 'primary' \| 'success' \| 'warning'` | `'danger'` | 主题色 |
| shape | `'circle' \| 'square'` | `'circle'` | 外形 |
| size | `'sm' \| 'md'` | `'md'` | 尺寸 |
| offset | `number[]` | `[]` | 相对锚点的 [x,y] 偏移（px） |
| standalone | `boolean` | `false` | 独立展示徽标（不包裹锚点） |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-badge/`
- 演示: `#/pages/demo/basic/badge`
