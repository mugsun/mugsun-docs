---
title: Sticky 吸顶
demo: pages/demo/nav/sticky
---

# Sticky 吸顶

`ms-sticky` 实现吸顶效果，但不使用 CSS sticky：uni-app x 的 `position: sticky` 只在 Web 上支持，App 端均不支持；官方的 `sticky-header` / `sticky-section` 在微信小程序上不支持，且不能设置 class 和 style，因此也不能作为实现基础。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-sticky`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/nav/sticky`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/sticky.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-sticky :scroll-top="baseScrollTop" :anchor-top="80" @change="onBaseStuck">
    <view>
      <text>基础吸顶条</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="boxScrollTop" :anchor-top="80">
    <view>
      <text>容器内吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 组件状态 -->
  <ms-sticky :scroll-top="disabledScrollTop" :anchor-top="80" :disabled="true">
    <view>
      <text>禁用吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 吸顶距离 -->
  <ms-sticky :scroll-top="offsetScrollTop" :anchor-top="80" :offset-top="40">
    <view>
      <text>距顶 40px 的吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 组件深度 -->
  <ms-sticky
    :scroll-top="depthScrollTop"
    :anchor-top="80"
    :z-index="100"
    :height="44"
    @change="onDepthStuck"
  >
    <view>
      <text>高层吸顶条</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="stackScrollTop" :anchor-top="80" :height="40" :z-index="20">
    <view>
      <text>上层条</text>
    </view>
  </ms-sticky>
  <ms-sticky
    :scroll-top="stackScrollTop"
    :anchor-top="160"
    :offset-top="40"
    :height="40"
    :z-index="19"
  >
    <view>
      <text>下层偏 40</text>
    </view>
  </ms-sticky>
</template>

<script setup lang="uts">
const baseScrollTop = ref(0)

const boxScrollTop = ref(0)

const depthScrollTop = ref(0)

const disabledScrollTop = ref(0)

const offsetScrollTop = ref(0)

const stackScrollTop = ref(0)

function onBaseStuck(next: boolean) : void {
  console.log('onBaseStuck')
}

function onDepthStuck(next: boolean) : void {
  console.log('onDepthStuck')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | 父页面 scroll-view 的 @scroll 事件返回的 detail.scrollTop |
| offsetTop | `number` | `0` | 吸顶后距容器顶 px（多吸顶叠放时给前一个的高） |
| height | `number` | `0` | >0 时跳过测量直接用固定高 |
| zIndex | `number` | `10` | 吸顶层级，远低于 $ms-overlay-z-index |
| disabled | `boolean` | `false` | 禁用吸顶，恒为流内元素 |
| anchorTop | `number` | `0` | 锚点在滚动内容中的偏移；>0 时跳过测量，跨端最稳 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| scroll | 滚动 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-sticky/`
- 演示: `#/pages/demo/nav/sticky`
