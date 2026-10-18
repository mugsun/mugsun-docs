---
title: Input
demo: pages/demo/form/input
---

# Input

`ms-input` is a single-line input bound with `v-model`. It supports `label`, `placeholder`, `prefixIcon`, `clearable`, `type="password"`, `status`, `tips`, `align` and `disabled`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-input`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/form/input`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/input.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| label | `string` | `''` | Label text |
| placeholder | `string` | `''` | Placeholder |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | Input type: text / number / idcard / digit / password, etc. |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Input align: left / center / right |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Status: default / success / warning / error |
| tips | `string` | `''` | Bottom tip text |
| prefixIcon | `string` | `''` | Prefix icon name |
| suffixIcon | `string` | `''` | Suffix icon name |
| clearable | `boolean` | `false` | Whether clearable |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Max input length; -1 = unlimited |
| showCount | `boolean` | `false` | Show character count (requires maxlength ≥ 0) |
| bordered | `boolean` | `true` | Whether to show bottom border |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | Input |
| focus | Focus |
| blur | Blur |
| clear | Clear |
| confirm | Confirm |

## Slots

| Slot | Description |
| --- | --- |
| label | `label` slot |
| prefix | `prefix` slot |
| suffix | `suffix` slot |
| tips | `tips` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-input/`
- Demo: `#/pages/demo/form/input`
- Chinese docs: [/uniappx/components/input](/uniappx/components/input)
