---
title: Transition
demo: pages/demo/basic/transition
---

# Transition

`ms-transition`: Transition. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-transition`).
Demo route: `#/pages/demo/basic/transition`.

## Basic usage

```vue
<template>
  <ms-transition name="fade" v-model:visible="open">
    …
  </ms-transition>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| name | `\| 'fade'` | `'fade'` | — |
| duration | `number` | `300` | — |
| appear | `boolean` | `false` | — |
| destroyOnHide | `boolean` | `false` | — |

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
