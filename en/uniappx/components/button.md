---
title: Button
demo: pages/demo/basic/button
---

# Button

`ms-button` is a button with several themes, variants and sizes, plus a loading state, icons and native form submission.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Variants -->
  <ms-button block theme="primary">Solid</ms-button>
  <ms-button block variant="outline" theme="primary">Outline</ms-button>
  <ms-button block variant="dashed" theme="primary">Dashed</ms-button>
  <!-- Themes -->
  <ms-button block theme="default" @click="onThemeClick('default')">Default</ms-button>
  <ms-button block theme="primary" @click="onThemeClick('primary')">Primary</ms-button>
  <ms-button block theme="danger" @click="onThemeClick('danger')">Danger</ms-button>
  <!-- Sizes -->
  <ms-button theme="primary" size="lg">Large</ms-button>
  <ms-button theme="primary" size="md">Medium</ms-button>
  <ms-button theme="primary" size="sm">Small</ms-button>
  <!-- States -->
  <ms-button block disabled theme="primary">Disabled solid</ms-button>
  <ms-button block disabled variant="dashed" theme="primary">Disabled dashed</ms-button>
  <ms-button block disabled theme="light">Disabled light</ms-button>
</template>

<script setup lang="uts">
function onThemeClick(name: string) : void {
  console.log('onThemeClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | Theme: default / primary / danger / success / warning / light |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | Variant: solid / outline / dashed / text |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size: xs / sm / md / lg |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | Shape: rectangle / square / round / circle |
| block | `boolean` | `false` | Whether full width |
| ghost | `boolean` | `false` | Ghost button (transparent fill, outlined) |
| disabled | `boolean` | `false` | Whether disabled |
| loading | `boolean` | `false` | Whether loading |
| loadingText | `string` | `'加载中…'` | Loading text; empty string shows spinner only; the default is Chinese for "Loading…" |
| icon | `string` | `''` | Left icon name; can coexist with text |
| iconOnly | `boolean` | `false` | Icon only (square hit area) |
| formType | `'' \| 'submit' \| 'reset'` | `''` | Native form type: submit / reset; empty = normal button |
| haptic | `boolean` | `true` | Short vibration on tap; takes effect in the app and mini programs |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | `e: UniPointerEvent` | Fires on tap; not fired while disabled |

## Slots

| Slot | Description |
| --- | --- |
| default | Button label |
