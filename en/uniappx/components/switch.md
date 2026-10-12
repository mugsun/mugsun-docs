---
title: Switch
demo: pages/demo/form/switch
---

# Switch

`ms-switch`: Switch. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-switch`).
Demo route: `#/pages/demo/form/switch`.

## Basic usage

```vue
<template>
  <ms-switch size="sm" label="…">
    …
  </ms-switch>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| loading | `boolean` | `false` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| label | `string[]` | `[]` | — |
| activeIcon | `string` | `''` | — |
| voidIcon | `string` | `''` | — |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-switch/`
- Demo: `#/pages/demo/form/switch`
- Chinese docs: [/uniappx/components/switch](/uniappx/components/switch)
