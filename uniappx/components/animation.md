---
title: Animation 动画
demo: pages/demo/feedback/animation
---

# Animation 动画

`ms-animation` 是命令式动画容器，按预设名称播放一次动画。进场和离场过渡请使用 `ms-transition`（由 `visible` 控制）。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-animation`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/feedback/animation`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/animation.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-animation :name="animName" v-model:playing="playing" :duration="400">
    <view>
      <text>{{ effectLabel }}</text>
    </view>
  </ms-animation>
  <!-- 组件样式 -->
  <ms-animation name="fade-in" :auto-play="true" :duration="500">
    <view>
      <text>挂载自动淡入</text>
    </view>
  </ms-animation>
  <ms-animation name="left-in" :auto-play="true" :duration="500" :delay="80">
    <view>
      <text>条目一</text>
      <text>条目二</text>
      <text>条目三</text>
    </view>
  </ms-animation>
  <!-- 组件深度 -->
  <ms-animation name="up-in" :auto-play="true" :duration="450">
    <view>
      <text>上滑示例</text>
    </view>
  </ms-animation>
  <ms-animation name="fade-out" v-model:playing="outPlaying" :duration="600" :delay="200">
    <view>
      <text>延迟淡出示例</text>
    </view>
  </ms-animation>
  <ms-animation name="down-in" :auto-play="true" :duration="420">
    <view>
      <text>下滑示例</text>
    </view>
  </ms-animation>
</template>

<script setup lang="uts">
type AnimName =

const animName = ref('fade-in' as AnimName)

const outPlaying = ref(false)

const playing = ref(false)
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| name | `\| 'fade-in'` | `'fade-in'` | 名称 / 字段名 |
| duration | `number` | `300` | 时长（ms） |
| delay | `number` | `0` | 延迟（ms） |
| autoPlay | `boolean` | `false` | 是否自动播放 |
| playing | `boolean` | `false` | 是否播放中（可 v-model:playing） |

## 事件

| 事件 | 说明 |
| --- | --- |
| before-play | before-play |
| complete | complete |
| update:playing | update:playing |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-animation/`
- 演示: `#/pages/demo/feedback/animation`
