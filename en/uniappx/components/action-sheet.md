---
title: Action Sheet
demo: pages/demo/feedback/action-sheet
---

# Action Sheet

`ms-action-sheet` is a bottom action sheet. Pass menu items through `items`; when the user picks one, the component emits its index and closes automatically.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-action-sheet`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/action-sheet`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/action-sheet.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| items | `UTSJSONObject[]` | `[]` | Each item: label / description / icon / tone('default'\|'primary'\|'danger') / disabled | 'primary' | 'danger') / disabled |
| theme | `'list' \| 'grid'` | `'list'` | Theme color |
| align | `'center' \| 'left'` | `'center'` | Alignment |
| description | `string` | `''` | Description text |
| showCancel | `boolean` | `true` | Whether to show cancel button |
| cancelText | `string` | `'取消'` | Cancel button label |
| closeOnOverlayClick | `boolean` | `true` | Whether clicking the overlay closes |
| zIndex | `number` | `1000` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| select | select |
| cancel | Cancel |
| close | Closed |

## See also

- Component: `uni_modules/ms-ui/components/ms-action-sheet/`
- Demo: `#/pages/demo/feedback/action-sheet`
- Chinese docs: [/uniappx/components/action-sheet](/uniappx/components/action-sheet)
