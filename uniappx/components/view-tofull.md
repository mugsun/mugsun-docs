---
title: View To Full 全屏
demo: pages/demo/media/view-tofull
---

# View To Full 全屏

`ms-view-tofull` 在点击后把一块区域展开到全屏，关闭后回到原来的位置。

展开状态用 `v-model:opened` 绑定，可以据此在全屏时显示更多内容。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-view-tofull v-model:opened="openedA" @opened="onOpened">
    <view :class="openedA ? 'demo-full-card--open' : ''">
      <text>点开展开示例</text>
      <text>点击卡片进入全屏</text>
      <view v-if="openedA">
        <text>加量内容：展开后可见的详细说明与列表。</text>
        <text>适用于视频、详情等不想新开页的场景。</text>
      </view>
    </view>
  </ms-view-tofull>
  <!-- 组件样式 -->
  <ms-view-tofull v-model:opened="openedB">
    <view :class="openedB ? 'demo-full-card--open' : ''">
      <text>卡片甲</text>
      <text v-if="openedB">甲的加量内容</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedC">
    <view :class="openedC ? 'demo-full-card--open' : ''">
      <text>卡片乙</text>
      <text v-if="openedC">乙的加量内容</text>
    </view>
  </ms-view-tofull>
  <!-- 组件深度 -->
  <ms-view-tofull v-model:opened="openedSlow" :duration="600">
    <view :class="openedSlow ? 'demo-full-card--open' : ''">
      <text>慢展开 600ms</text>
      <text v-if="openedSlow">慢动画加量内容</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedNoClose" :show-close="false" :duration="280">
    <view :class="openedNoClose ? 'demo-full-card--open' : ''" @click.stop="toggleNoClose">
      <text>无关闭钮 · 再点回落</text>
      <text v-if="openedNoClose">点此区域可关闭</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedFast" :duration="120">
    <view :class="openedFast ? 'demo-full-card--open' : ''">
      <text>快展开 120ms</text>
      <text v-if="openedFast">短时长过渡</text>
    </view>
  </ms-view-tofull>
</template>

<script setup lang="uts">
const openedA = ref(false)

const openedB = ref(false)

const openedC = ref(false)

const openedFast = ref(false)

const openedNoClose = ref(false)

const openedSlow = ref(false)

function onOpened() : void {
  console.log('onOpened')
}

function toggleNoClose() : void {
  console.log('toggleNoClose')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| duration | `number` | `300` | 展开和收起动画的时长（ms） |
| showClose | `boolean` | `true` | 全屏时是否显示关闭按钮 |
| opened | `boolean` | `false` | 是否全屏展开，可用 `v-model:opened` |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| open | — | 开始展开时触发 |
| opened | — | 展开动画结束后触发 |
| close | — | 开始收起时触发 |
| closed | — | 收起动画结束后触发 |
| update:opened | `value: boolean` | 展开或收起时触发，用于 `v-model:opened` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 要展开的内容 |
