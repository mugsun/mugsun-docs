---
title: Textarea
demo: pages/demo/form/textarea
---

# Textarea

`ms-textarea` is a multi-line input bound with `v-model`. It can show a label and a character count, and its height can grow with the content.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-textarea v-model="baseValue" placeholder="Enter text" />
  <ms-textarea v-model="labelValue" label="Label" placeholder="Enter text" />
  <ms-textarea
    v-model="autoValue"
    label="Auto height"
    placeholder="Height grows with multiple lines"
    auto-height
  />
  <!-- States -->
  <ms-textarea
    model-value="Read-only text"
    label="Disabled"
    placeholder="Enter text"
    disabled
  />
  <!-- Styles -->
  <ms-textarea
    v-model="borderValue"
    label="Outline"
    placeholder="Enter text"
    :maxlength="100"
    indicator
    bordered
  />
  <ms-textarea
    v-model="plainValue"
    label="Borderless"
    placeholder="Remove the border inside lists"
    :bordered="false"
    height="sm"
  />
</template>

<script setup lang="uts">
const autoValue = ref('')

const baseValue = ref('')

const borderValue = ref('')

const labelValue = ref('')

const plainValue = ref('')
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| label | `string` | `''` | Label text |
| placeholder | `string` | `''` | Placeholder |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Status: default / success / warning / error |
| tips | `string` | `''` | Hint text below the field |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Maximum input length; `-1` for no limit |
| indicator | `boolean` | `false` | Whether to show character count |
| autoHeight | `boolean` | `false` | Whether the height grows with the content |
| maxHeight | `number` | `0` | Maximum height with `autoHeight` (px); `0` for no limit |
| height | `'sm' \| 'md' \| 'lg'` | `'md'` | Height: sm / md / lg; the minimum height with `autoHeight` |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| bordered | `boolean` | `true` | Whether to show border |
| confirmType | `'return' \| 'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'return'` | Keyboard confirm-key type |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the content changes; used by `v-model` |
| input | `value: string` | Fires on input; `value` is the current content |
| focus | `e: UniTextareaFocusEvent` | Fires when the field gains focus |
| blur | `e: UniTextareaBlurEvent` | Fires when the field loses focus |
| confirm | `value: string` | Fires when the keyboard's confirm key is tapped; `value` is the current content |
| linechange | `e: UniTextareaLineChangeEvent` | Fires when the number of lines changes |

## Slots

| Slot | Description |
| --- | --- |
| label | Custom label |
| tips | Custom hint; `tips` by default |
