---
title: Search
demo: pages/demo/form/search
---

# Search

搜索栏：shape / action / leftIcon；expose focus/blur/clear。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-search`).
Demo route: `#/pages/demo/form/search`.

## Basic usage

```vue
<template>
  <ms-search v-model="value" :disabled="true">
    …
  </ms-search>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| placeholder | `string` | `''` | — |
| shape | `'square' \| 'round'` | `'square'` | — |
| action | `string` | `''` | — |
| center | `boolean` | `false` | — |
| clearable | `boolean` | `true` | — |
| disabled | `boolean` | `false` | — |
| readonly | `boolean` | `false` | — |
| maxlength | `number` | `-1` | — |
| leftIcon | `string` | `'search'` | — |
| confirmType | `'return' \| 'search' \| 'send' \| 'next' \| 'go' \| 'done'` | `'search'` | — |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | input |
| focus | focus |
| blur | blur |
| clear | clear |
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
