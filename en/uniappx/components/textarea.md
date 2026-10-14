---
title: Textarea
demo: pages/demo/form/textarea
---

# Textarea

`ms-textarea` is a multi-line input with a label, autosize, a character count, status and confirm-button type.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-textarea`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/textarea`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/textarea.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| label | `string` | `''` | Label text |
| placeholder | `string` | `''` | Placeholder |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Status: default / success / warning / error |
| tips | `string` | `''` | Tip text |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Max input length; -1 = unlimited |
| indicator | `boolean` | `false` | Whether to show character count |
| autoHeight | `boolean` | `false` | Whether height grows with content |
| maxHeight | `number` | `0` | Max height (px) when autoHeight; 0 = no limit |
| height | `'sm' \| 'md' \| 'lg'` | `'md'` | Fixed height (px); minimum when autoHeight |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| bordered | `boolean` | `true` | Whether to show border |
| confirmType | `'return' \| 'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'return'` | Keyboard confirm-key type |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | Input |
| focus | Focus |
| blur | Blur |
| confirm | Confirm |
| linechange | linechange |

## Slots

| Slot | Description |
| --- | --- |
| label | `label` slot |
| tips | `tips` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-textarea/`
- Demo: `#/pages/demo/form/textarea`
- Chinese docs: [/uniappx/components/textarea](/uniappx/components/textarea)
