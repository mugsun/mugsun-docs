---
title: Editor
demo: pages/demo/media/editor
---

# Editor

`ms-editor` is a Markdown source editor made of a toolbar that inserts markup, a source input area, and a live preview rendered by [`ms-markdown`](./markdown).

This is an optional plugin. Install `uni_modules/ms-editor` separately; it depends on `ms-ui`, and the preview also uses the [`ms-markdown`](./markdown) plugin.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-editor v-model="draft" @command="onCommand" @change="onChange" />
  <ms-editor :model-value="draft" read-only :height="120" />
  <!-- Styles -->
  <ms-editor v-model="notes" :show-preview="false" :height="120" />
  <ms-editor v-model="notes" :toolbar="slimToolbar" :height="120" />
  <!-- Advanced -->
  <ms-editor
    ref="richEditor"
    v-model="rich"
    :toolbar="richToolbar"
    show-count
    :maxlength="800"
    :height="160"
    placeholder="Type Markdown here…"
    @command="onCommand"
    @clear="onClear"
  />
</template>

<script setup lang="uts">
const draft = ref(
  '## Release notes\n\nThis release adds **charts** and *Markdown* rendering.\n\n- Line and bar charts\n- Pie and donut charts\n',
)

const notes = ref('- To-do 1\n- To-do 2\n')

const rich = ref('### Advanced editing\n\nInsert images, tasks and tables.\n')

const richToolbar = ref(
  ['bold', 'h3', 'task', 'image', 'table', 'hr', 'clear'] as string[],
)

const slimToolbar = ref(['bold', 'list', 'link'] as string[])

function onCommand(payload: UTSJSONObject) : void {
  console.log('onCommand')
}

function onChange(payload: UTSJSONObject) : void {
  console.log('onChange')
}

function onClear() : void {
  console.log('onClear')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Markdown source; bind with `v-model` |
| height | `number` | `220` | Height of the source area (px) |
| placeholder | `string` | `'输入 Markdown…'` | Placeholder; the default is Chinese for "Enter Markdown…" |
| readOnly | `boolean` | `false` | Whether read-only; the toolbar is hidden when read-only |
| showPreview | `boolean` | `true` | Whether to show preview |
| toolbar | `string[]` | `['bold', 'italic', 'strike', 'code', 'h2', 'quote', 'list', 'link']` | Toolbar buttons, chosen from bold / italic / strike / code / h2 / h3 / quote / list / task / link / image / table / hr / clear |
| maxlength | `number` | `20000` | Max source length; -1 unlimited (still subject to platform textarea limits) |
| showCount | `boolean` | `false` | Whether to show character count |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the source changes; used by `v-model` |
| command | `payload: UTSJSONObject` | Fires when a toolbar button is tapped; `payload.name` is the button name |
| change | `payload: UTSJSONObject` | Fires when the source changes; `payload.length` is the current character count |
| clear | — | Fires when the content is cleared, by the toolbar clear button or the `clear()` method |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `insertText(text: string)` | Inserts text at the cursor |
| `getValue(): string` | Returns the current source |
| `clear()` | Clears the content |
