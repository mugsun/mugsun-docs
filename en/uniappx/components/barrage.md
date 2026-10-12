---
title: Barrage
demo: pages/demo/media/barrage
---

# Barrage

`ms-barrage`: Barrage. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-barrage`).
Demo route: `#/pages/demo/media/barrage`.

## Basic usage

```vue
<template>
  <ms-barrage>
    …
  </ms-barrage>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `string[]` | `[]` | — |
| height | `number` | `120` | — |
| speed | `number` | `80` | — |
| rows | `number` | `3` | — |
| paused | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| complete | complete |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-barrage/`
- Demo: `#/pages/demo/media/barrage`
- Chinese docs: [/uniappx/components/barrage](/uniappx/components/barrage)
