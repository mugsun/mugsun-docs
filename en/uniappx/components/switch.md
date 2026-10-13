---
title: Switch
demo: pages/demo/form/switch
---

# Switch

`ms-switch` — Switch for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-switch` (repository not yet public).
Demo route: `#/pages/demo/form/switch`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/switch.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-switch v-model="vBase" />
  <ms-switch v-model="vLabel" :label="['开', '关']" />
  <ms-switch v-model="vIcon" active-icon="check-line" void-icon="close-line" />
  <!-- 组件状态 -->
  <ms-switch :model-value="true" loading />
  <ms-switch :model-value="false" disabled />
  <!-- 组件尺寸 -->
  <ms-switch v-model="vSize" size="sm" />
  <ms-switch v-model="vSize" size="md" />
  <ms-switch v-model="vSize" size="lg" />
  <!-- 组件深度 -->
  <ms-switch v-model="vDepthLabel" size="lg" :label="['开', '关']" />
  <ms-switch
    :model-value="true"
    loading
    active-icon="check-line"
    void-icon="close-line"
  />
  <ms-switch :model-value="true" disabled :label="['开', '关']" />
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
