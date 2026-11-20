---
title: Form
demo: pages/demo/form/form
---

# Form

`ms-form` is a form container that sets label alignment, label width and the disabled state for the [`ms-form-item`](./form-item) fields inside it.

Validation needs no method call: increment `validateTick` to validate every field, and increment `resetTick` to clear the errors.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| labelAlign | `'left' \| 'right' \| 'top'` | `'right'` | Label alignment |
| labelWidth | `number` | `81` | Label width (px) |
| colon | `boolean` | `false` | Whether to show a colon after the label |
| showErrorMessage | `boolean` | `true` | Whether to show validation error messages |
| disabled | `boolean` | `false` | Whether to disable the whole form |
| validateTick | `number` | `0` | Each increment validates every field once |
| resetTick | `number` | `0` | Each increment clears all error messages |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| validate | `valid: boolean` | Fires after each validation; `valid` tells whether every field passed |
| submit | `valid: boolean` | Fires when every field passes validation |
| error | `message: string` | Fires when validation fails; `message` is the first error, made of the field name, a full-width colon and the error text |
| reset | `ok: boolean` | Fires with `true` after `resetTick` changes and the errors are cleared |

## Slots

| Slot | Description |
| --- | --- |
| default | Place `ms-form-item` fields here |
