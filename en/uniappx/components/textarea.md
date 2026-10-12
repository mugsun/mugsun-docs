---
title: Textarea
demo: pages/demo/form/textarea
---

# Textarea

`ms-textarea` — Textarea for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-textarea`).
Demo route: `#/pages/demo/form/textarea`.

## Basic usage

```vue
<template>
  <ms-textarea label="…" v-model="value">
    …
  </ms-textarea>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| label | `string` | `''` | Label text |
| placeholder | `string` | `''` | Placeholder |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Status |
| tips | `string` | `''` | Tip text |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Max input length; -1 = unlimited |
| indicator | `boolean` | `false` | Whether to show indicator |
| autoHeight | `boolean` | `false` | Whether height grows with content |
| maxHeight | `number` | `0` | Max height (px) when autoHeight; 0 = no limit |
| height | `'sm' \| 'md' \| 'lg'` | `'md'` | Height (px) |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Alignment |
| bordered | `boolean` | `true` | Whether bordered |
| confirmType | `'return' \| 'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'return'` | Keyboard confirm type |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | Input |
| focus | Focus |
| blur | Blur |
| confirm | Confirm |
| linechange | linechange |

## Slots

| Slot | Description |
| --- | --- |
| label | `label` slot |
| tips | `tips` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-textarea/`
- Demo: `#/pages/demo/form/textarea`
- Chinese docs: [/uniappx/components/textarea](/uniappx/components/textarea)
