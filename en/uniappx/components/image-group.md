---
title: Image Group
demo: pages/demo/display/image-group
---

# Image Group

`ms-image-group` is an image grid for comments or detail pages. It supports multi-image layouts, optional tags, an overlay when there are more images than shown, and tap to preview.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-image-group`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/image-group`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/image-group.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Layout -->
  <ms-image-group
    :list="listBasic"
    @click="onClick"
  />
  <ms-image-group :list="listTwo" :columns="2" />
  <!-- Labels -->
  <ms-image-group :list="listLabeled" label-mode="inset" />
  <ms-image-group :list="listLabeled" label-mode="outer" />
  <!-- Max count -->
  <ms-image-group :list="listMany" :max-count="3" />
  <!-- Advanced -->
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
  row(IMG1, 'Cover A'),
  row(IMG2, 'Cover B'),
  row(IMG3, 'Cover C'),
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
