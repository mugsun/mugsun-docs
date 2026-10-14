---
title: Sheet
demo: pages/demo/basic/sheet
---

# Sheet

`ms-sheet` is a card or container surface. It supports `variant`, `radius`, `padding`, `margin`, `bordered`, `shadow`, `loading`, `url` and `pressable` (equivalent to isLink in x-sheet).

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-sheet`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/sheet`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/sheet.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <ms-sheet radius="lg" padding="none">
    <text>Default sheet</text>
    <text>A uniform white surface for lists and forms</text>
    <ms-sheet>
      <ms-text>A uniform white container for list and form content.</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>Rounded</text>
    <text>Large radius + light surface</text>
    <ms-sheet radius="lg" variant="muted">
      <ms-text>Rounded card surface</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>Bordered</text>
    <text>A border marks the block edge</text>
    <ms-sheet bordered radius="lg">
      <ms-text>A bordered container</ms-text>
    </ms-sheet>
  </ms-sheet>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'muted' \| 'primary'` | `'default'` | Style variant |
| radius | `'md' \| 'lg'` | `'lg'` | Border radius (px) |
| padding | `'none' \| 'md' \| 'lg'` | `'md'` | Padding (px) |
| margin | `'none' \| 'page'` | `'none'` | Outer margin: none / page |
| bordered | `boolean` | `false` | Whether to show border |
| shadow | `boolean` | `false` | Whether shadowed |
| loading | `boolean` | `false` | Whether loading |
| url | `string` | `''` | Navigation URL |
| pressable | `boolean` | `false` | Press feedback; treated as clickable when url is set |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sheet/`
- Demo: `#/pages/demo/basic/sheet`
- Chinese docs: [/uniappx/components/sheet](/uniappx/components/sheet)
