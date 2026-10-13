---
title: Sheet
demo: pages/demo/basic/sheet
---

# Sheet

`ms-sheet` — Sheet for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-sheet` (repository not yet public).
Demo route: `#/pages/demo/basic/sheet`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/sheet.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-sheet radius="lg" padding="none">
    <text>默认容器</text>
    <text>统一白底面，承载列表与表单</text>
    <ms-sheet>
      <ms-text>统一白底容器，承载列表与表单内容。</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>圆角</text>
    <text>大圆角 + 浅底面</text>
    <ms-sheet radius="lg" variant="muted">
      <ms-text>圆角卡片面</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>描边</text>
    <text>边框强调块边界</text>
    <ms-sheet bordered radius="lg">
      <ms-text>带边框的容器块</ms-text>
    </ms-sheet>
  </ms-sheet>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'muted' \| 'primary'` | `'default'` | Style variant |
| radius | `'md' \| 'lg'` | `'lg'` | Border radius (px) |
| padding | `'none' \| 'md' \| 'lg'` | `'md'` | Padding (px) |
| margin | `'none' \| 'page'` | `'none'` | Outer margin: none / page |
| bordered | `boolean` | `false` | Whether to show border |
| shadow | `boolean` | `false` | Whether shadowed |
| loading | `boolean` | `false` | Whether loading |
| url | `string` | `''` | Navigation URL |
| pressable | `boolean` | `false` | Press feedback; treated as clickable when url is set |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sheet/`
- Demo: `#/pages/demo/basic/sheet`
- Chinese docs: [/uniappx/components/sheet](/uniappx/components/sheet)
