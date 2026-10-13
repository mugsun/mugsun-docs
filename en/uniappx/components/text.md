---
title: Text
demo: pages/demo/basic/text
---

# Text

`ms-text` — Text for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-text` (commercial edition; source not public).
Demo route: `#/pages/demo/basic/text`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/text.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'secondary' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | Style variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| bold | `boolean` | `false` | Whether bold |
| lines | `number` | `0` | Row count |
| selectable | `boolean` | `false` | Whether text is selectable |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Alignment |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-text/`
- Demo: `#/pages/demo/basic/text`
- Chinese docs: [/uniappx/components/text](/uniappx/components/text)
