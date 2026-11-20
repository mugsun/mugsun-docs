---
title: Sheet
demo: pages/demo/basic/sheet
---

# Sheet

`ms-sheet` is a card-like container with configurable background, corner radius, padding and margin, plus an optional border and shadow.

With `url` set, a tap navigates to that page; without it, a tap fires the `click` event.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-sheet radius="lg" padding="none">
    <text>Default sheet</text>
    <text>A uniform white surface for lists and forms</text>
    <ms-sheet>
      <ms-text>A uniform white container for list and form content.</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>Rounded</text>
    <text>Large radius + light surface</text>
    <ms-sheet radius="lg" variant="muted">
      <ms-text>Rounded card surface</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>Bordered</text>
    <text>A border marks the block edge</text>
    <ms-sheet bordered radius="lg">
      <ms-text>A bordered container</ms-text>
    </ms-sheet>
  </ms-sheet>
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'muted' \| 'primary'` | `'default'` | Background: default / muted / primary |
| radius | `'md' \| 'lg'` | `'lg'` | Corner radius: md / lg |
| padding | `'none' \| 'md' \| 'lg'` | `'md'` | Padding: none / md / lg |
| margin | `'none' \| 'page'` | `'none'` | Margin: none / page (page margin) |
| bordered | `boolean` | `false` | Whether to show border |
| shadow | `boolean` | `false` | Whether to show a shadow |
| loading | `boolean` | `false` | Whether to show the loading state; taps are ignored while loading |
| url | `string` | `''` | Page path to navigate to on tap |
| pressable | `boolean` | `false` | Whether it has a pressed effect; always on when `url` is set |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires on tap; not fired when `url` is set or while loading |

## Slots

| Slot | Description |
| --- | --- |
| default | Container content |
