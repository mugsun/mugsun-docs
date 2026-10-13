---
title: Avatar
demo: pages/demo/display/avatar
---

# Avatar

`ms-avatar` — Avatar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-avatar`).
Demo route: `#/pages/demo/display/avatar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/avatar.uvue`; see them running in the phone frame.

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
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
