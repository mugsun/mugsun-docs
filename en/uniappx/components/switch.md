---
title: Switch
demo: pages/demo/form/switch
---

# Switch

`ms-switch` is a toggle bound with `v-model`. The on and off states can each show text or an icon, and there are three sizes.

While `loading` is `true` it shows a loading state and cannot be toggled.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Bound value (v-model) |
| disabled | `boolean` | `false` | Whether disabled |
| loading | `boolean` | `false` | Whether to show the loading state; it cannot be toggled while loading |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size: sm / md / lg |
| label | `string[]` | `[]` | Text for the off and on states, as `[off, on]`; hidden when empty |
| activeIcon | `string` | `''` | Icon name for the on state |
| voidIcon | `string` | `''` | Icon name for the off state |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: boolean` | Fires when the state toggles; used by `v-model` |
| change | `value: boolean` | Fires when the state toggles; `value` is the new state |
