---
title: Barrage 弹幕
demo: pages/demo/media/barrage
---

# Barrage 弹幕

`ms-barrage` 是弹幕层，显示在默认插槽内容的上方。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-barrage :list="list" :height="120" :rows="3" :paused="paused" @complete="onComplete">
    <view>
      <text>多行轨道 · 营销滚动示例</text>
    </view>
  </ms-barrage>
  <!-- 组件深度 -->
  <ms-barrage :list="slowList" :height="96" :rows="2" :speed="40">
    <view>
      <text>双轨 · 慢速</text>
    </view>
  </ms-barrage>
  <ms-barrage :list="fastList" :height="140" :rows="4" :speed="120">
    <view>
      <text>四轨 · 快速</text>
    </view>
  </ms-barrage>
  <ms-barrage :list="singleList" :height="56" :rows="1" :speed="60">
    <view>
      <text>单轨 · 单行滚动</text>
    </view>
  </ms-barrage>
</template>

<script setup lang="uts">
const fastList = [
  '快速 A',
  '快速 B',
  '快速 C',
  '快速 D',
  '快速 E',
  '快速 F',
  '快速 G',
  '快速 H',
] as string[]

const list = ref(seed.slice(0) as string[])

const paused = ref(false)

const singleList = ['单轨弹幕 A', '单轨弹幕 B', '单轨弹幕 C'] as string[]

const slowList = ['慢速弹幕一', '慢速弹幕二', '慢速弹幕三', '慢速弹幕四'] as string[]

function onComplete() : void {
  console.log('onComplete')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `string[]` | `[]` | 弹幕文本列表，重新赋值后从头播放 |
| height | `number` | `120` | 高度（px） |
| speed | `number` | `80` | 滚动速度（px/秒） |
| rows | `number` | `3` | 弹幕行数 |
| paused | `boolean` | `false` | 是否暂停弹幕 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| complete | — | 列表里的弹幕全部播放完时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 弹幕下方的内容，例如视频或图片 |
