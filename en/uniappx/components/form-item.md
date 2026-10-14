---
title: Form Item
demo: pages/demo/form/form
---

# Form Item

`ms-form-item` is a form field with a label, a content slot, help text and an error message. It can show a required asterisk and a right arrow.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-form-item`. ms-ui is a commercial edition and its source is not public.
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
| label | `string` | `''` | Label text |
| name | `string` | `''` | Name / field name |
| value | `string` | `''` | Value under validation (passed in by the parent page) |
| required | `boolean` | `false` | Whether required |
| requiredMark | `boolean` | `true` | Whether to show a red asterisk when required |
| rule | `'none' \| 'phone' \| 'email' \| 'number'` | `'none'` | Built-in validation: none / phone / email / number |
| min | `number` | `-1` | Minimum |
| max | `number` | `-1` | Maximum |
| message | `string` | `''` | Validation failure message |
| help | `string` | `''` | Help text |
| arrow | `boolean` | `false` | Whether to show a right arrow |
| labelAlign | `'left' \| 'right' \| 'top' \| ''` | `''` | Label alignment |
| labelWidth | `number` | `-1` | Label width (px) |
| bordered | `boolean` | `true` | Whether to show border |

## Events

| Event | Description |
| --- | --- |
| validate | Validation finished |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-form-item/`
- Demo: `#/pages/demo/form/form`
- Chinese docs: [/uniappx/components/form-item](/uniappx/components/form-item)
