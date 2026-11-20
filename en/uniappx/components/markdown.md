---
title: Markdown
demo: pages/demo/media/markdown
---

# Markdown

`ms-markdown` renders common Markdown syntax natively, with no third-party dependencies and no webview.

This is an optional plugin. Install `uni_modules/ms-markdown` separately; it depends on `ms-ui`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-markdown :value="doc" @link="onLink" @parsed="onParsed" />
  <ms-markdown :value="listDoc" />
  <!-- Styles -->
  <ms-markdown :value="listDoc" :font-size="17" />
  <ms-markdown :value="quoteDoc" selectable :show-code-lang="false" />
  <!-- Advanced -->
  <ms-markdown :value="imageDoc" @image="onImage" />
  <ms-markdown :value="taskDoc" />
  <ms-markdown :value="tableDoc" />
</template>

<script setup lang="uts">
const doc = ref(docA)

const imageDoc = ref('### Image caption\n\n![Demo cover](/static/demo-cover.png)\n')

const listDoc = ref('- Lightweight rendering\n- Consistent across platforms\n- Zero third-party dependencies\n\n1. Parse\n2. Render\n3. Events')

const quoteDoc = ref('> Selectable text for easy copying\n\n```\nnpm run dev\n```\n')

const tableDoc = ref('| Col A | Col B | Col C |\n| --- | --- | --- |\n| 1 | Alpha | Yes |\n| 2 | Beta | No |\n')

const taskDoc = ref('- [x] Finish the parser\n- [ ] Add image preview\n- [ ] Syntax highlighting\n')

function onLink(payload: UTSJSONObject) : void {
  console.log('onLink')
}

function onParsed(payload: UTSJSONObject) : void {
  console.log('onParsed')
}

function onImage(payload: UTSJSONObject) : void {
  console.log('onImage')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Markdown source text |
| fontSize | `number` | `14` | Body font size (px) |
| showCodeLang | `boolean` | `true` | Whether code blocks show the language label |
| selectable | `boolean` | `false` | Whether the body text can be selected |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| link | `payload: UTSJSONObject` | Fires when a link is tapped; `payload` has `text` and `href`. The component does not navigate, so handle it yourself |
| image | `payload: UTSJSONObject` | Fires when an image is tapped; `payload` has `alt` and `src` |
| parsed | `payload: UTSJSONObject` | Fires after the content is parsed; `payload.blocks` is the number of blocks |
