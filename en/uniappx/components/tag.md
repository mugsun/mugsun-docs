---
title: Tag
demo: pages/demo/basic/tag
---

# Tag

类目/状态标签。`theme` / `variant` / `size` / `shape` / `closable` / `disabled` / `icon` / `checkable` / `maxWidth`。按压用 opacity（禁 scale）。嵌套 ms-icon 须 `pressable=false`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tag`).
Demo route: `#/pages/demo/basic/tag`.

## Basic usage

```vue
<template>
  <ms-tag theme="default" variant="solid">
    …
  </ms-tag>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | — |
| variant | `'solid' \| 'light' \| 'outline' \| 'light-outline'` | `'light'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| shape | `'square' \| 'round' \| 'mark'` | `'square'` | — |
| closable | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| icon | `string` | `''` | — |
| checkable | `boolean` | `false` | 可选中（筛选标签） |
| checked | `boolean` | `false` | — |
| maxWidth | `number` | `0` | 文案最大宽度（px）；0 不限制，超出省略 |

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
