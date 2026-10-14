---
title: Loading
demo: pages/demo/basic/loading
---

# Loading

`ms-loading` is a loading indicator made of the native `<loading>` and text. It supports horizontal and vertical layouts and a tone setting; the default slot takes precedence over text.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-loading`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/loading`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/loading.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Icon only -->
  <ms-loading text="" />
  <!-- Horizontal -->
  <ms-loading layout="horizontal" text="Loading…" />
  <!-- Vertical -->
  <ms-loading layout="vertical" text="Loading…" />
  <!-- Text only -->
  <ms-loading :indicator="false" text="Loading…" />
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `'加载中…'` | Display text |
| layout | `'horizontal' \| 'vertical'` | `'vertical'` | Layout |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| tone | `'default' \| 'primary' \| 'inverse'` | `'default'` | Tone: default / primary / inverse |
| indicator | `boolean` | `true` | Whether to show indicator |
| paused | `boolean` | `false` | Whether spin animation is paused |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-loading/`
- Demo: `#/pages/demo/basic/loading`
- Chinese docs: [/uniappx/components/loading](/uniappx/components/loading)
