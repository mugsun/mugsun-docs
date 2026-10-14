---
title: Input Tag
demo: pages/demo/form/input-tag
---

# Input Tag

`ms-input-tag` is a tag input. Press Enter or tap the button to add a tag; tap the close icon on a tag to remove it.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-input-tag`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/input-tag`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/input-tag.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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
