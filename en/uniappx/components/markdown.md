---
title: Markdown
demo: pages/demo/media/markdown
---

# Markdown

`ms-markdown` renders common Markdown syntax natively, with no third-party dependencies and no webview.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-markdown/components/ms-markdown`. ms-ui is a commercial edition and its source is not public.
Optional plugin: install `uni_modules/ms-markdown` alongside `ms-ui`.
Demo route: `#/pages/demo/media/markdown`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/markdown.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Current value |
| fontSize | `number` | `14` | Font size (px) |
| showCodeLang | `boolean` | `true` | Whether to show code language tags |
| selectable | `boolean` | `false` | Whether text is selectable |

## Events

| Event | Description |
| --- | --- |
| link | Link click |
| image | Image click |
| parsed | Parsed |

## See also

- Component: `uni_modules/ms-markdown/components/ms-markdown/`
- Demo: `#/pages/demo/media/markdown`
- Chinese docs: [/uniappx/components/markdown](/uniappx/components/markdown)
