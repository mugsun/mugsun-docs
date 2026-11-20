---
title: Action Sheet
demo: pages/demo/feedback/action-sheet
---

# Action Sheet

`ms-action-sheet` is a bottom action sheet. Pass menu items through `items`; when the user picks one, the component emits its index and closes automatically.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-action-sheet
    :visible="showRecipeShare"
    :items="shareItems"
    description="Share to"
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
  { label: 'Share', icon: 'share-line' } as UTSJSONObject,
  { label: 'Favorite', icon: 'star-line' } as UTSJSONObject,
  { label: 'Delete', icon: 'delete-bin-line' } as UTSJSONObject,
] as UTSJSONObject[])

const plainItems = ref([
  { label: 'Move' } as UTSJSONObject,
  { label: 'Mark as important' } as UTSJSONObject,
  { label: 'Unsubscribe' } as UTSJSONObject,
] as UTSJSONObject[])

const shareItems = ref([
  { label: 'WeChat friends', icon: 'share-line' } as UTSJSONObject,
  { label: 'Favorite', icon: 'star-line' } as UTSJSONObject,
  { label: 'Copy link', icon: 'links-line' } as UTSJSONObject,
  { label: 'Delete', icon: 'delete-bin-line', tone: 'danger' } as UTSJSONObject,
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| items | `UTSJSONObject[]` | `[]` | Menu items; each item has `label` and optional `description` / `icon` / `tone` / `disabled`, with `tone` one of default / primary / danger |
| theme | `'list' \| 'grid'` | `'list'` | Layout: `list` for rows, `grid` for a grid of icons |
| align | `'center' \| 'left'` | `'center'` | Alignment of list items |
| description | `string` | `''` | Description text |
| showCancel | `boolean` | `true` | Whether to show cancel button |
| cancelText | `string` | `'取消'` | Cancel button label; the default is Chinese for "Cancel" |
| closeOnOverlayClick | `boolean` | `true` | Whether clicking the overlay closes |
| zIndex | `number` | `1000` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the sheet opens or closes; used by `v-model:visible` |
| select | `index: number` | Fires when an item is tapped; `index` is its position in `items`. Disabled items do not fire it |
| cancel | — | Fires when the cancel button is tapped |
| close | — | Fires when the sheet closes, whether by a selection, the cancel button or an overlay tap |
