---
title: View To Full
demo: pages/demo/media/view-tofull
---

# View To Full

`ms-view-tofull`: View To Full. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-view-tofull`).
Demo route: `#/pages/demo/media/view-tofull`.

## Basic usage

```vue
<template>
  <ms-view-tofull>
    …
  </ms-view-tofull>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| duration | `number` | `300` | — |
| showClose | `boolean` | `true` | — |
| opened | `boolean` | `false` | — |

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
