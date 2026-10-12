---
title: Input Tag
demo: pages/demo/form/input-tag
---

# Input Tag

`ms-input-tag`: Input Tag. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-input-tag`).
Demo route: `#/pages/demo/form/input-tag`.

## Basic usage

```vue
<template>
  <ms-input-tag v-model="value" :disabled="true">
    …
  </ms-input-tag>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | — |
| placeholder | `string` | `'输入后回车添加'` | — |
| position | `string` | `'outside'` | — |
| showButton | `boolean` | `true` | — |
| buttonText | `string` | `'添加'` | — |
| maxCount | `number` | `-1` | — |
| disabled | `boolean` | `false` | — |
| confirmType | `string` | `'done'` | — |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| add | Item added |
| remove | Item removed |
| exceed | exceed |

## See also

- Component: `uni_modules/ms-ui/components/ms-input-tag/`
- Demo: `#/pages/demo/form/input-tag`
- Chinese docs: [/uniappx/components/input-tag](/uniappx/components/input-tag)
