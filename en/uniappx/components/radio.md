---
title: Radio
demo: pages/demo/form/radio
---

# Radio

`ms-radio` — Radio for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-radio` (commercial edition; source not public).
Demo route: `#/pages/demo/form/radio`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/radio.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Types -->
  <ms-radio :model-value="true" label="Solid" block />
  <ms-radio :model-value="true" label="Outline" icon="line" block />
  <ms-radio :model-value="true" label="Dot" icon="dot" block />
  <!-- States -->
  <ms-radio :model-value="false" disabled label="Disabled" block />
  <ms-radio :model-value="true" disabled label="Disabled checked" block />
  <ms-radio v-model="vUncheck" allow-uncheck label="Uncheckable" block />
  <!-- Groups -->
  <ms-radio value="a" label="Option A" block />
  <ms-radio value="b" label="Option B" block />
  <ms-radio value="c" label="Option C" block />
  <!-- Advanced -->
  <ms-radio value="1" label="Disabled group A" block />
  <ms-radio value="2" label="Disabled group B" block />
  <ms-radio v-model="vDepth" label="Outline, right" icon="line" placement="right" block />
</template>

<script setup lang="uts">
const vDepth = ref(true)

const vUncheck = ref(true)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
