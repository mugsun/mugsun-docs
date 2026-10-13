---
title: Textarea
demo: pages/demo/form/textarea
---

# Textarea

`ms-textarea` — Textarea for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-textarea` (repository not yet public).
Demo route: `#/pages/demo/form/textarea`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/textarea.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-textarea v-model="baseValue" placeholder="请输入文字" />
  <ms-textarea v-model="labelValue" label="标签文字" placeholder="请输入文字" />
  <ms-textarea
    v-model="autoValue"
    label="自动增高"
    placeholder="输入多行后高度跟随"
    auto-height
  />
  <!-- 组件状态 -->
  <ms-textarea
    model-value="不可编辑文字"
    label="禁用"
    placeholder="请输入文字"
    disabled
  />
  <!-- 组件样式 -->
  <ms-textarea
    v-model="borderValue"
    label="描边"
    placeholder="请输入文字"
    :maxlength="100"
    indicator
    bordered
  />
  <ms-textarea
    v-model="plainValue"
    label="无边框"
    placeholder="嵌入列表时去掉描边"
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
