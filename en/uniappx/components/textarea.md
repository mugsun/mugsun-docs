---
title: Textarea
demo: pages/demo/form/textarea
---

# Textarea

`ms-textarea`: Textarea. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-textarea`).
Demo route: `#/pages/demo/form/textarea`.

## Basic usage

```vue
<template>
  <ms-textarea label="…" v-model="value">
    …
  </ms-textarea>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| label | `string` | `''` | — |
| placeholder | `string` | `''` | — |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | — |
| tips | `string` | `''` | — |
| disabled | `boolean` | `false` | — |
| readonly | `boolean` | `false` | — |
| maxlength | `number` | `-1` | — |
| indicator | `boolean` | `false` | — |
| autoHeight | `boolean` | `false` | — |
| maxHeight | `number` | `0` | autoHeight 时最大高度 px；0 不限制（对标 peer autosize.maxHeight） |
| height | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| align | `'left' \| 'center' \| 'right'` | `'left'` | — |
| bordered | `boolean` | `true` | — |
| confirmType | `'return' \| 'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'return'` | — |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | input |
| focus | focus |
| blur | blur |
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
