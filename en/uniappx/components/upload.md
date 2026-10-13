---
title: Upload
demo: pages/demo/feedback/upload
---

# Upload

`ms-upload` — Upload for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-upload`).
Demo route: `#/pages/demo/feedback/upload`.

## Basic usage

```vue
<template>
  <ms-upload>
    …
  </ms-upload>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
