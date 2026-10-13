---
title: Swipe Cell
demo: pages/demo/feedback/swipe-cell
---

# Swipe Cell

`ms-swipe-cell` — Swipe Cell for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-swipe-cell` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/swipe-cell`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/swipe-cell.uvue`; see them running in the phone frame.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | Controlled: whether the right panel is open |
| openedLeft | `boolean` | `false` | Controlled: whether the left panel is open |
| disabled | `boolean` | `false` | Disable gestures |
| threshold | `number` | `20` | Distance threshold before snapping into place |
| bordered | `boolean` | `true` | Bottom divider |

## Events

| Event | Description |
| --- | --- |
| update:opened | update:opened |
| update:openedLeft | update:openedLeft |
| open | Opened |
| close | Closed |
| click | Click |
| dragstart | dragstart |
| dragend | dragend |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| actions | `actions` slot |
| left | `left` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-swipe-cell/`
- Demo: `#/pages/demo/feedback/swipe-cell`
- Chinese docs: [/uniappx/components/swipe-cell](/uniappx/components/swipe-cell)
