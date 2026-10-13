---
title: Button
demo: pages/demo/basic/button
---

# Button

`ms-button` — Button for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-button`).
Demo route: `#/pages/demo/basic/button`.

## Basic usage

```vue
<template>
  <ms-button theme="default" variant="solid">
    …
  </ms-button>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | Theme: default / primary / danger / success / warning / light |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | Variant: solid / outline / dashed / text |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size: xs / sm / md / lg |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | Shape: rectangle / square / round / circle |
| block | `boolean` | `false` | Whether full width |
| ghost | `boolean` | `false` | Ghost button (transparent fill, outlined) |
| disabled | `boolean` | `false` | Whether disabled |
| loading | `boolean` | `false` | Whether loading |
| loadingText | `string` | `'加载中…'` | Loading text; empty string shows spinner only |
| icon | `string` | `''` | Left icon name; can coexist with text |
| iconOnly | `boolean` | `false` | Icon only (square hit area) |
| formType | `'' \| 'submit' \| 'reset'` | `''` | Native form type: submit / reset; empty = normal button |
| haptic | `boolean` | `true` | Short haptic on App/MP click; skipped automatically on Web |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-button/`
- Demo: `#/pages/demo/basic/button`
- Chinese docs: [/uniappx/components/button](/uniappx/components/button)
