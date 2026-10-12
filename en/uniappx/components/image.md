---
title: Image
demo: pages/demo/basic/image
---

# Image

`ms-image`: Image. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-image`).
Demo route: `#/pages/demo/basic/image`.

## Basic usage

```vue
<template>
  <ms-image>
    …
  </ms-image>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | — |
| mode | `string` | `'aspectFill'` | — |
| shape | `'square' \| 'round' \| 'circle'` | `'square'` | — |
| width | `string` | `'72px'` | — |
| height | `string` | `'72px'` | — |
| lazy | `boolean` | `false` | — |
| showMenuByLongpress | `boolean` | `false` | 长按识别小程序码菜单（微信有效，见 image.md） |

## Events

| Event | Description |
| --- | --- |
| load | load |
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
