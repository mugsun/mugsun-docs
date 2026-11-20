---
title: Sign Board
demo: pages/demo/form/sign-board
---

# Sign Board

`ms-sign-board` is a handwriting signature pad. Write on the canvas with a finger, or with the mouse on Web.

Call `getImage()` to get the signature as an image.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-sign-board ref="boardRef" :pen-type="penType" @end="onStrokeEnd" />
  <!-- Styles -->
  <ms-sign-board ref="pencilRef" pen-type="pencil" :stroke-width="6" />
  <!-- Advanced -->
  <ms-sign-board pen-type="pen" :stroke-width="14" />
  <ms-sign-board disabled :stroke-width="8" />
  <ms-sign-board pen-type="pencil" :stroke-width="3" />
</template>

<script setup lang="uts">
const penType = ref('default')

function onStrokeEnd() : void {
  console.log('onStrokeEnd')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| penType | `string` | `'default'` | Stroke style: default / pen / pencil |
| strokeWidth | `number` | `8` | Base stroke width (px) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| start | — | Fires when a stroke starts |
| end | — | Fires when a stroke ends |
| clear | — | Fires when the canvas is cleared |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `clear()` | Clears the canvas |
| `getLineCount(): number` | Returns the number of strokes |
| `isEmpty(): boolean` | Whether the canvas is empty |
| `getImage(): UTSJSONObject` | Returns the signature image with `src` (a PNG data URL), `width` and `height` |
