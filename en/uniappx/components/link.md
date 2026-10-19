---
title: Link
demo: pages/demo/basic/link
---

# Link

`ms-link` is a text link with theme colors, underline, prefix and suffix icons, sizes and a disabled state. Set the text with `content` or the default slot, and optionally navigate within the app with `href` and `openType`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-link`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/basic/link`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/link.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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
