---
title: View To Full
demo: pages/demo/media/view-tofull
---

# View To Full

`ms-view-tofull` — View Tofull for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-view-tofull`).
Demo route: `#/pages/demo/media/view-tofull`.

## Basic usage

```vue
<template>
  <ms-view-tofull>
    …
  </ms-view-tofull>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| duration | `number` | `300` | Duration (ms) |
| showClose | `boolean` | `true` | Whether to show close when fullscreen |
| opened | `boolean` | `false` | Whether to open fullscreen |

## Events

| Event | Description |
| --- | --- |
| open | Opened |
| close | Closed |
| opened | opened |
| closed | closed |
| update:opened | update:opened |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-view-tofull/`
- Demo: `#/pages/demo/media/view-tofull`
- Chinese docs: [/uniappx/components/view-tofull](/uniappx/components/view-tofull)
