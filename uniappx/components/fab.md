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
  <ms-fab text="…" :disabled="true">
    …
  </ms-fab>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | — |
| text | `string` | `''` | — |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | — |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| expandable | `boolean` | `false` | — |
| expanded | `boolean` | `false` | 展开态（受控，配 update:expanded） |
| local | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |

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

- 组件目录：`uni_modules/ms-ui/components/ms-fab/`
- 演示：`#/pages/demo/feedback/fab`
