---
title: Code Input
demo: pages/demo/form/code-input
---

# Code Input

`ms-code-input` — Code Input for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-code-input`).
Demo route: `#/pages/demo/form/code-input`.

## Basic usage

```vue
<template>
  <ms-code-input v-model="value">
    …
  </ms-code-input>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| length | `number` | `4` | Digit count |
| skin | `'outline' \| 'fill'` | `'outline'` | Appearance: outline / fill |
| placeShape | `'none' \| 'line' \| 'dot'` | `'dot'` | Empty-slot placeholder: none / line / dot |
| password | `boolean` | `false` | Whether password input |
| disabled | `boolean` | `false` | Whether disabled |
| autoFocus | `boolean` | `false` | Whether to auto-focus |

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
