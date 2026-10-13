---
title: Tag
demo: pages/demo/basic/tag
---

# Tag

`ms-tag` — Tag for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-tag` (commercial edition; source not public).
Demo route: `#/pages/demo/basic/tag`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/tag.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | Theme color |
| variant | `'solid' \| 'light' \| 'outline' \| 'light-outline'` | `'light'` | Style variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| shape | `'square' \| 'round' \| 'mark'` | `'square'` | Shape |
| closable | `boolean` | `false` | Whether closable |
| disabled | `boolean` | `false` | Whether disabled |
| icon | `string` | `''` | Icon name (icons.uts) |
| checkable | `boolean` | `false` | Selectable (filter tag) |
| checked | `boolean` | `false` | Whether checked |
| maxWidth | `number` | `0` | Max text width (px); 0 = no limit; overflow ellipsis |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| update:checked | v-model:checked update |
| change | Value changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-tag/`
- Demo: `#/pages/demo/basic/tag`
- Chinese docs: [/uniappx/components/tag](/uniappx/components/tag)
