---
title: Action Sheet
demo: pages/demo/feedback/action-sheet
---

# Action Sheet

`ms-action-sheet` — Action Sheet for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-action-sheet` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/action-sheet`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/action-sheet.uvue`; see them running in the phone frame.

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
