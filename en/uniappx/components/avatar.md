---
title: Avatar
demo: pages/demo/display/avatar
---

# Avatar

`ms-avatar` displays a single avatar, which can be an image, text or an icon.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Avatar image URL |
| text | `string` | `''` | Text when there is no image |
| icon | `string` | `''` | Icon when there is no image and no text |
| shape | `'circle' \| 'round'` | `'circle'` | Shape: `circle`, or `round` for rounded corners |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size tier |
| mode | `string` | `'aspectFill'` | Image mode (e.g. aspectFill) |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the avatar is tapped |
| error | — | Fires when the image fails to load; the avatar then falls back to the text or the icon |
