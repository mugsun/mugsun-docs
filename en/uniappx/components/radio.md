---
title: Radio
demo: pages/demo/form/radio
---

# Radio

`ms-radio` — Radio for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-radio`).
Demo route: `#/pages/demo/form/radio`.

## Basic usage

```vue
<template>
  <ms-radio label="…" v-model="value">
    …
  </ms-radio>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Bound value (v-model) |
| value | `string` | `''` | Current value |
| label | `string` | `''` | Label text |
| content | `string` | `''` | Content text |
| contentDisabled | `boolean` | `false` | Whether content is disabled |
| disabled | `boolean` | `false` | Whether disabled |
| icon | `'circle' \| 'line' \| 'dot'` | `'circle'` | Icon name (icons.uts) |
| placement | `'left' \| 'right'` | `'left'` | Placement |
| block | `boolean` | `false` | Whether block-level / full width |
| allowUncheck | `boolean` | `false` | Allow unchecking |

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

- Component: `uni_modules/ms-ui/components/ms-radio/`
- Demo: `#/pages/demo/form/radio`
- Chinese docs: [/uniappx/components/radio](/uniappx/components/radio)
