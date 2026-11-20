---
title: Form Item
demo: pages/demo/form/form
---

# Form Item

`ms-form-item` is a form field used inside [`ms-form`](./form), made of a label, the input control, help text and an error message.

Pass the current value through `value` to take part in validation, which covers required fields, built-in format rules and length limits.

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
| label | `string` | `''` | Label text |
| name | `string` | `''` | Field name |
| value | `string` | `''` | Value under validation (passed in by the parent page) |
| required | `boolean` | `false` | Whether required |
| requiredMark | `boolean` | `true` | Whether to show a red asterisk when required |
| rule | `'none' \| 'phone' \| 'email' \| 'number'` | `'none'` | Built-in validation: none / phone / email / number |
| min | `number` | `-1` | Minimum number of characters; `-1` for no limit |
| max | `number` | `-1` | Maximum number of characters; `-1` for no limit |
| message | `string` | `''` | Text shown when validation fails; empty uses the default text |
| help | `string` | `''` | Help text |
| arrow | `boolean` | `false` | Whether to show a right arrow |
| labelAlign | `'left' \| 'right' \| 'top' \| ''` | `''` | Label alignment; empty follows `ms-form` |
| labelWidth | `number` | `-1` | Label width (px); `-1` follows `ms-form` |
| bordered | `boolean` | `true` | Whether to show border |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| validate | `message: string` | Fires after this field is validated; `message` is the error text, and an empty string means it passed |

## Slots

| Slot | Description |
| --- | --- |
| default | The input control |
