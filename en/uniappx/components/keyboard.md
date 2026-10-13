---
title: Keyboard
demo: pages/demo/form/keyboard
---

# Keyboard

`ms-keyboard` — Keyboard for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-keyboard`).
Demo route: `#/pages/demo/form/keyboard`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/keyboard.uvue`; see them running in the phone frame.

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
const numberVisible = ref(false)
const numberValue = ref('')
const intVisible = ref(false)
const intValue = ref('')
const passwordVisible = ref(false)
const passwordValue = ref('')
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
