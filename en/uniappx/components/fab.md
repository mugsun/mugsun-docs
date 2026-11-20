---
title: Fab
demo: pages/demo/feedback/fab
---

# Fab

`ms-fab` is a floating action button fixed to a corner or the bottom center of the page. With `expandable` on, a tap expands a group of sub-actions.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Basic usage -->
  <ms-fab local inset="sm" @click="onFabClick" />
  <ms-fab local inset="sm" text="New" @click="onFabClick" />
  <!-- Position -->
  <ms-fab local inset="sm" position="bottom-right" />
  <ms-fab local inset="sm" position="bottom-left" />
  <ms-fab local inset="sm" position="bottom-center" />
  <!-- States -->
  <ms-fab local inset="sm" expandable @expand-change="onExpandChange">
    <text @click="onMenuTap('Add')">Add</text>
    <text @click="onMenuTap('Favorite')">Favorite</text>
    <text @click="onMenuTap('Share')">Share</text>
  </ms-fab>
  <ms-fab local inset="sm" disabled @click="onFabClick" />
  <!-- Advanced -->
  <ms-fab local inset="lg" position="top-right" icon="edit-line" @click="onFabClick" />
  <ms-fab local inset="lg" position="top-left" icon="customer-service-line" />
  <ms-fab
    local
    inset="sm"
    expandable
    v-model:expanded="modelExpanded"
    @expand-change="onExpandChange"
  >
    <text @click="onMenuTap('Add')">Add</text>
    <text @click="onMenuTap('Favorite')">Favorite</text>
  </ms-fab>
</template>

<script setup lang="uts">
const modelExpanded = ref(false)

function onFabClick() : void {
  console.log('onFabClick')
}

function onExpandChange(next: boolean) : void {
  console.log('onExpandChange')
}

function onMenuTap(label: string) : void {
  console.log('onMenuTap')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | Icon name (icons.uts) |
| text | `string` | `''` | Label beside the primary button; empty = icon only |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | Position |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | Distance from the screen edge |
| expandable | `boolean` | `false` | Whether sub-actions can expand |
| expanded | `boolean` | `false` | Whether expanded; works with `v-model:expanded` |
| local | `boolean` | `false` | Position relative to the parent instead of fixed to the screen |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the button is tapped; not fired while disabled |
| expand-change | `expanded: boolean` | Fires when the panel expands or collapses |
| update:expanded | `value: boolean` | Fires when the panel expands or collapses; used by `v-model:expanded` |

## Slots

| Slot | Description |
| --- | --- |
| default | Sub-actions shown when expanded |
