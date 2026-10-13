---
title: View To Full 全屏
demo: pages/demo/media/view-tofull
---

# View To Full 全屏

`ms-view-tofull`：点击区域展开至全屏，关闭回落原位。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-view-tofull`）。
演示路由：`#/pages/demo/media/view-tofull`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/view-tofull.uvue`，可在右侧手机框中查看运行效果。

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
const openedSlow = ref(false)
const openedNoClose = ref(false)
const openedFast = ref(false)
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| duration | `number` | `300` | 时长（ms） |
| showClose | `boolean` | `true` | 全屏时是否显示关闭 |
| opened | `boolean` | `false` | 是否全屏打开 |

## 事件

| 事件 | 说明 |
| --- | --- |
| open | 打开 |
| close | 关闭 |
| opened | opened |
| closed | closed |
| update:opened | update:opened |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-view-tofull/`
- 演示: `#/pages/demo/media/view-tofull`
