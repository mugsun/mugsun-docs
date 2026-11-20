---
title: Image Group
demo: pages/demo/display/image-group
---

# Image Group

`ms-image-group` is an image grid for comments or detail pages. It supports multi-image layouts, optional tags, an overlay when there are more images than shown, and tap to preview.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Images; each item has `url`, plus optional `label` (tag) and `temp` (thumbnail shown in place of `url`) |
| columns | `number` | `3` | Columns per row |
| mode | `string` | `'aspectFill'` | Image scaling and cropping mode |
| labelMode | `string` | `'inset'` | Tag position: `inset` inside the image, `outer` outside it |
| maxCount | `number` | `-1` | Maximum number of images shown, `-1` for no limit; an overlay marks the rest |
| preview | `boolean` | `true` | Whether tapping an image opens the preview |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | `payload: UTSJSONObject` | Fires when an image is tapped; `payload` has `index` and `item` (the original list entry). Not fired while disabled |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom content for the overlay shown when there are more images |
