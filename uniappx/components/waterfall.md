---
title: Waterfall 瀑布流
demo: pages/demo/display/waterfall
---

# Waterfall 瀑布流

`ms-waterfall` 是瀑布流布局，根据声明的高度把各项分配到各列，可选显示封面图和空状态。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-waterfall`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/display/waterfall`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/waterfall.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 条目列表 |
| column | `number` | `2` | 列数 |
| balance | `boolean` | `true` | 是否尽量均分列高 |
| itemHeight | `number` | `120` | 单项高度（px） |
| titleKey | `string` | `'title'` | 标题字段名 |
| descKey | `string` | `'desc'` | 描述字段名 |
| heightKey | `string` | `'height'` | 高度字段名 |
| imageKey | `string` | `'image'` | 图片字段名 |
| coverHeightKey | `string` | `'coverHeight'` | 封面高度字段名 |
| keyField | `string` | `'id'` | 主键字段名 |
| emptyText | `string` | `'暂无数据'` | 空态文案 |
| coverHeight | `number` | `88` | 缺省封面高（有 image 时） |

## 事件

| 事件 | 说明 |
| --- | --- |
| item-click | 点击菜单项 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-waterfall/`
- 演示: `#/pages/demo/display/waterfall`
