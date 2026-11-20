---
title: Indexbar 索引
demo: pages/demo/nav/indexbar
---

# Indexbar 索引

`ms-indexbar` 是带侧边索引的分组列表，点击或拖动侧边的索引字符可以跳到对应分组。

当前索引用 `v-model:current` 绑定。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-indexbar
    :items="cityItems"
    :height="300"
    @change="onBaseChange"
    @select="onBaseSelect"
    @click="onBaseClick"
  />
  <ms-indexbar
    :items="customItems"
    :index-list="customKeys"
    :height="260"
    @select="onCustomSelect"
  />
  <!-- 组件状态 -->
  <ms-indexbar :items="shortItems" :show-anchor="false" :height="200" @select="onPlainSelect" />
  <ms-indexbar :items="disabledItems" :height="200" @click="onDisabledClick" />
  <!-- 组件深度 -->
  <ms-indexbar :items="cityItems" current="C" :height="240" @change="onControlledChange" />
  <ms-indexbar :items="shortItems" :show-tip="false" :height="200" />
  <ms-indexbar
    v-model:current="modelCurrent"
    :items="cityItems"
    :height="240"
  />
</template>

<script setup lang="uts">
const cityItems = [
  { index: 'B', label: '北京' } as UTSJSONObject,
  { index: 'B', label: '保定' } as UTSJSONObject,
  { index: 'C', label: '成都' } as UTSJSONObject,
  { index: 'C', label: '长沙' } as UTSJSONObject,
  { index: 'G', label: '广州' } as UTSJSONObject,
  { index: 'G', label: '贵阳' } as UTSJSONObject,
  { index: 'H', label: '杭州' } as UTSJSONObject,
  { index: 'H', label: '合肥' } as UTSJSONObject,
  { index: 'N', label: '南京' } as UTSJSONObject,
  { index: 'S', label: '上海' } as UTSJSONObject,
  { index: 'S', label: '苏州' } as UTSJSONObject,
  { index: 'W', label: '武汉' } as UTSJSONObject,
]

const customItems = [
  { index: '热门', label: '北京' } as UTSJSONObject,
  { index: '热门', label: '上海' } as UTSJSONObject,
  { index: '华东', label: '杭州' } as UTSJSONObject,
  { index: '华东', label: '南京' } as UTSJSONObject,
  { index: '华南', label: '广州' } as UTSJSONObject,
  { index: '华南', label: '深圳' } as UTSJSONObject,
  { index: '西南', label: '成都' } as UTSJSONObject,
]

const customKeys = [
  { key: '热门', label: '热' } as UTSJSONObject,
  { key: '华东', label: '东' } as UTSJSONObject,
  { key: '华南', label: '南' } as UTSJSONObject,
  { key: '西南', label: '西' } as UTSJSONObject,
]

const disabledItems = [
  { index: 'K', label: '昆明' } as UTSJSONObject,
  { index: 'K', label: '停用城市', disabled: true } as UTSJSONObject,
  { index: 'L', label: '兰州' } as UTSJSONObject,
  { index: 'L', label: '洛阳', disabled: true } as UTSJSONObject,
]

const modelCurrent = ref('B')

const shortItems = [
  { index: 'A', label: '鞍山' } as UTSJSONObject,
  { index: 'A', label: '安庆' } as UTSJSONObject,
  { index: 'D', label: '大连' } as UTSJSONObject,
  { index: 'D', label: '东莞' } as UTSJSONObject,
  { index: 'F', label: '福州' } as UTSJSONObject,
]

function onBaseChange(index: string) : void {
  console.log('onBaseChange')
}

function onBaseSelect(index: string) : void {
  console.log('onBaseSelect')
}

function onBaseClick(payload: UTSJSONObject) : void {
  console.log('onBaseClick')
}

function onCustomSelect(index: string) : void {
  console.log('onCustomSelect')
}

function onPlainSelect(index: string) : void {
  console.log('onPlainSelect')
}

function onDisabledClick(payload: UTSJSONObject) : void {
  console.log('onDisabledClick')
}

function onControlledChange(index: string) : void {
  console.log('onControlledChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 列表数据，每项含 `index`（所属索引）、`label` 和可选的 `disabled`；`index` 相同的项归为一组 |
| current | `string` | `''` | 当前索引字符，留空时取第一组，可用 `v-model:current` |
| indexList | `UTSJSONObject[]` | `[]` | 侧边索引表，每项含 `key` 和 `label`；留空时从 `items` 推导 |
| height | `number` | `360` | 容器高度（px） |
| showTip | `boolean` | `true` | 拖动侧边索引时是否显示大字提示 |
| showAnchor | `boolean` | `true` | 是否显示分组标题 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `index: string` | 当前索引切换时触发，来源包括滚动列表、操作侧边索引和调用 `scrollToIndex` |
| select | `index: string` | 点击或拖动侧边索引时触发，`index` 是选中的索引字符 |
| click | `payload: UTSJSONObject` | 点击列表行时触发，`payload` 含 `index`、`label` 和 `rowIndex`；禁用的行不触发 |
| update:current | `value: string` | 当前索引切换时触发，用于 `v-model:current` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `scrollToIndex(index: string)` | 滚动到指定索引的分组 |
| `getCurrent(): string` | 返回当前索引字符 |
