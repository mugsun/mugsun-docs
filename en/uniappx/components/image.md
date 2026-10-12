---
title: Image
demo: pages/demo/basic/image
---

# Image

`ms-image` — Image for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-image`).
Demo route: `#/pages/demo/basic/image`.

## Basic usage

```vue
<template>
  <ms-image src="…">
    …
  </ms-image>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Resource URL |
| mode | `string` | `'aspectFill'` | Mode |
| shape | `'square' \| 'round' \| 'circle'` | `'square'` | Shape |
| width | `string` | `'72px'` | Width (px) |
| height | `string` | `'72px'` | Height (px) |
| lazy | `boolean` | `false` | Whether lazy |
| showMenuByLongpress | `boolean` | `false` | Long-press MP code menu (WeChat; see image.md) |

## Events

| Event | Description |
| --- | --- |
| load | Load |
| error | Error |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| error | `error` slot |
| loading | `loading` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-image/`
- Demo: `#/pages/demo/basic/image`
- Chinese docs: [/uniappx/components/image](/uniappx/components/image)
