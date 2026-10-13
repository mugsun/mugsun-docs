---
title: Form
demo: pages/demo/form/form
---

# Form

`ms-form` — Form for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-form` (repository not yet public).
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
