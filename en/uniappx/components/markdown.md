---
title: Markdown
demo: pages/demo/media/markdown
---

# Markdown

`ms-markdown`: Native Markdown subset renderer (no third-party deps, no webview).

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-markdown/components/ms-markdown`).
Optional plugin: install `uni_modules/ms-markdown` alongside `ms-ui`.
Demo route: `#/pages/demo/media/markdown`.

## Basic usage

```vue
<template>
  <ms-markdown value="…">
    …
  </ms-markdown>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Current value |
| fontSize | `number` | `14` | Font size (px) |
| showCodeLang | `boolean` | `true` | Whether to show code language tags |
| selectable | `boolean` | `false` | Whether text is selectable |

## Events

| Event | Description |
| --- | --- |
| link | Link click |
| image | Image click |
| parsed | Parsed |

## See also

- Component: `uni_modules/ms-markdown/components/ms-markdown/`
- Demo: `#/pages/demo/media/markdown`
- Chinese docs: [/uniappx/components/markdown](/uniappx/components/markdown)
