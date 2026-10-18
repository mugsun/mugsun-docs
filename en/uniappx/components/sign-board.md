---
title: Sign Board
demo: pages/demo/form/sign-board
---

# Sign Board

`ms-sign-board` is a handwriting signature pad based on a 2d `canvas` and touch events, with additional mouse support on Web.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-sign-board`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/form/sign-board`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/sign-board.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| penType | `string` | `'default'` | default / pen / pencil |
| strokeWidth | `number` | `8` | Base stroke width (px) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| end | end |
| clear | Clear |

## See also

- Component: `uni_modules/ms-ui/components/ms-sign-board/`
- Demo: `#/pages/demo/form/sign-board`
- Chinese docs: [/uniappx/components/sign-board](/uniappx/components/sign-board)
