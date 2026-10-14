---
title: Switch
demo: pages/demo/form/switch
---

# Switch

`ms-switch` is a toggle whose track and thumb are built from views. It supports text or icons, a loading state, disabled and three sizes; the demo shows combinations such as text with large size, icon with loading, disabled with text, and small size with icon.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-switch`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/switch`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/switch.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-switch v-model="vBase" />
  <ms-switch v-model="vLabel" :label="['On', 'Off']" />
  <ms-switch v-model="vIcon" active-icon="check-line" void-icon="close-line" />
  <!-- States -->
  <ms-switch :model-value="true" loading />
  <ms-switch :model-value="false" disabled />
  <!-- Sizes -->
  <ms-switch v-model="vSize" size="sm" />
  <ms-switch v-model="vSize" size="md" />
  <ms-switch v-model="vSize" size="lg" />
  <!-- Advanced -->
  <ms-switch v-model="vDepthLabel" size="lg" :label="['On', 'Off']" />
  <ms-switch
    :model-value="true"
    loading
    active-icon="check-line"
    void-icon="close-line"
  />
  <ms-switch :model-value="true" disabled :label="['On', 'Off']" />
</template>

<script setup lang="uts">
const vBase = ref(false)

const vDepthLabel = ref(true)

const vIcon = ref(true)

const vLabel = ref(true)

const vSize = ref(true)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Bound value (v-model) |
| disabled | `boolean` | `false` | Whether disabled |
| loading | `boolean` | `false` | Whether loading |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size: sm / md / lg |
| label | `string[]` | `[]` | Labels on both sides of the switch [off, on]; empty hides them |
| activeIcon | `string` | `''` | On-state icon |
| voidIcon | `string` | `''` | Closed-state icon |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-switch/`
- Demo: `#/pages/demo/form/switch`
- Chinese docs: [/uniappx/components/switch](/uniappx/components/switch)
