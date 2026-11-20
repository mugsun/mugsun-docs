---
title: Divider
demo: pages/demo/basic/divider
---

# Divider

`ms-divider` is a divider line, horizontal or vertical, solid or dashed.

It can carry text placed left, center or right, or custom content through the default slot.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Plain divider -->
  <ms-divider />
  <!-- Alignment -->
  <ms-divider text="Left" align="left" />
  <ms-divider text="Center" align="center" />
  <ms-divider text="Right" align="right" />
  <!-- Vertical -->
  <ms-divider layout="vertical" />
  <ms-divider layout="vertical" />
  <!-- Dashed -->
  <ms-divider dashed />
  <ms-divider dashed text="Text" align="left" />
  <ms-divider dashed text="Text" align="center" />
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| layout | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction: horizontal or vertical |
| align | `'left' \| 'center' \| 'right'` | `'center'` | Text position |
| dashed | `boolean` | `false` | Whether dashed |
| text | `string` | `''` | Text on the divider |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom content on the divider; shows `text` by default |
