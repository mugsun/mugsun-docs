---
title: Empty
demo: pages/demo/basic/empty
---

# Empty

`ms-empty` is an empty-state component: an icon or image with a short text, plus an optional action button.

`status` also covers loading, error and no-more states.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| status | `'empty' \| 'loading' \| 'error' \| 'more'` | `'empty'` | Display status: empty / loading / error / no more |
| title | `string` | `''` | Main title (optional for empty/error states) |
| description | `string` | `''` | Description text |
| icon | `string` | `'inbox-line'` | Icon name (icons.uts) |
| image | `string` | `''` | Image URL |
| actionText | `string` | `''` | Action button text |
| errorText | `string` | `'加载出错了'` | Error text; the default is Chinese for "Failed to load" |
| moreText | `string` | `'没有更多了'` | Text shown when `status` is `more`; the default is Chinese for "No more items" |
| loadingText | `string` | `'加载中…'` | Loading text; the default is Chinese for "Loading…" |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| action | — | Fires when the action button is tapped |

## Slots

| Slot | Description |
| --- | --- |
| image | Custom image area; shows the icon or the `image` picture by default |
| description | Custom text area; shows the title and description by default |
| action | Custom action area; shows the action button by default |
