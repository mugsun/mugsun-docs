---
title: Badge
demo: pages/demo/basic/badge
---

# Badge

`ms-badge` — Badge for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-badge`).
Demo route: `#/pages/demo/basic/badge`.

## Basic usage

```vue
<template>
  <ms-badge theme="danger" size="sm">
    …
  </ms-badge>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| count | `number` | `0` | Count |
| label | `string` | `''` | Label text |
| dot | `boolean` | `false` | Dot |
| max | `number` | `99` | Maximum / upper limit |
| showZero | `boolean` | `false` | Whether to show Zero |
| theme | `'danger' \| 'primary' \| 'success' \| 'warning'` | `'danger'` | success \ |
| shape | `'circle' \| 'square'` | `'circle'` | Shape |
| size | `'sm' \| 'md'` | `'md'` | Size |
| offset | `number[]` | `[]` | Offset |
| standalone | `boolean` | `false` | Standalone badge (does not wrap an anchor) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-badge/`
- Demo: `#/pages/demo/basic/badge`
- Chinese docs: [/uniappx/components/badge](/uniappx/components/badge)
