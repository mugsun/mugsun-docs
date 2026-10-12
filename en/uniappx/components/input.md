---
title: Input
demo: pages/demo/form/input
---

# Input

单行输入。`v-model` + `label` / `placeholder` / `prefixIcon` / `clearable` / `type="password"` / `status` / `tips` / `align` / `disabled`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-input`).
Demo route: `#/pages/demo/form/input`.

## Basic usage

```vue
<template>
  <ms-input label="…" v-model="value">
    …
  </ms-input>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| label | `string` | `''` | — |
| placeholder | `string` | `''` | — |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | — |
| align | `'left' \| 'center' \| 'right'` | `'left'` | — |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | — |
| tips | `string` | `''` | — |
| prefixIcon | `string` | `''` | — |
| suffixIcon | `string` | `''` | — |
| clearable | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| readonly | `boolean` | `false` | — |
| maxlength | `number` | `-1` | — |
| showCount | `boolean` | `false` | 显示字数统计（需 maxlength ≥ 0） |
| bordered | `boolean` | `true` | — |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | input |
| focus | focus |
| blur | blur |
| clear | clear |
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
