---
title: Fab
demo: pages/demo/feedback/fab
---

# Fab

`ms-fab` — Fab for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-fab`).
Demo route: `#/pages/demo/feedback/fab`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/fab.uvue`; see them running in the phone frame.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | Icon name (icons.uts) |
| text | `string` | `''` | Label beside the primary button; empty = icon only |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | Position |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | Whether inset style |
| expandable | `boolean` | `false` | Whether sub-actions can expand |
| expanded | `boolean` | `false` | Expanded state (controlled; pairs with update:expanded) |
| local | `boolean` | `false` | Relative to parent; false = fixed to the edge |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| expand-change | expand-change |
| update:expanded | update:expanded |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-fab/`
- Demo: `#/pages/demo/feedback/fab`
- Chinese docs: [/uniappx/components/fab](/uniappx/components/fab)
