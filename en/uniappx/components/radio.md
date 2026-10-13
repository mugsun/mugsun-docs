---
title: Radio
demo: pages/demo/form/radio
---

# Radio

`ms-radio` — Radio for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-radio`).
Demo route: `#/pages/demo/form/radio`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/radio.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-radio :model-value="true" label="填充" block />
  <ms-radio :model-value="true" label="描边" icon="line" block />
  <ms-radio :model-value="true" label="圆点" icon="dot" block />
  <!-- 组件状态 -->
  <ms-radio :model-value="false" disabled label="禁用" block />
  <ms-radio :model-value="true" disabled label="禁用已选" block />
  <ms-radio v-model="vUncheck" allow-uncheck label="可取消" block />
  <!-- 组件分组 -->
  <ms-radio value="a" label="选项 A" block />
  <ms-radio value="b" label="选项 B" block />
  <ms-radio value="c" label="选项 C" block />
  <!-- 组件深度 -->
  <ms-radio value="1" label="禁用组甲" block />
  <ms-radio value="2" label="禁用组乙" block />
  <ms-radio v-model="vDepth" label="描边右侧" icon="line" placement="right" block />
</template>

<script setup lang="uts">
const vUncheck = ref(true)
const vDepth = ref(true)
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
