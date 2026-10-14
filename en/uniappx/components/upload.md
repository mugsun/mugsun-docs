---
title: Upload
demo: pages/demo/feedback/upload
---

# Upload

`ms-upload` is a grid-style image uploader.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-upload`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/upload`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/upload.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| fileList | `UTSJSONObject[]` | `[]` | Controlled file list (render source of truth); fields url/name/status/percent |
| max | `number` | `9` | Max count; 0 = unlimited |
| column | `number` | `4` | Columns per row |
| source | `string` | `'both'` | album / camera / both |
| showName | `boolean` | `false` | Show file name under the tile |
| addable | `boolean` | `true` | Show the add tile |
| removable | `boolean` | `true` | Show remove button |
| disabled | `boolean` | `false` | Whether disabled |
| preview | `boolean` | `true` | Whether tapping a tile opens native preview |
| sizeLimit | `number` | `0` | Per-file size limit (bytes); 0 = none; oversize emits and skips |

## Events

| Event | Description |
| --- | --- |
| update:fileList | v-model:fileList update |
| add | Item added |
| remove | Item removed |
| click | Click |
| oversize | File over size limit |

## See also

- Component: `uni_modules/ms-ui/components/ms-upload/`
- Demo: `#/pages/demo/feedback/upload`
- Chinese docs: [/uniappx/components/upload](/uniappx/components/upload)
