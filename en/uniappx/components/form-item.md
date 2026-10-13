---
title: Form Item
demo: pages/demo/form/form
---

# Form Item

`ms-form-item` — Form Item for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-form-item` (repository not yet public).
Demo route: `#/pages/demo/form/form`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/form.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-form label-align="right" :label-width="72">
    <ms-form-item label="用户名" name="name" :value="hName">
      <ms-input v-model="hName" placeholder="请输入用户名" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="密码" name="password" :value="hPassword" :bordered="false">
      <ms-input
        v-model="hPassword"
        type="password"
        placeholder="请输入密码"
        :bordered="false"
      />
    </ms-form-item>
  </ms-form>
  <ms-form label-align="top">
    <ms-form-item label="昵称" name="nick" :value="vNick" :bordered="false">
      <ms-input v-model="vNick" placeholder="请输入昵称" />
    </ms-form-item>
  </ms-form>
  <!-- 组件状态 -->
  <ms-form label-align="left" :label-width="72" colon>
    <ms-form-item label="必填" name="req" :value="sReq" required help="必填项带红色星号">
      <ms-input v-model="sReq" placeholder="请输入内容" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="说明" name="help" :value="sHelp" help="下方为辅助说明文案">
      <ms-input v-model="sHelp" placeholder="可不填" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="箭头" name="arrow" :value="sArrow" arrow :bordered="false">
      <ms-input v-model="sArrow" placeholder="点选类字段" readonly :bordered="false" />
    </ms-form-item>
  </ms-form>
</template>

<script setup lang="uts">
const hName = ref('mugsun')
const hPassword = ref('')
const vNick = ref('')
const sReq = ref('')
const sHelp = ref('')
const sArrow = ref('')
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `''` | Label text |
| name | `string` | `''` | Name / field name |
| value | `string` | `''` | Value under validation (host passes form data in) |
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
