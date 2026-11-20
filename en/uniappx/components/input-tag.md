---
title: Input Tag
demo: pages/demo/form/input-tag
---

# Input Tag

`ms-input-tag` is a tag input. Press Enter or tap the button to add a tag; tap the close icon on a tag to remove it.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-input-tag
    v-model="outsideTags"
    placeholder="Press Enter to add"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="insideTags"
    position="inside"
    placeholder="Keep typing"
    @add="onAdd"
    @remove="onRemove"
  />
  <!-- Styles -->
  <ms-input-tag
    v-model="limitTags"
    :max-count="3"
    placeholder="Up to 3"
    @add="onAdd"
    @exceed="onExceed"
  />
  <ms-input-tag
    v-model="disabledTags"
    disabled
    placeholder="Disabled"
  />
  <!-- Advanced -->
  <ms-input-tag
    v-model="buttonTags"
    button-text="Add"
    placeholder="Type, then tap Add"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="noBtnTags"
    :show-button="false"
    placeholder="Enter only"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="confirmTags"
    confirm-type="go"
    placeholder="Keyboard confirm key: go"
    @add="onAdd"
    @remove="onRemove"
  />
</template>

<script setup lang="uts">
const buttonTags = ref(['Tag'] as string[])

const confirmTags = ref([] as string[])

const disabledTags = ref(['Read-only tag'] as string[])

const insideTags = ref(['Frontend', 'Backend', 'QA'] as string[])

const limitTags = ref(['Selected 1'] as string[])

const noBtnTags = ref([] as string[])

const outsideTags = ref(['Product', 'Design'] as string[])

function onAdd(tag: string) : void {
  console.log('onAdd')
}

function onRemove(tag: string, index: number) : void {
  console.log('onRemove')
}

function onExceed(max: number) : void {
  console.log('onExceed')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | Bound value (v-model) |
| placeholder | `string` | `'输入后回车添加'` | Placeholder; the default is Chinese for "Type and press Enter to add" |
| position | `string` | `'outside'` | Tag position: `outside` shows tags outside the input, `inside` shows them inside it |
| showButton | `boolean` | `true` | Whether to show the add button; hidden when `position` is `inside` |
| buttonText | `string` | `'添加'` | Button label; the default is Chinese for "Add" |
| maxCount | `number` | `-1` | Maximum number of tags; `-1` for no limit |
| disabled | `boolean` | `false` | Whether disabled |
| confirmType | `string` | `'done'` | Keyboard confirm-key type |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string[]` | Fires when the tag list changes; used by `v-model` |
| change | `value: string[]` | Fires when the tag list changes; `value` holds all tags |
| add | `tag: string` | Fires after a tag is added; empty or duplicate input is not added |
| remove | `tag: string, index: number` | Fires after a tag is removed, with the removed tag and its former index |
| exceed | `max: number` | Fires on an attempt to add a tag once `maxCount` is reached; `max` is the limit. The component shows no message, so handle it yourself |
