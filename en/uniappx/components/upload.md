---
title: Upload
demo: pages/demo/feedback/upload
---

# Upload

`ms-upload` shows the picked images in a grid, with add, remove and preview. Bind the file list with `v-model:fileList`.

The component only picks images and shows their state; it does not upload anything. Upload in the `add` handler yourself, then update each item's `status` and `percent`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-upload v-model:fileList="basicList" :max="9" @remove="onRemove" />
  <ms-upload v-model:fileList="namedList" :column="3" :show-name="true" />
  <!-- States -->
  <ms-upload :file-list="loadingList" :addable="false" />
  <ms-upload :file-list="failedList" :addable="false" />
  <ms-upload :file-list="basicList" :disabled="true" />
  <!-- Size and count -->
  <ms-upload :file-list="namedList" :column="3" />
  <ms-upload :file-list="fullList" :max="2" />
  <!-- Advanced -->
  <ms-upload :file-list="cameraList" source="camera" :removable="false" :addable="false" />
  <ms-upload :file-list="namedList" :column="2" />
  <ms-upload :file-list="namedList" :addable="false" :preview="true" @click="onPreviewClick" />
</template>

<script setup lang="uts">
const basicList = ref([
  { url: COVER, status: 'done' } as UTSJSONObject,
  { url: CROP, status: 'done' } as UTSJSONObject,
  { url: COVER, status: 'done' } as UTSJSONObject,
])

const cameraList = [{ url: COVER, name: 'site-photo.jpg', status: 'done' } as UTSJSONObject]

const failedList = [{ url: CROP, status: 'failed' } as UTSJSONObject]

const fullList = [
  { url: CROP, status: 'done' } as UTSJSONObject,
  { url: COVER, status: 'done' } as UTSJSONObject,
]

const loadingList = [
  { url: CROP, status: 'loading', percent: 68 } as UTSJSONObject,
  { url: COVER, status: 'loading' } as UTSJSONObject,
]

const namedList = ref([
  { url: CROP, name: 'contract-scan.png', status: 'done' } as UTSJSONObject,
  { url: COVER, name: 'id-card-front.png', status: 'done' } as UTSJSONObject,
])

function onRemove(index: number) : void {
  console.log('onRemove')
}

function onPreviewClick(index: number) : void {
  console.log('onPreviewClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| fileList | `UTSJSONObject[]` | `[]` | File list. Works with `v-model:fileList`; each item can have `url` / `name` / `status` / `percent`, with `status` one of loading / failed / done |
| max | `number` | `9` | Maximum number of files; `0` for no limit |
| column | `number` | `4` | Number of tiles per row |
| source | `string` | `'both'` | Image source: album / camera / both |
| showName | `boolean` | `false` | Whether to show the file name below each image |
| addable | `boolean` | `true` | Whether to show the add button |
| removable | `boolean` | `true` | Whether to show the remove button; an image that is still uploading cannot be removed |
| disabled | `boolean` | `false` | Whether disabled |
| preview | `boolean` | `true` | Whether tapping an image opens the preview |
| sizeLimit | `number` | `0` | Size limit per file (bytes); `0` for no limit. Files over the limit are left out and `oversize` fires |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:fileList | `list: UTSJSONObject[]` | Fires when images are added or removed; used by `v-model:fileList` |
| add | `picked: UTSJSONObject[]` | Fires after images are picked; `picked` holds the new items, each with `url` and `status` |
| remove | `index: number` | Fires when the remove button is tapped; `index` is the removed item |
| click | `index: number` | Fires when an image is tapped; `index` is that item. Not fired while disabled |
| oversize | — | Fires when a file exceeds `sizeLimit`, and also when `choose()` is called after `max` is reached |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `choose()` | Opens the image picker, same as tapping the add button |
| `getCount(): number` | Returns the current number of files |
