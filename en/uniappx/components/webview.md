---
title: Webview
demo: pages/demo/media/webview
---

# Webview

`ms-webview`: Controlled wrapper around official `<web-view>`: fixed-height container + nav toolbar (back/forward/reload) + status line.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-webview/components/ms-webview`).
Optional plugin: install `uni_modules/ms-webview` alongside `ms-ui`.
Demo route: `#/pages/demo/media/webview`.

## Basic usage

```vue
<template>
  <ms-webview src="…">
    …
  </ms-webview>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Page URL; empty shows empty state |
| height | `number` | `260` | Container height (px; vapor number/pixel only, no %) |
| showToolbar | `boolean` | `true` | Show navigation toolbar |
| showStatus | `boolean` | `true` | Show status line |
| loadingText | `string` | `'加载中…'` | Loading text |

## Events

| Event | Description |
| --- | --- |
| load | Load |
| error | Error |
| message | Message received |
| navigate | Navigate action |

## See also

- Component: `uni_modules/ms-webview/components/ms-webview/`
- Demo: `#/pages/demo/media/webview`
- Chinese docs: [/uniappx/components/webview](/uniappx/components/webview)
