---
title: Radio Group
demo: pages/demo/form/radio
---

# Radio Group

`ms-radio-group` — Radio Group for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-radio-group`).
Demo route: `#/pages/demo/form/radio`.

## Basic usage

```vue
<template>
  <ms-radio-group v-model="value">
    …
  </ms-radio-group>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| disabled | `boolean` | `false` | Whether disabled |
| horizontal | `boolean` | `false` | Whether horizontal |
| allowUncheck | `boolean` | `false` | Whether unchecking is allowed |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-radio-group/`
- Demo: `#/pages/demo/form/radio`
- Chinese docs: [/uniappx/components/radio-group](/uniappx/components/radio-group)
