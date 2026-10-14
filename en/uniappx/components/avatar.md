---
title: Avatar
demo: pages/demo/display/avatar
---

# Avatar

`ms-avatar` displays a single avatar, which can be an image, text or an icon.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-avatar`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/avatar`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/avatar.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-avatar :src="demoSrc" />
  <ms-avatar text="Mug" />
  <ms-avatar />
  <!-- Shapes -->
  <ms-avatar :src="demoSrc" shape="circle" />
  <ms-avatar :src="demoSrc" shape="round" />
  <!-- Sizes -->
  <ms-avatar text="S" size="sm" />
  <ms-avatar text="M" size="md" />
  <ms-avatar text="L" size="lg" />
  <!-- Advanced -->
  <ms-avatar icon="customer-service-line" size="lg" />
  <ms-avatar text="R" shape="round" size="lg" />
  <ms-avatar src="/static/not-exist.png" text="F" @error="onAvatarError" />
</template>

<script setup lang="uts">
const demoSrc = '/static/logo.png'

function onAvatarError() : void {
  console.log('onAvatarError')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Avatar image URL |
| text | `string` | `''` | Text when there is no image |
| icon | `string` | `''` | Icon when there is no image and no text |
| shape | `'circle' \| 'round'` | `'circle'` | Shape: circle / round / square |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size tier |
| mode | `string` | `'aspectFill'` | Image mode (e.g. aspectFill) |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| error | Error |

## See also

- Component: `uni_modules/ms-ui/components/ms-avatar/`
- Demo: `#/pages/demo/display/avatar`
- Chinese docs: [/uniappx/components/avatar](/uniappx/components/avatar)
