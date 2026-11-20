---
title: Cell
demo: pages/demo/basic/cell
---

# Cell

`ms-cell` is a list cell with an icon or image on the left, a title and description in the middle, and a note and arrow on the right.

With `url` set, a tap navigates to that page. Use the `note` slot for custom content on the right.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-cell title="Single-line title" arrow />
  <ms-cell title="Single-line title" required note="Required" arrow />
  <ms-cell title="Single-line title" note="Extra info" arrow />
  <ms-cell
    title="Single-line title"
    description="A very, very long piece of description text"
    arrow
  />
  <ms-cell
    title="Single-line title"
    description="A very, very long piece of description text"
    required
    arrow
    :bordered="false"
  />
  <ms-cell title="With badge" arrow :bordered="false">
    <template #note>
      <ms-badge :count="16" />
    </template>
  </ms-cell>
  <ms-cell title="Single-line title" icon="customer-service-line" arrow />
  <ms-cell title="Single-line title" icon="global-line" arrow />
  <ms-cell title="Single-line title" icon="lock-line" arrow :bordered="false" />
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | Main title |
| description | `string` | `''` | Description below |
| note | `string` | `''` | Right-side note |
| icon | `string` | `''` | Icon name (icons.uts) |
| image | `string` | `''` | Left image (preferred over icon) |
| arrow | `boolean` | `false` | Whether to show arrow |
| bordered | `boolean` | `true` | Whether to show border |
| required | `boolean` | `false` | Whether to show required asterisk |
| url | `string` | `''` | Tap navigation URL |
| disabled | `boolean` | `false` | Whether disabled |
| align | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Vertical alignment of the right area |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the cell is tapped; not fired while disabled |

## Slots

| Slot | Description |
| --- | --- |
| note | Custom content on the right; shows `note` by default |
