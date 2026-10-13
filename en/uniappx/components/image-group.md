---
title: Image Group
demo: pages/demo/display/image-group
---

# Image Group

`ms-image-group` — Image Group for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-image-group` (commercial edition; source not public).
Demo route: `#/pages/demo/display/image-group`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/image-group.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 布局 -->
  <ms-image-group
    :list="listBasic"
    @click="onClick"
  />
  <ms-image-group :list="listTwo" :columns="2" />
  <!-- 标签 -->
  <ms-image-group :list="listLabeled" label-mode="inset" />
  <ms-image-group :list="listLabeled" label-mode="outer" />
  <!-- 数量限制 -->
  <ms-image-group :list="listMany" :max-count="3" />
  <!-- 组件深度 -->
  <ms-image-group :list="listBasic" :preview="false" @click="onClick" />
  <ms-image-group :list="listTwo" :columns="2" mode="aspectFit" disabled />
  <ms-image-group :list="listMany" :columns="2" :max-count="2" />
</template>

<script setup lang="uts">
const listBasic = [
  row(IMG1),
  row(IMG2),
  row(IMG3),
  row(IMG1),
] as UTSJSONObject[]

const listLabeled = [
  row(IMG1, '封面 A'),
  row(IMG2, '封面 B'),
  row(IMG3, '封面 C'),
] as UTSJSONObject[]

const listMany = [
  row(IMG1),
  row(IMG2),
  row(IMG3),
  row(IMG1),
  row(IMG2),
  row(IMG3),
] as UTSJSONObject[]

const listTwo = [
  row(IMG2),
  row(IMG3),
  row(IMG1),
  row(IMG2),
] as UTSJSONObject[]

function onClick(payload: UTSJSONObject) : void {
  console.log('onClick')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| columns | `number` | `3` | Column config |
| mode | `string` | `'aspectFill'` | Mode |
| labelMode | `string` | `'inset'` | Label mode |
| maxCount | `number` | `-1` | Max count |
| preview | `boolean` | `true` | Whether previewable |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-image-group/`
- Demo: `#/pages/demo/display/image-group`
- Chinese docs: [/uniappx/components/image-group](/uniappx/components/image-group)
