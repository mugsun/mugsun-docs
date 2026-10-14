---
title: Search
demo: pages/demo/form/search
---

# Search

`ms-search` is a search bar. It supports shape, action and leftIcon, and exposes focus, blur and clear.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-search`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/search`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/search.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| placeholder | `string` | `''` | Placeholder |
| shape | `'square' \| 'round'` | `'square'` | Shape: square / round |
| action | `string` | `''` | Right action label; empty hides it |
| center | `boolean` | `false` | Whether content is centered when unfocused |
| clearable | `boolean` | `true` | Whether clearable |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Max input length; -1 = unlimited |
| leftIcon | `string` | `'search'` | Left icon name |
| confirmType | `'return' \| 'search' \| 'send' \| 'next' \| 'go' \| 'done'` | `'search'` | Keyboard confirm-key type |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | Input |
| focus | Focus |
| blur | Blur |
| clear | Clear |
| confirm | Confirm |
| action | Action button |

## Slots

| Slot | Description |
| --- | --- |
| action | `action` slot |
| left | `left` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-search/`
- Demo: `#/pages/demo/form/search`
- Chinese docs: [/uniappx/components/search](/uniappx/components/search)
