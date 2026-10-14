---
title: Keyboard
demo: pages/demo/form/keyboard
---

# Keyboard

`ms-keyboard` is a custom keyboard. `type` is `number`, `password`, `idcard` or `car`, and it opens from the bottom in an `ms-popup`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-keyboard`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/keyboard`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/keyboard.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <ms-keyboard
    v-model="numberValue"
    v-model:visible="numberVisible"
    type="number"
    :max="100"
    :max-len="6"
    @confirm="onNumberConfirm"
  />
  <ms-keyboard
    v-model="intValue"
    v-model:visible="intVisible"
    type="number"
    :digit="false"
    :max-len="8"
    @confirm="onIntConfirm"
  />
  <ms-keyboard
    v-model="passwordValue"
    v-model:visible="passwordVisible"
    type="password"
    :max-len="12"
    @confirm="onPasswordConfirm"
  />
</template>

<script setup lang="uts">
const intValue = ref('')

const intVisible = ref(false)

const numberValue = ref('')

const numberVisible = ref(false)

const passwordValue = ref('')

const passwordVisible = ref(false)

function onNumberConfirm(value: string) : void {
  console.log('onNumberConfirm')
}

function onIntConfirm(value: string) : void {
  console.log('onIntConfirm')
}

function onPasswordConfirm(value: string) : void {
  console.log('onPasswordConfirm')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| visible | `boolean` | `false` | Whether visible |
| type | `string` | `'number'` | number / password / idcard / car |
| title | `string` | `'安全键盘'` | Title |
| maxLen | `number` | `0` | Max input length; 0 uses built-in limit for mode |
| max | `number` | `0` | Maximum |
| digit | `boolean` | `true` | Digit / decimal-related |
| hold | `boolean` | `false` | Whether long-press is supported |
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
