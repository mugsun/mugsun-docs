---
title: Skeleton
demo: pages/demo/display/skeleton
---

# Skeleton

`ms-skeleton` is a loading skeleton. It shows placeholder shapes while loading, and the default slot content when `loading` is `false`.

Pick the placeholder shape with `theme`; a flashing effect is optional.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Skeleton types -->
  <ms-skeleton theme="avatar" />
  <ms-skeleton theme="image" />
  <ms-skeleton theme="text" />
  <!-- Composite layout -->
  <ms-skeleton theme="paragraph" />
  <!-- Animation -->
  <ms-skeleton theme="paragraph" animation="none" />
  <ms-skeleton theme="paragraph" animation="flashed" />
  <!-- Advanced -->
  <ms-skeleton theme="card" :row="3" animation="flashed" />
  <ms-skeleton theme="paragraph" :row="5" />
  <ms-skeleton theme="text" :row="2" :delay="400" :loading="true" />
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| loading | `boolean` | `true` | Whether loading |
| delay | `number` | `0` | Delay before the skeleton appears (ms), to avoid a flash when loading is quick |
| theme | `'avatar' \| 'image' \| 'text' \| 'paragraph' \| 'card'` | `'text'` | Placeholder shape: avatar / image / text / paragraph / card |
| animation | `'none' \| 'flashed'` | `'none'` | Animation: none / flashed |
| row | `number` | `0` | Number of lines for text and paragraph shapes; `0` uses the default |

## Slots

| Slot | Description |
| --- | --- |
| default | Content shown once loading is done |
