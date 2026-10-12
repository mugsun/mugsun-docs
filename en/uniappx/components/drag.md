---
title: Drag
demo: pages/demo/media/drag
---

# Drag

`ms-drag`: Drag. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-drag`).
Demo route: `#/pages/demo/media/drag`.

## Basic usage

```vue
<template>
  <ms-drag :disabled="true">
    …
  </ms-drag>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| col | `number` | `1` | — |
| scrollDiff | `number` | `25` | — |
| disabled | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| start | Started |
| end | end |
| move | move |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-drag/`
- Demo: `#/pages/demo/media/drag`
- Chinese docs: [/uniappx/components/drag](/uniappx/components/drag)
