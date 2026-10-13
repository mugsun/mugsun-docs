---
title: Radio Group
demo: pages/demo/form/radio
---

# Radio Group

`ms-radio-group` — Radio Group for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-radio-group` (commercial edition; source not public).
Demo route: `#/pages/demo/form/radio`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/radio.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件分组 -->
  <ms-radio-group v-model="groupValue">
    <ms-radio value="a" label="选项 A" block />
    <ms-radio value="b" label="选项 B" block />
    <ms-radio value="c" label="选项 C" block />
  </ms-radio-group>
  <ms-radio-group v-model="rowValue" horizontal>
    <view>
      <ms-radio value="x" label="横排一" />
    </view>
    <view>
      <ms-radio value="y" label="横排二" />
    </view>
  </ms-radio-group>
  <!-- 组件深度 -->
  <ms-radio-group v-model="disabledGroup" disabled>
    <ms-radio value="1" label="禁用组甲" block />
    <ms-radio value="2" label="禁用组乙" block />
  </ms-radio-group>
  <ms-radio-group v-model="uncheckGroup" allow-uncheck>
    <ms-radio value="a" label="组内 A" block />
    <ms-radio value="b" label="组内 B" block />
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
