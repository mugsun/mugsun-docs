---
title: Image Viewer
demo: pages/demo/display/image-viewer
---

# Image Viewer

`ms-image-viewer`: Image Viewer. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-image-viewer`).
Demo route: `#/pages/demo/display/image-viewer`.

## Basic usage

```vue
<template>
  <ms-image-viewer v-model:visible="open">
    …
  </ms-image-viewer>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| images | `string[]` | `[]` | — |
| initialIndex | `number` | `0` | — |
| showIndex | `boolean` | `false` | — |
| closeBtn | `boolean` | `false` | — |
| deleteBtn | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |
| change | Value changed |
| delete | delete |

## See also

- Component: `uni_modules/ms-ui/components/ms-image-viewer/`
- Demo: `#/pages/demo/display/image-viewer`
- Chinese docs: [/uniappx/components/image-viewer](/uniappx/components/image-viewer)
