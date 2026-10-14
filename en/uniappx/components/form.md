---
title: Form
demo: pages/demo/form/form
---

# Form

`ms-form` is a form container. It passes `labelAlign` (`left/right/top`), `labelWidth`, `colon`, `showErrorMessage` and `disabled` down to its `ms-form-item` fields.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-form`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/form`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/form.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-form label-align="right" :label-width="72">
    <ms-form-item label="Username" name="name" :value="hName">
      <ms-input v-model="hName" placeholder="Enter username" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="Password" name="password" :value="hPassword" :bordered="false">
      <ms-input
        v-model="hPassword"
        type="password"
        placeholder="Enter password"
        :bordered="false"
      />
    </ms-form-item>
  </ms-form>
  <ms-form label-align="top">
    <ms-form-item label="Nickname" name="nick" :value="vNick" :bordered="false">
      <ms-input v-model="vNick" placeholder="Enter nickname" />
    </ms-form-item>
  </ms-form>
  <!-- States -->
  <ms-form label-align="left" :label-width="72" colon>
    <ms-form-item label="Required" name="req" :value="sReq" required help="Required fields show a red asterisk">
      <ms-input v-model="sReq" placeholder="Enter content" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="Help" name="help" :value="sHelp" help="Helper text appears below">
      <ms-input v-model="sHelp" placeholder="Optional" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="Arrow" name="arrow" :value="sArrow" arrow :bordered="false">
      <ms-input v-model="sArrow" placeholder="Tap to select" readonly :bordered="false" />
    </ms-form-item>
  </ms-form>
</template>

<script setup lang="uts">
const hName = ref('mugsun')

const hPassword = ref('')

const sArrow = ref('')

const sHelp = ref('')

const sReq = ref('')

const vNick = ref('')
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| labelAlign | `'left' \| 'right' \| 'top'` | `'right'` | Label alignment |
| labelWidth | `number` | `81` | Label width (px) |
| colon | `boolean` | `false` | Whether to show a colon after the label |
| showErrorMessage | `boolean` | `true` | Whether to show validation errors |
| disabled | `boolean` | `false` | Whether disabled |
| validateTick | `number` | `0` | Increment to run a full validate (avoids holding a component ref) |
| resetTick | `number` | `0` | Increment to clear all field errors |

## Events

| Event | Description |
| --- | --- |
| validate | Validation finished |
| submit | Submit |
| error | Error |
| reset | Reset |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-form/`
- Demo: `#/pages/demo/form/form`
- Chinese docs: [/uniappx/components/form](/uniappx/components/form)
