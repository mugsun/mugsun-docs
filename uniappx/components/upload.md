---
title: Upload 上传
demo: pages/demo/feedback/upload
---

# Upload 上传

`ms-upload` 用宫格展示选好的图片，可以添加、删除和预览，文件列表用 `v-model:fileList` 绑定。

组件只负责选择图片和显示状态，不会发起上传。请在 `add` 事件里自行上传，再更新对应项的 `status` 和 `percent`。

## 基础用法

<!-- demo-snippets:start -->
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
  { url: COVER, status: 'done' } as UTSJSONObject,
  { url: CROP, status: 'done' } as UTSJSONObject,
  { url: COVER, status: 'done' } as UTSJSONObject,
])

const cameraList = [{ url: COVER, name: '现场拍照.jpg', status: 'done' } as UTSJSONObject]

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
  { url: CROP, name: '合同扫描件.png', status: 'done' } as UTSJSONObject,
  { url: COVER, name: '身份证正面.png', status: 'done' } as UTSJSONObject,
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

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| fileList | `UTSJSONObject[]` | `[]` | 文件列表，可用 `v-model:fileList`；每项可含 `url` / `name` / `status` / `percent`，`status` 取 loading / failed / done |
| max | `number` | `9` | 最多可以选择的数量，`0` 表示不限制 |
| column | `number` | `4` | 每行显示的数量 |
| source | `string` | `'both'` | 图片来源：album 相册 / camera 相机 / both 两者都可以 |
| showName | `boolean` | `false` | 是否在图片下方显示文件名 |
| addable | `boolean` | `true` | 是否显示添加按钮 |
| removable | `boolean` | `true` | 是否显示删除按钮；上传中的图片不能删除 |
| disabled | `boolean` | `false` | 是否禁用 |
| preview | `boolean` | `true` | 点击图片时是否打开预览 |
| sizeLimit | `number` | `0` | 单个文件的大小上限（字节），`0` 表示不限制；超出的文件不会加入列表，并触发 `oversize` |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:fileList | `list: UTSJSONObject[]` | 添加或删除图片时触发，用于 `v-model:fileList` |
| add | `picked: UTSJSONObject[]` | 选好图片后触发，`picked` 是本次新增的项，每项含 `url` 和 `status` |
| remove | `index: number` | 点击删除按钮时触发，`index` 是被删除项的下标 |
| click | `index: number` | 点击图片时触发，`index` 是该项的下标；禁用时不触发 |
| oversize | — | 有文件超过 `sizeLimit` 时触发；数量已达 `max` 后调用 `choose()` 也会触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `choose()` | 打开图片选择，和点击添加按钮相同 |
| `getCount(): number` | 返回当前的文件数量 |
