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
Snippets below are taken from the demo source `pages/demo/basic/link.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 主题 -->
  <ms-link theme="default">默认</ms-link>
  <ms-link theme="primary">主色</ms-link>
  <ms-link theme="danger">危险</ms-link>
  <!-- 下划线 -->
  <ms-link theme="primary">无下划线</ms-link>
  <ms-link theme="primary" :underline="true">下划线</ms-link>
  <!-- 图标 -->
  <ms-link theme="primary" icon="links-line">前缀</ms-link>
  <ms-link theme="primary" suffix-icon="arrow-right-s-line">后缀</ms-link>
  <!-- 尺寸 -->
  <ms-link size="sm" theme="primary">小号</ms-link>
  <ms-link size="md" theme="primary">中号</ms-link>
  <ms-link size="lg" theme="primary">大号</ms-link>
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
