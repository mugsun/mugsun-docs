---
title: Waterfall
demo: pages/demo/display/waterfall
---

# Waterfall

`ms-waterfall` is a masonry layout that assigns items to columns based on their declared heights, with optional cover images and an empty state.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-waterfall`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/waterfall`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/waterfall.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-waterfall
    :items="baseItems"
    :column="2"
    @item-click="onItemClick"
  />
  <ms-waterfall :items="baseItems" :column="3" @item-click="onItemClick" />
  <!-- Styles -->
  <ms-waterfall :items="mixedItems" :column="2" @item-click="onItemClick" />
  <ms-waterfall
    :items="mixedItems"
    :column="2"
    :balance="false"
    @item-click="onItemClick"
  />
  <!-- Advanced -->
  <ms-waterfall :items="coverItems" :column="2" @item-click="onItemClick" />
  <ms-waterfall :items="emptyItems" empty-text="No waterfall content" />
  <ms-waterfall
    :items="mappedItems"
    :column="2"
    key-field="uid"
    title-key="name"
    desc-key="subtitle"
    height-key="h"
    image-key="cover"
    cover-height-key="ch"
    :item-height="100"
    @item-click="onItemClick"
  />
</template>

<script setup lang="uts">
const baseItems = [
  { id: 'b1', title: 'City at night', desc: 'Height 120', height: 120 },
  { id: 'b2', title: 'Mountain morning', desc: 'Height 96', height: 96 },
  { id: 'b3', title: 'Coastline', desc: 'Height 140', height: 140 },
  { id: 'b4', title: 'Street sketch', desc: 'Height 104', height: 104 },
  { id: 'b5', title: 'Eaves after rain', desc: 'Height 128', height: 128 },
  { id: 'b6', title: 'Forest path', desc: 'Height 88', height: 88 },
] as UTSJSONObject[]

const coverItems = [
  {
    id: 'c1',
    title: 'Cover A',
    desc: 'Laid out by declared height',
    height: 168,
    coverHeight: 100,
    image: '/static/demo-cover.png',
  },
  {
    id: 'c2',
    title: 'Cover B',
    desc: 'Laid out by declared height',
    height: 140,
    coverHeight: 72,
    image: '/static/demo-crop.png',
  },
  {
    id: 'c3',
    title: 'Cover C',
    desc: 'Laid out by declared height',
    height: 156,
    coverHeight: 88,
    image: '/static/demo-cover.png',
  },
  {
    id: 'c4',
    title: 'Cover D',
    desc: 'Laid out by declared height',
    height: 128,
    coverHeight: 64,
    image: '/static/demo-crop.png',
  },
] as UTSJSONObject[]

const emptyItems = [] as UTSJSONObject[]

const mappedItems = [
  {
    uid: 'k1',
    name: 'Mapped A',
    subtitle: 'Field names can be mapped',
    h: 148,
    ch: 84,
    cover: '/static/demo-cover.png',
  },
  {
    uid: 'k2',
    name: 'Mapped B',
    subtitle: 'Field names can be mapped',
    h: 120,
    ch: 64,
    cover: '/static/demo-crop.png',
  },
  {
    uid: 'k3',
    name: 'Mapped C',
    subtitle: 'Field names can be mapped',
    h: 136,
    ch: 72,
    cover: '/static/demo-cover.png',
  },
  {
    uid: 'k4',
    name: 'Mapped D',
    subtitle: 'Field names can be mapped',
    h: 112,
    ch: 56,
    cover: '/static/demo-crop.png',
  },
] as UTSJSONObject[]

const mixedItems = [
  { id: 'm1', title: 'Long card', desc: 'Height 160', height: 160 },
  { id: 'm2', title: 'Short card', desc: 'Height 80', height: 80 },
  { id: 'm3', title: 'Short card', desc: 'Height 80', height: 80 },
  { id: 'm4', title: 'Medium card', desc: 'Height 120', height: 120 },
  { id: 'm5', title: 'Short card', desc: 'Height 80', height: 80 },
] as UTSJSONObject[]

function onItemClick(key: string, index: number) : void {
  console.log('onItemClick')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Entries |
| column | `number` | `2` | Column count |
| balance | `boolean` | `true` | Whether to equalize column heights when possible |
| itemHeight | `number` | `120` | Item height (px) |
| titleKey | `string` | `'title'` | Title field name |
| descKey | `string` | `'desc'` | Description field name |
| heightKey | `string` | `'height'` | Height field name |
| imageKey | `string` | `'image'` | Image field name |
| coverHeightKey | `string` | `'coverHeight'` | Cover height field name |
| keyField | `string` | `'id'` | Primary key field name |
| emptyText | `string` | `'暂无数据'` | Empty-state text |
| coverHeight | `number` | `88` | Default cover height when image is set |

## Events

| Event | Description |
| --- | --- |
| item-click | Item click |

## See also

- Component: `uni_modules/ms-ui/components/ms-waterfall/`
- Demo: `#/pages/demo/display/waterfall`
- Chinese docs: [/uniappx/components/waterfall](/uniappx/components/waterfall)
