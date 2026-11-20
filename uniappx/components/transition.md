---
title: Transition 过渡
demo: pages/demo/basic/transition
---

# Transition 过渡

`ms-transition` 是进场和离场的过渡容器，`visible` 变化时为插槽里的内容播放过渡动画。

效果用 `name` 选择，有淡入淡出、缩放和四个方向的滑动。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-transition :visible="fadeVisible">
    <view>
      <text>淡入淡出内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="slideVisible" name="slide-right" :duration="300">
    <view>
      <text>右侧滑入内容</text>
    </view>
  </ms-transition>
  <!-- 组件样式 -->
  <ms-transition :visible="true" :appear="true" name="zoom">
    <view>
      <text>打开即缩放进场</text>
    </view>
  </ms-transition>
  <ms-transition
    :visible="destroyVisible"
    :destroy-on-hide="true"
    name="slide-up"
    @after-leave="onDestroyed"
  >
    <view>
      <text>隐藏后不留内容</text>
    </view>
  </ms-transition>
  <!-- 组件深度 -->
  <ms-transition :visible="leftVisible" name="slide-left" :duration="300">
    <view>
      <text>左侧滑入内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="downVisible" name="slide-down" :duration="300">
    <view>
      <text>下沉内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="zoomVisible" name="zoom" :duration="300">
    <view>
      <text>缩放过渡内容</text>
    </view>
  </ms-transition>
</template>

<script setup lang="uts">
const destroyVisible = ref(true)

const downVisible = ref(true)

const fadeVisible = ref(true)

const leftVisible = ref(true)

const slideVisible = ref(true)

const zoomVisible = ref(true)

function onDestroyed() : void {
  console.log('onDestroyed')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| name | `'fade' \| 'zoom' \| 'slide-left' \| 'slide-right' \| 'slide-up' \| 'slide-down'` | `'fade'` | 过渡效果：fade / zoom / slide-left / slide-right / slide-up / slide-down |
| duration | `number` | `300` | 过渡时长（ms） |
| appear | `boolean` | `false` | 首次渲染时是否播放进场过渡 |
| destroyOnHide | `boolean` | `false` | 隐藏后是否移除插槽里的内容 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| before-enter | — | 进场过渡开始前触发 |
| after-enter | — | 进场过渡结束后触发 |
| before-leave | — | 离场过渡开始前触发 |
| after-leave | — | 离场过渡结束后触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 要做过渡的内容 |
