---
title: Mention
demo: pages/demo/form/mention
---

# Mention

`ms-mention` opens a suggestion panel when the trigger character (default `@`) is typed and inserts `@name ` on selection. A single Backspace removes the whole mention.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-mention`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/mention`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/mention.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-mention
    v-model="basicText"
    :options="members"
    @select="onSelect"
    @removemention="onRemove"
    @mention="onMention"
  />
  <ms-mention
    v-model="topicText"
    trigger="#"
    :options="topics"
    placeholder="Type # to pick a topic"
    @select="onSelect"
  />
  <!-- Styles -->
  <ms-mention
    v-model="emptyText"
    :options="members"
    placeholder="Type @zzz to see the empty state"
  />
  <ms-mention
    v-model="disabledText"
    :options="members"
    disabled
    placeholder="Disabled"
  />
  <!-- Advanced -->
  <ms-mention
    v-model="unfilteredText"
    :options="members"
    :filterable="false"
    placeholder="Type @ to show all members"
    @select="onSelect"
  />
  <ms-mention
    v-model="customEmptyText"
    :options="members"
    empty-text="No such teammate"
    placeholder="Type @zzz to see the empty state"
  />
  <ms-mention
    v-model="confirmText"
    :options="members"
    confirm-type="done"
    placeholder="Keyboard confirm key: done"
    @select="onSelect"
  />
</template>

<script setup lang="uts">
const basicText = ref('Today's progress ')

const confirmText = ref('')

const customEmptyText = ref('')

const disabledText = ref('@Zhang Wei read-only')

const emptyText = ref('')

const members = ref(['Zhang Wei', 'Li Na', 'Wang Qiang', 'Liu Min', 'Chen Chen'] as string[])

const topicText = ref('')

const topics = ref(['Release plan', 'Version retro', 'Performance'] as string[])

const unfilteredText = ref('')

function onSelect(name: string) : void {
  console.log('onSelect')
}

function onRemove(name: string) : void {
  console.log('onRemove')
}

function onMention(keyword: string) : void {
  console.log('onMention')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| options | `string[]` | `[]` | Options list |
| trigger | `string` | `'@'` | Trigger |
| filterable | `boolean` | `true` | Whether filterable |
| placeholder | `string` | `'输入 @ 提及成员'` | Placeholder |
| emptyText | `string` | `'无匹配成员'` | Empty-state text |
| disabled | `boolean` | `false` | Whether disabled |
| confirmType | `string` | `'send'` | Keyboard confirm-key type |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| mention | mention |
| select | select |
| removemention | removemention |
| confirm | Confirm |

## See also

- Component: `uni_modules/ms-ui/components/ms-mention/`
- Demo: `#/pages/demo/form/mention`
- Chinese docs: [/uniappx/components/mention](/uniappx/components/mention)
