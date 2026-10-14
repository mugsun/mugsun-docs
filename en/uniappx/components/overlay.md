---
title: Overlay
demo: pages/demo/basic/overlay
---

# Overlay

`ms-overlay` is a full-screen translucent mask and the base component for popups.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-overlay`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/overlay`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/overlay.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <ms-overlay
    :visible="showBase"
    @update:visible="onBaseVisible"
    @click="onBaseMaskClick"
  />
  <ms-overlay :visible="showContent" @update:visible="onContentVisible">
    <ms-sheet margin="page" radius="lg" shadow>
      <ms-text>Content on the overlay</ms-text>
      <view>
        <ms-button size="sm" theme="primary" @click="closeContent">Close</ms-button>
      </view>
    </ms-sheet>
  </ms-overlay>
  <ms-overlay :visible="showLock" :closable="false" @update:visible="onLockVisible">
    <ms-sheet margin="page" radius="lg">
      <ms-text>Tapping the overlay will not close it</ms-text>
      <view>
        <ms-button size="sm" theme="primary" @click="closeLock">Got it</ms-button>
      </view>
    </ms-sheet>
  </ms-overlay>
</template>

<script setup lang="uts">
const showBase = ref(false)

const showContent = ref(false)

const showLock = ref(false)

function onBaseVisible(value: boolean): void {
  showBase.value = value
}

function onBaseMaskClick() : void {
  console.log('onBaseMaskClick')
}

function onContentVisible(value: boolean): void {
  showContent.value = value
}

function closeContent(): void {
  showContent.value = false
}

function onLockVisible(value: boolean): void {
  showLock.value = value
}

function closeLock(): void {
  showLock.value = false
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| closable | `boolean` | `true` | Whether closable |
| zIndex | `number` | `1000` | z-index |
| dim | `'light' \| 'normal' \| 'heavy'` | `'normal'` | Overlay strength: light / normal / deep (semantic; not an arbitrary color) |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| open | Opened |
| update:visible | v-model:visible update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-overlay/`
- Demo: `#/pages/demo/basic/overlay`
- Chinese docs: [/uniappx/components/overlay](/uniappx/components/overlay)
