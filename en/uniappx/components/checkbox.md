---
title: Checkbox
demo: pages/demo/form/checkbox
---

# Checkbox

`ms-checkbox` — Checkbox for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-checkbox` (commercial edition; source not public).
Demo route: `#/pages/demo/form/checkbox`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/checkbox.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Types -->
  <ms-checkbox v-model="vSquare" label="Square" block />
  <ms-checkbox v-model="vCircle" label="Circle" icon="circle" block />
  <ms-checkbox v-model="vLine" label="Outline" icon="line" block />
  <!-- States -->
  <ms-checkbox :model-value="false" indeterminate label="Indeterminate" block />
  <ms-checkbox :model-value="false" disabled label="Disabled" block />
  <ms-checkbox :model-value="true" disabled label="Disabled checked" block />
  <!-- Groups -->
  <ms-checkbox value="a" label="Option A" block />
  <ms-checkbox value="b" label="Option B" block />
  <ms-checkbox value="c" label="Option C" block />
  <!-- Advanced -->
  <ms-checkbox value="1" label="Disabled group A" block />
  <ms-checkbox value="2" label="Disabled group B" block />
  <ms-checkbox
    :model-value="parentChecked"
    :indeterminate="parentIndeterminate"
    label="Select all"
    block
    @change="onParentChange"
  />
</template>

<script setup lang="uts">
const parentChecked = computed((): boolean => {
  return childValue.value.length == 2
})

const parentIndeterminate = computed((): boolean => {
  return childValue.value.length == 1
})

const vCircle = ref(true)

const vLine = ref(true)

const vSquare = ref(true)

function onParentChange(on: boolean) : void {
  console.log('onParentChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Bound value (v-model) |
| value | `string` | `''` | Option value within checkbox-group |
| label | `string` | `''` | Label text |
| content | `string` | `''` | Secondary description |
| contentDisabled | `boolean` | `false` | Tapping content does not toggle; only the icon toggles |
| disabled | `boolean` | `false` | Whether disabled |
| indeterminate | `boolean` | `false` | Indeterminate state |
| icon | `'square' \| 'circle' \| 'line'` | `'square'` | Icon shape |
| placement | `'left' \| 'right'` | `'left'` | Icon position relative to text |
| block | `boolean` | `false` | Whether full-bleed / block |

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

- Component: `uni_modules/ms-ui/components/ms-checkbox/`
- Demo: `#/pages/demo/form/checkbox`
- Chinese docs: [/uniappx/components/checkbox](/uniappx/components/checkbox)
