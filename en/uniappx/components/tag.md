---
title: Tag
demo: pages/demo/basic/tag
---

# Tag

`ms-tag` — Tag for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-tag` (repository not yet public).
Demo route: `#/pages/demo/basic/tag`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/tag.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 形态 -->
  <ms-tag variant="light" theme="primary">浅色</ms-tag>
  <ms-tag variant="solid" theme="primary">填充</ms-tag>
  <ms-tag variant="outline" theme="primary">描边</ms-tag>
  <!-- 主题 -->
  <ms-tag variant="light" theme="default">默认</ms-tag>
  <ms-tag variant="light" theme="primary">主色</ms-tag>
  <ms-tag variant="light" theme="danger">危险</ms-tag>
  <!-- 尺寸 -->
  <ms-tag size="sm" theme="primary">小号</ms-tag>
  <ms-tag size="md" theme="primary">中号</ms-tag>
  <ms-tag size="lg" theme="primary">大号</ms-tag>
  <!-- 形状 -->
  <ms-tag shape="square" theme="primary">方形</ms-tag>
  <ms-tag shape="round" theme="primary">圆角</ms-tag>
  <ms-tag shape="mark" variant="outline" theme="primary">标记</ms-tag>
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
