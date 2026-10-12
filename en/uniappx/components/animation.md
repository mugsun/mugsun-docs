---
title: Animation
demo: pages/demo/feedback/animation
---

# Animation

`ms-animation` — Animation for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-animation`).
Demo route: `#/pages/demo/feedback/animation`.

## Basic usage

```vue
<template>
  <ms-animation name="fade-in">
    …
  </ms-animation>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `\| 'fade-in'` | `'fade-in'` | Name / field name |
| duration | `number` | `300` | Duration (ms) |
| delay | `number` | `0` | Delay (ms) |
| autoPlay | `boolean` | `false` | Whether to autoplay |
| playing | `boolean` | `false` | Whether playing is enabled |

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
