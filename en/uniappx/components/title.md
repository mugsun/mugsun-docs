---
title: Title
demo: pages/demo/nav/title
---

# Title

`ms-title` is a heading with levels `h1` to `h6` and optional truncation by line count.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-title content="Heading 1" level="h1" @click="onTitleClick" />
  <ms-title content="Heading 2" level="h2" />
  <ms-title content="Heading 3" level="h3" />
  <!-- States -->
  <ms-title
    level="h4"
    :lines="1"
    content="This is a very long heading that demonstrates single-line truncation and should not wrap"
  />
  <!-- Advanced -->
  <ms-title content="Heading 4" level="h4" />
  <ms-title content="Heading 5" level="h5" />
  <ms-title content="Heading 6" level="h6" />
</template>

<script setup lang="uts">
function onTitleClick() : void {
  console.log('onTitleClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | Title text |
| level | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | Heading level, `h1` to `h6` |
| lines | `number` | `0` | Maximum number of lines before truncation; `0` for no limit |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Alignment |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the title is tapped |

## Slots

| Slot | Description |
| --- | --- |
| default | Title content; `content` by default |
