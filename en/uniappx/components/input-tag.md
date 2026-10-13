---
title: Input Tag
demo: pages/demo/form/input-tag
---

# Input Tag

`ms-input-tag` — Input Tag for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-input-tag` (repository not yet public).
Demo route: `#/pages/demo/form/input-tag`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/input-tag.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-input-tag
    v-model="outsideTags"
    placeholder="输入后回车添加"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="insideTags"
    position="inside"
    placeholder="继续输入"
    @add="onAdd"
    @remove="onRemove"
  />
  <!-- 组件样式 -->
  <ms-input-tag
    v-model="limitTags"
    :max-count="3"
    placeholder="最多 3 个"
    @add="onAdd"
    @exceed="onExceed"
  />
  <ms-input-tag
    v-model="disabledTags"
    disabled
    placeholder="已禁用"
  />
  <!-- 组件深度 -->
  <ms-input-tag
    v-model="buttonTags"
    button-text="加入"
    placeholder="输入后点加入"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="noBtnTags"
    :show-button="false"
    placeholder="仅回车添加"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="confirmTags"
    confirm-type="go"
    placeholder="键盘确认键为 go"
    @add="onAdd"
    @remove="onRemove"
  />
</template>

<script setup lang="uts">
const outsideTags = ref(['产品', '设计'] as string[])
const insideTags = ref(['前端', '后端', '测试'] as string[])
const limitTags = ref(['已选一'] as string[])
const disabledTags = ref(['只读标签'] as string[])
const buttonTags = ref(['标签'] as string[])
const noBtnTags = ref([] as string[])
const confirmTags = ref([] as string[])
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | Bound value (v-model) |
| placeholder | `string` | `'输入后回车添加'` | Placeholder |
| position | `string` | `'outside'` | Position |
| showButton | `boolean` | `true` | Whether to show add button |
| buttonText | `string` | `'添加'` | Button label |
| maxCount | `number` | `-1` | Max count |
| disabled | `boolean` | `false` | Whether disabled |
| confirmType | `string` | `'done'` | Keyboard confirm-key type |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| add | Item added |
| remove | Item removed |
| exceed | exceed |

## See also

- Component: `uni_modules/ms-ui/components/ms-input-tag/`
- Demo: `#/pages/demo/form/input-tag`
- Chinese docs: [/uniappx/components/input-tag](/uniappx/components/input-tag)
