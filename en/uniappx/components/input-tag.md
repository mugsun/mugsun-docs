---
title: Input Tag
demo: pages/demo/form/input-tag
---

# Input Tag

`ms-input-tag` — Input Tag for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-input-tag`).
Demo route: `#/pages/demo/form/input-tag`.

## Basic usage

```vue
<template>
  <ms-input-tag v-model="value">
    …
  </ms-input-tag>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | Bound value (v-model) |
| placeholder | `string` | `'输入后回车添加'` | Placeholder |
| position | `string` | `'outside'` | Position |
| showButton | `boolean` | `true` | Whether to show add button |
| buttonText | `string` | `'添加'` | Button label |
| maxCount | `number` | `-1` | Max count |
| disabled | `boolean` | `false` | Whether disabled |
| confirmType | `string` | `'done'` | Keyboard confirm-key type |

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
