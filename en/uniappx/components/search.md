---
title: Search
demo: pages/demo/form/search
---

# Search

`ms-search` is a search bar bound with `v-model`. It comes in square and round shapes, with an optional action button on the right.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-search v-model="baseValue" placeholder="Search placeholder" />
  <ms-search
    v-model="limitValue"
    placeholder="Up to 10 characters"
    :maxlength="10"
  />
  <ms-search
    v-model="actionValue"
    placeholder="Type, then tap Search"
    action="Search"
    @action="onSearchAction"
  />
  <!-- Styles -->
  <ms-search v-model="squareValue" placeholder="Square search box" shape="square" />
  <ms-search v-model="roundValue" placeholder="Round search box" shape="round" />
  <!-- States -->
  <ms-search v-model="centerValue" placeholder="Centered placeholder" shape="round" center />
  <ms-search model-value="" placeholder="Disabled" disabled />
  <!-- Advanced -->
  <ms-search model-value="Read-only keyword" readonly shape="round" />
  <ms-search v-model="noClearValue" placeholder="No clear button" :clearable="false" />
  <ms-search v-model="filterValue" placeholder="Filter keyword" left-icon="filter" />
</template>

<script setup lang="uts">
const actionValue = ref('keyword')

const baseValue = ref('')

const centerValue = ref('')

const filterValue = ref('')

const limitValue = ref('')

const noClearValue = ref('kept')

const roundValue = ref('')

const squareValue = ref('')

function onSearchAction() : void {
  console.log('onSearchAction')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| placeholder | `string` | `''` | Placeholder |
| shape | `'square' \| 'round'` | `'square'` | Shape: square / round |
| action | `string` | `''` | Action label on the right; hidden when empty |
| center | `boolean` | `false` | Whether the content is centered while not focused |
| clearable | `boolean` | `true` | Whether to show the clear button |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Maximum input length; `-1` for no limit |
| leftIcon | `string` | `'search'` | Left icon name |
| confirmType | `'return' \| 'search' \| 'send' \| 'next' \| 'go' \| 'done'` | `'search'` | Keyboard confirm-key type |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the content changes; used by `v-model` |
| input | `value: string` | Fires on input; `value` is the current content |
| focus | `e: UniInputFocusEvent` | Fires when the input gains focus |
| blur | `e: UniInputBlurEvent` | Fires when the input loses focus |
| clear | — | Fires when the content is cleared |
| confirm | `value: string` | Fires when the keyboard's search key is tapped; `value` is the current content |
| action | `value: string` | Fires when the action label is tapped; `value` is the current content |

## Slots

| Slot | Description |
| --- | --- |
| left | Custom icon on the left |
| action | Custom action area on the right |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `focus()` | Focuses the input |
| `blur()` | Blurs the input |
| `clear()` | Clears the content |
