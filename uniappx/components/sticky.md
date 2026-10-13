---
title: Sticky 吸顶
demo: pages/demo/nav/sticky
---

# Sticky 吸顶

`ms-sticky`：不是 CSS sticky。`reference/uni-app-x/docs/css/position.md` 明确 `position: sticky` 仅 Web 支持、App 全端 x，`css_diff_web.md` 有专节说明，本仓 `ms-uvue` 规则也直接禁用；官方 `sticky-header`/`sticky-section` 在 **微信小程序为 x** 且不可设 class/style，也不能当底座。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-sticky`（源码仓暂未公开）。
演示路由：`#/pages/demo/nav/sticky`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/sticky.uvue`，可在右侧手机框中查看运行效果。

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
const disabledScrollTop = ref(0)
const offsetScrollTop = ref(0)
const depthScrollTop = ref(0)
const stackScrollTop = ref(0)
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | 宿主 scroll-view @scroll 回传的 detail.scrollTop |
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
