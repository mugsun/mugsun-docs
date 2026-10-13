---
title: Upload
demo: pages/demo/feedback/upload
---

# Upload

`ms-upload` — Upload for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-upload`).
Demo route: `#/pages/demo/feedback/upload`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/upload.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-upload v-model:fileList="basicList" :max="9" @remove="onRemove" />
  <ms-upload v-model:fileList="namedList" :column="3" :show-name="true" />
  <!-- 组件状态 -->
  <ms-upload :file-list="loadingList" :addable="false" />
  <ms-upload :file-list="failedList" :addable="false" />
  <ms-upload :file-list="basicList" :disabled="true" />
  <!-- 规格与数量 -->
  <ms-upload :file-list="namedList" :column="3" />
  <ms-upload :file-list="fullList" :max="2" />
  <!-- 组件深度 -->
  <ms-upload :file-list="cameraList" source="camera" :removable="false" :addable="false" />
  <ms-upload :file-list="namedList" :column="2" />
  <ms-upload :file-list="namedList" :addable="false" :preview="true" @click="onPreviewClick" />
</template>

<script setup lang="uts">
const basicList = ref([
const namedList = ref([
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
