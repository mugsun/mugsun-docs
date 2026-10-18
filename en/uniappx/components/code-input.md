---
title: Code Input
demo: pages/demo/form/code-input
---

# Code Input

`ms-code-input` is a verification-code input. A transparent `input` covers the row of cells and opens the keyboard when tapped. It supports `skin`, `placeShape`, `password` and `autoFocus`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-code-input`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/form/code-input`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/code-input.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| length | `number` | `4` | Digit count |
| skin | `'outline' \| 'fill'` | `'outline'` | Appearance: outline / fill |
| placeShape | `'none' \| 'line' \| 'dot'` | `'dot'` | Empty-slot placeholder: none / line / dot |
| password | `boolean` | `false` | Whether password input |
| disabled | `boolean` | `false` | Whether disabled |
| autoFocus | `boolean` | `false` | Whether to auto-focus |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| complete | complete |
| click | Click |

## See also

- Component: `uni_modules/ms-ui/components/ms-code-input/`
- Demo: `#/pages/demo/form/code-input`
- Chinese docs: [/uniappx/components/code-input](/uniappx/components/code-input)
