---
title: Steps 步骤
demo: pages/demo/nav/steps
---

# Steps 步骤

`ms-steps` 是步骤条，步骤由 `items` 生成，可以横向或纵向排列。

各步骤的状态默认按 `current` 推算：之前的已完成，之后的未开始。步骤自己的 `status` 优先。

点击步骤可以切换，当前步骤用 `v-model:current` 绑定；不需要点击时设置 `readonly`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-steps :items="baseItems" v-model:current="baseCurrent" @change="onBaseChange" />
  <ms-steps
    :items="verticalItems"
    :current="1"
    layout="vertical"
    @change="onVerticalChange"
  />
  <ms-steps
    :items="iconItems"
    :current="1"
    @change="onIconChange"
  />
  <!-- 组件状态 -->
  <ms-steps
    :items="errorItems"
    :current="1"
    current-status="error"
    @change="onErrorChange"
  />
  <ms-steps :items="baseItems" :current="3" readonly />
  <!-- 风格 -->
  <ms-steps :items="dotItems" :current="1" theme="dot" @change="onDotChange" />
  <!-- 组件深度 -->
  <ms-steps
    :items="errorItems"
    :current="1"
    current-status="error"
    layout="vertical"
    readonly
  />
  <ms-steps :items="baseItems" :current="1" readonly />
  <ms-steps :items="baseItems" v-model:current="depthCurrent" @change="onDepthChange" />
</template>

<script setup lang="uts">
const baseCurrent = ref(1)

const baseItems = [
  { title: '已完成', content: '辅助信息' } as UTSJSONObject,
  { title: '当前步骤', content: '辅助信息' } as UTSJSONObject,
  { title: '未完成', content: '辅助信息' } as UTSJSONObject,
] as UTSJSONObject[]

const depthCurrent = ref(0)

const dotItems = [
  { title: '已完成', content: '辅助信息' } as UTSJSONObject,
  { title: '当前步骤', content: '辅助信息' } as UTSJSONObject,
  { title: '未完成', content: '辅助信息' } as UTSJSONObject,
] as UTSJSONObject[]

const errorItems = [
  { title: '已完成', content: '辅助信息' } as UTSJSONObject,
  { title: '错误步骤', content: '请重新提交' } as UTSJSONObject,
  { title: '未完成', content: '辅助信息' } as UTSJSONObject,
] as UTSJSONObject[]

const iconItems = [
  { title: '下单', content: '辅助信息', icon: 'check-line' } as UTSJSONObject,
  { title: '发货', content: '辅助信息', icon: 'inbox-line' } as UTSJSONObject,
  { title: '收货', content: '辅助信息', icon: 'home-3-line' } as UTSJSONObject,
] as UTSJSONObject[]

const verticalItems = [
  { title: '已完成步骤', content: '可自定义此处内容' } as UTSJSONObject,
  { title: '当前步骤', content: '可自定义此处内容' } as UTSJSONObject,
  { title: '未完成步骤', content: '可自定义此处内容' } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(current: number, previous: number) : void {
  console.log('onBaseChange')
}

function onVerticalChange(current: number, previous: number) : void {
  console.log('onVerticalChange')
}

function onIconChange(current: number, previous: number) : void {
  console.log('onIconChange')
}

function onErrorChange(current: number, previous: number) : void {
  console.log('onErrorChange')
}

function onDotChange(current: number, previous: number) : void {
  console.log('onDotChange')
}

function onDepthChange(current: number, previous: number) : void {
  console.log('onDepthChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 步骤列表，每项含 `title`，可选 `content` / `icon` / `status` |
| current | `number` | `0` | 当前步骤的下标，等于步骤总数时表示全部完成，可用 `v-model:current` |
| currentStatus | `string` | `'process'` | 当前步骤的状态：process / error / finish / default |
| layout | `string` | `'horizontal'` | 排列方向：horizontal 横向 / vertical 纵向 |
| theme | `string` | `'default'` | 样式：default 带序号的圆圈 / dot 小圆点 |
| readonly | `boolean` | `false` | 是否只读，只读时点击不触发任何事件 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `current: number, previous: number` | 切换步骤时触发，参数是新步骤和原步骤的下标 |
| click | `index: number` | 点击任意步骤时触发，包括当前步骤 |
| update:current | `index: number` | 切换步骤时触发，用于 `v-model:current` |
