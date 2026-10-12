---
title: Input
demo: pages/demo/form/input
---

# Input

`ms-input` — Input for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-input`).
Demo route: `#/pages/demo/form/input`.

## Basic usage

```vue
<template>
  <ms-input label="…" v-model="value">
    …
  </ms-input>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| label | `string` | `''` | Label text |
| placeholder | `string` | `''` | Placeholder |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | Type |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Alignment |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Status |
| tips | `string` | `''` | Tip text |
| prefixIcon | `string` | `''` | Prefix icon |
| suffixIcon | `string` | `''` | Suffix icon |
| clearable | `boolean` | `false` | Whether clearable |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Max input length; -1 = unlimited |
| showCount | `boolean` | `false` | Show character count (requires maxlength ≥ 0) |
| bordered | `boolean` | `true` | Whether bordered |

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
