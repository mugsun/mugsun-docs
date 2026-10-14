---
title: Title
demo: pages/demo/nav/title
---

# Title

`ms-title` is a heading with levels `h1` to `h6` and optional truncation by line count.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-title`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/nav/title`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/title.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-title content="Heading 1" level="h1" @click="onTitleClick" />
  <ms-title content="Heading 2" level="h2" />
  <ms-title content="Heading 3" level="h3" />
  <!-- States -->
  <ms-title
    level="h4"
    :lines="1"
    content="This is a very long heading that demonstrates single-line truncation and should not wrap"
  />
  <!-- Advanced -->
  <ms-title content="Heading 4" level="h4" />
  <ms-title content="Heading 5" level="h5" />
  <ms-title content="Heading 6" level="h6" />
</template>

<script setup lang="uts">
function onTitleClick() : void {
  console.log('onTitleClick')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | Content text |
| level | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | Level count |
| lines | `number` | `0` | Row count |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Alignment |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-title/`
- Demo: `#/pages/demo/nav/title`
- Chinese docs: [/uniappx/components/title](/uniappx/components/title)
