---
title: Drawer 抽屉
demo: pages/demo/feedback/drawer
---

# Drawer 抽屉

`ms-drawer` 是侧边抽屉，包含标题、可滚动的菜单列表和底部插槽，可以从左侧或右侧弹出。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-drawer
    :visible="showBase"
    :items="baseItems"
    @update:visible="onBaseVisible"
    @item-click="onPick"
  />
  <ms-drawer
    :visible="showTitled"
    :items="baseItems"
    title="菜单"
    @update:visible="onTitledVisible"
    @item-click="onPick"
  />
  <ms-drawer
    :visible="showIcon"
    :items="iconItems"
    title="快捷入口"
    @update:visible="onIconVisible"
    @item-click="onPick"
  />
</template>

<script setup lang="uts">
const baseItems = ref([
  { title: '菜单一' } as UTSJSONObject,
  { title: '菜单二' } as UTSJSONObject,
  { title: '菜单三' } as UTSJSONObject,
  { title: '菜单四' } as UTSJSONObject,
] as UTSJSONObject[])

const iconItems = ref([
  { title: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { title: '消息', icon: 'notification-line' } as UTSJSONObject,
  { title: '设置', icon: 'settings-3-line' } as UTSJSONObject,
] as UTSJSONObject[])

const showBase = ref(false)

const showIcon = ref(false)

const showTitled = ref(false)

function onBaseVisible(value: boolean): void {
  showBase.value = value
}

function onPick(index: number) : void {
  console.log('onPick')
}

function onTitledVisible(value: boolean): void {
  showTitled.value = value
}

function onIconVisible(value: boolean): void {
  showIcon.value = value
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| placement | `'left' \| 'right'` | `'right'` | 从哪一侧弹出 |
| title | `string` | `''` | 标题 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 title / icon / disabled |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnOverlayClick | `boolean` | `true` | 点击遮罩是否关闭 |
| closeOnSelect | `boolean` | `true` | 点菜单项后是否自动关闭 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| item-click | `index: number` | 点击菜单项时触发，`index` 是该项的下标；禁用项不触发 |
| overlay-click | — | 点击遮罩时触发 |
| close | — | 抽屉关闭时触发 |
| open | — | 抽屉打开时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 菜单列表下方的底部区域 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `open()` | 打开抽屉，需配合 `v-model:visible` |
| `close()` | 关闭抽屉，需配合 `v-model:visible` |
