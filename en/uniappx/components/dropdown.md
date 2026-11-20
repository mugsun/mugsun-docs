---
title: Dropdown
demo: pages/demo/nav/dropdown
---

# Dropdown

`ms-dropdown` is a dropdown filter menu. `menus` defines the menu bar and `options` holds every option, each pointing to its menu through `menu`.

A single-select menu closes as soon as an option is picked and updates the bar title; a multi-select menu commits when the confirm button at the bottom is tapped.

## Basic usage

<!-- demo-snippets:start -->
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
  { label: '3-column multi-select', multiple: true, columns: 3 } as UTSJSONObject,
  { label: '2-column single-select', columns: 2 } as UTSJSONObject,
] as UTSJSONObject[]

const columnOptions = [
  { menu: 0, label: 'One', value: 'c1', checked: true } as UTSJSONObject,
  { menu: 0, label: 'Two', value: 'c2' } as UTSJSONObject,
  { menu: 0, label: 'Three', value: 'c3' } as UTSJSONObject,
  { menu: 0, label: 'Four', value: 'c4' } as UTSJSONObject,
  { menu: 0, label: 'Five', value: 'c5' } as UTSJSONObject,
  { menu: 0, label: 'Six', value: 'c6' } as UTSJSONObject,
  { menu: 1, label: 'Left column', value: 'l1', checked: true } as UTSJSONObject,
  { menu: 1, label: 'Right column', value: 'r1' } as UTSJSONObject,
] as UTSJSONObject[]

const disabledMenus = [
  { label: 'Enabled menu' } as UTSJSONObject,
  { label: 'Disabled menu', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const disabledOptions = [
  { menu: 0, label: 'Enabled option', value: 'ok', checked: true } as UTSJSONObject,
  { menu: 0, label: 'Disabled option', value: 'no', disabled: true } as UTSJSONObject,
  { menu: 1, label: 'Will not open', value: 'x' } as UTSJSONObject,
] as UTSJSONObject[]

const multiMenus = [
  { label: '1-column multi-select', multiple: true } as UTSJSONObject,
  { label: '2-column multi-select', multiple: true, columns: 2 } as UTSJSONObject,
] as UTSJSONObject[]

const multiOptions = [
  { menu: 0, label: 'Option 1', value: 'm1', checked: true } as UTSJSONObject,
  { menu: 0, label: 'Option 2', value: 'm2' } as UTSJSONObject,
  { menu: 0, label: 'Option 3', value: 'm3' } as UTSJSONObject,
  { menu: 1, label: 'Column 2-1', value: 'd1', checked: true } as UTSJSONObject,
  { menu: 1, label: 'Column 2-2', value: 'd2' } as UTSJSONObject,
  { menu: 1, label: 'Column 2-3', value: 'd3' } as UTSJSONObject,
  { menu: 1, label: 'Column 2-4', value: 'd4' } as UTSJSONObject,
] as UTSJSONObject[]

const singleMenus = [
  { label: 'All products' } as UTSJSONObject,
  { label: 'Default sort' } as UTSJSONObject,
] as UTSJSONObject[]

const singleOptions = [
  { menu: 0, label: 'All products', value: 'all', checked: true } as UTSJSONObject,
  { menu: 0, label: 'Newest', value: 'new' } as UTSJSONObject,
  { menu: 0, label: 'Most popular', value: 'hot' } as UTSJSONObject,
  { menu: 1, label: 'Default sort', value: 'default', checked: true } as UTSJSONObject,
  { menu: 1, label: 'Price: high to low', value: 'price' } as UTSJSONObject,
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| menus | `UTSJSONObject[]` | `[]` | Menus: label / multiple / columns(1-3) / disabled |
| options | `UTSJSONObject[]` | `[]` | Flat options: menu(index) / label / value / disabled / checked |
| height | `number` | `320` | Total height the component occupies (px); the panel and overlay are drawn within it |
| showOverlay | `boolean` | `true` | Whether to show the overlay |
| closeOnClickOverlay | `boolean` | `true` | Whether tapping the overlay closes the panel |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `index: number, values: string[]` | Fires when the selection changes; `index` is the menu index and `values` holds that menu's selected values |
| open | `index: number` | Fires when a menu opens |
| close | `index: number` | Fires when a menu closes |
| confirm | `index: number, values: string[]` | Fires when confirm is tapped in a multi-select menu |
| reset | `index: number` | Fires when reset is tapped in a multi-select menu |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `close()` | Closes the open menu |
| `getValues(index: number): string[]` | Returns the selected values of the given menu |
