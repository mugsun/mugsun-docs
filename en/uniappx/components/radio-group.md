---
title: Radio Group
demo: pages/demo/form/radio
---

# Radio Group

`ms-radio-group` groups radio buttons. Its `v-model` is a `string`, options are mutually exclusive, and it supports disabling the whole group and horizontal layout with wrapping.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-radio-group`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/form/radio`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/radio.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Groups -->
  <ms-radio-group v-model="groupValue">
    <ms-radio value="a" label="Option A" block />
    <ms-radio value="b" label="Option B" block />
    <ms-radio value="c" label="Option C" block />
  </ms-radio-group>
  <ms-radio-group v-model="rowValue" horizontal>
    <view>
      <ms-radio value="x" label="Inline 1" />
    </view>
    <view>
      <ms-radio value="y" label="Inline 2" />
    </view>
  </ms-radio-group>
  <!-- Advanced -->
  <ms-radio-group v-model="disabledGroup" disabled>
    <ms-radio value="1" label="Disabled group A" block />
    <ms-radio value="2" label="Disabled group B" block />
  </ms-radio-group>
  <ms-radio-group v-model="uncheckGroup" allow-uncheck>
    <ms-radio value="a" label="In group A" block />
    <ms-radio value="b" label="In group B" block />
  </ms-radio-group>
</template>

<script setup lang="uts">
const disabledGroup = ref('1')

const groupValue = ref('a')

const rowValue = ref('x')

const uncheckGroup = ref('a')
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
