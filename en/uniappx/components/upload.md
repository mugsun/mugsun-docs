---
title: Upload
demo: pages/demo/feedback/upload
---

# Upload

图片宫格上传。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-upload`).
Demo route: `#/pages/demo/feedback/upload`.

## Basic usage

```vue
<template>
  <ms-upload :disabled="true">
    …
  </ms-upload>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| fileList | `UTSJSONObject[]` | `[]` | 受控文件列表，唯一渲染真源；项字段 url / name / status / percent |
| max | `number` | `9` | 数量上限，0 不限 |
| column | `number` | `4` | 每行列数 |
| source | `string` | `'both'` | album / camera / both |
| showName | `boolean` | `false` | 磁贴下显示文件名 |
| addable | `boolean` | `true` | 显示添加磁贴 |
| removable | `boolean` | `true` | 显示删除按钮 |
| disabled | `boolean` | `false` | — |
| preview | `boolean` | `true` | 点击磁贴是否调用原生预览 |
| sizeLimit | `number` | `0` | 单文件大小上限（字节），0 不限；超限 emit oversize 且不入列 |

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
