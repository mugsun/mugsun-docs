---
title: Image Viewer
demo: pages/demo/display/image-viewer
---

# Image Viewer

`ms-image-viewer` is a full-screen image viewer. It pages with a swiper and can show a page counter and close and delete buttons.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-image-viewer`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/display/image-viewer`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/image-viewer.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <ms-image-viewer
    ref="viewerRef"
    :visible="viewerVisible"
    :images="viewerImages"
    :initial-index="viewerInitial"
    :show-index="viewerShowIndex"
    :close-btn="viewerCloseBtn"
    :delete-btn="viewerDeleteBtn"
    @update:visible="onVisible"
    @close="onClose"
    @change="onChange"
    @delete="onDelete"
  />
</template>

<script setup lang="uts">
const viewerCloseBtn = ref(false)

const viewerDeleteBtn = ref(false)

const viewerImages = ref<string[]>(DEMO_IMAGES.slice(0))

const viewerInitial = ref(0)

const viewerShowIndex = ref(true)

const viewerVisible = ref(false)

function onVisible(v: boolean): void {
  viewerVisible.value = v
}

function onClose() : void {
  console.log('onClose')
}

function onChange(index: number) : void {
  console.log('onChange')
}

function onDelete(index: number) : void {
  console.log('onDelete')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
