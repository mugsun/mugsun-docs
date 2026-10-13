---
title: Action Sheet
demo: pages/demo/feedback/action-sheet
---

# Action Sheet

`ms-action-sheet` — Action Sheet for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-action-sheet` (repository not yet public).
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
const showList = ref(false)
const showIcon = ref(false)
const showRecipeShare = ref(false)
const shareItems = ref([
const plainItems = ref([
const iconItems = ref([
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
