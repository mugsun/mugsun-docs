---
title: Image Viewer 预览
demo: pages/demo/display/image-viewer
---

# Image Viewer 预览

`ms-image-viewer` 是全屏图片预览，左右滑动翻页，可以显示页码、关闭按钮和删除按钮。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-image-viewer
    ref="viewerRef"
    :visible="viewerVisible"
    :images="viewerImages"
    :initial-index="viewerInitial"
    :show-index="viewerShowIndex"
    :close-btn="viewerCloseBtn"
    :delete-btn="viewerDeleteBtn"
    @update:visible="onVisible"
    @close="onClose"
    @change="onChange"
    @delete="onDelete"
  />
</template>

<script setup lang="uts">
const viewerCloseBtn = ref(false)

const viewerDeleteBtn = ref(false)

const viewerImages = ref<string[]>(DEMO_IMAGES.slice(0))

const viewerInitial = ref(0)

const viewerShowIndex = ref(true)

const viewerVisible = ref(false)

function onVisible(v: boolean): void {
  viewerVisible.value = v
}

function onClose() : void {
  console.log('onClose')
}

function onChange(index: number) : void {
  console.log('onChange')
}

function onDelete(index: number) : void {
  console.log('onDelete')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| images | `string[]` | `[]` | 图片地址列表 |
| initialIndex | `number` | `0` | 打开时显示第几张，从 0 开始 |
| showIndex | `boolean` | `false` | 是否显示页码 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| deleteBtn | `boolean` | `false` | 是否显示删除按钮 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| close | — | 预览关闭时触发 |
| change | `index: number` | 翻页时触发，`index` 是当前图片的下标 |
| delete | `index: number` | 点击删除按钮时触发，`index` 是当前图片的下标；图片需要自行从 `images` 中移除 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `open()` | 打开预览，需配合 `v-model:visible` |
| `close()` | 关闭预览，需配合 `v-model:visible` |
