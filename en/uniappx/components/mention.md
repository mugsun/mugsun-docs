---
title: Mention
demo: pages/demo/form/mention
---

# Mention

`ms-mention` opens a suggestion panel when the trigger character (default `@`) is typed and inserts `@name ` on selection. A single Backspace removes the whole mention.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| options | `string[]` | `[]` | Candidate names. When empty, no panel opens and only `mention` fires, so you can build your own panel |
| trigger | `string` | `'@'` | Trigger character; only the first character is used |
| filterable | `boolean` | `true` | Whether to filter candidates by the text typed after the trigger (prefix match) |
| placeholder | `string` | `'输入 @ 提及成员'` | Placeholder; the default is Chinese for "Type @ to mention a member" |
| emptyText | `string` | `'无匹配成员'` | Text shown when nothing matches; the default is Chinese for "No matching members" |
| disabled | `boolean` | `false` | Whether disabled |
| confirmType | `string` | `'send'` | Keyboard confirm-key type |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the content changes; used by `v-model` |
| change | `value: string` | Fires when the content changes |
| mention | `keyword: string` | Fires when the trigger is typed and whenever the filter text after it changes; `keyword` is the text after the trigger |
| select | `name: string` | Fires when a candidate is selected |
| removemention | `name: string` | Fires when Backspace removes a mention; `name` is the removed name |
| confirm | `value: string` | Fires when the keyboard's confirm key is tapped |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getMentions(): string[]` | Returns every name still mentioned in the text |
| `closePanel()` | Closes the candidate panel |
