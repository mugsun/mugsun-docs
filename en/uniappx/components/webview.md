---
title: Webview
demo: pages/demo/media/webview
---

# Webview

`ms-webview` is a controlled wrapper around the official `<web-view>`, with a fixed-height container, a navigation bar for back, forward and reload, and a one-line status text.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-webview/components/ms-webview`. ms-ui is a commercial edition and its source is not public.
Optional plugin: install `uni_modules/ms-webview` alongside `ms-ui`.
Demo route: `#/pages/demo/media/webview`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/webview.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-webview
    :src="src"
    :height="200"
    @load="onLoad"
    @error="onError"
    @navigate="onNavigate"
  />
  <ms-webview :src="src" :height="160" :show-toolbar="false" />
  <!-- Styles -->
  <ms-webview :src="src" :height="120" :show-status="false" />
  <ms-webview src="" :height="100" />
  <!-- Advanced -->
  <ms-webview
    :src="src"
    :height="120"
    loading-text="Opening page…"
    :show-toolbar="false"
  />
  <ms-webview
    :src="src"
    :height="140"
    :show-toolbar="true"
    :show-status="true"
    loading-text="Fetching…"
  />
  <ms-webview ref="reloadRef" :src="src" :height="120" :show-toolbar="false" />
</template>

<script setup lang="uts">
const src = ref('https://example.com/')

function onLoad(payload: UTSJSONObject) : void {
  console.log('onLoad')
}

function onError(payload: UTSJSONObject) : void {
  console.log('onError')
}

function onNavigate(payload: UTSJSONObject) : void {
  console.log('onNavigate')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Resource URL |
| height | `number` | `260` | Height (px) |
| showToolbar | `boolean` | `true` | Whether to show toolbar |
| showStatus | `boolean` | `true` | Whether to show status |
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
