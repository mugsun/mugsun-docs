---
title: Text
demo: pages/demo/basic/text
---

# Text

`ms-text` is a text component. `variant` picks a semantic color; size, weight and alignment are configurable, and long text can be truncated by line count.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Body and semantic colors -->
  <ms-text>This is default body text for page content.</ms-text>
  <ms-text variant="secondary">Secondary</ms-text>
  <ms-text variant="primary">Primary</ms-text>
  <!-- Font size and style -->
  <ms-text size="sm">Small · helper text and labels</ms-text>
  <ms-text size="md">Medium · default body and forms</ms-text>
  <ms-text size="lg">Large · subheadings and emphasis</ms-text>
  <!-- Interaction -->
  <ms-text :lines="2">
    This is a long piece of text for testing max lines and the ellipsis. The second line continues. The third line should be truncated with an ellipsis.
  </ms-text>
  <ms-text selectable>Selectable text: long-press or drag to select</ms-text>
  <ms-text variant="primary" @click="onTextClick">Tap me (shows a toast)</ms-text>
  <!-- Advanced -->
  <ms-text variant="danger" bold>Dangerous actions cannot be undone; confirm carefully</ms-text>
  <ms-text variant="warning" align="right" size="sm">Insufficient balance, please top up first</ms-text>
  <ms-text :lines="1" selectable variant="secondary">
    This is a long copyable text that is truncated beyond one line; you can still long-press to copy all of it.
  </ms-text>
</template>

<script setup lang="uts">
function onTextClick() : void {
  console.log('onTextClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'secondary' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | Semantic color |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| bold | `boolean` | `false` | Whether bold |
| lines | `number` | `0` | Maximum number of lines before truncation; `0` for no limit |
| selectable | `boolean` | `false` | Whether the text can be selected |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Alignment |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the text is tapped |

## Slots

| Slot | Description |
| --- | --- |
| default | Text content |
