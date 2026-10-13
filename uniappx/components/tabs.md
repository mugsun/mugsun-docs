---
title: Tabs 选项卡
demo: pages/demo/nav/tabs
---

# Tabs 选项卡

`ms-tabs`：选项卡：line / tag / card；均分或横向滚动；徽标；内容区。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-tabs`（商业版，源码不公开）。
演示路由：`#/pages/demo/nav/tabs`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/tabs.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / count / badge / dot / disabled / content |
| theme | `'line' \| 'tag' \| 'card'` | `'line'` | 主题色 |
| size | `'md' \| 'lg'` | `'md'` | 尺寸 |
| spaceEvenly | `boolean` | `true` | 头部是否均分；false 时按内容撑开并可横向滚动 |
| showLine | `boolean` | `true` | line 主题是否显示底部激活条 |
| showContent | `boolean` | `false` | 是否渲染内容区（items[].content 或默认插槽） |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:value | v-model:value 更新 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tabs/`
- 演示: `#/pages/demo/nav/tabs`
