---
title: Editor
demo: pages/demo/media/editor
---

# Editor

`ms-editor`: Markdown source editor: toolbar inserts markers + `textarea` source + live `ms-markdown` preview.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-editor/components/ms-editor`).
Optional plugin: install `uni_modules/ms-editor` alongside `ms-ui`.
Demo route: `#/pages/demo/media/editor`.

## Basic usage

```vue
<template>
  <ms-editor v-model="value">
    …
  </ms-editor>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| height | `number` | `220` | Height (px) |
| placeholder | `string` | `'输入 Markdown…'` | Placeholder |
| readOnly | `boolean` | `false` | Whether read-only |
| showPreview | `boolean` | `true` | Whether to show preview |
| toolbar | `string[]` | `['bold', 'italic', 'strike', 'code', 'h2', 'quote', 'list', 'link']` | Toolbar config |
| maxlength | `number` | `20000` | Max source length; -1 unlimited (still subject to platform textarea limits) |
| showCount | `boolean` | `false` | Whether to show character count |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| command | Toolbar command |
| change | Value changed |
| clear | Clear |

## See also

- Component: `uni_modules/ms-editor/components/ms-editor/`
- Demo: `#/pages/demo/media/editor`
- Chinese docs: [/uniappx/components/editor](/uniappx/components/editor)
