---
title: Sidebar 侧栏
demo: pages/demo/nav/sidebar
---

# Sidebar 侧栏

`ms-sidebar` 是侧边分类导航，左侧是由 `items` 生成的分类列表，右侧是默认插槽里的内容。

当前项的下标用 `v-model:value` 绑定。

## 基础用法

<!-- demo-snippets:start -->
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
const badgeIndex = ref(0)

const badgeItems = [
  { label: '消息', dot: true } as UTSJSONObject,
  { label: '通知', count: 6 } as UTSJSONObject,
  { label: '其他' } as UTSJSONObject,
] as UTSJSONObject[]

const baseIndex = ref(0)

const baseItems = [
  { label: '选项一' } as UTSJSONObject,
  { label: '选项二' } as UTSJSONObject,
  { label: '选项三' } as UTSJSONObject,
  { label: '选项四' } as UTSJSONObject,
] as UTSJSONObject[]

const disabledIndex = ref(0)

const disabledItems = [
  { label: '可选' } as UTSJSONObject,
  { label: '停用', disabled: true } as UTSJSONObject,
  { label: '可选二' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(index: number) : void {
  console.log('onBaseChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onBadgeChange(index: number) : void {
  console.log('onBadgeChange')
}

function onDisabledChange(index: number) : void {
  console.log('onDisabledChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项的下标，可用 `v-model:value` |
| items | `UTSJSONObject[]` | `[]` | 分类列表，每项含 `label`，可选 `icon` / `count` / `badge` / `dot` / `disabled` |
| height | `number` | `320` | 组件高度（px） |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `index: number` | 选中项变化时触发，`index` 是新选中项的下标 |
| click | `index: number` | 点击任意未禁用的项时触发，包括当前项 |
| update:value | `index: number` | 选中项变化时触发，用于 `v-model:value` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 右侧内容区 |
