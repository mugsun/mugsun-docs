---
title: Swipe Cell 滑动单元格
demo: pages/demo/feedback/swipe-cell
---

# Swipe Cell 滑动单元格

`ms-swipe-cell` 是可以左右滑动的单元格。向左滑露出右侧的操作面板，向右滑露出左侧的面板。

右侧面板放在 `actions` 插槽，用 `v-model:opened` 控制；左侧用 `left` 插槽和 `v-model:openedLeft`。

组件不会自动收起其他已展开的单元格，需要时在 `open` 事件里自行处理。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-swipe-cell :bordered="false" v-model:opened="singleOpened" @open="onOpen" @close="onClose">
    <template #actions>
      <view @click="onAction('删除')">
        <text>删除</text>
      </view>
    </template>
    <view>
      <text>单行内容 · 左滑显示删除</text>
    </view>
  </ms-swipe-cell>
  <ms-swipe-cell :bordered="false">
    <template #actions>
      <view @click="onAction('收藏')">
        <text>收藏</text>
      </view>
      <view @click="onAction('删除')">
        <text>删除</text>
      </view>
    </template>
    <view>
      <text>双操作行</text>
      <text>辅助信息</text>
    </view>
  </ms-swipe-cell>
  <!-- 组件状态 -->
  <ms-swipe-cell :bordered="false" :disabled="true">
    <template #actions>
      <view>
        <text>删除</text>
      </view>
    </template>
    <view>
      <text>禁用滑动的行</text>
    </view>
  </ms-swipe-cell>
  <!-- 内容规格 -->
  <ms-swipe-cell v-for="row in rows" :key="row" :bordered="row < rows.length">
    <template #actions>
      <view @click="onAction('删除')">
        <text>删除</text>
      </view>
    </template>
    <view>
      <text>大列表内容 {{ row }}</text>
    </view>
  </ms-swipe-cell>
</template>

<script setup lang="uts">
const rows = [1, 2, 3]

const singleOpened = ref(false)

function onOpen() : void {
  console.log('onOpen')
}

function onClose() : void {
  console.log('onClose')
}

function onAction(text: string) : void {
  console.log('onAction')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | 右侧面板是否展开，可用 `v-model:opened` |
| openedLeft | `boolean` | `false` | 左侧面板是否展开，可用 `v-model:openedLeft` |
| disabled | `boolean` | `false` | 是否禁用滑动 |
| threshold | `number` | `20` | 滑动超过这个距离（px）松手后才会展开 |
| bordered | `boolean` | `true` | 是否显示底部分隔线 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:opened | `value: boolean` | 右侧面板展开状态变化时触发，用于 `v-model:opened` |
| update:openedLeft | `value: boolean` | 左侧面板展开状态变化时触发，用于 `v-model:openedLeft` |
| open | `side: string` | 面板展开时触发，`side` 为 `left` 或 `right` |
| close | — | 面板收起时触发 |
| click | `area: string` | 面板收起状态下点击内容区时触发，`area` 为 `content`；面板展开时点击内容区只收起面板 |
| dragstart | — | 手指按下、开始滑动时触发 |
| dragend | — | 滑动结束时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 单元格内容 |
| actions | 右侧操作面板 |
| left | 左侧面板 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `open()` | 展开右侧面板 |
| `openLeft()` | 展开左侧面板 |
| `close()` | 收起面板 |
| `toggle()` | 有面板展开时收起，否则展开右侧面板 |
| `isOpened(): boolean` | 是否有面板展开 |
