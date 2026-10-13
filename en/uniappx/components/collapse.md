---
title: Collapse
demo: pages/demo/display/collapse
---

# Collapse

`ms-collapse` — Collapse for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-collapse` (commercial edition; source not public).
Demo route: `#/pages/demo/display/collapse`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/collapse.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <ms-collapse
    :items="baseItems"
    :value="baseValue"
    @change="onBaseChange"
  />
  <ms-collapse
    :items="actionItems"
    @change="onActionChange"
  />
  <ms-collapse
    :items="accordionItems"
    :value="accordionValue"
    accordion
    @change="onAccordionChange"
  />
  <ms-collapse
    :items="disabledItems"
    @change="onDisabledChange"
  />
  <!-- 样式 -->
  <ms-collapse
    :items="cardItems"
    :value="cardValue"
    theme="card"
    @change="onCardChange"
  />
  <ms-collapse :items="baseItems" :expand-icon="false" />
  <ms-collapse :items="accordionItems" :default-expand-all="true" />
  <ms-collapse
    v-model:value="modelValue"
    :items="baseItems"
    @change="onModelChange"
  />
</template>

<script setup lang="uts">
const accordionItems = [
  { label: '手风琴一', content: longText } as UTSJSONObject,
  { label: '手风琴二', content: longText } as UTSJSONObject,
  { label: '手风琴三', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const accordionValue = [0] as number[]

const actionItems = [
  { label: '折叠面板标题', note: '展开', content: longText } as UTSJSONObject,
  { label: '带左图标', icon: 'information-line', note: '说明', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const baseItems = [
  { label: '折叠面板标题', content: longText } as UTSJSONObject,
  { label: '第二个面板', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const baseValue = [0] as number[]

const cardItems = [
  { label: '卡片面板一', content: longText } as UTSJSONObject,
  { label: '卡片面板二', content: longText } as UTSJSONObject,
  { label: '卡片停用', content: longText, disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const cardValue = [0] as number[]

const disabledItems = [
  { label: '可展开面板', content: longText } as UTSJSONObject,
  { label: '停用面板', content: longText, disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const modelValue = ref([0] as number[])

function onBaseChange(values: number[]) : void {
  console.log('onBaseChange')
}

function onActionChange(values: number[]) : void {
  console.log('onActionChange')
}

function onAccordionChange(values: number[]) : void {
  console.log('onAccordionChange')
}

function onDisabledChange(values: number[]) : void {
  console.log('onDisabledChange')
}

function onCardChange(values: number[]) : void {
  console.log('onCardChange')
}

function onModelChange(values: number[]) : void {
  console.log('onModelChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Each item: label / content / note / icon / disabled |
| value | `number[]` | `[]` | Set of expanded item indexes (controlled) |
| accordion | `boolean` | `false` | Accordion: only one panel open at a time |
| theme | `string` | `'default'` | Style: default full-bleed / card |
| expandIcon | `boolean` | `true` | Whether to show the expand arrow |
| disabled | `boolean` | `false` | Disable the whole group (per-item disabled wins) |
| defaultExpandAll | `boolean` | `false` | Whether to expand all on first render (when value is omitted) |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-collapse/`
- Demo: `#/pages/demo/display/collapse`
- Chinese docs: [/uniappx/components/collapse](/uniappx/components/collapse)
