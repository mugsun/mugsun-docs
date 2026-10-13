---
title: Tabbar
demo: pages/demo/nav/tabbar
---

# Tabbar

`ms-tabbar` — Tabbar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-tabbar` (repository not yet public).
Demo route: `#/pages/demo/nav/tabbar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/tabbar.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-tabbar
    :items="textItems"
    :value="textIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onTextChange"
  />
  <ms-tabbar
    :items="iconTextItems"
    :value="iconTextIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onIconTextChange"
  />
  <ms-tabbar
    :items="iconItems"
    :value="iconIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onIconChange"
  />
  <ms-tabbar
    :items="iconTextItems"
    :value="tagIndex"
    theme="tag"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onTagChange"
  />
  <ms-tabbar
    :items="disabledItems"
    :value="disabledIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onDisabledChange"
  />
  <ms-tabbar
    :items="textItems"
    :value="splitIndex"
    split
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onSplitChange"
  />
</template>

<script setup lang="uts">
const disabledIndex = ref(0)

const disabledItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '停用', icon: 'megaphone-line', disabled: true } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { icon: 'home-3-line' } as UTSJSONObject,
  { icon: 'search-line' } as UTSJSONObject,
  { icon: 'megaphone-line' } as UTSJSONObject,
  { icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const iconTextIndex = ref(0)

const iconTextItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '消息', icon: 'megaphone-line' } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const splitIndex = ref(0)

const tagIndex = ref(1)

const textIndex = ref(0)

const textItems = [
  { label: '首页' } as UTSJSONObject,
  { label: '应用' } as UTSJSONObject,
  { label: '聊天' } as UTSJSONObject,
  { label: '我的' } as UTSJSONObject,
] as UTSJSONObject[]

function onTextChange(index: number) : void {
  console.log('onTextChange')
}

function onIconTextChange(index: number) : void {
  console.log('onIconTextChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onTagChange(index: number) : void {
  console.log('onTagChange')
}

function onDisabledChange(index: number) : void {
  console.log('onDisabledChange')
}

function onSplitChange(index: number) : void {
  console.log('onSplitChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| items | `UTSJSONObject[]` | `[]` | Each item: label / icon / count / badge / dot / disabled |
| theme | `'normal' \| 'tag'` | `'normal'` | Theme color |
| shape | `'normal' \| 'round'` | `'normal'` | Shape |
| bordered | `boolean` | `true` | Top border |
| split | `boolean` | `false` | Divider between items |
| fixed | `boolean` | `true` | Whether fixed positioned |
| placeholder | `boolean` | `false` | When fixed, reserve flow space so content is not covered |
| safeAreaInsetBottom | `boolean` | `true` | Whether to reserve bottom safe area |
| zIndex | `number` | `400` | z-index |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-tabbar/`
- Demo: `#/pages/demo/nav/tabbar`
- Chinese docs: [/uniappx/components/tabbar](/uniappx/components/tabbar)
