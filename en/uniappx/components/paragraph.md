---
title: Paragraph
demo: pages/demo/display/paragraph
---

# Paragraph

`ms-paragraph` — Paragraph for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-paragraph` (commercial edition; source not public).
Demo route: `#/pages/demo/display/paragraph`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/paragraph.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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
