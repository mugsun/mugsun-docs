---
title: Animation
demo: pages/demo/feedback/animation
---

# Animation

`ms-animation`: Animation. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-animation`).
Demo route: `#/pages/demo/feedback/animation`.

## Basic usage

```vue
<template>
  <ms-animation name="fade-in">
    …
  </ms-animation>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `\| 'fade-in'` | `'fade-in'` | — |
| duration | `number` | `300` | — |
| delay | `number` | `0` | — |
| autoPlay | `boolean` | `false` | — |
| playing | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| before-play | before-play |
| complete | complete |
| update:playing | update:playing |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-animation/`
- Demo: `#/pages/demo/feedback/animation`
- Chinese docs: [/uniappx/components/animation](/uniappx/components/animation)
