---
title: Toast
demo: pages/demo/feedback/toast
---

# Toast

`ms-toast` is a brief message in text, icon or loading form. It can appear at the top, middle or bottom, with an optional mask.

Bind its visibility with `v-model:visible`; it closes automatically after `duration`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-toast
    :visible="showPlain"
    message="Success"
    @update:visible="onPlainVisible"
  />
  <ms-toast
    :visible="showMultiLine"
    message="This is a longer message that wraps onto two or three lines at most"
    @update:visible="onMultiVisible"
  />
  <ms-toast
    :visible="showRowIcon"
    message="Horizontal icon"
    icon="star-line"
    @update:visible="onRowVisible"
  />
</template>

<script setup lang="uts">
const showMultiLine = ref(false)

const showPlain = ref(false)

const showRowIcon = ref(false)

function onPlainVisible(value: boolean): void {
  showPlain.value = value
}

function onMultiVisible(value: boolean): void {
  showMultiLine.value = value
}

function onRowVisible(value: boolean): void {
  showRowIcon.value = value
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| message | `string` | `''` | Message text |
| theme | `'default' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'default'` | Type: default (text only) / success / warning / error / loading |
| icon | `string` | `''` | Custom icon name; optional when the type already has an icon |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout of icon and text: horizontal / vertical |
| placement | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Position: top / middle / bottom |
| duration | `number` | `2000` | Time before it closes automatically (ms); `0` keeps it open |
| showOverlay | `boolean` | `false` | Whether to show a mask that blocks taps on the content underneath |
| zIndex | `number` | `1100` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when it closes automatically; used by `v-model:visible` |
| close | — | Fires when it closes automatically |
