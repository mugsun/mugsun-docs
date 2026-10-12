---
title: Fab 悬浮球
demo: pages/demo/feedback/fab
---

# Fab 悬浮球

`ms-fab`：悬浮球：定位档 + expandable；`v-model:expanded`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-fab`）。
演示路由：`#/pages/demo/feedback/fab`。

## 基础用法

```vue
<template>
  <ms-fab text="…">
    …
  </ms-fab>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | 图标名（icons.uts） |
| text | `string` | `''` | 展示文案 |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | 位置 |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | 是否内嵌样式 |
| expandable | `boolean` | `false` | 是否可展开 |
| expanded | `boolean` | `false` | 展开态（受控，配 update:expanded） |
| local | `boolean` | `false` | 是否本地/内联 |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| expand-change | expand-change |
| update:expanded | update:expanded |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-fab/`
- 演示: `#/pages/demo/feedback/fab`
