---
title: Link
demo: pages/demo/basic/link
---

# Link

`ms-link` — Link for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-link` (commercial edition; source not public).
Demo route: `#/pages/demo/basic/link`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/link.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Themes -->
  <ms-link theme="default">Default</ms-link>
  <ms-link theme="primary">Primary</ms-link>
  <ms-link theme="danger">Danger</ms-link>
  <!-- Underline -->
  <ms-link theme="primary">No underline</ms-link>
  <ms-link theme="primary" :underline="true">Underline</ms-link>
  <!-- Icon -->
  <ms-link theme="primary" icon="links-line">Prefix</ms-link>
  <ms-link theme="primary" suffix-icon="arrow-right-s-line">Suffix</ms-link>
  <!-- Sizes -->
  <ms-link size="sm" theme="primary">Small</ms-link>
  <ms-link size="md" theme="primary">Medium</ms-link>
  <ms-link size="lg" theme="primary">Large</ms-link>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | Theme color |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| underline | `boolean` | `false` | Whether to show underline |
| disabled | `boolean` | `false` | Whether disabled |
| href | `string` | `''` | Link URL |
| openType | `'navigate' \| 'redirect' \| 'switchTab' \| 'reLaunch'` | `'navigate'` | Navigation mode: navigate / redirect / switchTab / reLaunch |
| icon | `string` | `''` | Icon name (icons.uts) |
| suffixIcon | `string` | `''` | Suffix icon name |
| content | `string` | `''` | Text used when default slot is empty |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-link/`
- Demo: `#/pages/demo/basic/link`
- Chinese docs: [/uniappx/components/link](/uniappx/components/link)
