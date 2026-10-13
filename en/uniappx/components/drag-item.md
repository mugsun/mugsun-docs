---
title: Drag Item
demo: pages/demo/media/drag
---

# Drag Item

`ms-drag-item` — Drag Item for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-drag-item`).
Demo route: `#/pages/demo/media/drag`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/drag.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-drag :list="list1" @change="onChange1" @start="onStart">
    <ms-drag-item v-for="(item, index) in list1" :key="itemLabel(item)" :order="index">
      <view>
        <text>长按 {{ itemLabel(item) }} 排序</text>
      </view>
    </ms-drag-item>
  </ms-drag>
  <ms-drag :list="listFixed" @change="onChangeFixed">
    <ms-drag-item
      v-for="(item, index) in listFixed"
      :key="'f-' + itemLabel(item)"
      :order="index"
      :disabled="index == 1"
    >
      <view>
        <text>{{ index == 1 ? '固定在第 2 位' : '长按 ' + itemLabel(item) }}</text>
      </view>
    </ms-drag-item>
  </ms-drag>
  <!-- 组件样式 -->
  <ms-drag :col="2" :list="list2">
    <ms-drag-item v-for="(item, index) in list2" :key="'g2-' + itemLabel(item)" :order="index">
      <view>
        <text>{{ itemLabel(item) }}</text>
      </view>
    </ms-drag-item>
  </ms-drag>
  <ms-drag :col="4" :list="list4">
    <ms-drag-item v-for="(item, index) in list4" :key="'g4-' + itemLabel(item)" :order="index">
      <view>
        <text>{{ itemLabel(item) }}</text>
      </view>
    </ms-drag-item>
  </ms-drag>
</template>

<script setup lang="uts">
const list1 = ref([
const listFixed = ref([
const list2 = ref([
const list4 = ref([
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| order | `number` | `0` | Sort order (smaller comes first) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-drag-item/`
- Demo: `#/pages/demo/media/drag`
- Chinese docs: [/uniappx/components/drag-item](/uniappx/components/drag-item)
