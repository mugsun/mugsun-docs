---
title: Cell
demo: pages/demo/basic/cell
---

# Cell

`ms-cell` — Cell for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-cell`).
Demo route: `#/pages/demo/basic/cell`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/cell.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-cell title="单行标题" arrow />
  <ms-cell title="单行标题" required note="必填" arrow />
  <ms-cell title="单行标题" note="辅助信息" arrow />
  <ms-cell
    title="单行标题"
    description="一段很长很长的内容文字"
    arrow
  />
  <ms-cell
    title="单行标题"
    description="一段很长很长的内容文字"
    required
    arrow
    :bordered="false"
  />
  <ms-cell title="带徽标" arrow :bordered="false">
    <template #note>
      <ms-badge :count="16" />
    </template>
  </ms-cell>
  <ms-cell title="单行标题" icon="customer-service-line" arrow />
  <ms-cell title="单行标题" icon="global-line" arrow />
  <ms-cell title="单行标题" icon="lock-line" arrow :bordered="false" />
</template>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | Main title |
| description | `string` | `''` | Description below |
| note | `string` | `''` | Right-side note |
| icon | `string` | `''` | Icon name (icons.uts) |
| image | `string` | `''` | Left image (preferred over icon) |
| arrow | `boolean` | `false` | Whether to show arrow |
| bordered | `boolean` | `true` | Whether to show border |
| required | `boolean` | `false` | Whether to show required asterisk |
| url | `string` | `''` | Tap navigation URL |
| disabled | `boolean` | `false` | Whether disabled |
| align | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Vertical alignment of the right area |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| note | `note` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-cell/`
- Demo: `#/pages/demo/basic/cell`
- Chinese docs: [/uniappx/components/cell](/uniappx/components/cell)
