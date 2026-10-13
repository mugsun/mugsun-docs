---
title: Sidebar 侧栏
demo: pages/demo/nav/sidebar
---

# Sidebar 侧栏

`ms-sidebar`：侧栏分类轨：`items` + 内容插槽；`v-model:value`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-sidebar`）。
演示路由：`#/pages/demo/nav/sidebar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/sidebar.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <ms-sidebar
    :items="baseItems"
    :value="baseIndex"
    :height="280"
    @change="onBaseChange"
  >
    <text>{{ baseTitle }}</text>
    <text>{{ baseBody }}</text>
  </ms-sidebar>
  <ms-sidebar
    :items="iconItems"
    :value="iconIndex"
    :height="240"
    @change="onIconChange"
  >
    <text>{{ iconTitle }}</text>
    <text>带图标侧边导航内容区</text>
  </ms-sidebar>
  <ms-sidebar
    :items="badgeItems"
    :value="badgeIndex"
    :height="240"
    @change="onBadgeChange"
  >
    <text>{{ badgeTitle }}</text>
    <text>徽标用于未读提示</text>
  </ms-sidebar>
  <ms-sidebar
    :items="disabledItems"
    :value="disabledIndex"
    :height="240"
    @change="onDisabledChange"
  >
    <text>{{ disabledTitle }}</text>
    <text>禁用项不可点选</text>
  </ms-sidebar>
</template>

<script setup lang="uts">
const baseIndex = ref(0)
const iconIndex = ref(0)
const badgeIndex = ref(0)
const disabledIndex = ref(0)
const baseTitle = computed((): string => {
const baseBody = computed((): string => {
const iconTitle = computed((): string => {
const badgeTitle = computed((): string => {
const disabledTitle = computed((): string => {
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
