---
title: Code Input
demo: pages/demo/form/code-input
---

# Code Input

`ms-code-input` — Code Input for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-code-input`).
Demo route: `#/pages/demo/form/code-input`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/code-input.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-code-input v-model="vOutline" />
  <ms-code-input v-model="vFill" skin="fill" />
  <!-- 组件状态 -->
  <ms-code-input v-model="vLine" place-shape="line" />
  <ms-code-input v-model="vPassword" password />
  <ms-code-input model-value="12" disabled />
  <!-- 组件长度 -->
  <ms-code-input v-model="vFour" @complete="onComplete" />
  <ms-code-input v-model="vSix" :length="6" skin="fill" @complete="onComplete" />
  <!-- 组件深度 -->
  <ms-code-input v-model="vDot" place-shape="dot" />
  <ms-code-input v-model="vAuto" auto-focus />
  <ms-code-input ref="ctrlCode" v-model="vCtrl" :auto-focus="false" />
</template>

<script setup lang="uts">
const vOutline = ref('12')
const vFill = ref('34')
const vLine = ref('5')
const vPassword = ref('678')
const vFour = ref('')
const vSix = ref('12345')
const vDot = ref('')
const vAuto = ref('')
const vCtrl = ref('')
const ctrlCode = ref(null)
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
