---
title: Barrage 弹幕
demo: pages/demo/media/barrage
---

# Barrage 弹幕

`ms-barrage` 是弹幕层，显示在默认插槽内容的上方。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-barrage`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/media/barrage`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/barrage.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `string[]` | `[]` | 数据列表 |
| height | `number` | `120` | 高度（px） |
| speed | `number` | `80` | 速度 |
| rows | `number` | `3` | 行数 |
| paused | `boolean` | `false` | 是否暂停弹幕 |

## 事件

| 事件 | 说明 |
| --- | --- |
| complete | complete |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-barrage/`
- 演示: `#/pages/demo/media/barrage`
