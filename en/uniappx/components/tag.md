---
title: Tag
demo: pages/demo/basic/tag
---

# Tag

`ms-tag` is a tag for marking a category or status, with an optional icon and close button.

With `checkable` on it can be toggled by tapping, which suits filters; bind the state with `v-model:checked`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Variants -->
  <ms-tag variant="light" theme="primary">Light</ms-tag>
  <ms-tag variant="solid" theme="primary">Solid</ms-tag>
  <ms-tag variant="outline" theme="primary">Outline</ms-tag>
  <!-- Themes -->
  <ms-tag variant="light" theme="default">Default</ms-tag>
  <ms-tag variant="light" theme="primary">Primary</ms-tag>
  <ms-tag variant="light" theme="danger">Danger</ms-tag>
  <!-- Sizes -->
  <ms-tag size="sm" theme="primary">Small</ms-tag>
  <ms-tag size="md" theme="primary">Medium</ms-tag>
  <ms-tag size="lg" theme="primary">Large</ms-tag>
  <!-- Shapes -->
  <ms-tag shape="square" theme="primary">Square</ms-tag>
  <ms-tag shape="round" theme="primary">Round</ms-tag>
  <ms-tag shape="mark" variant="outline" theme="primary">Mark</ms-tag>
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | Theme color |
| variant | `'solid' \| 'light' \| 'outline' \| 'light-outline'` | `'light'` | Style: solid / light / outline / light-outline |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| shape | `'square' \| 'round' \| 'mark'` | `'square'` | Shape: square / round / mark |
| closable | `boolean` | `false` | Whether to show the close button |
| disabled | `boolean` | `false` | Whether disabled |
| icon | `string` | `''` | Icon name |
| checkable | `boolean` | `false` | Whether it can be toggled by tapping |
| checked | `boolean` | `false` | Whether it is checked. Works with `v-model:checked` |
| maxWidth | `number` | `0` | Maximum text width (px) before truncation; `0` for no limit |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the tag is tapped; not fired while disabled |
| close | — | Fires when the close button is tapped; the tag does not remove itself, so remove it yourself |
| update:checked | `value: boolean` | Fires on tap when `checkable` is on; used by `v-model:checked` |
| change | `value: boolean` | Fires on tap when `checkable` is on; `value` is the new checked state |

## Slots

| Slot | Description |
| --- | --- |
| default | Tag text |
