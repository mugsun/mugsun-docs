---
title: Paragraph
demo: pages/demo/display/paragraph
---

# Paragraph

`ms-paragraph` displays body text, with an optional secondary color and truncation by line count.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-paragraph`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/display/paragraph`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/paragraph.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | Content text |
| tone | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Text tone: default / secondary / success / warning / danger |
| lines | `number` | `0` | Row count |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-paragraph/`
- Demo: `#/pages/demo/display/paragraph`
- Chinese docs: [/uniappx/components/paragraph](/uniappx/components/paragraph)
