---
title: Result
demo: pages/demo/display/result
---

# Result

`ms-result` — Result for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-result` (commercial edition; source not public).
Demo route: `#/pages/demo/display/result`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/result.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Theme color |
| title | `string` | `''` | Title |
| description | `string` | `''` | Description text |
| icon | `string` | `''` | Override theme icon; 'none' hides the icon |
| image | `string` | `''` | Image URL; takes priority over icon when set |
| showActions | `boolean` | `false` | Whether to render the action area (default slot) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| description | `description` slot |
| title | `title` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-result/`
- Demo: `#/pages/demo/display/result`
- Chinese docs: [/uniappx/components/result](/uniappx/components/result)
