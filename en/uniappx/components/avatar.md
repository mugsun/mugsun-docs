---
title: Avatar
demo: pages/demo/display/avatar
---

# Avatar

`ms-avatar` — Avatar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-avatar` (repository not yet public).
Demo route: `#/pages/demo/display/avatar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/avatar.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-avatar :src="demoSrc" />
  <ms-avatar text="Mug" />
  <ms-avatar />
  <!-- 形状 -->
  <ms-avatar :src="demoSrc" shape="circle" />
  <ms-avatar :src="demoSrc" shape="round" />
  <!-- 组件尺寸 -->
  <ms-avatar text="S" size="sm" />
  <ms-avatar text="M" size="md" />
  <ms-avatar text="L" size="lg" />
  <!-- 组件深度 -->
  <ms-avatar icon="customer-service-line" size="lg" />
  <ms-avatar text="圆" shape="round" size="lg" />
  <ms-avatar src="/static/not-exist.png" text="退" @error="onAvatarError" />
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
