---
title: Tag
demo: pages/demo/basic/tag
---

# Tag

`ms-tag` is a category or status tag. It supports `theme`, `variant`, `size`, `shape`, `closable`, `disabled`, `icon`, `checkable` and `maxWidth`. Press feedback uses opacity, not scaling. When nesting ms-icon inside a tag, set `pressable=false` on the icon.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-tag`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/tag`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/tag.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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
