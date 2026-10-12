---
title: Image Resizer
demo: pages/demo/display/image-resizer
---

# Image Resizer

`ms-image-resizer`: Image Resizer. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-image-resizer`).
Demo route: `#/pages/demo/display/image-resizer`.

## Basic usage

```vue
<template>
  <ms-image-resizer>
    …
  </ms-image-resizer>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | — |
| cropWidth | `number` | `240` | — |
| cropHeight | `number` | `240` | — |
| height | `number` | `320` | — |
| quality | `number` | `1` | — |
| hideFlip | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| confirm | Confirm |
| cancel | Cancel |
| error | Error |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-image-resizer/`
- Demo: `#/pages/demo/display/image-resizer`
- Chinese docs: [/uniappx/components/image-resizer](/uniappx/components/image-resizer)
