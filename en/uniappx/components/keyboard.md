---
title: Keyboard
demo: pages/demo/form/keyboard
---

# Keyboard

`ms-keyboard` is a custom keyboard that slides up from the bottom. `type` switches between the number, password, ID card and license plate layouts.

Bind the input with `v-model` and the visibility with `v-model:visible`.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| visible | `boolean` | `false` | Whether visible |
| type | `string` | `'number'` | Keyboard type: number / password / idcard (ID card) / car (license plate) |
| title | `string` | `'安全键盘'` | Title; the default is Chinese for "Secure keyboard" |
| maxLen | `number` | `0` | Maximum input length; with `0`, ID cards take 18 characters, license plates 8, and other types have no limit |
| max | `number` | `0` | Largest value the number keyboard accepts; `0` for no limit |
| digit | `boolean` | `true` | Whether the number keyboard has the decimal point and `00` keys |
| hold | `boolean` | `false` | Whether the keyboard stays open after confirm |
| confirmText | `string` | `'确认'` | Confirm button label; the default is Chinese for "Confirm" |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the input changes; used by `v-model` |
| update:visible | `value: boolean` | Fires when the keyboard opens or closes; used by `v-model:visible` |
| change | `value: string` | Fires when the input changes |
| confirm | `value: string, pass?: boolean` | Fires when confirm is tapped. With `type` set to `idcard` there is a second argument `pass`, telling whether the ID number is valid |
| cancel | `value: string` | Fires when the close button is tapped; `value` is the current input |
| close | — | Fires when the keyboard closes |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `open()` | Opens the keyboard; requires `v-model:visible` |
| `close()` | Closes the keyboard; requires `v-model:visible` |
| `clear()` | Clears the input |
