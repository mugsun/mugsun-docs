---
title: Image Group
demo: pages/demo/display/image-group
---

# Image Group

`ms-image-group`: Image Group. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-image-group`).
Demo route: `#/pages/demo/display/image-group`.

## Basic usage

```vue
<template>
  <ms-image-group :disabled="true">
    …
  </ms-image-group>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| columns | `number` | `3` | — |
| mode | `string` | `'aspectFill'` | — |
| labelMode | `string` | `'inset'` | — |
| maxCount | `number` | `-1` | — |
| preview | `boolean` | `true` | — |
| disabled | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-image-group/`
- Demo: `#/pages/demo/display/image-group`
- Chinese docs: [/uniappx/components/image-group](/uniappx/components/image-group)
