---
title: Keyboard
demo: pages/demo/form/keyboard
---

# Keyboard

`ms-keyboard` — Keyboard for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-keyboard`).
Demo route: `#/pages/demo/form/keyboard`.

## Basic usage

```vue
<template>
  <ms-keyboard title="…" v-model="value">
    …
  </ms-keyboard>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| visible | `boolean` | `false` | Whether visible |
| type | `string` | `'number'` | number / password / idcard / car |
| title | `string` | `'安全键盘'` | Title |
| maxLen | `number` | `0` | maxLen number |
| max | `number` | `0` | Maximum / upper limit |
| digit | `boolean` | `true` | Digit / decimal-related |
| hold | `boolean` | `false` | Whether hold is enabled |
| confirmText | `string` | `'确认'` | Confirm button label |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| update:visible | v-model:visible update |
| change | Value changed |
| confirm | Confirm |
| cancel | Cancel |
| close | Closed |

## See also

- Component: `uni_modules/ms-ui/components/ms-keyboard/`
- Demo: `#/pages/demo/form/keyboard`
- Chinese docs: [/uniappx/components/keyboard](/uniappx/components/keyboard)
