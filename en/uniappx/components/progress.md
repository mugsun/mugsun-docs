---
title: Progress
demo: pages/demo/display/progress
---

# Progress

`ms-progress` — Progress for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-progress`).
Demo route: `#/pages/demo/display/progress`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/progress.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-progress variant="line" :percentage="80" />
  <ms-progress variant="plump" :percentage="80" />
  <ms-progress variant="circle" :percentage="30" />
  <!-- 线性状态 -->
  <ms-progress variant="line" :percentage="88" status="warning" />
  <ms-progress variant="line" :percentage="88" status="error" />
  <ms-progress variant="line" :percentage="88" status="success" />
  <!-- 内显状态 -->
  <ms-progress variant="plump" :percentage="88" status="warning" />
  <ms-progress variant="plump" :percentage="88" status="error" />
  <ms-progress variant="plump" :percentage="88" status="success" />
  <!-- 环形状态 -->
  <ms-progress variant="circle" :percentage="88" status="warning" />
  <ms-progress variant="circle" :percentage="88" status="error" />
  <ms-progress variant="circle" :percentage="88" status="success" />
</template>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| percentage | `number` | `0` | Progress percent 0–100 |
| variant | `'line' \| 'plump' \| 'circle'` | `'line'` | Style variant |
| status | `'default' \| 'success' \| 'warning' \| 'error' \| 'active'` | `'default'` | Status |
| strokeWidth | `number` | `6` | Track thickness (px) |
| label | `boolean \| string` | `true` | Label text |
| size | `'xs' \| 'md'` | `'md'` | Size |

## See also

- Component: `uni_modules/ms-ui/components/ms-progress/`
- Demo: `#/pages/demo/display/progress`
- Chinese docs: [/uniappx/components/progress](/uniappx/components/progress)
