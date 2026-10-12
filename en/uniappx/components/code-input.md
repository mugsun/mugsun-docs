---
title: Code Input
demo: pages/demo/form/code-input
---

# Code Input

验证码格：透明 `input` 盖住整排格子拉键盘；`skin` / `placeShape` / `password` / `autoFocus`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-code-input`).
Demo route: `#/pages/demo/form/code-input`.

## Basic usage

```vue
<template>
  <ms-code-input v-model="value" :disabled="true">
    …
  </ms-code-input>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| length | `number` | `4` | — |
| skin | `'outline' \| 'fill'` | `'outline'` | — |
| placeShape | `'none' \| 'line' \| 'dot'` | `'dot'` | — |
| password | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| autoFocus | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| complete | complete |
| click | Click |

## See also

- Component: `uni_modules/ms-ui/components/ms-code-input/`
- Demo: `#/pages/demo/form/code-input`
- Chinese docs: [/uniappx/components/code-input](/uniappx/components/code-input)
