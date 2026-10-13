---
title: Search
demo: pages/demo/form/search
---

# Search

`ms-search` — Search for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-search` (repository not yet public).
Demo route: `#/pages/demo/form/search`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/search.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-search v-model="baseValue" placeholder="搜索预设文案" />
  <ms-search
    v-model="limitValue"
    placeholder="最多输入 10 个字符"
    :maxlength="10"
  />
  <ms-search
    v-model="actionValue"
    placeholder="输入后点右侧搜索"
    action="搜索"
    @action="onSearchAction"
  />
  <!-- 组件样式 -->
  <ms-search v-model="squareValue" placeholder="方形搜索框" shape="square" />
  <ms-search v-model="roundValue" placeholder="圆形搜索框" shape="round" />
  <!-- 组件状态 -->
  <ms-search v-model="centerValue" placeholder="居中占位" shape="round" center />
  <ms-search model-value="" placeholder="禁用状态" disabled />
  <!-- 组件深度 -->
  <ms-search model-value="只读关键字" readonly shape="round" />
  <ms-search v-model="noClearValue" placeholder="无清空按钮" :clearable="false" />
  <ms-search v-model="filterValue" placeholder="筛选关键字" left-icon="filter" />
</template>

<script setup lang="uts">
const actionValue = ref('关键词')

const baseValue = ref('')

const centerValue = ref('')

const filterValue = ref('')

const limitValue = ref('')

const noClearValue = ref('保留')

const roundValue = ref('')

const squareValue = ref('')

function onSearchAction() : void {
  console.log('onSearchAction')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| placeholder | `string` | `''` | Placeholder |
| shape | `'square' \| 'round'` | `'square'` | Shape: square / round |
| action | `string` | `''` | Right action label; empty hides it |
| center | `boolean` | `false` | Whether content is centered when unfocused |
| clearable | `boolean` | `true` | Whether clearable |
| disabled | `boolean` | `false` | Whether disabled |
| readonly | `boolean` | `false` | Whether read-only |
| maxlength | `number` | `-1` | Max input length; -1 = unlimited |
| leftIcon | `string` | `'search'` | Left icon name |
| confirmType | `'return' \| 'search' \| 'send' \| 'next' \| 'go' \| 'done'` | `'search'` | Keyboard confirm-key type |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| input | Input |
| focus | Focus |
| blur | Blur |
| clear | Clear |
| confirm | Confirm |
| action | Action button |

## Slots

| Slot | Description |
| --- | --- |
| action | `action` slot |
| left | `left` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-search/`
- Demo: `#/pages/demo/form/search`
- Chinese docs: [/uniappx/components/search](/uniappx/components/search)
