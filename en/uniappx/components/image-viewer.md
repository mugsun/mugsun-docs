---
title: Image Viewer
demo: pages/demo/display/image-viewer
---

# Image Viewer

`ms-image-viewer` — Image Viewer for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-image-viewer`).
Demo route: `#/pages/demo/display/image-viewer`.

## Basic usage

```vue
<template>
  <ms-image-viewer v-model:visible="open">
    …
  </ms-image-viewer>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| images | `string[]` | `[]` | Image URL list |
| initialIndex | `number` | `0` | Initial index |
| showIndex | `boolean` | `false` | Whether to show current index |
| closeBtn | `boolean` | `false` | Whether to show the close button |
| deleteBtn | `boolean` | `false` | Whether to show delete button |

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
