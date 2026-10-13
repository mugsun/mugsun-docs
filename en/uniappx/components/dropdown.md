---
title: Dropdown
demo: pages/demo/nav/dropdown
---

# Dropdown

`ms-dropdown` — Dropdown for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-dropdown` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/dropdown`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/dropdown.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-dropdown
    :menus="singleMenus"
    :options="singleOptions"
    :height="300"
    @change="onSingleChange"
  />
  <ms-dropdown
    :menus="multiMenus"
    :options="multiOptions"
    :height="320"
    @change="onMultiChange"
    @reset="onMultiReset"
  />
  <ms-dropdown
    :menus="disabledMenus"
    :options="disabledOptions"
    :height="260"
    @change="onDisabledChange"
  />
  <ms-dropdown
    :menus="columnMenus"
    :options="columnOptions"
    :height="320"
    @change="onColumnChange"
  />
</template>

<script setup lang="uts">
const columnMenus = [
  { label: '三列多选', multiple: true, columns: 3 } as UTSJSONObject,
  { label: '双列单选', columns: 2 } as UTSJSONObject,
] as UTSJSONObject[]

const columnOptions = [
  { menu: 0, label: '一', value: 'c1', checked: true } as UTSJSONObject,
  { menu: 0, label: '二', value: 'c2' } as UTSJSONObject,
  { menu: 0, label: '三', value: 'c3' } as UTSJSONObject,
  { menu: 0, label: '四', value: 'c4' } as UTSJSONObject,
  { menu: 0, label: '五', value: 'c5' } as UTSJSONObject,
  { menu: 0, label: '六', value: 'c6' } as UTSJSONObject,
  { menu: 1, label: '左列', value: 'l1', checked: true } as UTSJSONObject,
  { menu: 1, label: '右列', value: 'r1' } as UTSJSONObject,
] as UTSJSONObject[]

const disabledMenus = [
  { label: '可选菜单' } as UTSJSONObject,
  { label: '停用菜单', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const disabledOptions = [
  { menu: 0, label: '可选项', value: 'ok', checked: true } as UTSJSONObject,
  { menu: 0, label: '禁用选项', value: 'no', disabled: true } as UTSJSONObject,
  { menu: 1, label: '不会展开', value: 'x' } as UTSJSONObject,
] as UTSJSONObject[]

const multiMenus = [
  { label: '单列多选', multiple: true } as UTSJSONObject,
  { label: '双列多选', multiple: true, columns: 2 } as UTSJSONObject,
] as UTSJSONObject[]

const multiOptions = [
  { menu: 0, label: '选项一', value: 'm1', checked: true } as UTSJSONObject,
  { menu: 0, label: '选项二', value: 'm2' } as UTSJSONObject,
  { menu: 0, label: '选项三', value: 'm3' } as UTSJSONObject,
  { menu: 1, label: '双列一', value: 'd1', checked: true } as UTSJSONObject,
  { menu: 1, label: '双列二', value: 'd2' } as UTSJSONObject,
  { menu: 1, label: '双列三', value: 'd3' } as UTSJSONObject,
  { menu: 1, label: '双列四', value: 'd4' } as UTSJSONObject,
] as UTSJSONObject[]

const singleMenus = [
  { label: '全部产品' } as UTSJSONObject,
  { label: '默认排序' } as UTSJSONObject,
] as UTSJSONObject[]

const singleOptions = [
  { menu: 0, label: '全部产品', value: 'all', checked: true } as UTSJSONObject,
  { menu: 0, label: '最新产品', value: 'new' } as UTSJSONObject,
  { menu: 0, label: '最火产品', value: 'hot' } as UTSJSONObject,
  { menu: 1, label: '默认排序', value: 'default', checked: true } as UTSJSONObject,
  { menu: 1, label: '价格从高到低', value: 'price' } as UTSJSONObject,
] as UTSJSONObject[]

function onSingleChange(index: number, values: string[]) : void {
  console.log('onSingleChange')
}

function onMultiChange(index: number, values: string[]) : void {
  console.log('onMultiChange')
}

function onMultiReset(index: number) : void {
  console.log('onMultiReset')
}

function onDisabledChange(index: number, values: string[]) : void {
  console.log('onDisabledChange')
}

function onColumnChange(index: number, values: string[]) : void {
  console.log('onColumnChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| menus | `UTSJSONObject[]` | `[]` | Menus: label / multiple / columns(1-3) / disabled |
| options | `UTSJSONObject[]` | `[]` | Flat options: menu(index) / label / value / disabled / checked |
| height | `number` | `320` | Component height (px; vapor forbids %; overlay fills this area) |
| showOverlay | `boolean` | `true` | Whether to show the overlay |
| closeOnClickOverlay | `boolean` | `true` | Whether clicking the overlay closes |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| open | Opened |
| close | Closed |
| confirm | Confirm |
| reset | Reset |

## See also

- Component: `uni_modules/ms-ui/components/ms-dropdown/`
- Demo: `#/pages/demo/nav/dropdown`
- Chinese docs: [/uniappx/components/dropdown](/uniappx/components/dropdown)
