---
title: Empty
demo: pages/demo/basic/empty
---

# Empty

`ms-empty` — Empty for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-empty` (commercial edition; source not public).
Demo route: `#/pages/demo/basic/empty`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/empty.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Icon -->
  <ms-empty icon="information-line" description="Empty state with icon" />
  <!-- Image -->
  <ms-empty image="/static/empty-illustration.svg" description="Empty state with image" />
  <!-- Action -->
  <ms-empty icon="inbox-line" description="Description" action-text="Action" @action="onAction" />
  <!-- Scenarios -->
  <ms-empty
    :status="sceneStatus"
    title="No data yet"
    description="Pull down or tap the button to retry"
    error-text="Something went wrong~"
    more-text="No more data"
    action-text="Tap to retry"
    @action="onRetry"
  />
</template>

<script setup lang="uts">
type EmptyStatus = 'empty' | 'loading' | 'error' | 'more'

const sceneStatus = ref('loading' as EmptyStatus)

function onAction() : void {
  console.log('onAction')
}

function onRetry() : void {
  console.log('onRetry')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| status | `'empty' \| 'loading' \| 'error' \| 'more'` | `'empty'` | Display status: empty / loading / error / no more |
| title | `string` | `''` | Main title (optional for empty/error states) |
| description | `string` | `''` | Description text |
| icon | `string` | `'inbox-line'` | Icon name (icons.uts) |
| image | `string` | `''` | Image URL |
| actionText | `string` | `''` | Action text |
| errorText | `string` | `'加载出错了'` | Error text |
| moreText | `string` | `'没有更多了'` | Label when variant is more |
| loadingText | `string` | `'加载中…'` | Loading text |

## Events

| Event | Description |
| --- | --- |
| action | Action button |

## Slots

| Slot | Description |
| --- | --- |
| action | `action` slot |
| description | `description` slot |
| image | `image` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-empty/`
- Demo: `#/pages/demo/basic/empty`
- Chinese docs: [/uniappx/components/empty](/uniappx/components/empty)
