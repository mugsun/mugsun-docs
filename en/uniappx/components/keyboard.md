---
title: Keyboard
demo: pages/demo/form/keyboard
---

# Keyboard

自定义键盘：`type` 为 `number` / `password` / `idcard` / `car`，底部 `ms-popup` 弹出。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-keyboard`).
Demo route: `#/pages/demo/form/keyboard`.

## Basic usage

```vue
<template>
  <ms-keyboard title="…" v-model="value">
    …
  </ms-keyboard>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| visible | `boolean` | `false` | — |
| type | `string` | `'number'` | number / password / idcard / car |
| title | `string` | `'安全键盘'` | — |
| maxLen | `number` | `0` | — |
| max | `number` | `0` | — |
| digit | `boolean` | `true` | — |
| hold | `boolean` | `false` | — |
| confirmText | `string` | `'确认'` | — |

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
