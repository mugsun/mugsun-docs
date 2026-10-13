---
title: Steps
demo: pages/demo/nav/steps
---

# Steps

`ms-steps` — Steps for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-steps` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/steps`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/steps.uvue`; see them running in the phone frame.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Each item: title / content / icon / status |
| current | `number` | `0` | Current step index; equals step count when all done |
| currentStatus | `string` | `'process'` | Status of the step at current: process / error / finish / default |
| layout | `string` | `'horizontal'` | Direction: horizontal / vertical |
| theme | `string` | `'default'` | Style: default numbered circle / dot |
| readonly | `boolean` | `false` | Read-only; does not emit change |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-steps/`
- Demo: `#/pages/demo/nav/steps`
- Chinese docs: [/uniappx/components/steps](/uniappx/components/steps)
