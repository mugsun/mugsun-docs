---
title: Image Group
demo: pages/demo/display/image-group
---

# Image Group

`ms-image-group` — Image Group for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-image-group`).
Demo route: `#/pages/demo/display/image-group`.

## Basic usage

```vue
<template>
  <ms-image-group>
    …
  </ms-image-group>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| columns | `number` | `3` | Column config |
| mode | `string` | `'aspectFill'` | Mode |
| labelMode | `string` | `'inset'` | Label mode |
| maxCount | `number` | `-1` | Max count |
| preview | `boolean` | `true` | Whether previewable |
| disabled | `boolean` | `false` | Whether disabled |

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
