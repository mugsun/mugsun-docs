---
title: Waterfall
demo: pages/demo/display/waterfall
---

# Waterfall

`ms-waterfall` — Waterfall for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-waterfall` (repository not yet public).
Demo route: `#/pages/demo/display/waterfall`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/waterfall.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-waterfall
    :items="baseItems"
    :column="2"
    @item-click="onItemClick"
  />
  <ms-waterfall :items="baseItems" :column="3" @item-click="onItemClick" />
  <!-- 组件样式 -->
  <ms-waterfall :items="mixedItems" :column="2" @item-click="onItemClick" />
  <ms-waterfall
    :items="mixedItems"
    :column="2"
    :balance="false"
    @item-click="onItemClick"
  />
  <!-- 组件深度 -->
  <ms-waterfall :items="coverItems" :column="2" @item-click="onItemClick" />
  <ms-waterfall :items="emptyItems" empty-text="暂无瀑布流内容" />
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
  { id: 'b1', title: '城市夜景', desc: '高度 120', height: 120 },
  { id: 'b2', title: '山间清晨', desc: '高度 96', height: 96 },
  { id: 'b3', title: '海岸线', desc: '高度 140', height: 140 },
  { id: 'b4', title: '街头速写', desc: '高度 104', height: 104 },
  { id: 'b5', title: '雨后屋檐', desc: '高度 128', height: 128 },
  { id: 'b6', title: '林间小径', desc: '高度 88', height: 88 },
] as UTSJSONObject[]

const coverItems = [
  {
    id: 'c1',
    title: '封面 A',
    desc: '按声明高度排布',
    height: 168,
    coverHeight: 100,
    image: '/static/demo-cover.png',
  },
  {
    id: 'c2',
    title: '封面 B',
    desc: '按声明高度排布',
    height: 140,
    coverHeight: 72,
    image: '/static/demo-crop.png',
  },
  {
    id: 'c3',
    title: '封面 C',
    desc: '按声明高度排布',
    height: 156,
    coverHeight: 88,
    image: '/static/demo-cover.png',
  },
  {
    id: 'c4',
    title: '封面 D',
    desc: '按声明高度排布',
    height: 128,
    coverHeight: 64,
    image: '/static/demo-crop.png',
  },
] as UTSJSONObject[]

const emptyItems = [] as UTSJSONObject[]

const mappedItems = [
  {
    uid: 'k1',
    name: '映射 A',
    subtitle: '字段名可映射',
    h: 148,
    ch: 84,
    cover: '/static/demo-cover.png',
  },
  {
    uid: 'k2',
    name: '映射 B',
    subtitle: '字段名可映射',
    h: 120,
    ch: 64,
    cover: '/static/demo-crop.png',
  },
  {
    uid: 'k3',
    name: '映射 C',
    subtitle: '字段名可映射',
    h: 136,
    ch: 72,
    cover: '/static/demo-cover.png',
  },
  {
    uid: 'k4',
    name: '映射 D',
    subtitle: '字段名可映射',
    h: 112,
    ch: 56,
    cover: '/static/demo-crop.png',
  },
] as UTSJSONObject[]

const mixedItems = [
  { id: 'm1', title: '长卡片', desc: '高度 160', height: 160 },
  { id: 'm2', title: '短卡片', desc: '高度 80', height: 80 },
  { id: 'm3', title: '短卡片', desc: '高度 80', height: 80 },
  { id: 'm4', title: '中卡片', desc: '高度 120', height: 120 },
  { id: 'm5', title: '短卡片', desc: '高度 80', height: 80 },
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
