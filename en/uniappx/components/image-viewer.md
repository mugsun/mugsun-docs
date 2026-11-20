---
title: Image Viewer
demo: pages/demo/display/image-viewer
---

# Image Viewer

`ms-image-viewer` is a full-screen image viewer. Swipe to page through images; a page counter, a close button and a delete button are optional.

## Basic usage

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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| images | `string[]` | `[]` | Image URL list |
| initialIndex | `number` | `0` | Index of the image shown on open, starting from 0 |
| showIndex | `boolean` | `false` | Whether to show the page counter |
| closeBtn | `boolean` | `false` | Whether to show the close button |
| deleteBtn | `boolean` | `false` | Whether to show delete button |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the viewer opens or closes; used by `v-model:visible` |
| close | — | Fires when the viewer closes |
| change | `index: number` | Fires when the page changes; `index` is the current image index |
| delete | `index: number` | Fires when the delete button is tapped; `index` is the current image index. Remove the image from `images` yourself |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `open()` | Opens the viewer; requires `v-model:visible` |
| `close()` | Closes the viewer; requires `v-model:visible` |
