---
title: Loading
demo: pages/demo/basic/loading
---

# Loading

`ms-loading` is a loading indicator made of a spinner and a line of text, laid out horizontally or vertically.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Icon only -->
  <ms-loading text="" />
  <!-- Horizontal -->
  <ms-loading layout="horizontal" text="Loading…" />
  <!-- Vertical -->
  <ms-loading layout="vertical" text="Loading…" />
  <!-- Text only -->
  <ms-loading :indicator="false" text="Loading…" />
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `'加载中…'` | Text; the default is Chinese for "Loading…" |
| layout | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction: horizontal / vertical |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| tone | `'default' \| 'primary' \| 'inverse'` | `'default'` | Tone: default / primary / inverse |
| indicator | `boolean` | `true` | Whether to show the spinner |
| paused | `boolean` | `false` | Whether to pause the spinner |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom text area that replaces `text` |
