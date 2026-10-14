---
title: Steps 步骤
demo: pages/demo/nav/steps
---

# Steps 步骤

`ms-steps` 是步骤条，由 `items`（`title` / `content` / `icon` / `status`）生成，不需要注册子组件。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-steps`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/nav/steps`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/steps.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 title / content / icon / status |
| current | `number` | `0` | 当前步骤下标；等于步骤数表示全部完成 |
| currentStatus | `string` | `'process'` | current 指向步骤的状态：process / error / finish / default |
| layout | `string` | `'horizontal'` | 方向：horizontal / vertical |
| theme | `string` | `'default'` | 风格：default 序号圈 / dot 简略圆点 |
| readonly | `boolean` | `false` | 只读，不触发 change 事件 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-steps/`
- 演示: `#/pages/demo/nav/steps`
