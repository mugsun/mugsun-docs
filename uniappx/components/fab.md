---
title: Fab 悬浮球
demo: pages/demo/feedback/fab
---

# Fab 悬浮球

`ms-fab`：悬浮球：定位档 + expandable；`v-model:expanded`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-fab`）。
演示路由：`#/pages/demo/feedback/fab`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/fab.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 基础用法 -->
  <ms-fab local inset="sm" @click="onFabClick" />
  <ms-fab local inset="sm" text="新建" @click="onFabClick" />
  <!-- 定位 -->
  <ms-fab local inset="sm" position="bottom-right" />
  <ms-fab local inset="sm" position="bottom-left" />
  <ms-fab local inset="sm" position="bottom-center" />
  <!-- 状态 -->
  <ms-fab local inset="sm" expandable @expand-change="onExpandChange">
    <text @click="onMenuTap('添加')">添加</text>
    <text @click="onMenuTap('收藏')">收藏</text>
    <text @click="onMenuTap('分享')">分享</text>
  </ms-fab>
  <ms-fab local inset="sm" disabled @click="onFabClick" />
  <!-- 组件深度 -->
  <ms-fab local inset="lg" position="top-right" icon="edit-line" @click="onFabClick" />
  <ms-fab local inset="lg" position="top-left" icon="customer-service-line" />
  <ms-fab
    local
    inset="sm"
    expandable
    v-model:expanded="modelExpanded"
    @expand-change="onExpandChange"
  >
    <text @click="onMenuTap('添加')">添加</text>
    <text @click="onMenuTap('收藏')">收藏</text>
  </ms-fab>
</template>

<script setup lang="uts">
const modelExpanded = ref(false)
</script>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | 图标名（icons.uts） |
| text | `string` | `''` | 主按钮旁文案；空则仅图标 |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | 位置 |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | 是否内嵌样式 |
| expandable | `boolean` | `false` | 是否可展开子操作 |
| expanded | `boolean` | `false` | 展开态（受控，配 update:expanded） |
| local | `boolean` | `false` | 相对父级定位；false 为 fixed 贴边 |
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
