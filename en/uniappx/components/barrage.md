---
title: Barrage
demo: pages/demo/media/barrage
---

# Barrage

`ms-barrage` — Barrage for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-barrage`).
Demo route: `#/pages/demo/media/barrage`.

## Basic usage

```vue
<template>
  <ms-barrage>
    …
  </ms-barrage>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `string[]` | `[]` | Data list |
| height | `number` | `120` | Height (px) |
| speed | `number` | `80` | Speed |
| rows | `number` | `3` | Row count |
| paused | `boolean` | `false` | Whether barrage is paused |

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
