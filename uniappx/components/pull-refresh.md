---
title: Pull Refresh 下拉刷新
demo: pages/demo/feedback/pull-refresh
---

# Pull Refresh 下拉刷新

`ms-pull-refresh` 是下拉刷新容器，内部是一个固定高度的 `scroll-view`，使用它自带的下拉刷新。

用 `v-model` 绑定是否正在刷新：下拉后变为 `true` 并触发 `refresh`，数据加载完把它设回 `false` 就会收起。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 是否正在刷新；数据加载完设回 `false` 收起 |
| disabled | `boolean` | `false` | 是否禁用下拉刷新 |
| threshold | `number` | `60` | 触发刷新需要下拉的距离（px），也是提示区的高度 |
| height | `number` | `360` | 容器高度（px） |
| texts | `UTSJSONObject[]` | `[]` | 自定义各状态的提示文字，每项含 `status` 和 `text`；`status` 可取 pulling / loosing / refreshing / done |
| successDuration | `number` | `500` | 刷新完成的提示停留的时长（ms） |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: boolean` | 刷新状态变化时触发，用于 `v-model` |
| refresh | — | 下拉到触发距离后松手时触发，调用 `start()` 时也会触发；在这里加载数据 |
| pulling | `dy: number` | 下拉过程中触发，`dy` 是下拉距离（px） |
| restore | — | 提示区收起后触发 |
| scrolltolower | — | 滚动到底部时触发，可用于加载下一页 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 列表内容 |
| refresher | 自定义下拉提示区，作用域参数为 `status`（当前状态）和 `dy`（下拉距离） |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `start()` | 开始刷新，效果同用户下拉 |
| `stop()` | 结束刷新并收起提示区 |
| `getStatus(): string` | 返回当前状态：idle / pulling / loosing / refreshing / done |
