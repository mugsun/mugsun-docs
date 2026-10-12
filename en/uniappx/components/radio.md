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
| value | `string` | `''` | Option value within radio-group |
| label | `string` | `''` | Label text |
| content | `string` | `''` | Secondary description |
| contentDisabled | `boolean` | `false` | Tapping content does not toggle; only the icon toggles |
| disabled | `boolean` | `false` | Whether disabled |
| icon | `'circle' \| 'line' \| 'dot'` | `'circle'` | Icon shape |
| placement | `'left' \| 'right'` | `'left'` | Icon position relative to text |
| block | `boolean` | `false` | Whether full-bleed / block |
| allowUncheck | `boolean` | `false` | Whether tapping the selected item again clears it |

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
