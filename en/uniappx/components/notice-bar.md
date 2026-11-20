---
title: Notice Bar
demo: pages/demo/feedback/notice-bar
---

# Notice Bar

`ms-notice-bar` is a notice bar. A single message shows on one line with an ellipsis, and several messages can rotate vertically. An action label and a close button are optional.

There is no horizontal marquee, because uni-app x does not support `@keyframes` on the App platform.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Themes -->
  <ms-notice-bar theme="default" content="Default notice" />
  <ms-notice-bar theme="primary" content="Primary notice" />
  <ms-notice-bar theme="success" content="Success notice" />
  <!-- Long text -->
  <ms-notice-bar
    theme="primary"
    content="This is a very long notice that should be truncated with an ellipsis instead of breaking the layout"
  />
  <!-- Vertical -->
  <ms-notice-bar direction="vertical" theme="primary" :list="verticalList" />
  <!-- Closable -->
  <ms-notice-bar theme="warning" content="Closable notice" closable @close="onNoticeClose" />
</template>

<script setup lang="uts">
const verticalList = ['Rotating notice 1', 'Rotating notice 2', 'Rotating notice 3'] as string[]

function onNoticeClose() : void {
  console.log('onNoticeClose')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Theme color |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Display: horizontal (one line) / vertical (rotating) |
| content | `string` | `''` | Notice text |
| list | `string[]` | `[]` | Several notices for vertical rotation; `content` is used when empty |
| closable | `boolean` | `false` | Whether closable |
| icon | `string` | `'megaphone-line'` | Name of the icon on the left |
| showIcon | `boolean` | `true` | Whether to show the left icon; also hidden when icon is empty |
| operation | `string` | `''` | Action label on the right |
| suffixIcon | `string` | `''` | Name of the icon on the right, such as an arrow; hidden when `closable` is `true` |
| interval | `number` | `3000` | Interval of the vertical rotation (ms) |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the bar is tapped, including taps on the action label and the icon on the right |
| close | — | Fires when the close button is tapped; the bar then hides |
| operation | — | Fires when the action label is tapped |
