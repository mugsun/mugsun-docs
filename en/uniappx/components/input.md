---
title: Input
demo: pages/demo/form/input
---

# Input

`ms-input` — Input for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-input` (repository not yet public).
Demo route: `#/pages/demo/form/input`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/input.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 基础 -->
  <ms-input v-model="baseValue" label="标签文字" placeholder="请输入文字" />
  <!-- 前置图标 -->
  <ms-input v-model="searchValue" label="搜索" placeholder="请输入关键字" prefix-icon="search" />
  <!-- 可清空 -->
  <ms-input v-model="clearValue" label="可清空" placeholder="输入后点右侧清空" clearable />
  <!-- 状态 -->
  <ms-input model-value="禁用文案" label="禁用" placeholder="不可编辑" disabled />
  <ms-input
    v-model="errorValue"
    label="错误"
    placeholder="请输入"
    status="error"
    tips="错误提示"
    clearable
  />
</template>

<script setup lang="uts">
const baseValue = ref('')

const clearValue = ref('可清空')

const errorValue = ref('')

const searchValue = ref('')
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| label | `string` | `''` | Label text |
| placeholder | `string` | `''` | Placeholder |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | Input type: text / number / idcard / digit / password, etc. |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Input align: left / center / right |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Status: default / success / warning / error |
| tips | `string` | `''` | Bottom tip text |
| prefixIcon | `string` | `''` | Prefix icon name |
| suffixIcon | `string` | `''` | Suffix icon name |
| clearable | `boolean` | `false` | Whether clearable |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Max input length; -1 = unlimited |
| showCount | `boolean` | `false` | Show character count (requires maxlength ≥ 0) |
| bordered | `boolean` | `true` | Whether to show bottom border |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | Input |
| focus | Focus |
| blur | Blur |
| clear | Clear |
| confirm | Confirm |

## Slots

| Slot | Description |
| --- | --- |
| label | `label` slot |
| prefix | `prefix` slot |
| suffix | `suffix` slot |
| tips | `tips` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-input/`
- Demo: `#/pages/demo/form/input`
- Chinese docs: [/uniappx/components/input](/uniappx/components/input)
