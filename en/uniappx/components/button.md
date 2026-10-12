---
title: Button
demo: pages/demo/basic/button
---

# Button

`ms-button` — Button for uni-app x.

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
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | Theme |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | Variant |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | Shape |
| block | `boolean` | `false` | Whether block-level / full width |
| ghost | `boolean` | `false` | Ghost style (transparent background) |
| disabled | `boolean` | `false` | Whether disabled |
| loading | `boolean` | `false` | Whether loading |
| loadingText | `string` | `'加载中…'` | Loading text; empty string shows spinner only |
| icon | `string` | `''` | Icon name (icons.uts) |
| iconOnly | `boolean` | `false` | Icon-only |
| formType | `'' \| 'submit' \| 'reset'` | `''` | Form type (submit/reset) |
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
