---
title: Tabs 选项卡
demo: pages/demo/nav/tabs
---

# Tabs 选项卡

`ms-tabs` 是选项卡，有 line、tag 和 card 三种样式，标签可以均分宽度或横向滚动，支持徽标和内容区。

选中项的下标用 `v-model:value` 绑定。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-tabs
    :items="baseItems"
    :value="baseIndex"
    @change="onBaseChange"
  />
  <ms-tabs
    :items="scrollItems"
    :value="scrollIndex"
    :space-evenly="false"
    @change="onScrollChange"
  />
  <ms-tabs
    :items="iconItems"
    :value="iconIndex"
    @change="onIconChange"
  />
  <ms-tabs
    :items="statusItems"
    :value="statusIndex"
    @change="onStatusChange"
  />
  <ms-tabs :items="themeItems" :value="mdIndex" size="md" @change="onMdChange" />
  <ms-tabs
    :items="themeItems"
    :value="lgIndex"
    size="lg"
    @change="onLgChange"
  />
  <ms-tabs
    :items="themeItems"
    :value="tagIndex"
    theme="tag"
    @change="onTagChange"
  />
</template>

<script setup lang="uts">
const baseIndex = ref(0)

const baseItems = [
  { label: '选项一' } as UTSJSONObject,
  { label: '选项二' } as UTSJSONObject,
  { label: '选项三' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const lgIndex = ref(0)

const mdIndex = ref(0)

const scrollIndex = ref(0)

const scrollItems = [
  { label: '推荐' } as UTSJSONObject,
  { label: '热门' } as UTSJSONObject,
  { label: '新品' } as UTSJSONObject,
  { label: '服饰' } as UTSJSONObject,
  { label: '数码' } as UTSJSONObject,
  { label: '家电' } as UTSJSONObject,
  { label: '美妆' } as UTSJSONObject,
  { label: '更多' } as UTSJSONObject,
] as UTSJSONObject[]

const statusIndex = ref(0)

const statusItems = [
  { label: '可选一' } as UTSJSONObject,
  { label: '可选二' } as UTSJSONObject,
  { label: '禁用', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const tagIndex = ref(0)

const themeItems = [
  { label: '选项一' } as UTSJSONObject,
  { label: '选项二' } as UTSJSONObject,
  { label: '选项三' } as UTSJSONObject,
  { label: '选项四' } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(index: number) : void {
  console.log('onBaseChange')
}

function onScrollChange(index: number) : void {
  console.log('onScrollChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onStatusChange(index: number) : void {
  console.log('onStatusChange')
}

function onMdChange(index: number) : void {
  console.log('onMdChange')
}

function onLgChange(index: number) : void {
  console.log('onLgChange')
}

function onTagChange(index: number) : void {
  console.log('onTagChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项的下标，可用 `v-model:value` |
| items | `UTSJSONObject[]` | `[]` | 选项卡列表，每项含 `label`，可选 `icon` / `count` / `badge` / `dot` / `disabled` / `content` |
| theme | `'line' \| 'tag' \| 'card'` | `'line'` | 样式：line 下划线 / tag 标签 / card 卡片 |
| size | `'md' \| 'lg'` | `'md'` | 尺寸 |
| spaceEvenly | `boolean` | `true` | 标签是否均分宽度；`false` 时按内容宽度排列，可以横向滚动 |
| showLine | `boolean` | `true` | `line` 样式下是否显示选中项的下划线 |
| showContent | `boolean` | `false` | 是否显示内容区，内容来自当前项的 `content` 或默认插槽 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `index: number` | 选中项变化时触发，`index` 是新选中项的下标 |
| click | `index: number` | 点击任意未禁用的标签时触发，包括当前项 |
| update:value | `index: number` | 选中项变化时触发，用于 `v-model:value` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 内容区，`showContent` 为 `true` 时显示，默认是当前项的 `content` |
