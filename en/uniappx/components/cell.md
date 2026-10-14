---
title: Cell
demo: pages/demo/basic/cell
---

# Cell

`ms-cell` is a list cell. It supports `title`, `description`, `note`, `icon`, `arrow`, `bordered`, `required`, `url` and `disabled`; put custom content for the right side in the `note` slot.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-cell`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/cell`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/cell.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| note | `note` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-cell/`
- Demo: `#/pages/demo/basic/cell`
- Chinese docs: [/uniappx/components/cell](/uniappx/components/cell)
