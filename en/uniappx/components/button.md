---
title: Button
demo: pages/demo/basic/button
---

# Button

`ms-button` is a semantic button. It supports `theme`, `variant`, `size`, `block`, `disabled`, `loading`, `loadingText`, `formType`, `ghost`, `icon` / `iconOnly`, `shape` and `haptic`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-button`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/basic/button`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/button.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
| loadingText | `string` | `'加载中…'` | Loading text; empty string shows spinner only |
| icon | `string` | `''` | Left icon name; can coexist with text |
| iconOnly | `boolean` | `false` | Icon only (square hit area) |
| formType | `'' \| 'submit' \| 'reset'` | `''` | Native form type: submit / reset; empty = normal button |
| haptic | `boolean` | `true` | Short haptic on App/MP click; skipped automatically on Web |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-button/`
- Demo: `#/pages/demo/basic/button`
- Chinese docs: [/uniappx/components/button](/uniappx/components/button)
