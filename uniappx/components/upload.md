---
title: Upload 上传
demo: pages/demo/feedback/upload
---

# Upload 上传

`ms-upload`：图片宫格上传。规格卡 `reference/specs/p1-ms-upload.md`，审计规格 `reference/specs/component-audits/p1-ms-upload.json`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-upload`（商业版，源码不公开）。
演示路由：`#/pages/demo/feedback/upload`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/upload.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| fileList | `UTSJSONObject[]` | `[]` | 受控文件列表，唯一渲染真源；项字段 url / name / status / percent |
| max | `number` | `9` | 数量上限，0 不限 |
| column | `number` | `4` | 每行列数 |
| source | `string` | `'both'` | album / camera / both |
| showName | `boolean` | `false` | 磁贴下显示文件名 |
| addable | `boolean` | `true` | 显示添加磁贴 |
| removable | `boolean` | `true` | 显示删除按钮 |
| disabled | `boolean` | `false` | 是否禁用 |
| preview | `boolean` | `true` | 点击磁贴是否调用原生预览 |
| sizeLimit | `number` | `0` | 单文件大小上限（字节），0 不限；超限 emit oversize 且不入列 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:fileList | v-model:fileList 更新 |
| add | 新增 |
| remove | 移除 |
| click | 点击 |
| oversize | 超出大小限制 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-upload/`
- 演示: `#/pages/demo/feedback/upload`
