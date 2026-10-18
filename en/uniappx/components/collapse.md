---
title: Collapse
demo: pages/demo/display/collapse
---

# Collapse

`ms-collapse` is a collapsible panel built from `items`. It supports `accordion`, `theme`, `expandIcon` and `defaultExpandAll`, and can be controlled through `value`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-collapse`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/display/collapse`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/collapse.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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
  <!-- Styles -->
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
  { label: 'Accordion 1', content: longText } as UTSJSONObject,
  { label: 'Accordion 2', content: longText } as UTSJSONObject,
  { label: 'Accordion 3', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const accordionValue = [0] as number[]

const actionItems = [
  { label: 'Collapse panel title', note: 'Expand', content: longText } as UTSJSONObject,
  { label: 'With left icon', icon: 'information-line', note: 'Info', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const baseItems = [
  { label: 'Collapse panel title', content: longText } as UTSJSONObject,
  { label: 'Second panel', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const baseValue = [0] as number[]

const cardItems = [
  { label: 'Card panel 1', content: longText } as UTSJSONObject,
  { label: 'Card panel 2', content: longText } as UTSJSONObject,
  { label: 'Card disabled', content: longText, disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const cardValue = [0] as number[]

const disabledItems = [
  { label: 'Expandable panel', content: longText } as UTSJSONObject,
  { label: 'Disabled panel', content: longText, disabled: true } as UTSJSONObject,
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
