---
title: Pull Refresh 刷新
demo: pages/demo/feedback/pull-refresh
---

# Pull Refresh 刷新

`ms-pull-refresh`：包装 `scroll-view` 内置 `refresher-*`，不手搓 touch —— TDesign 那套 `translate3d` 位移在蒸汽下违红线，且 `refresher-max-drag-distance` 在 Web/微信都不支持，手搓等于必须自己写位移。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-pull-refresh`（源码仓暂未公开）。
演示路由：`#/pages/demo/feedback/pull-refresh`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/pull-refresh.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-pull-refresh
    v-model="baseRefreshing"
    :height="220"
    @refresh="onBaseRefresh"
    @restore="onBaseRestore"
  >
    <view v-for="row in baseRows" :key="row">
      <text>{{ row }}</text>
    </view>
  </ms-pull-refresh>
  <ms-pull-refresh v-model="customRefreshing" :height="180" @refresh="onCustomRefresh">
    <template #refresher>
      <text>自定义刷新提示</text>
    </template>
    <view v-for="row in customRows" :key="row">
      <text>{{ row }}</text>
    </view>
  </ms-pull-refresh>
  <!-- 组件状态 -->
  <ms-pull-refresh :disabled="true" :height="140">
    <view>
      <text>禁用下拉的内容</text>
    </view>
    <view>
      <text>下拉手势不生效</text>
    </view>
  </ms-pull-refresh>
  <!-- 阈值与高度 -->
  <ms-pull-refresh :threshold="100" :height="160" @refresh="onLargeRefresh">
    <view>
      <text>需下拉 100px 才触发</text>
    </view>
    <view>
      <text>容器高 160px</text>
    </view>
  </ms-pull-refresh>
</template>

<script setup lang="uts">
const baseRefreshing = ref(false)

const baseRows = ['列表项 1', '列表项 2', '列表项 3', '列表项 4', '列表项 5']

const customRefreshing = ref(false)

const customRows = ['自定义列表 A', '自定义列表 B', '自定义列表 C']

function onBaseRefresh() : void {
  console.log('onBaseRefresh')
}

function onBaseRestore() : void {
  console.log('onBaseRestore')
}

function onCustomRefresh() : void {
  console.log('onCustomRefresh')
}

function onLargeRefresh() : void {
  console.log('onLargeRefresh')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 刷新中；业务处理完置 false 收起 |
| disabled | `boolean` | `false` | 禁用下拉 |
| threshold | `number` | `60` | 触发阈值 px，同时作 refresher 槽固定高 |
| height | `number` | `360` | 容器固定高 px（蒸汽禁百分比高） |
| texts | `UTSJSONObject[]` | `[]` | 覆盖四态文案：{ status, text } |
| successDuration | `number` | `500` | 「刷新完成」停留 ms |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| refresh | 刷新 |
| pulling | pulling |
| restore | restore |
| scrolltolower | 触底 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| refresher | `refresher` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-pull-refresh/`
- 演示: `#/pages/demo/feedback/pull-refresh`
