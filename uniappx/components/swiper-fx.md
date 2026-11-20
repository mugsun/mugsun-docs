---
title: Swiper Fx 动效轮播
demo: pages/demo/display/swiper-fx
---

# Swiper Fx 动效轮播

`ms-swiper-fx` 是带切换动效的轮播，由数据生成，`list` 中的每一项支持 `image`、`color` 和 `label`。

切换效果用 `effect` 选择，当前项用 `v-model:current` 绑定。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-swiper-fx
    :list="list"
    :effect="effectName"
    :height="160"
    :autoplay="true"
    :interval="4000"
    @change="onChange"
    @click="onClick"
  />
  <!-- 组件样式 -->
  <ms-swiper-fx :list="list" effect="slide" :show-dots="true" :autoplay="false" :height="140" />
  <!-- 组件深度 -->
  <ms-swiper-fx
    :list="list"
    effect="fade"
    :loop="false"
    :autoplay="false"
    :height="140"
  />
  <ms-swiper-fx
    :list="list"
    effect="slide"
    :duration="200"
    :interval="2000"
    :height="140"
  />
  <ms-swiper-fx
    :list="list"
    effect="slide"
    :current="1"
    :autoplay="false"
    :height="140"
  />
</template>

<script setup lang="uts">
type FxEffect = 'fade' | 'slide' | 'zoom' | 'scale-slide'

const effectName = ref('fade' as FxEffect)

const list = ref([
  { color: '#64748b', label: '卡片一' } as UTSJSONObject,
  { color: '#0f766e', label: '卡片二' } as UTSJSONObject,
  { color: '#b45309', label: '卡片三' } as UTSJSONObject,
] as UTSJSONObject[])

function onChange(i: number) : void {
  console.log('onChange')
}

function onClick(i: number) : void {
  console.log('onClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 轮播项，每项可含 `image`、`color` 和 `label` |
| effect | `'fade' \| 'slide' \| 'zoom' \| 'scale-slide'` | `'fade'` | 切换效果：fade / slide / zoom / scale-slide |
| current | `number` | `0` | 当前项的下标，可用 `v-model:current` |
| height | `number` | `160` | 高度（px） |
| autoplay | `boolean` | `true` | 是否自动播放 |
| interval | `number` | `3500` | 自动播放的间隔（ms） |
| duration | `number` | `600` | 切换动画的时长（ms） |
| loop | `boolean` | `true` | 是否循环播放 |
| showDots | `boolean` | `true` | 是否显示指示点，点击指示点可以切换 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `index: number` | 当前项变化时触发，`index` 是新的下标 |
| click | `index: number` | 点击轮播项时触发，`index` 是被点击项的下标 |
| update:current | `value: number` | 当前项变化时触发，用于 `v-model:current` |
