---
title: Code Input
demo: pages/demo/form/code-input
---

# Code Input

`ms-code-input` is a verification-code input. Tapping any cell opens the keyboard; once every cell is filled it fires `complete` and dismisses the keyboard.

The cell skin, placeholder shape and password masking are configurable.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-code-input v-model="vOutline" />
  <ms-code-input v-model="vFill" skin="fill" />
  <!-- States -->
  <ms-code-input v-model="vLine" place-shape="line" />
  <ms-code-input v-model="vPassword" password />
  <ms-code-input model-value="12" disabled />
  <!-- Length -->
  <ms-code-input v-model="vFour" @complete="onComplete" />
  <ms-code-input v-model="vSix" :length="6" skin="fill" @complete="onComplete" />
  <!-- Advanced -->
  <ms-code-input v-model="vDot" place-shape="dot" />
  <ms-code-input v-model="vAuto" auto-focus />
  <ms-code-input ref="ctrlCode" v-model="vCtrl" :auto-focus="false" />
</template>

<script setup lang="uts">
const vAuto = ref('')

const vCtrl = ref('')

const vDot = ref('')

const vFill = ref('34')

const vFour = ref('')

const vLine = ref('5')

const vOutline = ref('12')

const vPassword = ref('678')

const vSix = ref('12345')

function onComplete(value: string) : void {
  console.log('onComplete')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| length | `number` | `4` | Number of digits |
| skin | `'outline' \| 'fill'` | `'outline'` | Appearance: outline / fill |
| placeShape | `'none' \| 'line' \| 'dot'` | `'dot'` | Empty-slot placeholder: none / line / dot |
| password | `boolean` | `false` | Whether password input |
| disabled | `boolean` | `false` | Whether disabled |
| autoFocus | `boolean` | `false` | Whether to auto-focus |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the value changes; used by `v-model` |
| change | `value: string` | Fires when the value changes |
| complete | `value: string` | Fires when every cell is filled |
| click | `value: string` | Fires when the input is tapped; `value` is what has been entered so far. Not fired while disabled |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `focus()` | Focuses the input and opens the keyboard; no effect while disabled |
| `blur()` | Removes focus and dismisses the keyboard |
| `clear()` | Clears the entered value; no effect while disabled |
