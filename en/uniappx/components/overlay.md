---
title: Overlay
demo: pages/demo/basic/overlay
---

# Overlay

`ms-overlay` is a full-screen translucent mask and the base component for popups.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| closable | `boolean` | `true` | Whether tapping the mask closes it |
| zIndex | `number` | `1000` | z-index |
| dim | `'light' \| 'normal' \| 'heavy'` | `'normal'` | Mask darkness: light / normal / heavy |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the mask is tapped |
| close | — | Fires when the mask closes |
| open | — | Fires after the fade-in finishes |
| update:visible | `value: boolean` | Fires when the mask opens or closes; used by `v-model:visible` |

## Slots

| Slot | Description |
| --- | --- |
| default | Content centered on the mask |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `open()` | Opens the mask; requires `v-model:visible` |
| `close()` | Closes the mask; requires `v-model:visible` |
