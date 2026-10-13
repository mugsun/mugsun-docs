---
title: Waterfall
demo: pages/demo/display/waterfall
---

# Waterfall

`ms-waterfall` — Waterfall for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-waterfall`).
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
