---
title: Input
demo: pages/demo/form/input
---

# Input

`ms-input` is a single-line input bound with `v-model`. It can show a label, prefix and suffix icons and a clear button.

`status` shows the validation state, `tips` is the hint below the field, and `type="password"` is for passwords.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Basic -->
  <ms-input v-model="baseValue" label="Label" placeholder="Enter text" />
  <!-- Prefix icon -->
  <ms-input v-model="searchValue" label="Search" placeholder="Enter keywords" prefix-icon="search" />
  <!-- Clearable -->
  <ms-input v-model="clearValue" label="Clearable" placeholder="Type, then tap the clear icon" clearable />
  <!-- States -->
  <ms-input model-value="Disabled text" label="Disabled" placeholder="Not editable" disabled />
  <ms-input
    v-model="errorValue"
    label="Error"
    placeholder="Enter"
    status="error"
    tips="Error message"
    clearable
  />
</template>

<script setup lang="uts">
const baseValue = ref('')

const clearValue = ref('Clearable')

const errorValue = ref('')

const searchValue = ref('')
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| label | `string` | `''` | Label text |
| placeholder | `string` | `''` | Placeholder |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | Input type: text / number (integers) / digit (numbers with a decimal point) / password |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Input align: left / center / right |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Status: default / success / warning / error |
| tips | `string` | `''` | Hint text below the field |
| prefixIcon | `string` | `''` | Prefix icon name |
| suffixIcon | `string` | `''` | Suffix icon name |
| clearable | `boolean` | `false` | Whether to show the clear button |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Maximum input length; `-1` for no limit |
| showCount | `boolean` | `false` | Whether to show the character count; requires `maxlength` |
| bordered | `boolean` | `true` | Whether to show bottom border |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the content changes; used by `v-model` |
| input | `value: string` | Fires on input; `value` is the current content |
| focus | `e: UniInputFocusEvent` | Fires when the input gains focus |
| blur | `e: UniInputBlurEvent` | Fires when the input loses focus |
| clear | — | Fires when the clear button is tapped |
| confirm | `value: string` | Fires when the keyboard's done key is tapped; `value` is the current content |

## Slots

| Slot | Description |
| --- | --- |
| label | Custom label |
| prefix | Custom content before the input; the prefix icon by default |
| suffix | Custom content after the input; the suffix icon by default |
| tips | Custom hint area; `tips` and the character count by default |
