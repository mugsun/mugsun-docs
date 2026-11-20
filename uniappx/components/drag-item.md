---
title: Drag Item 拖拽项
demo: pages/demo/media/drag
---

# Drag Item 拖拽项

`ms-drag-item` 是 [`ms-drag`](./drag) 里可以拖动排序的子项。

## 基础用法

<!-- demo-snippets:start -->
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
function itemLabel(item: UTSJSONObject): string {
  const id = item.getNumber('id')
  return id == null ? '?' : id.toString()
}

const list1 = ref([
  { id: 1 } as UTSJSONObject,
  { id: 2 } as UTSJSONObject,
  { id: 3 } as UTSJSONObject,
  { id: 4 } as UTSJSONObject,
] as UTSJSONObject[])

const list2 = ref([
  { id: 1 } as UTSJSONObject,
  { id: 2 } as UTSJSONObject,
  { id: 3 } as UTSJSONObject,
  { id: 4 } as UTSJSONObject,
  { id: 5 } as UTSJSONObject,
  { id: 6 } as UTSJSONObject,
] as UTSJSONObject[])

const list4 = ref([
  { id: 1 } as UTSJSONObject,
  { id: 2 } as UTSJSONObject,
  { id: 3 } as UTSJSONObject,
  { id: 4 } as UTSJSONObject,
  { id: 5 } as UTSJSONObject,
  { id: 6 } as UTSJSONObject,
  { id: 7 } as UTSJSONObject,
  { id: 8 } as UTSJSONObject,
] as UTSJSONObject[])

const listFixed = ref([
  { id: 1 } as UTSJSONObject,
  { id: 2 } as UTSJSONObject,
  { id: 3 } as UTSJSONObject,
  { id: 4 } as UTSJSONObject,
] as UTSJSONObject[])

function onChange1(next: UTSJSONObject[]) : void {
  console.log('onChange1')
}

function onStart() : void {
  console.log('onStart')
}

function onChangeFixed(next: UTSJSONObject[]) : void {
  console.log('onChangeFixed')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| order | `number` | `0` | 排序序号，与该项在列表中的下标保持一致 |
| disabled | `boolean` | `false` | 是否固定在原位，不参与拖动 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击子项时触发，禁用时不触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 子项内容 |
