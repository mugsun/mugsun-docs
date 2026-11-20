---
title: Paragraph
demo: pages/demo/display/paragraph
---

# Paragraph

`ms-paragraph` displays body text, with an optional secondary color and truncation by line count.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-paragraph
    content="Mugsun is a mobile-first component library driven by design tokens with consistent behavior across platforms."
    @click="onParaClick"
  />
  <ms-paragraph
    tone="secondary"
    content="Secondary text adds context in a lighter color without competing with the main content."
  />
  <!-- States -->
  <ms-paragraph
    :lines="2"
    content="This is a long paragraph that demonstrates multi-line truncation. Beyond the set number of lines it ends with an ellipsis, so cards do not grow too tall and lists keep a steady rhythm."
  />
  <!-- Advanced -->
  <ms-paragraph tone="success" content="Success: your profile has been saved." />
  <ms-paragraph tone="warning" content="Warning: please check the required fields." />
  <ms-paragraph tone="danger" content="Danger: this action cannot be undone." />
</template>

<script setup lang="uts">
function onParaClick() : void {
  console.log('onParaClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | Text content |
| tone | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color: default / secondary / success / warning / danger |
| lines | `number` | `0` | Maximum number of lines before truncation; `0` for no limit |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the paragraph is tapped |

## Slots

| Slot | Description |
| --- | --- |
| default | Paragraph content; `content` by default |
