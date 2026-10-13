---
title: Drag
demo: pages/demo/media/drag
---

# Drag

`ms-drag` — Drag for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-drag` (repository not yet public).
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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| col | `number` | `1` | Column span |
| scrollDiff | `number` | `25` | Pixels to scroll each time when dragged near an edge |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| start | Started |
| end | end |
| move | move |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-drag/`
- Demo: `#/pages/demo/media/drag`
- Chinese docs: [/uniappx/components/drag](/uniappx/components/drag)
