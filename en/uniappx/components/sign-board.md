---
title: Sign Board
demo: pages/demo/form/sign-board
---

# Sign Board

`ms-sign-board` — Sign Board for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-sign-board` (commercial edition; source not public).
Demo route: `#/pages/demo/form/sign-board`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/sign-board.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-sign-board ref="boardRef" :pen-type="penType" @end="onStrokeEnd" />
  <!-- 组件样式 -->
  <ms-sign-board ref="pencilRef" pen-type="pencil" :stroke-width="6" />
  <!-- 组件深度 -->
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
