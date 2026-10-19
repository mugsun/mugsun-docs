---
title: Fab
demo: pages/demo/feedback/fab
---

# Fab

`ms-fab` is a floating action button with preset positions. It can be expandable, and the expanded state binds with `v-model:expanded`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-fab`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/feedback/fab`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/fab.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| icon | `string` | `'add-line'` | Icon name (icons.uts) |
| text | `string` | `''` | Label beside the primary button; empty = icon only |
| position | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'bottom-center'` | `'bottom-right'` | Position |
| inset | `'sm' \| 'md' \| 'lg'` | `'md'` | Whether inset style |
| expandable | `boolean` | `false` | Whether sub-actions can expand |
| expanded | `boolean` | `false` | Expanded state (controlled; pairs with update:expanded) |
| local | `boolean` | `false` | Relative to parent; false = fixed to the edge |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| expand-change | expand-change |
| update:expanded | update:expanded |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-fab/`
- Demo: `#/pages/demo/feedback/fab`
- Chinese docs: [/uniappx/components/fab](/uniappx/components/fab)
