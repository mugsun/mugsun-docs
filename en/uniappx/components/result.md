---
title: Result
demo: pages/demo/display/result
---

# Result

`ms-result` is a result-page feedback block with an icon or image, a title, a description and an optional action area.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-result theme="success" title="Success" />
  <ms-result
    theme="default"
    title="Request submitted"
    description="Details can wrap; keep them within two lines"
  />
  <ms-result
    image="/static/empty-illustration.svg"
    title="Custom result"
    description="Uses an image instead of the theme icon"
    show-actions
  >
    <ms-button size="sm" theme="primary" @click="onAction">
      Back
    </ms-button>
  </ms-result>
  <!-- States -->
  <ms-result theme="success" title="Submitted" description="Expected within 1–3 business days" />
  <ms-result theme="warning" title="Please check your details" description="Some fields may affect later steps" />
  <ms-result theme="error" title="Submission failed" description="Check your network and try again" />
  <!-- Advanced -->
  <ms-result
    theme="error"
    title="Payment incomplete"
    description="Go back to edit or try again"
    show-actions
  >
    <ms-button size="sm" theme="default" @click="onSecondary">Back</ms-button>
    <view></view>
    <ms-button size="sm" theme="primary" @click="onPrimary">Retry</ms-button>
  </ms-result>
  <ms-result icon="none" title="Text-only result" description="For lightweight notices" />
  <ms-result theme="success" show-actions>
    <template #title>
      <text>Slot title</text>
    </template>
    <template #description>
      <text>Slot description · custom rich text</text>
    </template>
    <ms-button size="sm" theme="primary" @click="onAction">Got it</ms-button>
  </ms-result>
</template>

<script setup lang="uts">
function onAction() : void {
  console.log('onAction')
}

function onSecondary() : void {
  console.log('onSecondary')
}

function onPrimary() : void {
  console.log('onPrimary')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type, which sets the default icon and color |
| title | `string` | `''` | Title |
| description | `string` | `''` | Description text |
| icon | `string` | `''` | Icon name; empty uses the default icon of the type, and `none` hides it |
| image | `string` | `''` | Image URL; replaces the icon when set |
| showActions | `boolean` | `false` | Whether to show the action area, filled through the default slot |

## Slots

| Slot | Description |
| --- | --- |
| title | Custom title; `title` by default |
| description | Custom description; `description` by default |
| default | Action area content, shown when `showActions` is `true` |
