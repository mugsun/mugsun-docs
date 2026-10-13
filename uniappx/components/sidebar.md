---
title: Sidebar 侧栏
demo: pages/demo/nav/sidebar
---

# Sidebar 侧栏

`ms-sidebar`：侧栏分类轨：`items` + 内容插槽；`v-model:value`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-sidebar`）。
演示路由：`#/pages/demo/nav/sidebar`。

## 基础用法

```vue
<template>
  <ms-sidebar>
    …
  </ms-sidebar>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / count / badge / dot / disabled |
| height | `number` | `320` | 侧栏总高（蒸汽禁百分比高度，用 token 字面量） |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:value | v-model:value 更新 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-sidebar/`
- 演示: `#/pages/demo/nav/sidebar`
