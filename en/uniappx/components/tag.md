---
title: Tag
demo: pages/demo/basic/tag
---

# Tag

`ms-tag` — Tag for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tag`).
Demo route: `#/pages/demo/basic/tag`.

## Basic usage

```vue
<template>
  <ms-tag theme="default" variant="solid">
    …
  </ms-tag>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
