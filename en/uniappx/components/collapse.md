---
title: Collapse
demo: pages/demo/display/collapse
---

# Collapse

`ms-collapse` is a collapsible panel built from `items`, with an accordion mode and a card style.

The expanded state can be left to the component or controlled with `v-model:value`.

## Basic usage

<!-- demo-snippets:start -->
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

| Event | Arguments | Description |
| --- | --- | --- |
| change | `values: number[]` | Fires when the expanded panels change; `values` holds the indexes of the expanded items |
| click | `index: number` | Fires when a panel header is tapped; `index` is that item's index. Disabled items do not fire it |
| update:value | `values: number[]` | Fires when the expanded panels change; used by `v-model:value` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getExpanded(): number[]` | Returns the indexes of the expanded items |
