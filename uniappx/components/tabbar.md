---
title: Tabbar 底栏
demo: pages/demo/nav/tabbar
---

# Tabbar 底栏

`ms-tabbar` 是底部导航栏，导航项由 `items` 生成，可以带图标和徽标，当前项的下标用 `v-model:value` 绑定。

默认固定在页面底部。`placeholder` 为 `true` 时会在页面里留出同样的高度，避免内容被挡住。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-tabbar
    :items="textItems"
    :value="textIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onTextChange"
  />
  <ms-tabbar
    :items="iconTextItems"
    :value="iconTextIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onIconTextChange"
  />
  <ms-tabbar
    :items="iconItems"
    :value="iconIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onIconChange"
  />
  <ms-tabbar
    :items="iconTextItems"
    :value="tagIndex"
    theme="tag"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onTagChange"
  />
  <ms-tabbar
    :items="disabledItems"
    :value="disabledIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onDisabledChange"
  />
  <ms-tabbar
    :items="textItems"
    :value="splitIndex"
    split
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onSplitChange"
  />
</template>

<script setup lang="uts">
const disabledIndex = ref(0)

const disabledItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '停用', icon: 'megaphone-line', disabled: true } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { icon: 'home-3-line' } as UTSJSONObject,
  { icon: 'search-line' } as UTSJSONObject,
  { icon: 'megaphone-line' } as UTSJSONObject,
  { icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const iconTextIndex = ref(0)

const iconTextItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '消息', icon: 'megaphone-line' } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const splitIndex = ref(0)

const tagIndex = ref(1)

const textIndex = ref(0)

const textItems = [
  { label: '首页' } as UTSJSONObject,
  { label: '应用' } as UTSJSONObject,
  { label: '聊天' } as UTSJSONObject,
  { label: '我的' } as UTSJSONObject,
] as UTSJSONObject[]

function onTextChange(index: number) : void {
  console.log('onTextChange')
}

function onIconTextChange(index: number) : void {
  console.log('onIconTextChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onTagChange(index: number) : void {
  console.log('onTagChange')
}

function onDisabledChange(index: number) : void {
  console.log('onDisabledChange')
}

function onSplitChange(index: number) : void {
  console.log('onSplitChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项的下标，可用 `v-model:value` |
| items | `UTSJSONObject[]` | `[]` | 导航项，每项含 `label`，可选 `icon` / `count` / `badge` / `dot` / `disabled` |
| theme | `'normal' \| 'tag'` | `'normal'` | 选中样式：normal 使用主题色 / tag 只加粗文字 |
| shape | `'normal' \| 'round'` | `'normal'` | 外形：normal 通栏 / round 悬浮的胶囊 |
| bordered | `boolean` | `true` | 是否显示顶部边框 |
| split | `boolean` | `false` | 导航项之间是否显示分隔线 |
| fixed | `boolean` | `true` | 是否固定在页面底部 |
| placeholder | `boolean` | `false` | 固定时是否在页面里留出同样的高度，避免内容被挡住 |
| safeAreaInsetBottom | `boolean` | `true` | 是否预留底部安全区 |
| zIndex | `number` | `400` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `index: number` | 选中项变化时触发，`index` 是新选中项的下标 |
| update:value | `index: number` | 选中项变化时触发，用于 `v-model:value` |
