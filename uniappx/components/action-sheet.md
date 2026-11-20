---
title: Action Sheet 动作面板
demo: pages/demo/feedback/action-sheet
---

# Action Sheet 动作面板

`ms-action-sheet` 是底部动作面板。通过 `items` 传入菜单项，用户选中后组件返回所选项的下标并自动关闭。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-action-sheet
    :visible="showRecipeShare"
    :items="shareItems"
    description="分享到"
    @update:visible="onRecipeShareVisible"
    @select="onRecipeShareSelect"
  />
  <ms-action-sheet
    :visible="showList"
    :items="plainItems"
    @update:visible="onListVisible"
    @select="onSelect"
  />
  <ms-action-sheet
    :visible="showIcon"
    :items="iconItems"
    @update:visible="onIconVisible"
    @select="onSelect"
  />
</template>

<script setup lang="uts">
const iconItems = ref([
  { label: '分享', icon: 'share-line' } as UTSJSONObject,
  { label: '收藏', icon: 'star-line' } as UTSJSONObject,
  { label: '删除', icon: 'delete-bin-line' } as UTSJSONObject,
] as UTSJSONObject[])

const plainItems = ref([
  { label: '移动' } as UTSJSONObject,
  { label: '标为重要' } as UTSJSONObject,
  { label: '退订' } as UTSJSONObject,
] as UTSJSONObject[])

const shareItems = ref([
  { label: '微信好友', icon: 'share-line' } as UTSJSONObject,
  { label: '收藏', icon: 'star-line' } as UTSJSONObject,
  { label: '复制链接', icon: 'links-line' } as UTSJSONObject,
  { label: '删除', icon: 'delete-bin-line', tone: 'danger' } as UTSJSONObject,
] as UTSJSONObject[])

const showIcon = ref(false)

const showList = ref(false)

const showRecipeShare = ref(false)

function onRecipeShareVisible(value: boolean): void {
  showRecipeShare.value = value
}

function onRecipeShareSelect(index: number) : void {
  console.log('onRecipeShareSelect')
}

function onListVisible(value: boolean): void {
  showList.value = value
}

function onSelect(index: number) : void {
  console.log('onSelect')
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
| items | `UTSJSONObject[]` | `[]` | 菜单项，每项含 `label`，可选 `description` / `icon` / `tone` / `disabled`；`tone` 可取 default / primary / danger |
| theme | `'list' \| 'grid'` | `'list'` | 展示形式：`list` 为列表，`grid` 为宫格 |
| align | `'center' \| 'left'` | `'center'` | 列表项的对齐方式 |
| description | `string` | `''` | 描述文案 |
| showCancel | `boolean` | `true` | 是否显示取消按钮 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| closeOnOverlayClick | `boolean` | `true` | 点击遮罩是否关闭 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| select | `index: number` | 点击菜单项时触发，`index` 是该项在 `items` 中的下标；禁用项不触发 |
| cancel | — | 点击取消按钮时触发 |
| close | — | 面板关闭时触发，选择、取消和点击遮罩都会触发 |
