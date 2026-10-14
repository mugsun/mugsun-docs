---
title: Tabbar
demo: pages/demo/nav/tabbar
---

# Tabbar

`ms-tabbar` is a bottom navigation bar with text-only, icon and badge items. The current item binds with `v-model:value`, and it supports fixed positioning with a placeholder.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-tabbar`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/nav/tabbar`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/tabbar.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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
  { label: 'Home', icon: 'home-3-line' } as UTSJSONObject,
  { label: 'Discover', icon: 'search-line' } as UTSJSONObject,
  { label: 'Disabled', icon: 'megaphone-line', disabled: true } as UTSJSONObject,
  { label: 'Me', icon: 'user-3-fill' } as UTSJSONObject,
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
  { label: 'Home', icon: 'home-3-line' } as UTSJSONObject,
  { label: 'Discover', icon: 'search-line' } as UTSJSONObject,
  { label: 'Messages', icon: 'megaphone-line' } as UTSJSONObject,
  { label: 'Me', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const splitIndex = ref(0)

const tagIndex = ref(1)

const textIndex = ref(0)

const textItems = [
  { label: 'Home' } as UTSJSONObject,
  { label: 'Apps' } as UTSJSONObject,
  { label: 'Chat' } as UTSJSONObject,
  { label: 'Me' } as UTSJSONObject,
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
