---
title: Segmented
demo: pages/demo/nav/segmented
---

# Segmented

`ms-segmented` — Segmented for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-segmented`).
Demo route: `#/pages/demo/nav/segmented`.

## Basic usage

```vue
<template>
  <ms-segmented size="sm">
    …
  </ms-segmented>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| options | `UTSJSONObject[]` | `[]` | Each item: label / icon / disabled |
| block | `boolean` | `false` | Fill parent width and equalize items |
| disabled | `boolean` | `false` | Disable the whole group |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Height step |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-segmented/`
- Demo: `#/pages/demo/nav/segmented`
- Chinese docs: [/uniappx/components/segmented](/uniappx/components/segmented)
