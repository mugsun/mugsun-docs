---
title: Switch
demo: pages/demo/form/switch
---

# Switch

`ms-switch` — Switch for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-switch`).
Demo route: `#/pages/demo/form/switch`.

## Basic usage

```vue
<template>
  <ms-switch size="sm" label="…">
    …
  </ms-switch>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Bound value (v-model) |
| disabled | `boolean` | `false` | Whether disabled |
| loading | `boolean` | `false` | Whether loading |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size: sm / md / lg |
| label | `string[]` | `[]` | Labels on both sides of the switch [off, on]; empty hides them |
| activeIcon | `string` | `''` | On-state icon |
| voidIcon | `string` | `''` | Closed-state icon |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-switch/`
- Demo: `#/pages/demo/form/switch`
- Chinese docs: [/uniappx/components/switch](/uniappx/components/switch)
