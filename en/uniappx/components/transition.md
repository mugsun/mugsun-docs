---
title: Transition
demo: pages/demo/basic/transition
---

# Transition

`ms-transition` — Transition for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-transition`).
Demo route: `#/pages/demo/basic/transition`.

## Basic usage

```vue
<template>
  <ms-transition name="fade" v-model:visible="open">
    …
  </ms-transition>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| name | `\| 'fade'` | `'fade'` | Name / field name |
| duration | `number` | `300` | Duration (ms) |
| appear | `boolean` | `false` | Whether to animate on appear |
| destroyOnHide | `boolean` | `false` | Destroy when hidden |

## Events

| Event | Description |
| --- | --- |
| before-enter | before-enter |
| after-enter | after-enter |
| before-leave | before-leave |
| after-leave | after-leave |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-transition/`
- Demo: `#/pages/demo/basic/transition`
- Chinese docs: [/uniappx/components/transition](/uniappx/components/transition)
