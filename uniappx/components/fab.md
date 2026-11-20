---
title: Fab 悬浮球
demo: pages/demo/feedback/fab
---

# Fab 悬浮球

`ms-fab` 是悬浮按钮，固定在页面的某个角落或底部中间。开启 `expandable` 后点击可以展开一组子操作。

## 基础用法

<!-- demo-snippets:start -->
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

function onFabClick() : void {
  console.log('onFabClick')
}

function onExpandChange(next: boolean) : void {
  console.log('onExpandChange')
}

function onMenuTap(label: string) : void {
  console.log('onMenuTap')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | 图标名（icons.uts） |
| text | `string` | `''` | 主按钮旁文案；空则仅图标 |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | 位置 |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | 与屏幕边缘的间距 |
| expandable | `boolean` | `false` | 是否可展开子操作 |
| expanded | `boolean` | `false` | 是否展开，可用 `v-model:expanded` |
| local | `boolean` | `false` | 是否相对父级定位，默认固定在屏幕上 |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击按钮时触发，禁用时不触发 |
| expand-change | `expanded: boolean` | 展开或收起时触发 |
| update:expanded | `value: boolean` | 展开或收起时触发，用于 `v-model:expanded` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 展开后显示的子操作 |
