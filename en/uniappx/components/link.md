---
title: Link
demo: pages/demo/basic/link
---

# Link

`ms-link` is a text link. Set the text with `content` or the default slot; an underline and prefix and suffix icons are optional.

With `href` set, a tap navigates to a page in the app using `openType`. `http(s)` URLs are not opened; handle them in the `click` event.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Themes -->
  <ms-link theme="default">Default</ms-link>
  <ms-link theme="primary">Primary</ms-link>
  <ms-link theme="danger">Danger</ms-link>
  <!-- Underline -->
  <ms-link theme="primary">No underline</ms-link>
  <ms-link theme="primary" :underline="true">Underline</ms-link>
  <!-- Icon -->
  <ms-link theme="primary" icon="links-line">Prefix</ms-link>
  <ms-link theme="primary" suffix-icon="arrow-right-s-line">Suffix</ms-link>
  <!-- Sizes -->
  <ms-link size="sm" theme="primary">Small</ms-link>
  <ms-link size="md" theme="primary">Medium</ms-link>
  <ms-link size="lg" theme="primary">Large</ms-link>
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | Theme color |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| underline | `boolean` | `false` | Whether to show underline |
| disabled | `boolean` | `false` | Whether disabled |
| href | `string` | `''` | Path of a page in the app to navigate to on tap; `http(s)` URLs are not opened |
| openType | `'navigate' \| 'redirect' \| 'switchTab' \| 'reLaunch'` | `'navigate'` | Navigation mode: navigate / redirect / switchTab / reLaunch |
| icon | `string` | `''` | Prefix icon name |
| suffixIcon | `string` | `''` | Suffix icon name |
| content | `string` | `''` | Link text, used when the default slot is empty |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires on tap, not while disabled; with `href` set it fires before navigating |

## Slots

| Slot | Description |
| --- | --- |
| default | Link text; `content` by default |
