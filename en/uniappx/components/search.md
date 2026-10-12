---
title: Search
demo: pages/demo/form/search
---

# Search

`ms-search` — Search for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-search`).
Demo route: `#/pages/demo/form/search`.

## Basic usage

```vue
<template>
  <ms-search v-model="value">
    …
  </ms-search>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
