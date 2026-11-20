---
title: Waterfall 瀑布流
demo: pages/demo/display/waterfall
---

# Waterfall 瀑布流

`ms-waterfall` 是瀑布流布局，按每一项声明的高度把它们分到各列，可以带封面图。

高度需要在数据里给出，组件不会测量内容的实际高度。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 列表数据 |
| column | `number` | `2` | 列数 |
| balance | `boolean` | `true` | 是否把每一项放进当前最矮的一列，`false` 时按顺序轮流放 |
| itemHeight | `number` | `120` | 数据里没有高度时使用的默认高度（px） |
| titleKey | `string` | `'title'` | 标题字段名 |
| descKey | `string` | `'desc'` | 描述字段名 |
| heightKey | `string` | `'height'` | 高度字段名 |
| imageKey | `string` | `'image'` | 封面图字段名 |
| coverHeightKey | `string` | `'coverHeight'` | 封面高度字段名 |
| keyField | `string` | `'id'` | 每一项的唯一标识字段名 |
| emptyText | `string` | `'暂无数据'` | 没有数据时的提示文字 |
| coverHeight | `number` | `88` | 有封面图但数据里没有封面高度时使用的默认高度（px） |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| item-click | `key: string, index: number` | 点击某一项时触发，参数是该项的 key 和下标 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| empty | 自定义没有数据时的内容，默认用 [`ms-empty`](./empty) 显示 `emptyText` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getColumnHeights(): number[]` | 返回各列的总高度（px） |
