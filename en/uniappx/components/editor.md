---
title: Editor
demo: pages/demo/media/editor
---

# Editor

`ms-editor`: Markdown source editor: toolbar inserts markers + `textarea` source + live `ms-markdown` preview.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-editor/components/ms-editor` (repository not yet public).
Optional plugin: install `uni_modules/ms-editor` alongside `ms-ui`.
Demo route: `#/pages/demo/media/editor`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/editor.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-editor v-model="draft" @command="onCommand" @change="onChange" />
  <ms-editor :model-value="draft" read-only :height="120" />
  <!-- 组件样式 -->
  <ms-editor v-model="notes" :show-preview="false" :height="120" />
  <ms-editor v-model="notes" :toolbar="slimToolbar" :height="120" />
  <!-- 组件深度 -->
  <ms-editor
    ref="richEditor"
    v-model="rich"
    :toolbar="richToolbar"
    show-count
    :maxlength="800"
    :height="160"
    placeholder="在此输入 Markdown…"
    @command="onCommand"
    @clear="onClear"
  />
</template>

<script setup lang="uts">
const richEditor = ref<MsEditorComponentPublicInstance | null>(null)
const draft = ref(
const notes = ref('- 待办一\n- 待办二\n')
const rich = ref('### 深度编辑\n\n可插入图片、任务与表格。\n')
const slimToolbar = ref(['bold', 'list', 'link'] as string[])
const richToolbar = ref(
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| height | `number` | `220` | Height (px) |
| placeholder | `string` | `'输入 Markdown…'` | Placeholder |
| readOnly | `boolean` | `false` | Whether read-only |
| showPreview | `boolean` | `true` | Whether to show preview |
| toolbar | `string[]` | `['bold', 'italic', 'strike', 'code', 'h2', 'quote', 'list', 'link']` | Toolbar config |
| maxlength | `number` | `20000` | Max source length; -1 unlimited (still subject to platform textarea limits) |
| showCount | `boolean` | `false` | Whether to show character count |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| command | Toolbar command |
| change | Value changed |
| clear | Clear |

## See also

- Component: `uni_modules/ms-editor/components/ms-editor/`
- Demo: `#/pages/demo/media/editor`
- Chinese docs: [/uniappx/components/editor](/uniappx/components/editor)
